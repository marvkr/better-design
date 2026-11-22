import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Dim status hues like the reference's "optimistic" mint label. No glow. */

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 text-sm",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        success: "text-[oklch(0.82_0.11_165)]",
        warning: "text-[oklch(0.85_0.1_85)]",
        destructive: "text-[oklch(0.78_0.14_22)]",
        info: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const dotVariants = cva(
  "h-2 w-2 rounded-full [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.25)]",
  {
    variants: {
      variant: {
        default: "bg-muted-foreground",
        success: "bg-[oklch(0.7_0.12_165)]",
        warning: "bg-[oklch(0.75_0.12_80)]",
        destructive: "bg-destructive",
        info: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
