import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Ledger Light Badge — the dashboard's pill chips: soft-tinted success/loss
// deltas and outline status pills. Semantic tokens only.

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-colors duration-fast",
    "focus:outline-none focus:ring-[0.1875rem] focus:ring-ring/30",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground dark:bg-[color:oklch(0.57_0.19_264)]",
        secondary: "text-secondary-foreground bg-[color:oklch(0.905_0.004_256)] dark:text-[color:oklch(0.495_0.004_256)]",
        outline: "border bg-transparent text-foreground border-[color:oklch(0.905_0.004_256)]",
        destructive: "bg-destructive text-destructive-foreground dark:bg-[color:oklch(0.585_0.2_25)]",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
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
