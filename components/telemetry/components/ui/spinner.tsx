import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Spinner: radar sweep. Dark ring with a signal-green
// sweeping arc and a faint green glow.

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-border border-t-primary",
        "shadow-[0_0_0.5rem_oklch(0.78_0.21_148/0.2)]",
        size === "sm" && "size-4",
        size === "default" && "size-6",
        size === "lg" && "size-8",
        className
      )}
      {...props}
    />
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
