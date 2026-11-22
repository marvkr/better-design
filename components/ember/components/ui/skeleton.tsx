import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Skeleton: shimmering glass placeholder.

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[var(--ag-fill-hover)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
