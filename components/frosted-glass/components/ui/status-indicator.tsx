import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 text-sm",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        success: "text-emerald-400",
        warning: "text-orange-400",
        destructive: "text-destructive",
        info: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const dotVariants = cva(
  "h-2 w-2 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted-foreground",
        success: "bg-emerald-400 shadow-[0_0_0.375rem_oklch(0.765_0.177_163.223/0.4)]",
        warning: "bg-orange-400 shadow-[0_0_0.375rem_oklch(0.75_0.183_55.934/0.4)]",
        destructive: "bg-destructive shadow-[0_0_0.375rem_oklch(0.637_0.237_25.331/0.4)]",
        info: "bg-primary shadow-[0_0_0.375rem_oklch(1_0_0/0.4)]",
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
