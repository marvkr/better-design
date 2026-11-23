import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Badge: a small readout chip, set in Geist Mono caps like the
 * editor's parameter labels. Neutral chips are graphite wells; status chips
 * take a deep tint of their own hue and a ring in that hue.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 " +
    "font-mono text-[0.6875rem] font-medium uppercase leading-4 " +
    "ring-1 ring-inset transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground ring-[oklch(1_0_0/0.12)]",
        primary:
          "bg-primary text-primary-foreground " +
          "ring-[oklch(0.5_0.16_39)]",
        secondary: "bg-input text-muted-foreground ring-[oklch(1_0_0/0.1)]",
        outline: "bg-transparent text-foreground ring-[oklch(1_0_0/0.18)]",
        success:
          "bg-[oklch(0.3_0.07_150)] ring-[oklch(0.55_0.13_150)] text-[color:oklch(0.88_0.13_150)]",
        warning:
          "bg-[oklch(0.32_0.07_75)] ring-[oklch(0.62_0.13_75)] text-[color:oklch(0.88_0.11_85)]",
        destructive:
          "bg-[oklch(0.3_0.09_25)] ring-[oklch(0.58_0.17_25)] text-[color:oklch(0.88_0.07_25)]",
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
