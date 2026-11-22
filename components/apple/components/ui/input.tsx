import * as React from "react"

import { cn } from "@/lib/utils"

// Apple Input — light, white bg, 10px radius
// Border: 1px solid rgba(0,0,0,0.12)
// Focus: blue border + subtle blue glow
// Font: system-ui at 17px (Apple's standard body)
// Transition: 0.3s ease

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[2.75rem] w-full rounded-[0.625rem] bg-input px-4 py-2 text-[1.0625rem] leading-[1.47] tracking-[-0.022em] text-foreground",
          "border border-border",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-slow",
          "hover:border-[oklch(0_0_0/0.2)]",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_15%,transparent)]",
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
