import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room Badge: status tag.
// Square-cornered uppercase labels like NOM / WRN / CRIT readouts:
// tinted fill, matching signal-colored text, hairline border in the same hue.

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary/15 border border-primary/30 text-[color:oklch(0.875_0.21_148)]",
        primary:
          "bg-primary/15 border border-primary/30 text-[color:oklch(0.875_0.21_148)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        destructive:
          "bg-destructive/15 border border-destructive/35 text-[color:oklch(0.875_0.067_27)]",
        "destructive-light":
          "bg-destructive/10 border border-destructive/20 text-[color:oklch(0.875_0.067_27)]",
        success:
          "bg-primary/15 border border-primary/30 text-[color:oklch(0.875_0.21_148)]",
        "success-light":
          "bg-primary/10 border border-primary/20 text-[color:oklch(0.875_0.21_148)]",
        warning:
          "bg-(--warning)/15 border border-(--warning)/35 text-[color:oklch(0.875_0.106_75)]",
        "warning-light":
          "bg-(--warning)/10 border border-(--warning)/20 text-[color:oklch(0.875_0.106_75)]",
        info:
          "bg-(--info)/15 border border-(--info)/35 text-[color:oklch(0.875_0.072_235)]",
        outline:
          "border border-border text-muted-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
        default: "h-5 gap-1.5 px-2 text-[0.625rem]",
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
