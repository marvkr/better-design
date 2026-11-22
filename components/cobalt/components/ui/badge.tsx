import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Badge — small status chips like the spec's "In progress" / "Completed"
 * pills: quiet by default, the cobalt material for emphasis.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)]",
        secondary:
          "text-secondary-foreground border border-border [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]",
        outline: "border border-border text-muted-foreground",
        destructive:
          "bg-destructive/15 border border-destructive/30 text-[color:oklch(0.875_0.066_25)]",
        success:
          "bg-chart-2/15 border border-chart-2/30 text-[color:oklch(0.875_0.1_215)]",
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

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
