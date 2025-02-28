"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { verifyEmail } from "@/app/actions/authActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [message, setMessage] = useState("Verifying your email...");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const verifyEmailToken = useCallback(async () => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    try {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus("success");
        setMessage(
          "Email verified successfully. You will be redirected shortly.",
        );
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `An error occurred during verification ${error}. Please try again.`,
      );
    }
  }, [token, router]);

  useEffect(() => {
    verifyEmailToken();
  }, [verifyEmailToken]);

  return (
    <Card className="mx-auto mt-8 max-w-sm">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>{message}</p>
          {status === "success" && (
            <p className="text-sm text-muted-foreground">
              If you&apos;re not redirected automatically, please click the
              button below.
            </p>
          )}
          {status !== "verifying" && (
            <Button asChild>
              <Link href="/auth/login">Go to login page</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <Card className="mx-auto mt-8 max-w-sm">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p>Loading verification page...</p>
            </div>
          </CardContent>
        </Card>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
