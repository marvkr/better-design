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
      "backdrop-blur-xl bg-white/[0.08]",
      "border border-white/10",
      "font-mono text-[0.625rem] font-medium text-muted-foreground",
      "shadow-[inset_0_0_0.25rem_oklch(1_0_0/0.06)]",
      className
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
