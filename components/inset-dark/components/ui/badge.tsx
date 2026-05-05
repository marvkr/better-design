import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Inset Dark Badge — small flat pill with hairline ring.
 * Default sits flat; "raised" mirrors the pill recipe at chip scale.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 " +
    "text-[11px] font-medium tracking-[0.02em] " +
    "ring-1 ring-inset transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground ring-border",
        primary:
          "[background:var(--pill-gradient)] text-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] ring-[rgba(255,255,255,0.08)]",
        secondary:
          "bg-card text-[rgba(255,255,255,0.6)] ring-border",
        outline: "bg-transparent text-foreground ring-border",
        success:
          "bg-[oklch(0.4_0.1_145)]/30 text-[oklch(0.82_0.15_145)] ring-[oklch(0.5_0.15_145)]/30",
        warning:
          "bg-[oklch(0.45_0.12_70)]/30 text-[oklch(0.82_0.14_80)] ring-[oklch(0.55_0.18_55)]/30",
        destructive:
          "bg-destructive/20 text-[oklch(0.78_0.18_25)] ring-destructive/30",
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
