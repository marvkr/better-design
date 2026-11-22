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
        success: "bg-emerald-400 shadow-[0_0_0.375rem_oklch(0.7729_0.1535_163.2231/0.4)]",
        warning: "bg-orange-400 shadow-[0_0_0.375rem_oklch(0.7576_0.159_55.9344/0.4)]",
        destructive: "bg-destructive shadow-[0_0_0.375rem_oklch(0.6368_0.2078_25.3313/0.4)]",
        info: "bg-primary shadow-[0_0_0.375rem_oklch(0.65_0.19_250/0.4)]",
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
