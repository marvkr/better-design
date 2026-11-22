import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Inset Dark Badge — small flat pill with hairline ring.
 * Default sits flat; "raised" mirrors the pill recipe at chip scale.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 " +
    "text-[0.6875rem] font-medium tracking-[0.02em] " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground ring-border",
        primary:
          "[background:var(--pill-gradient)] text-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] ring-[oklch(1_0_0/0.08)]",
        secondary:
          "bg-card text-[oklch(1_0_0/0.6)] ring-border",
        outline: "bg-transparent text-foreground ring-border",
        success:
          "bg-[oklch(0.4_0.1_145)]/30 ring-[oklch(0.5_0.15_145)]/30 text-[color:oklch(0.875_0.15_145)]",
        warning:
          "bg-[oklch(0.45_0.12_70)]/30 ring-[oklch(0.55_0.18_55)]/30 text-[color:oklch(0.875_0.119_80)]",
        destructive:
          "bg-destructive/20 ring-destructive/30 text-[color:oklch(0.875_0.066_25)]",
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
