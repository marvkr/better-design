import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Hyperline Badge: compact status chips. Tinted fills with hairline rims;
// gold variant carries the signature warm accent.

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/15 shadow-[inset_0_0_0_0.0625rem_oklch(0.79_0.125_200/0.3)] text-[color:oklch(0.875_0.125_200)]",
        secondary:
          "border-border/70 bg-secondary text-secondary-foreground " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.05)]",
        outline: "border-border text-foreground",
        destructive:
          "border-transparent shadow-[inset_0_0_0_0.0625rem_oklch(0.6_0.21_22/0.35)] bg-destructive/19 text-[color:oklch(0.875_0.066_22)]",
        success:
          "border-transparent bg-[oklch(0.74_0.17_155/0.14)] shadow-[inset_0_0_0_0.0625rem_oklch(0.74_0.17_155/0.3)] text-[color:oklch(0.875_0.17_155)]",
        gold:
          "border-transparent bg-[image:none] bg-[color:var(--hl-gold-soft)] text-[color:var(--hl-gold)] " +
          "shadow-[inset_0_0_0_0.0625rem_oklch(0.82_0.12_85/0.35)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
