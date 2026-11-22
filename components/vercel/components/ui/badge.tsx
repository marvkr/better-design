import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Vercel / Geist Badge — minimal, monochromatic
// Default: dark secondary bg with subtle border
// Primary: white bg, black text (inverted on dark)

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-[-0.006em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-[color:oklch(0.634_0_166)]",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/25 text-[color:oklch(0.875_0.067_28.5)]",
        success: "bg-[color:oklch(0.696_0.17_162.48/0.2)] text-[color:oklch(0.875_0.177_163.2)]",
        "success-light": "bg-[color:oklch(0.696_0.17_162.5/0.16)] text-[color:oklch(0.875_0.177_163.2)]",
        warning: "bg-orange-500/20 text-[color:oklch(0.875_0.079_55.9)]",
        "warning-light": "bg-[color:oklch(0.705_0.213_47.6/0.17)] text-[color:oklch(0.875_0.079_55.9)]",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
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
