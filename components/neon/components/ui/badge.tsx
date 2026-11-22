import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Dark Neon AI Badge: rounded-full pills. Neon green IS the success/positive
// color, so success and primary both read neon. All colors via semantic tokens.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground border border-border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-primary/10 text-primary",
        destructive: "text-destructive-foreground bg-[color:oklch(0.575_0.23_25)]",
        "destructive-light": "bg-destructive/21 text-[color:oklch(0.875_0.066_25)]",
        success: "bg-primary text-primary-foreground",
        "success-light": "bg-primary/10 text-primary",
        warning: "bg-primary/10 text-primary",
        "warning-light": "bg-primary/10 text-primary",
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
