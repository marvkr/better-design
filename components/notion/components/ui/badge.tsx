import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Badge — multi-select / select tag style
// Extracted from the live source workspace (table view, Tags column)
// No border, semi-transparent fills, 4px radius, 13px font, regular weight
// Palette: Engineering=gray, Product=yellow, Foundations=orange,
//          Misc/Post-mortem=pink, RFC=green, Data=purple

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[0.25rem] font-normal transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        // gray — Engineering: rgba(42,28,0,0.07) bg
        default: "text-foreground bg-[color:oklch(0.238_0.049_82.5/0.11)]",
        // yellow — Product: rgba(209,156,0,0.28) bg
        secondary: "bg-[oklch(0.7233_0.1484_84.11/0.28)] text-[oklch(0.445_0.0705_86.4861)]",
        // pink — Misc / Post-mortem
        destructive: "bg-[oklch(0.6032_0.1712_21.7649/0.15)] text-[oklch(0.4733_0.1261_5.08)]",
        // outline kept for composability
        outline: "border border-border text-foreground bg-transparent",
        // Named palette variants
        orange: "bg-[oklch(0.5868_0.1586_48.496/0.2)] text-[oklch(0.4188_0.0721_57.6729)]",
        green: "bg-[oklch(0.6747_0.1357_162.2691/0.2)] text-[oklch(0.405_0.0609_157.5864)]",
        purple: "bg-[oklch(0.3953_0.2109_300.0738/0.14)] text-[oklch(0.4018_0.0809_309.1777)]",
        blue: "bg-[color-mix(in_oklch,var(--primary)_15%,transparent)] text-[oklch(0.4485_0.1411_257.7056)]",
        pink: "bg-[oklch(0.6032_0.1712_21.7649/0.15)] text-[oklch(0.4733_0.1261_5.08)]",
      },
      size: {
        sm: "h-[1.125rem] gap-1 px-1.5 text-[0.6875rem]",
        default: "h-5 gap-1 px-1.5 text-[0.8125rem]",
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
