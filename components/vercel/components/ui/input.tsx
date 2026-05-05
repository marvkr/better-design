import * as React from "react"

import { cn } from "@/lib/utils"

// Vercel / Geist Input — dark, pure black bg, #333 border
// Height: 32px (Geist md), 14px font, -0.006em tracking
// Focus: #888 border + very subtle white glow
// Transition: 150ms ease (snappy)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md bg-input px-3 py-1.5 text-[14px] tracking-[-0.006em] text-foreground",
          "border border-border",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          "hover:border-[rgba(255,255,255,0.3)]",
          "focus-visible:outline-none focus-visible:border-[#888]",
          "focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]",
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
