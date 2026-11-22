import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Clay Product Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs uppercase
// Variants: default (gray), primary (blue), destructive (red), success (green), warning (orange)
// Modes: filled, light

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "text-primary-foreground bg-[color:oklch(0.56_0.188_256)]",
        secondary: "bg-primary/17 text-[color:oklch(0.495_0.169_256)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.58_0.2_26)]",
        "destructive-light": "bg-destructive/17 text-[color:oklch(0.515_0.2_26)]",
        success: "text-[oklch(0.99_0.01_150)] bg-[color:oklch(0.54_0.149_150)]",
        "success-light": "bg-[color:oklch(0.7_0.16_150/0.26)] text-[color:oklch(0.475_0.13_150)]",
        warning: "bg-[oklch(0.75_0.16_70)] text-[oklch(0.25_0.05_70)]",
        "warning-light": "bg-[color:oklch(0.75_0.16_70/0.28)] text-[color:oklch(0.5_0.111_66)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Clay Product: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
