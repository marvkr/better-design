import * as React from "react"

import { cn } from "@/lib/utils"

// Linear Quality Input — extremely dark bg, purple focus glow
// Precise inset shadow for depth, purple ring on focus

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md bg-input px-3 py-2 text-sm text-foreground",
          "border border-border",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          "hover:border-border/80",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_0_0_3px_hsl(238_65%_65%/0.15)]",
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
