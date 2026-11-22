import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Empty: dashed standby frame for a panel with no data feed.

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-[12.5rem] flex-col items-center justify-center rounded-md p-8 text-center",
      "border border-dashed border-border",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

export { Empty }
