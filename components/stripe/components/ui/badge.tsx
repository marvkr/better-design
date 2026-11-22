import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "text-primary bg-primary/14",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/13 text-[color:oklch(0.535_0.215_19.3)]",
        success: "bg-success text-primary-foreground",
        "success-light": "border border-success/20 bg-success-muted text-success-foreground",
        warning: "bg-warning text-[color:oklch(0.31_0.071_62)]",
        "warning-light": "border border-warning/20 bg-warning-muted text-warning-foreground",
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
