"use client";

import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { signupSchema, type SignupFormValues } from "~/schemas/auth";
import { signUp } from "~/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await signUp(data);
      if (!result.success) {
        setError(result.error ?? "An error occured during signup");
        return;
      }

      const signUpResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signUpResult?.error) {
        setError(
          "Account created but couldn't sign in automatically. Please try again.",
        );
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occured");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email below to sign up to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <p className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive-foreground">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
