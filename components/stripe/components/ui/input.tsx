import * as React from "react"

import { cn } from "@/lib/utils"

// Stripe Input — light, from Stripe Elements
// Border: 1px solid #E0E6EB
// Shadow: 0px 1px 1px rgba(0,0,0,0.03), 0px 3px 6px rgba(18,42,66,0.02)
// Focus: indigo border + 3px purple glow ring
// Radius: 4px (tighter than buttons)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded bg-input px-3 py-2 text-sm text-foreground",
          "border border-border",
          "shadow-[0px_1px_1px_rgba(0,0,0,0.03),0px_3px_6px_rgba(18,42,66,0.02)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-200 ease-out",
          "hover:border-border/70",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[0px_1px_1px_rgba(0,0,0,0.03),0px_3px_6px_rgba(18,42,66,0.02),0_0_0_3px_color-mix(in_oklch,var(--primary)_20%,transparent)]",
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
