import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
