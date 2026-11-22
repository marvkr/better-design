import * as React from "react"

import { cn } from "@/lib/utils"

// Library of Minds Input — dark flat, generous radius, subtle white focus
// No inset shadow (editorial flatness), clean minimal style

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full bg-input px-3 py-2 text-sm text-foreground",
          "border border-border",
          "rounded-[0.875rem]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-border/80",
          "focus-visible:outline-none focus-visible:border-foreground/20",
          "focus-visible:shadow-[0_0_0_0.1875rem_oklch(1_0_0/0.06)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
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
