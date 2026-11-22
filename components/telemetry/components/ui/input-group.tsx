import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room InputGroup: recessed well with fused prefix/suffix unit
// chips, like a value field labeled PSI or GPM.

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
          "flex w-full items-stretch overflow-hidden",
          "rounded-sm border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          "hover:border-ring/40",
          "focus-within:border-ring/70",
          "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.78_0.21_148/0.5),0_0_0.625rem_oklch(0.78_0.21_148/0.25)]",
          error && [
            "border-destructive/60",
            "focus-within:border-destructive",
            "focus-within:[box-shadow:var(--shadow-inset),0_0_0_0.0625rem_oklch(0.6_0.23_27/0.5),0_0_0.625rem_oklch(0.6_0.23_27/0.25)]",
          ],
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {/* Prefix addon */}
        {prefix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-r border-border bg-secondary px-3",
              "text-xs uppercase tracking-wider text-muted-foreground",
              "[&>svg]:size-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child */}
        <div
          className={cn(
            "flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:shadow-none",
            "[&_input]:focus-visible:border-0 [&_input]:focus-visible:shadow-none [&_input]:focus-visible:ring-0",
            "[&_input]:h-full [&_input]:w-full [&_input]:bg-transparent",
            "[&_input]:text-foreground [&_input]:placeholder:text-muted-foreground",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix addon */}
        {suffix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-l border-border bg-secondary px-3",
              "text-xs uppercase tracking-wider text-muted-foreground",
              "[&>svg]:size-4",
              size === "default" ? "h-9" : "h-8"
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
