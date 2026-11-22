import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Interior Badge — a 6px-radius chip, never a pill. A chip on a light surface
 * is filled, not outlined: a 1px outline on a white chip sitting on a white
 * field is invisible. Counts and ids inside a chip run mono with
 * tabular-nums.
 */

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-[0.375rem] px-2 py-0.5",
    "text-[0.7188rem] font-medium leading-[1rem] whitespace-nowrap",
    "transition-colors duration-fast",
    "[&_svg]:size-3 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "text-secondary-foreground shadow-[var(--shadow-row)] bg-[color:oklch(0.88_0.003_106.5)]",
        outline: "border border-border text-foreground bg-[color:oklch(0.88_0_187.6)]",
        accent: "bg-[color:oklch(0.879_0.019_273.2)] text-[color:oklch(0.493_0.227_268.3)]",
        destructive: "bg-destructive/16 text-[color:oklch(0.491_0.163_32)]",
        success: "bg-success/17 text-[color:oklch(0.466_0.094_151)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
