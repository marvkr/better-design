import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Linear Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs uppercase
// Variants: default (gray), primary (blue), destructive (red), success (green), warning (orange)
// Modes: filled, light

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/10 text-primary",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/10 text-destructive",
        success: "bg-emerald-500 text-white",
        "success-light": "bg-emerald-500/10 text-emerald-700",
        warning: "bg-orange-500 text-white",
        "warning-light": "bg-orange-500/10 text-orange-700",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Linear: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
        sm: "h-4 gap-1 px-1.5 text-[10px] uppercase tracking-wide",
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
