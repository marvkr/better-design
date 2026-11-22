import * as React from "react"
import { cn } from "@/lib/utils"

// Editorial Warm Input — glass surface, faint top inset, terracotta focus ring.

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-2xl bg-input px-4 py-2",
          "[backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]",
          "shadow-[var(--shadow-glass)]",
          "font-sans text-sm text-foreground placeholder:text-foreground/40",
          "transition-shadow duration-base ease-out",
          "hover:shadow-[var(--shadow-glass-hover)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
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
