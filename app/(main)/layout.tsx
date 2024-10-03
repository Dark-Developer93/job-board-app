import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobBoard",
  description:
    "JobBoard: Your Intelligent Job Board Companion. Streamline your job search with AI-powered features including smart job suggestions, seamless adding and deleting of jobs, robust authentication, and efficient search functionality. Stay organized and boost your productivity with our intuitive job board app.",
  keywords:
    "JobBoard, job board, job search, AI-powered, smart suggestions, productivity, authentication, search functionality, nextjs, typescript",
  // TODO: add icons
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px] bg-slate-50`}>
        <Navbar isAuthenticated={isAuthenticated} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
