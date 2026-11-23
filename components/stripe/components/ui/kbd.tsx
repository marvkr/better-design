import * as React from "react"
import { cn } from "@/lib/utils"

// Kbd: keyboard shortcut display
// Style: rounded-md border border-border bg-secondary px-1.5 py-0.5 text-xs font-mono

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground [box-shadow:var(--shadow-control)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
