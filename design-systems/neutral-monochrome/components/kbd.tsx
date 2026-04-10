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
          "text-[11px] font-mono font-medium text-muted-foreground",
          "shadow-[0_1px_0_1px_hsl(0_0%_10%)] shadow-border/60",
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
