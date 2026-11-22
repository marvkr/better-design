import * as React from "react"
import { cn } from "@/lib/utils"

// neon Kbd: keyboard shortcut display.
// Dark key cap: rounded-[0.375rem] border border-border bg-secondary, muted mono text,
// a faint top highlight so it reads as a physical key on the dark ground.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-[0.375rem] border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground [box-shadow:inset_0_0.0625rem_0_0_oklch(1_0_0_/_0.06),0_0.0625rem_0_0_oklch(0_0_0_/_0.4)]",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
