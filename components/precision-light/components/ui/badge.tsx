import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Sharp Light Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs uppercase
// Variants: default (gray), primary (blue), destructive (red), success (green), warning (orange)
// Modes: filled, light

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-foreground border border-border bg-[color:oklch(0.905_0_187.1)]",
        primary: "bg-primary text-primary-foreground",
        secondary: "text-primary bg-primary/12",
        destructive: "text-destructive-foreground bg-[color:oklch(0.586_0.208_25.4)]",
        "destructive-light": "bg-destructive/17 text-[color:oklch(0.521_0.208_25.4)]",
        success: "text-white bg-[color:oklch(0.546_0.119_162.5)]",
        "success-light": "bg-[color:oklch(0.696_0.17_162.5/0.21)] text-[color:oklch(0.483_0.101_165.6)]",
        warning: "text-white bg-[color:oklch(0.575_0.158_47.6)]",
        "warning-light": "bg-[color:oklch(0.705_0.213_47.6/0.2)] text-[color:oklch(0.513_0.166_38.4)]",
        outline: "border text-foreground bg-transparent border-[color:oklch(0.904_0_187.1)]",
      },
      size: {
        // Sharp Light: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
