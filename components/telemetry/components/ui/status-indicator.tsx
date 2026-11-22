import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room StatusIndicator: lamp dot + label, like the SYSTEM / COMM /
// POWER / SAFETY lights in the console header. Each lamp glows in its
// signal color.

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 text-xs uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        success: "text-primary",
        warning: "text-(--warning)",
        destructive: "text-destructive",
        info: "text-(--info)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const dotVariants = cva("size-2 rounded-full", {
  variants: {
    variant: {
      default: "bg-muted-foreground",
      success: "bg-primary shadow-[0_0_0.5rem_oklch(0.78_0.21_148/0.6)]",
      warning: "bg-(--warning) shadow-[0_0_0.5rem_oklch(0.78_0.16_75/0.6)]",
      destructive: "bg-destructive shadow-[0_0_0.5rem_oklch(0.6_0.23_27/0.6)]",
      info: "bg-(--info) shadow-[0_0_0.5rem_oklch(0.7_0.13_235/0.6)]",
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
