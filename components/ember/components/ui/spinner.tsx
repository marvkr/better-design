import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Spinner: amber arc on a faint glass ring.

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[0.1875rem]",
  xl: "h-12 w-12 border-4",
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span
        className={cn(
          "animate-spin rounded-full",
          "border-[oklch(1_0_0/0.12)] border-t-primary",
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Loading</span>
    </div>
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
export type { SpinnerProps }
