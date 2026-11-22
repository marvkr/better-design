import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe Empty: a stitched outline marks the unfilled slot.

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-[12.5rem] flex-col items-center justify-center rounded-lg p-8 text-center",
      "border border-dashed border-highlight",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

export { Empty }
