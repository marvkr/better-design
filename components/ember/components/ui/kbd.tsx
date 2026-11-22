import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Kbd: the search field's shortcut chip.

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5",
      "bg-[var(--ag-fill)] border border-[color:var(--ag-border)]",
      "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
      "font-sans text-[0.6875rem] font-semibold text-muted-foreground",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
