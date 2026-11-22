import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Electric Fintech Badge: rounded-full pills, text-xs.
// Status colors (success / warning) are explicit oklch greens/ambers tuned to read
// on the near-black ground; brand variants use the DS semantic tokens.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/10 text-[color:oklch(0.875_0.191_110)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.58_0.21_24)]",
        "destructive-light": "bg-destructive/19 text-[color:oklch(0.875_0.066_24)]",
        success:
          "[background:oklch(0.7_0.16_150)] [color:oklch(0.18_0.02_150)]",
        "success-light":
          "[background:oklch(0.7_0.16_150/0.14)] [color:oklch(0.78_0.15_150)]",
        warning:
          "[background:oklch(0.78_0.16_75)] [color:oklch(0.2_0.03_75)]",
        "warning-light":
          "[background:oklch(0.78_0.16_75/0.14)] [color:oklch(0.82_0.14_80)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        // Electric Fintech: sm=h-4 (16px), md=h-5 (20px), lg=h-6 (24px)
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
