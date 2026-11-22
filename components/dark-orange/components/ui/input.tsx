import * as React from "react"

import { cn } from "@/lib/utils"

// Sharp Dark Input — from the original site:
// Wrapper has rounded-[0.625rem] bg-background shadow-[0_0.0625rem_0.125rem_0_rgb(0_0_0/0.04)]
// Ring border via before: pseudo (ring-1 ring-inset ring-stroke-soft-200)
// Focus: before:ring-stroke-strong-950 + shadow-button-important-focus
// Input: h-10 px-3 bg-transparent text-foreground placeholder:text-muted-foreground

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[0.625rem] border border-border bg-background px-3 py-2 text-sm",
          "shadow-[0_0.0625rem_0.125rem_0_oklch(0_0_0/0.04)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "transition duration-base ease-out",
          "hover:border-foreground/30",
          "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[0_0_0_0.1875rem_oklch(0_0_0/0.06)]",
          "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
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
