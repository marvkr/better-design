import * as React from "react"

import { cn } from "@/lib/utils"

// Monochrome Industrial Input — flat surface, hairline border, sharp corners.
// Mono-font value text reads as "instrument panel" data entry.
// Focus = border becomes the accent red.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-none border border-[var(--mono-border-visible)] bg-[var(--mono-surface)] px-3 py-2",
          "font-[family-name:var(--font-mono)] text-[0.8125rem] text-foreground",
          "placeholder:font-[family-name:var(--font-mono)] placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-[0.6875rem] placeholder:text-muted-foreground",
          "transition-colors duration-fast ease-out",
          "hover:border-foreground/60",
          "focus-visible:outline-none focus-visible:border-[var(--mono-accent)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
