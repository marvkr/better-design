import * as React from "react"
import { cn } from "@/lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "default" | "lg"
}

const sizeClasses = {
  sm:      "px-1.5 py-0.5 text-xs min-w-[1.25rem]",
  default: "px-2 py-1 text-xs min-w-[1.5rem]",
  lg:      "px-2.5 py-1.5 text-sm min-w-[1.75rem]",
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-mono font-medium",
          "bg-secondary text-secondary-foreground",
          "border border-border border-b-2",
          "select-none",
          sizeClasses[size],
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
