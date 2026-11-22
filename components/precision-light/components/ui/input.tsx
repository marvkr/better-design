import * as React from "react"

import { cn } from "@/lib/utils"

// Sharp Light Input — browser-extracted from the original site (2026)
// Search bar: bg=rgb(247,247,247), rounded-[0.5625rem], shadow=rgba(51,51,51,0.1) 0px 0px 0px 1px
// Border-less ring approach: outer 1px ring as box-shadow
// Focus: ring changes to blue #335cff + light glow

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[0.625rem] border-0 bg-input px-3 py-2 text-sm text-foreground",
          "shadow-[0_0_0_0.0625rem_oklch(0.3211_0_0/0.1)]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "transition duration-base ease-out",
          "hover:shadow-[0_0_0_0.0625rem_oklch(0.3211_0_0/0.2)]",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_0.0938rem_oklch(0.5547_0.2451_266.7061),0_0_0_0.25rem_oklch(0.5547_0.2451_266.7061/0.12)]",
          "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
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
