import * as React from "react"

import { cn } from "@/lib/utils"

// Input — dark developer platform aesthetic
// Dark bg, subtle border, green glow on focus (matches the green primary)
// Resting: slight inset shadow for depth
// Focus: green ring glow + border color shift to primary

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md bg-secondary px-3 py-2 text-sm text-foreground",
          "border border-border",
          "shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.15)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-border/70 hover:bg-secondary/80",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.1),0_0_0_0.1875rem_oklch(0.7629_0.1537_159.3645/0.2)]",
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
