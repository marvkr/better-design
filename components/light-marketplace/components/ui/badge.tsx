import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "text-secondary-foreground border border-border bg-[color:oklch(0.882_0_166)]",
        primary:
          "bg-primary text-primary-foreground",
        outline:
          "border bg-transparent text-foreground border-[color:oklch(0.883_0_180)]",
        muted:
          "bg-[color:oklch(0.885_0_191.3)] text-[color:oklch(0.48_0_184.6)]",
      },
      size: {
        sm:      "rounded-full px-2 py-0.5 text-xs",
        default: "rounded-full px-2.5 py-0.5 text-xs",
        lg:      "rounded-full px-3 py-1 text-sm",
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
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
