import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Graphite Badge — a small chip on the graphite surface ramp.
 * "default" sits as a calm raised tile; "primary" mirrors the raised-pill
 * recipe at chip scale (gradient fill + pressed label). Status variants stay
 * tonal and quiet so nothing glares against the warm-grey field.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 " +
    "text-[0.6875rem] font-medium tracking-[0.02em] " +
    "border transition-colors duration-fast",
  {
    variants: {
      variant: {
        default:
          "bg-popover text-foreground border-border [box-shadow:var(--shadow-tile)]",
        primary:
          "bg-[image:var(--pill-gradient)] text-primary-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] border-[oklch(1_0_0_/_0.08)] " +
          "[box-shadow:var(--shadow-pill)]",
        secondary:
          "text-secondary-foreground border-border [box-shadow:var(--shadow-inset)] bg-[color:oklch(0.349_0_180)]",
        outline: "bg-transparent text-foreground border-border",
        success:
          "bg-[oklch(0.4_0.1_145)]/30 border-[oklch(0.5_0.15_145)]/30 text-[color:oklch(0.875_0.15_145)]",
        warning:
          "bg-[oklch(0.45_0.12_70)]/30 border-[oklch(0.55_0.18_55)]/30 text-[color:oklch(0.875_0.119_80)]",
        destructive:
          "bg-destructive/20 border-destructive/30 text-[color:oklch(0.875_0.066_25)]",
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
