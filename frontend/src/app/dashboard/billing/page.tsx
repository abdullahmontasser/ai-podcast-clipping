"use client";

import type { VariantProps } from "class-variance-authority";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { createCheckoutSession, type PriceId } from "~/actions/stripe";
import { Button, type buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
}

const plans: PricingPlan[] = [
  {
    title: "Small Pack",
    price: "$9.99",
    description: "Perfect for occasional podcast creators",
    features: ["50 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 50 credits",
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Medium Pack",
    price: "$24.99",
    description: "Best value for regular podcasters",
    features: ["150 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 150 credits",
    buttonVariant: "default",
    isPopular: true,
    savePercentage: "Save 17%",
    priceId: "medium",
  },
  {
    title: "Large Pack",
    price: "$69.99",
    description: "Ideal for podcast studioes and agencies",
    features: ["500 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 500 credits",
    buttonVariant: "outline",
    isPopular: false,
    savePercentage: "Save 30%",
    priceId: "large",
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col group transition-all duration-300",
        plan.isPopular && "border-primary/50 ring-1 ring-primary shadow-[0_0_30px_rgba(124,58,237,0.15)]",
      )}
    >
      {plan.isPopular && (
        <div className="bg-primary text-primary-foreground absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest-xs whitespace-nowrap shadow-[0_0_20px_rgba(124,58,237,0.4)]">
          Most Popular
        </div>
      )}
      <CardHeader className="flex-1">
        <CardTitle>{plan.title}</CardTitle>
        <div className="text-4xl font-bold">{plan.price} </div>
        {plan.savePercentage && (
          <p className="text-sm font-medium text-green-600">
            {plan.savePercentage}
          </p>
        )}
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul className="text-muted-foreground space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="text-primary size-4" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form
          action={() => createCheckoutSession(plan.priceId)}
          className="w-full"
        >
          <Button variant={plan.buttonVariant} className="w-full" type="submit">
            {plan.buttonText}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default function BillingPage() {
  return (
    <div className="mx-auto flex flex-col space-y-8 px-4 py-12">
      <div className="relative flex items-center justify-center gap-4">
        <Button
          className="absolute top-0 left-0"
          variant="outline"
          size="icon"
          asChild
        >
          <Link href="/dashboard">
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="font-sans text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Power up your <span className="glow-text">growth</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Purchase credits to generate more viral podcast clips. The more credtis
            you buy, the better the value.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>

      <div className="bg-card/40 backdrop-blur-xl border border-white/5 shadow-md rounded-2xl p-8 max-w-3xl mx-auto w-full">
        <h3 className="mb-6 font-sans text-xl font-bold tracking-tight">How credits work</h3>
        <ul className="text-muted-foreground list-disc space-y-3 pl-5 text-base">
          <li><strong>1 credit = 1 minute</strong> of podcast processing</li>
          <li>
            The engine will extract approximately 1 viral clip per 5 minutes of podcast
          </li>
          <li>Credits never expire and roll over on your account perpetually</li>
          <li>Longer podcasts require more credits based on total duration</li>
          <li>All packages are one-time secure purchases (no recurring subscriptions)</li>
        </ul>
      </div>
    </div>
  );
}
