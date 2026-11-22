import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Sharp Dark Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs uppercase
// Variants: default (gray), primary (blue), destructive (red), success (green), warning (orange)
// Modes: filled, light

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-foreground border border-border bg-[color:oklch(0.285_0_180)]",
        primary: "text-primary-foreground bg-[color:oklch(0.582_0.202_35.5)]",
        secondary: "bg-primary/15 text-[color:oklch(0.875_0.068_35.5)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.587_0.229_22.6)]",
        "destructive-light": "bg-destructive/17 text-[color:oklch(0.875_0.066_22.6)]",
        success: "text-white bg-[color:oklch(0.546_0.119_162.5)]",
        "success-light": "bg-[color:oklch(0.696_0.17_162.5/0.12)] text-[color:oklch(0.875_0.118_165.6)]",
        warning: "text-white bg-[color:oklch(0.575_0.158_47.6)]",
        "warning-light": "bg-[color:oklch(0.705_0.213_47.6/0.13)] text-[color:oklch(0.875_0.069_38.4)]",
        outline: "border text-foreground bg-transparent border-[color:oklch(0.285_0_180)]",
      },
      size: {
        // Sharp Dark: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
