import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[0.125rem] border-2 px-2 py-0.5 " +
    "font-mono text-[0.6875rem] font-black uppercase tracking-[0.1em] " +
    "transition-[background-color,box-shadow,color] duration-fast [box-shadow:var(--shadow-xs)]",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        primary: "border-border bg-primary text-primary-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground",
        outline: "border-border bg-background text-foreground",
        success:
          "border-border bg-[var(--success)] text-[var(--success-foreground)]",
        warning:
          "border-border bg-[var(--warning)] text-[var(--warning-foreground)]",
        destructive: "border-border bg-destructive text-destructive-foreground",
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
