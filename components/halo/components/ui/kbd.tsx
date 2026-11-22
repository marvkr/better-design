import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md px-1.5",
      "backdrop-blur-xl bg-foreground/[0.08]",
      "border border-border",
      "font-mono text-[0.625rem] font-medium text-muted-foreground",
      "shadow-[inset_0_0_0.25rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
