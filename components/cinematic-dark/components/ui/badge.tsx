import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Cinema Badge — ultra-dark media streaming aesthetic
// Rounded-full, subtle treatments, restrained near-monochromatic palette
// Default: dark bg with border; Primary: white bg with dark text

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary/80 text-secondary-foreground border border-border/60",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/22 text-[color:oklch(0.875_0.067_27.2)]",
        success: "text-white bg-[color:oklch(0.546_0.119_162.5)]",
        "success-light": "bg-[color:oklch(0.696_0.17_162.5/0.14)] text-[color:oklch(0.875_0.177_163.2)]",
        warning: "text-white bg-[color:oklch(0.575_0.158_47.6)]",
        "warning-light": "bg-[color:oklch(0.705_0.213_47.6/0.15)] text-[color:oklch(0.875_0.079_55.9)]",
        outline: "border border-border text-foreground bg-transparent",
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
