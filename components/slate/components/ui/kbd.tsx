import * as React from "react"
import { cn } from "@/lib/utils"

// Ops Sharp Kbd: a small key cap. Muted surface, hairline border, sharp
// rounded-md corner, a tight contact shadow, monospace label.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground [box-shadow:var(--shadow-xs)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
