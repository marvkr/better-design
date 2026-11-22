import * as React from "react"
import { cn } from "@/lib/utils"

// Precision Kbd: keyboard shortcut chip. Crisp small radius, hairline border,
// muted surface with a 1px bottom edge for a tactile keycap feel.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-[0_0.0625rem_0_0_oklch(0.21_0.006_271/0.08)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
