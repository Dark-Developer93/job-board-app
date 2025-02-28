"use client";

import H1 from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
      <H1>Error</H1>
      <p className="text-muted-foreground">An unexpected error occurred</p>
      <div className="flex justify-center">
        <Button onClick={handleGoHome} variant="outline">
          Go to Home
        </Button>
      </div>
    </main>
  );
}
