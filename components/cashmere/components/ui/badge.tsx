import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Cashmere Badge — a soft rounded event chip, the way Cashmere tags calendar
 * categories. A soft pop-tint fill with deep readable text: playful accent chips.
 * The five vivid pop hues (blue, green, orange, yellow, purple) double as the
 * accent palette; semantic variants map onto the closest pop.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold " +
    "transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "text-secondary-foreground bg-[color:oklch(0.885_0.012_86)]",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-[color:oklch(0.885_0.009_86)] text-[color:oklch(0.48_0.009_80)]",
        outline: "bg-transparent text-foreground ring-1 ring-inset border-[color:oklch(0.885_0.009_85)]",
        orange: "bg-[color:oklch(0.89_0.05_40)] text-[color:oklch(0.5_0.175_35)]",
        blue: "text-pop-blue-foreground bg-[color:oklch(0.885_0.045_245)]",
        green: "text-pop-green-foreground bg-[color:oklch(0.88_0.06_150)]",
        yellow: "bg-[color:oklch(0.885_0.06_92)] text-[color:oklch(0.485_0.1_75)]",
        purple: "text-pop-purple-foreground bg-[color:oklch(0.89_0.05_292)]",
        success: "text-pop-green-foreground bg-[color:oklch(0.88_0.06_150)]",
        warning: "bg-[color:oklch(0.885_0.06_92)] text-[color:oklch(0.485_0.1_75)]",
        destructive: "text-destructive-foreground bg-[color:oklch(0.58_0.22_32)]",
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
