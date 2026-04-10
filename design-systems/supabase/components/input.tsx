import * as React from "react"

import { cn } from "@/lib/utils"

// Supabase Input — dark developer platform aesthetic
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
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          "hover:border-border/70 hover:bg-secondary/80",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_0_3px_hsl(153_60%_53%/0.2)]",
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
