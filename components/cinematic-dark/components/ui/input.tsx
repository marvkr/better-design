import * as React from "react"

import { cn } from "@/lib/utils"

// Cinema Input — ultra-dark media streaming aesthetic
// Dark bg, subtle border, white ring on focus
// Near-monochromatic, restrained, premium streaming platform feel

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[0.625rem] bg-input px-3 py-2 text-sm text-foreground",
          "border border-border",
          "shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.25)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-border/70",
          "focus-visible:outline-none focus-visible:border-foreground/30",
          "focus-visible:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.15),0_0_0_0.125rem_oklch(1_0_0/0.08)]",
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
