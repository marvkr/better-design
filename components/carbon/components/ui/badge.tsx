import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Glassmorphic Badge — frosted glass pill
// Small glass surfaces with inset glow

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "backdrop-blur-xl bg-white/[0.08] text-foreground " +
          "shadow-[inset_0_0_0.375rem_oklch(1_0_0/0.1)]",
        primary:
          "backdrop-blur-xl shadow-[inset_0_0_0.375rem_oklch(0.65_0.19_250/0.15)] bg-primary/75 text-[color:oklch(0.952_0_179.2)]",
        secondary:
          "text-secondary-foreground bg-[color:oklch(1_0_0/0.07)]",
        destructive:
          "bg-[color:oklch(0.426_0.09_12.5)] text-[color:oklch(0.875_0.066_19.8)]",
        "destructive-light":
          "bg-[color:oklch(0.426_0.09_12.5)] text-[color:oklch(0.875_0.066_19.8)]",
        success:
          "bg-[color:oklch(0.37_0.055_179.4)] text-[color:oklch(0.875_0.177_163.2)]",
        "success-light":
          "bg-[color:oklch(0.382_0.061_177.6)] text-[color:oklch(0.875_0.177_163.2)]",
        warning:
          "bg-[color:oklch(0.401_0.077_58.6)] text-[color:oklch(0.875_0.079_55.9)]",
        "warning-light":
          "bg-[color:oklch(0.401_0.077_58.6)] text-[color:oklch(0.875_0.079_55.9)]",
        outline:
          "border border-white/[0.15] text-foreground bg-transparent",
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
