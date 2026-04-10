import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl"
}

const sizeClasses = {
  sm:      "h-4 w-4 border-2",
  default: "h-6 w-6 border-2",
  lg:      "h-8 w-8 border-[3px]",
  xl:      "h-10 w-10 border-4",
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-block animate-spin rounded-full",
          "border-border border-t-foreground",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner }
