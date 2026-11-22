import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Badge: a small pill.
 *
 * The default is the oat pill with ink type. The primary badge is the one
 * terracotta label, set in small capitals with open tracking, the way a
 * reading room marks something new. Status badges pair a quiet tint with
 * their own darker text, and the solid badge is a warm ink chip.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-foreground bg-[color:oklch(0.894_0.014_97.5)] dark:bg-[color:oklch(0.539_0.014_97.5)]",
        primary:
          "bg-primary text-[0.6875rem] uppercase tracking-wider text-primary-foreground",
        secondary: "text-secondary-foreground bg-[color:oklch(0.893_0.011_95.2)] dark:bg-[color:oklch(0.538_0.011_95.2)]",
        outline: "border border-(--line-strong) bg-transparent text-foreground",
        success: "text-(--success-text) bg-[color:oklch(0.52_0.09_160/0.17)] dark:text-[color:oklch(0.875_0.08_160)]",
        warning: "text-(--warning-text) bg-[color:oklch(0.772_0.121_67.4/0.34)] dark:text-[color:oklch(0.875_0.106_75)]",
        destructive: "text-(--destructive-text) bg-[color:oklch(0.53_0.17_26/0.15)] dark:bg-[color:oklch(0.53_0.17_26/0.22)] dark:text-[color:oklch(0.875_0.066_26)]",
        solid: "bg-foreground text-background",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        default: "h-6 px-2.5 py-0.5 text-xs",
        lg: "h-7 px-3 text-sm",
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
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
