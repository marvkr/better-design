import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Velour Glass Badge - quiet velvet chip. Soft fills, hairline inset ring,
 * no heavy shadow; status hues stay dim like the reference's "optimistic"
 * mint label.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default:
          "text-secondary-foreground [background-image:var(--velour-raised)] ring-border " +
          "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
        primary: "bg-primary/15 text-primary ring-primary/25",
        secondary: "bg-muted text-muted-foreground ring-border",
        outline: "bg-transparent text-foreground ring-border",
        success:
          "bg-[oklch(0.45_0.09_165)]/20 ring-[oklch(0.55_0.1_165)]/30 text-[color:oklch(0.875_0.11_165)]",
        warning:
          "bg-[oklch(0.5_0.1_80)]/20 ring-[oklch(0.6_0.11_80)]/30 text-[color:oklch(0.875_0.1_85)]",
        destructive: "bg-destructive/15 ring-destructive/30 text-[color:oklch(0.875_0.066_22)]",
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
