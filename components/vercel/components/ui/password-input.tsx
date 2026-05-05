"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

// Vercel Password Input: input with show/hide toggle

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
            "flex h-10 w-full rounded-[10px] border border-border bg-background px-3 py-2 pr-10 text-sm",
            "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
            "placeholder:text-muted-foreground",
            "transition duration-200 ease-out",
            "hover:border-foreground/30",
            "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
            "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
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
