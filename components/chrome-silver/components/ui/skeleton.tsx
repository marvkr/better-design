import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Skeleton — a recessed brushed well that pulses while content
 * loads. Sits inset in the surface like an empty steel slot.
 */

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-pulse rounded-md bg-muted [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
