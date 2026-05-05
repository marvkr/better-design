import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Notion Badge — multi-select / select tag style
// Extracted from live Notion workspace (table view, Tags column)
// No border, semi-transparent fills, 4px radius, 13px font, regular weight
// Palette: Engineering=gray, Product=yellow, Foundations=orange,
//          Misc/Post-mortem=pink, RFC=green, Data=purple

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[4px] font-normal transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        // gray — Engineering: rgba(42,28,0,0.07) bg
        default: "bg-[rgba(42,28,0,0.07)] text-foreground",
        // yellow — Product: rgba(209,156,0,0.28) bg
        secondary: "bg-[rgba(209,156,0,0.28)] text-[rgb(101,81,33)]",
        // pink — Misc / Post-mortem
        destructive: "bg-[rgba(212,76,81,0.15)] text-[rgb(147,55,82)]",
        // outline kept for composability
        outline: "border border-border text-foreground bg-transparent",
        // Named Notion palette variants
        orange: "bg-[rgba(196,88,0,0.2)] text-[rgb(106,66,34)]",
        green: "bg-[rgba(42,176,125,0.2)] text-[rgb(42,83,60)]",
        purple: "bg-[rgba(92,0,163,0.14)] text-[rgb(85,59,105)]",
        blue: "bg-[color-mix(in_oklch,var(--primary)_15%,transparent)] text-[rgb(24,82,161)]",
        pink: "bg-[rgba(212,76,81,0.15)] text-[rgb(147,55,82)]",
      },
      size: {
        sm: "h-[18px] gap-1 px-1.5 text-[11px]",
        default: "h-5 gap-1 px-1.5 text-[13px]",
        lg: "h-6 gap-1.5 px-2 text-sm",
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
