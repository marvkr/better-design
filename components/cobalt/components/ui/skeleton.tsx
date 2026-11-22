import * as React from "react"

import { cn } from "@/lib/utils"

/* Skeleton — a recessed shimmer well, sunk like every other empty track. */

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-pulse rounded-md bg-input [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
