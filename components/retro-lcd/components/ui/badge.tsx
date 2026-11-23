import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Badge — extracted from airbnb.com (2026-04)
// "Guest favorite" badge: white text, semi-transparent dark bg, rounded-full, px-2
// Default badges: pill shape, light bg, medium weight text

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Guest favorite — white on dark overlay
        default: "bg-foreground text-background",
        // Light subtle — category pills
        secondary: "bg-muted text-foreground border border-border",
        // Rausch accent
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/22 text-[color:oklch(0.3_0.123_28)]",
        success: "text-[oklch(0.97_0.02_150)] bg-[color:oklch(0.525_0.13_150)]",
        "success-light": "bg-[color:oklch(0.55_0.13_150/0.34)] text-[color:oklch(0.275_0.076_150)]",
        warning: "text-[oklch(0.28_0.06_85)] bg-[color:oklch(0.665_0.136_85)]",
        "warning-light": "bg-[color:oklch(0.657_0.053_107.3)] text-[color:oklch(0.285_0.058_85)]",
        outline: "border border-border text-foreground bg-transparent",
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
