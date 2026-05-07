import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Kbd — small raised key indicator. Uses button shadow at a smaller scale
 * to look like a physical key.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 min-w-[20px] items-center justify-center gap-1 rounded px-1.5",
        "font-mono text-[10px] font-medium text-muted-foreground",
        "bg-card border border-border",
        "[box-shadow:var(--shadow-s)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
