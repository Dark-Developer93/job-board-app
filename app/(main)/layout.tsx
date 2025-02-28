import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { MinimalNavbar } from "@/components/navbar/Navbar";
import FullFooter from "@/components/footer/FullFooter";
import { Role } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | JobBoard",
    default: "JobBoard",
  },
  description:
    "JobBoard: Your Intelligent Job Board Companion. Streamline your job search, seamless adding and deleting of jobs, robust authentication, and efficient search functionality. Stay organized and boost your productivity with our intuitive job board app.",
  // "JobBoard: Your Intelligent Job Board Companion. Streamline your job search with AI-powered features including smart job suggestions, seamless adding and deleting of jobs, robust authentication, and efficient search functionality. Stay organized and boost your productivity with our intuitive job board app.",
  keywords:
    "JobBoard, job board, job search, AI-powered, smart suggestions, productivity, authentication, search functionality, nextjs, typescript",
  // "JobBoard, job board, job search, AI-powered, smart suggestions, productivity, authentication, search functionality, nextjs, typescript",
  // TODO: add icons
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticated = !!session;
  const isAdmin = session?.user?.role === Role.ADMIN;

  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <MinimalNavbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
        {children}
        <Toaster />
        <FullFooter />
      </body>
    </html>
  );
}
