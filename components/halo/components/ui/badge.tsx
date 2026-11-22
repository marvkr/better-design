import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Halo Badge — translucent pill
// Small translucent surfaces with inset glow

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-xl bg-foreground/[0.08] text-foreground " +
          "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_10%,transparent)]",
        primary:
          "backdrop-blur-xl bg-primary/20 shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--primary)_18%,transparent)] text-[color:oklch(0.875_0.062_256)]",
        signature:
          "backdrop-blur-xl bg-signature/20 shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--signature)_20%,transparent)] text-[color:oklch(0.875_0.076_52)]",
        secondary:
          "text-secondary-foreground bg-[color:oklch(0.97_0_194/0.08)]",
        destructive:
          "bg-destructive/20 text-[color:oklch(0.875_0.066_25)]",
        "destructive-light":
          "bg-destructive/20 text-[color:oklch(0.875_0.066_25)]",
        success:
          "bg-[color:oklch(0.696_0.17_162.48/0.2)] text-[color:oklch(0.875_0.177_163.2)]",
        "success-light":
          "bg-[color:oklch(0.696_0.17_162.5/0.13)] text-[color:oklch(0.875_0.177_163.2)]",
        warning:
          "bg-orange-500/20 text-[color:oklch(0.875_0.079_55.9)]",
        "warning-light":
          "bg-[color:oklch(0.705_0.213_47.6/0.14)] text-[color:oklch(0.875_0.079_55.9)]",
        outline:
          "border border-foreground/[0.15] text-foreground bg-transparent",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem] uppercase tracking-wide",
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
