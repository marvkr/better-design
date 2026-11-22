import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Gauge Dark Badge: status pill for dense metric rows.
// Default reads like a small etched plate; status variants use the DS's
// instrument hues (gold primary, ok green, warn amber, alarm red).

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-border bg-secondary text-secondary-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
        primary:
          "border-[var(--gauge-rim)] bg-[linear-gradient(to_bottom,var(--gauge-grad-top),var(--gauge-grad-bottom))] text-primary-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.3)]",
        secondary:
          "border-[var(--gauge-line-soft)] bg-primary/10 text-primary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        "destructive-light":
          "border-destructive/30 bg-destructive/10 text-[color:oklch(0.875_0.066_25)]",
        success:
          "border-transparent bg-[var(--gauge-ok)] text-[oklch(0.2_0.05_152)]",
        "success-light":
          "border-[oklch(0.74_0.12_152/0.3)] bg-[oklch(0.74_0.12_152/0.12)] text-[var(--gauge-ok)]",
        warning:
          "border-transparent bg-[var(--gauge-warn)] text-[oklch(0.22_0.05_70)]",
        "warning-light":
          "border-[oklch(0.76_0.14_70/0.3)] bg-[oklch(0.76_0.14_70/0.12)] text-[var(--gauge-warn)]",
        outline: "border-border bg-transparent text-foreground",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem] uppercase tracking-wide",
        default: "h-5 gap-1.5 px-2 text-xs",
        lg: "h-6 gap-1.5 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
