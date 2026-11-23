import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Badge, measured on airbnb.com (13 November 2026)
// Pill shape, weight 500. Status colours come from the site's own scale.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        secondary: "border border-border bg-secondary text-secondary-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive-tint text-destructive-tint-foreground",
        success: "bg-success text-primary-foreground",
        "success-light": "bg-success-tint text-success-tint-foreground",
        warning: "bg-warning text-primary-foreground",
        "warning-light": "bg-warning-tint text-warning-tint-foreground",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-[0.6875rem]",
        default: "h-6 gap-1.5 px-2.5 text-xs",
        lg: "h-7 gap-1.5 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
