"use server";

import { redirect } from "next/navigation";
import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="relative z-10 w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
