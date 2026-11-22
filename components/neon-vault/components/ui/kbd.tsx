import * as React from "react"

import { cn } from "@/lib/utils"

// Neon Vault Kbd: a raised graphite keycap with a soft bottom edge.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground [box-shadow:0_0.0625rem_0_oklch(0_0_0/0.4),inset_0_0.0625rem_0_oklch(1_0_0/0.07)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
