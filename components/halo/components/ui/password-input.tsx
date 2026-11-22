"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Halo Password Input: translucent pill input with show/hide toggle

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
            "flex h-10 w-full px-3 py-2 pr-10 text-sm",
            "rounded-full border border-border backdrop-blur-xl bg-foreground/[0.06]",
            "shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent)]",
            "text-foreground/90 placeholder:text-foreground/40",
            "transition duration-base ease-out",
            "hover:bg-foreground/[0.08] hover:border-foreground/[0.15]",
            "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0.375rem_color-mix(in_oklch,var(--halo)_6%,transparent),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_20%,transparent)] focus-visible:border-primary/50",
            "disabled:cursor-not-allowed disabled:opacity-70",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 transition-colors hover:text-foreground/80"
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
