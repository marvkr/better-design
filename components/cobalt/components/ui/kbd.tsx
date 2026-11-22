import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Kbd — the spec's command-K hint chip beside the search well: a small
 * raised bezel key with the standard top inset highlight and drop.
 */

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center gap-1 rounded-sm px-1.5",
        "font-mono text-[0.625rem] font-medium text-muted-foreground",
        "border border-border [background-image:var(--bezel)]",
        "[box-shadow:var(--shadow-raised)]",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
