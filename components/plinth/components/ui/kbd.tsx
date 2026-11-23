import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Plinth Kbd: a small graphite keycap. The graphite gradient and its top
 * catch-light make it read as a key resting in the panel.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-[0.3125rem] px-1.5",
        "font-mono text-[0.6875rem] font-medium leading-none text-secondary-foreground",
        "[background:var(--graphite-gradient)] [box-shadow:var(--shadow-button)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
