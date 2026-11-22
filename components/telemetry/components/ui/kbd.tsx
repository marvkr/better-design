import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Kbd: hardware key cap. Recessed dark chip with a hairline
// border, like a labeled key on the operator keyboard.

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-xs px-1.5",
        "bg-secondary border border-border",
        "text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground",
        "shadow-[inset_0_-0.0625rem_0_oklch(0_0_0/0.4)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
