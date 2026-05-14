import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-[6px] px-1.5",
      "bg-muted text-muted-foreground",
      "border border-border",
      "font-mono text-[10px] font-medium",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
