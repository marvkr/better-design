import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Input: flat filled style with dark bg, no visible border, focus ring
// Matches Dynamic's default "flat" variant with rounded-xl

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl bg-secondary px-4 py-2 text-sm",
          "text-foreground placeholder:text-muted-foreground",
          "outline-none transition-[background,box-shadow] duration-150",
          "hover:bg-secondary/80",
          "focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
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
