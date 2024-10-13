import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MinimalNavbar } from "@/components/navbar/Navbar";
import FullFooter from "@/components/footer/FullFooter";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        {/* Add the isAuthenticated and isAdmin props to the MinimalNavbar */}
        <MinimalNavbar />
        {children}
        <Toaster />
        <FullFooter />
      </body>
    </html>
  );
}
