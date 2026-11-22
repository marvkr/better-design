import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Liquid Glass Badge: fully-rounded pill. Secondary is a frosted glass chip
// (translucent secondary token + backdrop-blur + light edge).

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-normal tracking-[-0.022em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-[color:oklch(0.915_0.002_247)] text-[color:oklch(0.5_0.012_252)]",
        primary: "text-primary-foreground bg-[color:oklch(0.558_0.14_245)]",
        secondary: "text-secondary-foreground backdrop-blur-md border border-[oklch(1_0_0/0.6)] bg-[color:oklch(0.915_0.001_247)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.585_0.21_25)]",
        "destructive-light": "text-[color:oklch(0.505_0.213_27.518)] bg-[color:oklch(0.915_0.013_17.4)]",
        success: "bg-[color:oklch(0.91_0.021_166.1)] text-[color:oklch(0.488_0.102_165.6)]",
        "success-light": "bg-[color:oklch(0.91_0.011_166.4)] text-[color:oklch(0.488_0.102_165.6)]",
        warning: "bg-[color:oklch(0.915_0.016_73.7)] text-[color:oklch(0.518_0.168_38.4)]",
        "warning-light": "bg-[color:oklch(0.915_0.008_73.7)] text-[color:oklch(0.518_0.168_38.4)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
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
