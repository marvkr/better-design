import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Playful console Badge: a small bold pill.
 *
 * The default badge is the orange key in miniature: orange fill behind the
 * orange rim. Status badges pair a bold tint with its own darker text, the
 * way a marker highlight sits behind a word, so every label passes contrast.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border font-bold [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-(--primary-rim) bg-primary text-primary-foreground",
        primary: "border-(--primary-rim) bg-(--primary-wash) text-foreground",
        secondary: "border-transparent text-secondary-foreground bg-[color:oklch(0.879_0.01_119.6)] dark:bg-[color:oklch(0.534_0.01_119.6)] dark:text-[color:oklch(0.96_0.008_114.2)]",
        outline: "border-(--line-strong) bg-card text-foreground",
        success: "border-transparent text-(--success-text) bg-[color:oklch(0.877_0.028_155.3)] dark:text-[color:oklch(0.465_0.105_160)]",
        warning: "border-transparent bg-[color:oklch(0.88_0.06_80)] text-[color:oklch(0.48_0.11_62)]",
        destructive:
          "border-transparent text-(--destructive-text) bg-[color:oklch(0.883_0.037_24)] dark:text-[color:oklch(0.485_0.11_25)]",
        solid: "border-transparent bg-(--ink) text-(--ink-foreground)",
      },
      size: {
        sm: "h-5 px-2 text-[0.6875rem]",
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

/** Props for Badge: any span attribute plus tone and size. */
export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/** A short status or category label. */
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
