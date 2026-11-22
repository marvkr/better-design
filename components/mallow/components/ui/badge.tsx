import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { quietFinish, primaryFinish } from "./_shared";

/**
 * Mallow Badge: a small round tag.
 *
 * The default is a lilac tag fill with ink text that reads on the page and
 * on a card alike. `cost` is the coral tag, kept for a fee or a charge, and
 * `free` is the green tag for what costs nothing or what a choice saves.
 * Status and colour variants are a quiet tint of their hue.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-normal tabular-nums [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-(--tag) text-foreground",
        cost: "bg-(--fee-surface) text-(--fee-text)",
        free: "bg-(--free-surface) text-(--free-text)",
        primary: primaryFinish,
        solid: primaryFinish,
        secondary: quietFinish,
        outline: "bg-transparent text-muted-foreground ring-1 ring-input",
        info: "bg-info/15 text-info-text",
        success: "bg-success/15 text-success-text",
        warning: "bg-warning/25 text-warning-text",
        destructive: "bg-destructive/15 text-destructive-text",
        blue: "bg-info/15 text-info-text",
        green: "bg-success/15 text-success-text",
        orange: "bg-(--badge-orange)/20 text-(--badge-orange-text)",
        yellow: "bg-(--badge-yellow)/38 text-(--badge-yellow-text)",
        purple: "bg-primary/14 text-(--primary-text)",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        default: "h-7 px-2.5 text-sm",
        lg: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
