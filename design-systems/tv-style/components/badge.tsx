import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * TV Style Badge — a mini flipboard tile. Sharp 2px radius, uppercase
 * tracked text, hairline inset ring. Semantic variants map to the flipoff
 * scramble palette (cyan, teal, magenta, red, amber, green).
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[2px] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] " +
    "ring-1 ring-inset transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground ring-border",
        primary: "bg-primary/15 text-primary ring-primary/30",
        secondary: "bg-muted text-muted-foreground ring-border",
        outline: "bg-transparent text-foreground ring-border",
        success: "bg-[var(--tv-green)]/15 text-[var(--tv-green)] ring-[var(--tv-green)]/30",
        warning: "bg-[var(--tv-amber)]/15 text-[var(--tv-amber)] ring-[var(--tv-amber)]/35",
        info: "bg-[var(--tv-cyan)]/15 text-[var(--tv-cyan)] ring-[var(--tv-cyan)]/30",
        destructive: "bg-destructive/15 text-destructive ring-destructive/30",
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
