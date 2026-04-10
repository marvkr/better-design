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
        secondary: "bg-secondary text-muted-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        "destructive-light": "bg-destructive/20 text-destructive",
        success: "bg-emerald-500/20 text-emerald-400",
        "success-light": "bg-emerald-500/10 text-emerald-400",
        warning: "bg-orange-500/20 text-orange-400",
        "warning-light": "bg-orange-500/10 text-orange-400",
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
