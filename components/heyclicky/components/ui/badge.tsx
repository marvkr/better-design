import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Heyclicky Badge — the lowercase section label.
 *
 * Small, wide-tracked, lowercase type in a full-round chip. The default chip
 * is the same lit silver gradient the segmented controls use, so labels read
 * as part of the desktop chrome rather than as coloured status pills.
 */
const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "rounded-full font-bold lowercase tracking-[0.08em]",
    "transition-[background,box-shadow,color] duration-base ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--gradient-chip)] text-foreground shadow-[var(--shadow-button)]",
        primary:
          "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-control)]",
        secondary: "text-secondary-foreground bg-[color:oklch(0.897_0_174)]",
        outline: "border border-border bg-card text-foreground",
        muted: "text-card bg-[color:oklch(0.56_0_177.7)]",
        success: "bg-success/24 text-[color:oklch(0.475_0.134_149)]",
        warning: "bg-warning/31 text-[color:oklch(0.495_0.104_76)]",
        destructive:
          "bg-[image:var(--gradient-destructive)] text-destructive-foreground shadow-[var(--shadow-control)]",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.625rem]",
        default: "px-3 py-1 text-[0.6875rem]",
        lg: "px-3.5 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
