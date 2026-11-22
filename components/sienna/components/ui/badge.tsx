import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Compact mono labels for issues, values, and specimen metadata. */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium tracking-tight " +
    "transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "text-secondary-foreground bg-[color:oklch(0.925_0_190.3)]",
        primary: "text-primary-foreground bg-[color:oklch(0.575_0.159_47)]",
        secondary: "bg-[color:oklch(0.925_0.001_90)] text-[color:oklch(0.51_0_175.6)]",
        outline: "bg-transparent text-foreground ring-1 ring-inset ring-border",
        orange: "bg-pop-orange text-pop-orange-foreground",
        blue: "bg-pop-blue text-pop-blue-foreground",
        green: "bg-pop-green text-pop-green-foreground",
        yellow: "text-pop-yellow-foreground bg-[color:oklch(0.925_0.07_95.1)]",
        purple: "bg-pop-purple text-pop-purple-foreground",
        success: "bg-pop-green text-pop-green-foreground",
        warning: "text-pop-yellow-foreground bg-[color:oklch(0.925_0.07_95.1)]",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
