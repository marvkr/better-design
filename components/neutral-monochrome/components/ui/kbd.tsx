import * as React from "react"
import { cn } from "@/lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-md border border-border bg-card px-1.5 py-0.5",
          "text-[0.6875rem] font-mono font-medium text-muted-foreground",
          "shadow-[0_0.0625rem_0_0.0625rem_oklch(0.21561_0_0)] shadow-border/60",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

export { Kbd }
