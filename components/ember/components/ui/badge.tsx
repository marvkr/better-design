import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Amber Glass Badge: small glass chip (assignee pill / count badge treatment).

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-[var(--ag-blur)] bg-[var(--ag-fill)] text-foreground " +
          "border border-[color:var(--ag-border)] " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
        primary:
          "bg-primary/15 border border-[color:oklch(0.69_0.195_42/0.3)] shadow-[inset_0_0_0.5rem_oklch(0.69_0.195_42/0.12)] text-[color:oklch(0.875_0.069_40)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent",
        outline:
          "border border-[color:var(--ag-border-strong)] bg-transparent text-foreground",
        destructive:
          "bg-destructive/15 border border-[color:oklch(0.6_0.21_27/0.3)] text-[color:oklch(0.875_0.067_27)]",
        success:
          "bg-[oklch(0.72_0.15_155/0.14)] border border-[color:oklch(0.72_0.15_155/0.3)] text-[color:oklch(0.875_0.14_155)]",
        warning:
          "bg-[oklch(0.78_0.14_80/0.14)] border border-[color:oklch(0.78_0.14_80/0.3)] text-[color:oklch(0.875_0.12_82)]",
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
