"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/app/actions/authActions";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, SignupFormValues } from "@/lib/validation";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const result = await signUp(data.name, data.email, data.password);
      if (result.success) {
        toast({
          title: "Signup successful",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Signup failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignup = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });
      if (result?.error) {
        if (result.error === "EmailExists") {
          toast({
            title: "Email already exists",
            description:
              "This email is already associated with an account. Please log in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: result.error,
            variant: "destructive",
          });
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => handleProviderSignup("google");
  const handleLinkedInSignup = () => handleProviderSignup("linkedin");

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="m@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create an account"
            )}
          </Button>
          <div className="grid grid-cols-1 gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex h-11 w-full items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src="https://logo.clearbit.com/google.com"
                  alt="Google logo"
                  width={20}
                  height={20}
                />
              )}
              <span className="text-gray-600">Sign up with Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex h-11 w-full items-center justify-center gap-3 border-none bg-[#0A66C2] text-white hover:bg-[#0A66C2]/100"
              onClick={handleLinkedInSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src="https://logo.clearbit.com/linkedin.com"
                  alt="LinkedIn logo"
                  width={20}
                  height={20}
                />
              )}
              <span>Sign up with LinkedIn</span>
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
