import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Terminal Badge — a status readout cell, not a pill.
 *   - Sharp 2px box, monospace, UPPERCASE, wide tracking (LED legends).
 *   - Hairline ring, tinted phosphor fill. Status hues are CRT-bright
 *     (green = PWR ok, amber = HDD, red = fault), matching the panel LEDs.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 " +
    "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground ring-border",
        primary: "bg-primary/15 ring-primary/40 text-[color:oklch(0.875_0.132_205)]",
        secondary: "bg-muted ring-border text-[color:oklch(0.875_0.085_210)]",
        outline: "bg-transparent text-foreground ring-border",
        success:
          "bg-[var(--success)]/15 ring-[var(--success)]/40 text-[color:oklch(0.875_0.17_150)]",
        warning:
          "bg-[var(--warning)]/15 text-[var(--warning)] ring-[var(--warning)]/40",
        destructive: "bg-destructive/15 ring-destructive/40 text-[color:oklch(0.875_0.066_22)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
