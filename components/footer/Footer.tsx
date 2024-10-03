import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">JobBoard</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobBoard, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
