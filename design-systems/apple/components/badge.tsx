import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Apple Badge — pill-shaped (like Apple labels), minimal
// Default: light gray bg, very subtle
// Primary: blue (#0071e3)

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-normal tracking-[-0.022em] transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-[#f5f5f7] text-[#1d1d1f]",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-red-50 text-red-700",
        success: "bg-emerald-50 text-emerald-700",
        "success-light": "bg-emerald-50/50 text-emerald-700",
        warning: "bg-orange-50 text-orange-700",
        "warning-light": "bg-orange-50/50 text-orange-700",
        outline: "border border-border text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[10px]",
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
