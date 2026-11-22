import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Airy docs Badge: a small tinted pill, like the method and status tags in
 * an API reference. The default and primary take the green wash with green
 * text; status badges pair a tint with darker text of the same hue, so each
 * label passes contrast on its own colour.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-(--primary-text) bg-[color:oklch(0.476_0.11_154.3/0.15)] dark:bg-[color:oklch(0.476_0.11_154.3/0.23)] dark:text-[color:oklch(0.875_0.169_153.6)]",
        primary: "text-(--primary-text) bg-[color:oklch(0.476_0.11_154.3/0.15)] dark:bg-[color:oklch(0.476_0.11_154.3/0.23)] dark:text-[color:oklch(0.875_0.169_153.6)]",
        secondary: "text-(--foreground-secondary) bg-[color:oklch(0.925_0.004_157.2)] dark:text-[color:oklch(0.51_0.004_160)]",
        outline: "border border-border bg-background text-(--foreground-secondary)",
        success: "text-(--success-text) bg-[color:oklch(0.476_0.11_154.3/0.15)] dark:bg-[color:oklch(0.476_0.11_154.3/0.23)] dark:text-[color:oklch(0.875_0.15_153.6)]",
        warning: "text-(--warning-text) bg-[color:oklch(0.648_0.138_69.8/0.2)] dark:text-[color:oklch(0.875_0.119_80)]",
        destructive: "text-(--destructive-text) bg-[color:oklch(0.577_0.17_25/0.15)] dark:bg-[color:oklch(0.577_0.17_25/0.2)] dark:text-[color:oklch(0.875_0.066_22)]",
        solid: "bg-primary text-primary-foreground",
      },
      size: {
        sm: "h-5 px-1.5 text-[0.6875rem]",
        default: "h-5.5 px-2 text-xs",
        lg: "h-6.5 px-2.5 text-[0.8125rem]",
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
