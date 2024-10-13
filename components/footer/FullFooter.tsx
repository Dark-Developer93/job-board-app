import Link from "next/link";
import React from "react";

const FullFooter = () => {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold">About JobBoard</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:underline">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="hover:underline">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:underline">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:underline">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="hover:underline">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/employer-resources" className="hover:underline">
                  Employer Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com" className="hover:underline">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" className="hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com" className="hover:underline">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-muted-foreground/10 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FullFooter;
