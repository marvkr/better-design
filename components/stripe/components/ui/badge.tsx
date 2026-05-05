import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Stripe Badge — rounded-full pills, 6px radius for rectangular variants
// Primary: indigo (#635BFF)
// Status colors match Stripe's semantic palette

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/10 text-primary",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/10 text-destructive",
        success: "bg-emerald-500 text-white",
        "success-light": "bg-emerald-50 text-emerald-700",
        warning: "bg-orange-100 text-orange-700",
        "warning-light": "bg-orange-50 text-orange-700",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[10px]",
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
