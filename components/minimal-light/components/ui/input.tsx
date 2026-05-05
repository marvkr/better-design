import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Input — browser-extracted from the original site (2026)
// Light theme: #f5f5f5 bg, border #d9d9d9, no shadow
// Search bar on site: rounded-full border, 34px height — for component library use 38px
// Focus: black ring (monochromatic), no shadow

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[38px] w-full rounded-xl border border-border bg-input px-4 py-2 text-sm",
          "text-foreground placeholder:text-muted-foreground",
          "transition-[border-color] duration-200 ease-out",
          "hover:border-border/60",
          "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-40",
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
