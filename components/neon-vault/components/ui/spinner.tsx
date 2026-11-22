import * as React from "react"
import { cn } from "@/lib/utils"

// Neon Vault Spinner: a circular loader whose sweeping arc carries the
// wallet's hot magenta over a faint graphite track.

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-2",
  xl: "h-8 w-8 border-[0.1875rem]",
}

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-border border-t-primary",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner }
export type { SpinnerProps }
