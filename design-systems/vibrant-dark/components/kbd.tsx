import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Kbd: keyboard key chip, dark bg with subtle border

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[]
}

function Kbd({ keys, children, className, ...props }: KbdProps) {
  const content = keys ? keys.join("+") : children
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center gap-1",
        "rounded-lg border border-border bg-secondary px-1.5 py-0.5",
        "font-mono text-xs text-secondary-foreground",
        "shadow-[0_2px_0_0_hsl(var(--border))]",
        className
      )}
      {...props}
    >
      {content}
    </kbd>
  )
}

export { Kbd }
export type { KbdProps }
