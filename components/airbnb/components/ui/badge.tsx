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
        secondary: "bg-muted text-foreground border border-border",
        // Rausch accent
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/10 text-destructive",
        success: "bg-emerald-600 text-white",
        "success-light": "bg-emerald-600/10 text-emerald-700",
        warning: "bg-amber-500 text-white",
        "warning-light": "bg-amber-500/10 text-amber-700",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-[11px] font-semibold",
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
