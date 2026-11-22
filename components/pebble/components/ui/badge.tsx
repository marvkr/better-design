import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Airbnb Badge — extracted from airbnb.com (2026-04)
// "Guest favorite" badge: white text, semi-transparent dark bg, rounded-full, px-2
// Default badges: pill shape, light bg, medium weight text

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Guest favorite — white on dark overlay
        default: "bg-foreground text-background",
        // Light subtle — Airbnb's category pills
        secondary: "text-foreground border border-border bg-[color:oklch(0.881_0.01_299.2)]",
        // Rausch accent
        primary: "bg-primary text-primary-foreground",
        destructive: "text-destructive-foreground bg-[color:oklch(0.59_0.237_20.4)]",
        "destructive-light": "bg-destructive/15 text-[color:oklch(0.5_0.201_20.4)]",
        success: "text-white bg-[color:oklch(0.546_0.118_163.2)]",
        "success-light": "bg-[color:oklch(0.596_0.145_163.2/0.18)] text-[color:oklch(0.463_0.097_165.6)]",
        warning: "text-white bg-[color:oklch(0.569_0.123_70.1)]",
        "warning-light": "bg-[color:oklch(0.769_0.188_70.1/0.31)] text-[color:oklch(0.485_0.13_49)]",
        outline: "border text-foreground bg-transparent border-[color:oklch(0.878_0.012_301.3)]",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-[0.6875rem] font-semibold",
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
