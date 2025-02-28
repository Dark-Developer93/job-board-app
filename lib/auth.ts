import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { Role, User } from "@prisma/client";
import prisma from "./prisma";
import { loginSchema } from "./validation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedCredentials = loginSchema.parse(credentials);

          const account = await prisma.account.findUnique({
            where: { email: validatedCredentials.email },
            include: { user: true },
          });

          if (!account) {
            return null;
          }

          if (!account.password) {
            throw new Error("Email already exists");
          }

          if (!account.emailVerified) {
            throw new Error("Please verify your email before logging in.");
          }

          const isPasswordValid = await bcrypt.compare(
            validatedCredentials.password,
            account.password,
          );

          if (!isPasswordValid) {
            return null;
          }

          return account.user as User;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed",
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER" as Role, // Assuming default role for new users
        };
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER" as Role, // Assuming default role for new users
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "linkedin") {
        const existingUser = await prisma.account.findUnique({
          where: { email: user.email! },
        });
        if (existingUser) {
          throw new Error("EmailExists");
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user && "role" in user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            role: token.role as Role,
          },
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
