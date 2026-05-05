import * as React from "react"
import { cn } from "@/lib/utils"

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-[200px] flex-col items-center justify-center rounded-xl p-8 text-center",
      "border border-dashed border-white/10",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

export { Empty }
