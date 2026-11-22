import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { creamBevel, quietBevel } from "./_shared";

/**
 * Burnished Badge: a small bevelled pill.
 *
 * The default is a graphite bevel, the same finish as a chip. `primary` and
 * `solid` wear the cream bevel of the primary button. Status and colour
 * variants are a quiet tint with a hairline inside, so the label stays
 * readable on umber without a second raised object competing with the
 * buttons.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-semibold tracking-[0.016em] [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground ring-1 ring-input shadow-(--bevel-raised)",
        primary: creamBevel,
        solid: creamBevel,
        secondary: quietBevel,
        outline: "border border-input bg-transparent text-muted-foreground",
        info: "bg-info/15 text-info-text inset-ring-1 inset-ring-info/25",
        success: "bg-success/15 text-success-text inset-ring-1 inset-ring-success/25",
        warning: "bg-warning/15 text-warning-text inset-ring-1 inset-ring-warning/25",
        destructive: "bg-destructive/15 text-destructive-text inset-ring-1 inset-ring-destructive/30",
        blue: "bg-info/15 text-info-text inset-ring-1 inset-ring-info/25",
        green: "bg-success/15 text-success-text inset-ring-1 inset-ring-success/25",
        orange: "bg-ember/15 text-ember-text inset-ring-1 inset-ring-ember/30",
        yellow: "bg-flame/15 text-flame-text inset-ring-1 inset-ring-flame/25",
        purple: "bg-glow/15 text-glow-text inset-ring-1 inset-ring-glow/25",
      },
      size: {
        sm: "h-5 px-2 text-[0.6875rem]",
        default: "h-6 px-2.5 text-xs",
        lg: "h-7 px-3 text-[0.8125rem]",
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
