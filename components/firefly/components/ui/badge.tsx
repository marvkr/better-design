import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Firefly Badge: a soft tinted pill.
 *
 * Badges never glow. The default is warm paper; the accent badge takes the
 * pale yellow-green wash, and status badges pair a tint with its own darker
 * text so the label passes contrast on the tint.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-(--foreground-secondary) bg-[color:oklch(0.899_0.005_95.1)] dark:text-[color:oklch(0.489_0.013_96.5)]",
        primary: "text-foreground bg-[color:oklch(0.895_0.068_111.2)] dark:bg-[color:oklch(0.53_0.068_111.2)]",
        secondary: "text-secondary-foreground bg-[color:oklch(0.899_0.005_95.1)] dark:bg-[color:oklch(0.534_0.005_95.1)]",
        outline: "border border-(--line-strong) bg-background text-foreground",
        success: "text-(--success-text) bg-[color:oklch(0.895_0.022_155.9)] dark:text-[color:oklch(0.474_0.12_153.8)]",
        warning: "text-(--warning-text) bg-[color:oklch(0.9_0.04_88.2)] dark:text-[color:oklch(0.492_0.101_81.9)]",
        destructive: "text-(--destructive-text) bg-[color:oklch(0.899_0.02_17.5)] dark:text-[color:oklch(0.506_0.142_20.9)]",
        solid: "bg-(--ink) text-(--ink-foreground)",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        default: "h-6 px-2.5 text-xs",
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
