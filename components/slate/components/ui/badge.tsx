import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Ops Sharp Badge — the status pill of an ops dashboard ("Processed",
 * "Approve by Oct 12"). Small, rounded-md (sharp, not pill), tight tracking.
 * Success reads emerald, warning amber, exactly like the reference's pills.
 */

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-md border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-1",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-secondary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-border bg-card text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        "destructive-light":
          "border-destructive/20 bg-destructive/10 text-[color:oklch(0.532_0.215_27.3)]",
        success: "border-transparent text-success-foreground bg-[color:oklch(0.532_0.149_149.2)]",
        "success-light": "border-success/20 bg-success/10 text-[color:oklch(0.502_0.141_149.2)]",
        warning: "border-transparent bg-warning text-warning-foreground",
        "warning-light": "border-warning/30 bg-warning/15 text-[color:oklch(0.524_0.113_70.1)]",
        outline: "border-border bg-transparent text-foreground",
      },
      size: {
        sm: "h-5 px-1.5 text-[0.625rem] tracking-wide",
        default: "h-5 px-2 text-xs",
        lg: "h-6 px-2.5 text-xs",
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
