import * as React from "react"
import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"
import { MetalRing } from "./metal-ring"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ring?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ring = true, ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
    if (!ring) return input
    return <MetalRing shape="rect" block>{input}</MetalRing>
  }
)
Input.displayName = "Input"

export { Input }
