import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Leather Luxe InputGroup: a single recessed well with seamed prefix and
// suffix compartments, like card slots in a wallet.

interface InputGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: "default" | "sm"
  disabled?: boolean
  error?: boolean
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      prefix,
      suffix,
      size = "default",
      disabled,
      error,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          formFieldBase,
          "flex items-stretch overflow-hidden p-0",
          "focus-within:border-primary/60 focus-within:[box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.55_0.115_52/0.25)]",
          error &&
            "border-destructive focus-within:border-destructive focus-within:[box-shadow:var(--shadow-well),0_0_0_0.1875rem_oklch(0.52_0.16_28/0.25)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {/* Prefix compartment */}
        {prefix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-r border-border px-3",
              "text-sm text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-10" : "h-9"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Field child */}
        <div
          className={cn(
            "flex-1 [&_input]:border-0 [&_input]:shadow-none [&_input]:rounded-none",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none [&_input]:focus-visible:border-0",
            "[&_input]:h-full [&_input]:w-full [&_input]:bg-transparent",
            "[&_input]:text-foreground [&_input]:placeholder:text-muted-foreground/70",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix compartment */}
        {suffix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-l border-border px-3",
              "text-sm text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-10" : "h-9"
            )}
          >
            {suffix}
          </div>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup }
export type { InputGroupProps }
