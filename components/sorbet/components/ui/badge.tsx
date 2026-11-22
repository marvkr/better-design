import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Amie Pastel Badge — a soft rounded event chip, the way Amie tags calendar
 * categories. Filled with a soft pastel, deep-tinted text for readable contrast.
 * The five pastel hues (pink, blue, green, yellow, lavender) double as the
 * category palette; semantic variants map onto the closest pastel.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold " +
    "transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "text-secondary-foreground bg-[color:oklch(0.91_0.005_95)]",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-[color:oklch(0.912_0.005_95)] text-[color:oklch(0.5_0.015_285)]",
        outline: "bg-transparent text-foreground ring-1 ring-inset ring-border",
        pink: "bg-pastel-pink text-pastel-pink-foreground",
        blue: "bg-pastel-blue text-pastel-blue-foreground",
        green: "bg-pastel-green text-pastel-green-foreground",
        yellow: "bg-pastel-yellow text-pastel-yellow-foreground",
        lavender: "bg-pastel-lavender text-pastel-lavender-foreground",
        success: "bg-pastel-green text-pastel-green-foreground",
        warning: "bg-pastel-yellow text-pastel-yellow-foreground",
        destructive: "text-destructive-foreground bg-[color:oklch(0.57_0.15_18)]",
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
