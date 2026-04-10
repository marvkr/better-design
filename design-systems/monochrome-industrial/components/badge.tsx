import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Monochrome Industrial Badge — sharp rectangle, Space Mono ALL CAPS, hairline border.
// Status colors apply to the FILL, not the surrounding row.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none font-[family-name:var(--font-mono)] uppercase tracking-[0.1em] border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--mono-accent)] focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground border-[var(--mono-border-visible)]",
        primary:
          "bg-primary text-primary-foreground border-primary",
        secondary:
          "bg-[var(--mono-surface-raised)] text-foreground border-[var(--mono-border-visible)]",
        destructive:
          "bg-[var(--mono-accent)] text-white border-[var(--mono-accent)]",
        "destructive-light":
          "bg-transparent text-[var(--mono-accent)] border-[var(--mono-accent)]",
        success:
          "bg-[var(--mono-success)] text-white border-[var(--mono-success)]",
        "success-light":
          "bg-transparent text-[var(--mono-success)] border-[var(--mono-success)]",
        warning:
          "bg-[var(--mono-warning)] text-black border-[var(--mono-warning)]",
        "warning-light":
          "bg-transparent text-[var(--mono-warning)] border-[var(--mono-warning)]",
        outline:
          "bg-transparent text-foreground border-[var(--mono-border-visible)]",
      },
      size: {
        sm:      "h-4 gap-1   px-1.5 text-[9px]",
        default: "h-5 gap-1.5 px-2   text-[10px]",
        lg:      "h-6 gap-1.5 px-2.5 text-[11px]",
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
