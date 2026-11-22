import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Retro-Playful Badge — chunky bordered poster chips in the full multi-hue set.
// Each hue from the source palette gets a filled + light variant. Borders are
// ink so the chips read as cut-out stickers.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border-2 border-border font-bold uppercase tracking-wide shadow-[var(--shadow-hard-sm)] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground",
        primary: "text-primary-foreground bg-[color:oklch(0.558_0.184_256.4)]",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "text-destructive-foreground bg-[color:oklch(0.585_0.226_27.3)]",
        "destructive-light": "bg-destructive/15 text-foreground",
        success: "bg-[oklch(0.6889_0.1644_152.71)] text-[oklch(0.2011_0.0146_271.15)]",
        "success-light": "bg-[oklch(0.6889_0.1644_152.71)]/20 text-foreground",
        warning: "bg-[oklch(0.7041_0.1885_47.62)] text-[oklch(0.2011_0.0146_271.15)]",
        "warning-light": "bg-[oklch(0.7041_0.1885_47.62)]/20 text-foreground",
        outline: "bg-transparent text-foreground",
      },
      size: {
        sm: "h-5 gap-1 px-1.5 text-[0.625rem]",
        default: "h-6 gap-1.5 px-2 text-xs",
        lg: "h-7 gap-1.5 px-2.5 text-xs",
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
