import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Kbd — small raised key indicator. A milled steel keycap: glassy dark face,
 * hairline chrome rim, quiet raised shadow so it reads as a physical key.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 min-w-[1.25rem] items-center justify-center gap-1 rounded-md px-1.5",
        "font-mono text-[0.625rem] font-medium text-muted-foreground",
        "bg-card border border-white/10",
        "[box-shadow:var(--shadow-sm)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
