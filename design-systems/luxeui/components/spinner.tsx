import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe Spinner: animated circle, white border-t on dark ring — clean and premium
// Sizes follow Luxe scale; track is always dim border color

const spinnerVariants = cva(
  "inline-block rounded-full border-2 border-border animate-spin",
  {
    variants: {
      size: {
        xs:      "h-3 w-3 border-[1.5px]",
        sm:      "h-4 w-4",
        default: "h-6 w-6 border-2",
        lg:      "h-8 w-8 border-[3px]",
        xl:      "h-12 w-12 border-[3px]",
      },
      variant: {
        default: "border-t-primary",
        muted:   "border-t-muted-foreground",
        white:   "border-t-white",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({ className, size, variant, label = "Loading…", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span className={cn(spinnerVariants({ size, variant }))} />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, spinnerVariants }
