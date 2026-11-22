import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Amber Glass Input: recessed dark well sunk into the glass,
// amber glow on focus.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 rounded-lg px-3 py-2 text-sm",
          formFieldBase,
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
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
