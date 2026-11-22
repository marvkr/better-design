import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe Kbd: a tiny raised keycap with a top sheen.

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-xs px-1.5",
      "[background-image:var(--gradient-raised)] border border-highlight",
      "[box-shadow:var(--shadow-raised-sm)]",
      "font-mono text-[0.625rem] font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
