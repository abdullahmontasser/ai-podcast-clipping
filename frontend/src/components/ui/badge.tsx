import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest-xs w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(124,58,237,0.1)] [a&]:hover:bg-primary/20 [a&]:hover:border-primary/40",
        secondary:
          "border-white/5 bg-secondary/40 text-secondary-foreground backdrop-blur-md [a&]:hover:bg-secondary/60",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive-foreground [a&]:hover:bg-destructive/20",
        outline:
          "border-white/10 text-muted-foreground [a&]:hover:border-primary/50 [a&]:hover:text-primary [a&]:hover:bg-primary/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
