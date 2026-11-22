import * as React from "react"
import { cn } from "@/lib/utils"

// Retro-Playful Kbd: keyboard shortcut display
// Style: rounded-md border-2 border-border bg-secondary px-1.5 py-0.5 text-xs font-mono

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md border-2 border-border bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-[var(--shadow-hard-sm)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
