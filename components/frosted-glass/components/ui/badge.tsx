import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Frosted Glass Badge — frosted glass pill. Default is the light glass chip;
// primary tints the glass with the violet accent; status variants use tinted glass.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[oklch(1_0_0/0.08)] text-foreground " +
          "shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.4)]",
        primary:
          "backdrop-blur-[var(--fg-blur)] backdrop-saturate-150 bg-[oklch(0.8_0.13_285/0.22)] shadow-[inset_0_0.0625rem_0_-0.0313rem_oklch(1_0_0/0.35)] text-[color:oklch(0.875_0.064_285)]",
        secondary: "text-secondary-foreground bg-[color:oklch(1_0_201.8/0.08)]",
        destructive: "bg-[oklch(0.62_0.21_18/0.22)] text-[color:oklch(0.875_0.067_18)]",
        "destructive-light": "bg-[color:oklch(0.62_0.21_18/0.19)] text-[color:oklch(0.875_0.067_18)]",
        success: "bg-[oklch(0.7_0.15_160/0.22)] text-[color:oklch(0.875_0.15_160)]",
        "success-light": "bg-[oklch(0.7_0.15_160/0.12)] text-[color:oklch(0.875_0.15_160)]",
        warning: "bg-[oklch(0.72_0.16_60/0.22)] text-[color:oklch(0.875_0.083_60)]",
        "warning-light": "bg-[oklch(0.72_0.16_60/0.12)] text-[oklch(0.82_0.15_60)]",
        outline:
          "border border-[color:var(--fg-border)] text-foreground bg-transparent",
      },
      size: {
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
