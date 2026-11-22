import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Precision Badge - crisp, small-radius pills for a data-dense CRM.
// default (primary blue), secondary (quiet neutral fill), outline (hairline),
// destructive, plus light + status tints. Restrained, border-first.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground border border-border",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/14 text-[color:oklch(0.535_0.211_24)]",
        success: "text-[oklch(1_0_0)] bg-[color:oklch(0.545_0.15_150)]",
        "success-light": "text-[oklch(0.46_0.14_150)] bg-[color:oklch(0.62_0.16_150/0.19)]",
        warning: "text-[oklch(1_0_0)] bg-[color:oklch(0.57_0.128_65)]",
        "warning-light": "text-[oklch(0.5_0.13_60)] bg-[color:oklch(0.72_0.16_65/0.23)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Precision: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
        sm: "h-4 gap-1 px-1.5 text-[0.625rem] uppercase tracking-wide",
        default: "h-5 gap-1.5 px-2 text-xs",
        lg: "h-6 gap-1.5 px-2.5 text-xs",
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
