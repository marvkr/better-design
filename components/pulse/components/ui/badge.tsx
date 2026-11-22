import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Pulseboard Badge: rounded-full, h-4/h-5/h-6, px-2, text-xs.
// Status hues read as solid chips on the dark board; *-light are tinted on dark.
// Variants: default, primary (violet), destructive (red), success (teal), warning (amber).

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/18 text-[color:oklch(0.875_0.067_293)]",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/20 text-[color:oklch(0.875_0.066_24)]",
        success:
          "bg-[oklch(0.72_0.15_165)] text-[oklch(0.16_0.02_165)]",
        "success-light":
          "bg-[oklch(0.72_0.15_165/0.15)] text-[color:oklch(0.875_0.14_165)]",
        warning:
          "bg-[oklch(0.78_0.16_75)] text-[oklch(0.18_0.03_75)]",
        "warning-light":
          "bg-[oklch(0.78_0.16_75/0.15)] text-[color:oklch(0.875_0.106_75)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Pulseboard: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
