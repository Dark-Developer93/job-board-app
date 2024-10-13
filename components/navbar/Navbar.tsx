import React from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import { Button } from "../ui/button";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar = ({ isAuthenticated = false }: NavbarProps) => {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
          <span className="text-xl font-bold tracking-tight">JobBoard</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="link">
            <Link href="/jobs">Find jobs</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/jobs/new">Post a job</Link>
          </Button>
          {isAuthenticated ? (
            <Button asChild variant="link">
              <Link href="/profile">Profile</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="link">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/admin/job-categories">Job categories</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
