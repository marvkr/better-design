import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Column Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs uppercase
// Variants: default (gray), primary (blue), destructive (red), success (green), warning (orange)
// Modes: filled, light

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/16 text-[color:oklch(0.51_0.162_258.7)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.577_0.208_25.3)]",
        "destructive-light": "bg-destructive/16 text-[color:oklch(0.532_0.208_25.3)]",
        success: "text-white bg-[color:oklch(0.546_0.119_162.5)]",
        "success-light": "bg-[color:oklch(0.696_0.17_162.5/0.21)] text-[color:oklch(0.493_0.103_165.6)]",
        warning: "text-white bg-[color:oklch(0.575_0.158_47.6)]",
        "warning-light": "bg-[color:oklch(0.705_0.213_47.6/0.2)] text-[color:oklch(0.523_0.17_38.4)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Column: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
