import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Editorial Warm Badge — mono label on a small glass pill. Uses --glass-* tokens.

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "font-mono uppercase tracking-[0.06em] transition-colors duration-base",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-foreground/70 shadow-[var(--shadow-glass)] bg-[color:oklch(0.89_0.008_80)]",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/95",
        outline:
          "border bg-transparent text-foreground/70 border-[color:oklch(0.891_0.013_80)]",
        muted:
          "shadow-[var(--shadow-glass)] bg-[color:oklch(0.89_0.01_80)] text-[color:oklch(0.265_0.012_55)]",
      },
      size: {
        sm:      "h-4 px-2 text-[0.5625rem]",
        default: "h-5 px-2.5 text-[0.625rem]",
        lg:      "h-6 px-3 text-[0.6875rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
