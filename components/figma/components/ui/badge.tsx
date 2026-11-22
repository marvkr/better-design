import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma Badge — light, pill-shaped, Electric Violet primary (#a259ff)
// Light theme matches figma.com marketing site

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/10 text-primary",
        destructive: "text-destructive-foreground bg-[color:oklch(0.586_0.208_25.4)]",
        "destructive-light": "bg-red-100 text-red-700",
        success: "bg-[color:oklch(0.753_0.175_158/0.26)] text-[color:oklch(0.498_0.118_157.5)]",
        "success-light": "bg-[color:oklch(0.753_0.175_158/0.26)] text-[color:oklch(0.498_0.118_157.5)]",
        warning: "bg-[color:oklch(0.929_0.038_75.2)] text-[color:oklch(0.528_0.171_38.4)]",
        "warning-light": "bg-[color:oklch(0.93_0.016_73.7)] text-[color:oklch(0.528_0.171_38.4)]",
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
