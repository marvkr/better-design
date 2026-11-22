import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Kanban Glass Badge — the board's category / priority labels.
// Soft-tinted pills in the board's multi-hue label palette (High / Medium / Low /
// Info / Grape), plus the indigo primary and neutral chips. Each colored variant
// is a low-alpha tint of its hue with a matching ink, the way the board's labels
// read on white cards.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-sm)] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Neutral chip
        default:
          "bg-secondary text-secondary-foreground border border-border",
        secondary:
          "bg-muted border border-border text-[color:oklch(0.535_0.012_262)]",
        // Indigo accent
        primary: "bg-primary text-primary-foreground",
        outline: "border text-foreground bg-transparent border-[color:oklch(0.905_0.004_250)]",
        // ── Board label hues ──
        high:
          "text-[color:var(--label-high-ink)] bg-[color:oklch(0.64_0.19_25/0.18)]",
        medium:
          "bg-[color:oklch(0.78_0.15_75/0.33)] text-[color:oklch(0.5_0.108_70)]",
        low:
          "text-[color:var(--label-low-ink)] bg-[color:oklch(0.7_0.13_158/0.26)]",
        info:
          "text-[color:var(--label-info-ink)] bg-[color:oklch(0.62_0.15_252/0.19)]",
        grape:
          "text-[color:var(--label-grape-ink)] bg-[color:oklch(0.58_0.18_302/0.17)]",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-[0.6875rem] font-semibold",
        default: "h-6 gap-1.5 px-2.5 text-xs",
        lg: "h-7 gap-1.5 px-3 text-sm",
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
