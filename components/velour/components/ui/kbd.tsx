import * as React from "react"
import { cn } from "@/lib/utils"

/* The raised key chip from the reference's command palette footer. */

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm px-1.5",
      "[background-image:var(--velour-raised)]",
      "font-mono text-[0.625rem] font-medium text-muted-foreground",
      "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.08),inset_0_-0.0625rem_0_oklch(0_0_0/0.35),0_0.0625rem_0.125rem_oklch(0_0_0/0.4)]",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
