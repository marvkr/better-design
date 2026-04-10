import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-border/30 border-t-primary",
  {
    variants: {
      size: {
        sm:      "h-4 w-4",
        default: "h-6 w-6",
        lg:      "h-8 w-8",
        xl:      "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({ className, size, label = "Loading...", ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <div className={cn(spinnerVariants({ size }))} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export { Spinner, spinnerVariants }
