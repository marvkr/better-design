import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Kbd — a small raised key cap. It reuses the tile shadow at a tight scale so
 * the key reads as a calm, physical surface sitting gently proud of the page.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 min-w-[1.25rem] items-center justify-center gap-1 rounded-sm px-1.5",
        "font-mono text-[0.625rem] font-medium text-secondary-foreground",
        "bg-card border border-border",
        "[box-shadow:var(--shadow-tile)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
