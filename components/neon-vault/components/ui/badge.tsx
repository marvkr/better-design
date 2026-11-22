import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Neon Vault Badge: pill chips like the wallet's "Manage address" tag.
// Default is a raised graphite chip; primary glows magenta; light variants are
// tinted washes of the same hue on the dark canvas.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground border border-border [box-shadow:var(--shadow-raised)]",
        primary:
          "bg-primary [background-image:var(--gradient-primary)] text-primary-foreground [box-shadow:var(--shadow-button)]",
        secondary: "bg-primary/18 text-[color:oklch(0.875_0.079_350)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.57_0.21_22)]",
        "destructive-light": "bg-destructive/19 text-[color:oklch(0.875_0.066_22)]",
        success: "bg-chart-5 text-background",
        "success-light": "bg-chart-5/15 text-[color:oklch(0.875_0.084_345)]",
        warning: "bg-chart-3 text-background",
        "warning-light": "bg-chart-3/15 text-[color:oklch(0.875_0.136_85)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem] uppercase tracking-wide",
        default: "h-5 gap-1.5 px-2.5 text-xs",
        lg: "h-6 gap-1.5 px-3 text-xs",
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
