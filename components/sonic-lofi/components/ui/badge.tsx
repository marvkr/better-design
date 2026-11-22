import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Lumen Dark Badge — flat with a hairline ring (no heavy shadow).
 * Rounded-full by default. Semantic colors via tokens.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground ring-border",
        primary: "bg-primary/15 ring-primary/30 text-[color:oklch(0.875_0.1_75)]",
        secondary: "bg-muted text-muted-foreground ring-border",
        outline: "bg-transparent text-foreground ring-border",
        success: "bg-[oklch(0.5_0.15_145)]/15 ring-[oklch(0.5_0.15_145)]/30 text-[color:oklch(0.875_0.15_145)]",
        warning: "bg-[oklch(0.55_0.18_55)]/15 ring-[oklch(0.55_0.18_55)]/30 text-[color:oklch(0.875_0.119_80)]",
        destructive: "bg-destructive/15 ring-destructive/30 text-[color:oklch(0.875_0.067_28)]",
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
