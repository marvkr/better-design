import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Command Noir Badge — a keycap-style chip with a hairline ring.
 * Default sits flat on the surface; "primary" lights up with the accent
 * material used across the system.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 " +
    "text-[0.6875rem] font-medium tracking-[0.02em] " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground ring-border",
        primary:
          "[background:var(--accent-fill)] text-primary-foreground " +
          "ring-[oklch(1_0_0/0.08)]",
        secondary:
          "bg-card text-muted-foreground ring-border",
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
