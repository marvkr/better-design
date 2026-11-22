import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Leather Luxe Badge: miniature material chips. Default is a small cognac
// leather pill; secondary is a raised charcoal chip like the wallet's
// utility buttons.

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5",
    "text-xs font-medium transition-[filter] duration-base",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background-image:var(--gradient-leather)] text-primary-foreground " +
          "border border-[oklch(0.68_0.115_58/0.55)] " +
          "[box-shadow:var(--shadow-leather-sm)]",
        secondary:
          "[background-image:var(--gradient-raised)] text-secondary-foreground " +
          "border border-highlight " +
          "[box-shadow:var(--shadow-raised-sm)]",
        destructive:
          "[background-image:linear-gradient(180deg,oklch(0.58_0.17_30),oklch(0.46_0.15_26))] " +
          "text-destructive-foreground border border-[oklch(0.62_0.16_30/0.5)] " +
          "[box-shadow:var(--shadow-raised-sm)]",
        outline:
          "bg-transparent text-foreground border border-highlight",
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
