import type { Metadata } from "next";
// import { auth } from "@/auth";
// eslint-disable-next-line camelcase
import { Inter } from "next/font/google";

// import { Provider } from "@/components/providers/Provider";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MinimalNavbar } from "@/components/navbar/Navbar";
import { auth } from "@/lib/auth";
import { Role } from "@prisma/client";

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

export default async function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAuthenticated = !!session;
  const isAdmin = session?.user.role === Role.ADMIN;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <MinimalNavbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
