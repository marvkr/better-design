import * as React from "react"

import { cn } from "@/lib/utils"

// Notion Input — gray-filled, no visible border, 6px radius
// Extracted from live Notion: /Type to search input is gray-filled with no border
// Focus: blue ring rgba(35,131,226,0.35), 100ms transition

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-[6px] bg-[rgba(0,0,0,0.04)] px-2.5 py-1.5 text-sm text-foreground",
          "border-0 outline-none",
          "placeholder:text-muted-foreground",
          "transition-[box-shadow] duration-100 ease-in",
          "hover:bg-[rgba(0,0,0,0.06)]",
          "focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_rgba(35,131,226,0.35)]",
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
