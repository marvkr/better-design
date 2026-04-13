"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Midnight Glass Password Input: glass pill input with show/hide toggle

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-12 w-full px-5 py-2 pr-12 text-[15px]",
            "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
            "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
            "text-white/90 placeholder:text-white/40",
            "transition duration-300 ease-out",
            "hover:bg-white/[0.07] hover:border-white/[0.12]",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus-visible:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
        >
          {showPassword ? (
            <Icon icon="tabler:eye-off" className="h-4 w-4" />
          ) : (
            <Icon icon="tabler:eye" className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
