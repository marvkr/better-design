import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Badge — pill chip. `primary` wears the azure alloy with a
 * chrome rim; other variants stay flat with a hairline edge.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium " +
    "ring-1 ring-inset transition-[background,color] duration-fast",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground ring-border",
        primary:
          "[background:var(--surface-on)] text-primary-foreground ring-white/20 [box-shadow:var(--shadow-button)]",
        secondary: "bg-muted ring-border text-[color:oklch(0.625_0.012_260)]",
        outline: "bg-transparent text-foreground ring-border",
        success: "bg-[oklch(0.55_0.12_160)]/15 ring-[oklch(0.55_0.12_160)]/30 text-[color:oklch(0.875_0.12_160)]",
        warning: "bg-[oklch(0.6_0.1_95)]/15 ring-[oklch(0.6_0.1_95)]/30 text-[color:oklch(0.875_0.1_95)]",
        destructive: "bg-destructive/15 ring-destructive/30 text-[color:oklch(0.875_0.066_25)]",
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
