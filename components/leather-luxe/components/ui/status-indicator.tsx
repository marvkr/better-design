import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Leather Luxe StatusIndicator: mint for healthy, cognac for info, warm
// amber and saddle red for trouble. Dots carry a faint matching halo.

const statusIndicatorVariants = cva("inline-flex items-center gap-2 text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      success: "text-mint",
      warning: "text-[oklch(0.78_0.14_75)]",
      destructive: "text-[oklch(0.72_0.14_28)]",
      info: "text-[oklch(0.7_0.11_55)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const dotVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      success: "bg-mint shadow-[0_0_0.375rem_oklch(0.85_0.12_162/0.45)]",
      warning:
        "bg-[oklch(0.78_0.14_75)] shadow-[0_0_0.375rem_oklch(0.78_0.14_75/0.45)]",
      destructive:
        "bg-[oklch(0.6_0.16_28)] shadow-[0_0_0.375rem_oklch(0.6_0.16_28/0.45)]",
      info: "bg-primary shadow-[0_0_0.375rem_oklch(0.55_0.115_52/0.45)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, variant, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusIndicatorVariants({ variant }), className)}
      {...props}
    >
      <span className={cn(dotVariants({ variant }))} />
      {children}
    </span>
  )
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }
