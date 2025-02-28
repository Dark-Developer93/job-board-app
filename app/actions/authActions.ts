"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validation";
import { ZodError } from "zod";

import prisma from "@/lib/prisma";
import VerificationEmail from "@/emails/VerificationEmailProps";
import ResetPasswordEmail from "@/emails/ResetPasswordEmail";

export async function sendVerificationEmail(email: string) {
  const account = await prisma.account.findUnique({
    where: { email },
    include: { user: true },
  });
  if (!account || !account.user) {
    throw new Error("User not found");
  }

  const token = Math.random().toString(36).substr(2, 8);
  await prisma.account.update({
    where: { id: account.id },
    data: { emailVerificationToken: token },
  });

  const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;
  const emailHtml = await render(
    VerificationEmail({ verificationLink, userName: account.user.name || "" }),
  );

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: account.email,
    subject: "Please verify your email",
    html: emailHtml,
  });

  return { success: true, message: "Verification email sent" };
}

export async function sendPasswordResetEmail(email: string) {
  try {
    // Validate the email
    loginSchema.shape.email.parse(email);

    const account = await prisma.account.findUnique({
      where: { email },
      include: { user: true },
    });
    if (!account || !account.user) {
      throw new Error("User not found");
    }

    const token = Math.random().toString(36).substr(2, 8);
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.resetPasswordToken.create({
      data: {
        token,
        expiresAt,
        accountId: account.id,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    const emailHtml = await render(
      ResetPasswordEmail({ resetLink, userName: account.user.name || "" }),
    );

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: account.email,
      subject: "Reset your password",
      html: emailHtml,
    });

    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Invalid email format",
        errors: error.errors,
      };
    }
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Validate the new password
    loginSchema.shape.password.parse(newPassword);

    const resetToken = await prisma.resetPasswordToken.findUnique({
      where: { token },
      include: { account: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date() || resetToken.usedAt) {
      throw new Error("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.account.update({
        where: { id: resetToken.accountId },
        data: { password: hashedPassword },
      }),
      prisma.resetPasswordToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Invalid password format",
        errors: error.errors,
      };
    }
    console.error("Error resetting password:", error);
    throw error;
  }
}

export async function signUp(name: string, email: string, password: string) {
  const existingAccount = await prisma.account.findUnique({ where: { email } });
  if (existingAccount) {
    return { success: false, message: "Email already exists, please login" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      accounts: {
        create: {
          email,
          type: "credentials",
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      },
    },
  });

  // Send verification email
  await sendVerificationEmail(email);

  return {
    success: true,
    message:
      "User created successfully. Please check your email to verify your account.",
  };
}

export async function verifyEmail(token: string) {
  const account = await prisma.account.findFirst({
    where: {
      emailVerificationToken: token,
    },
    include: { user: true },
  });

  if (!account) {
    return { success: false, message: "Invalid or expired verification token" };
  }

  if (account.emailVerified) {
    return { success: true, message: "Email already verified" };
  }

  await prisma.account.update({
    where: { id: account.id },
    data: {
      emailVerified: new Date(),
      emailVerificationToken: null,
    },
  });

  return { success: true, message: "Email verified successfully" };
}