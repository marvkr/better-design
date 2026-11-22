import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * InputGroup — one shared recessed well; prefix/suffix addons are raised
 * bezel caps fused to its ends, divided by quiet 1px borders.
 */

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
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
          "rounded-md border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/35",
          "hover:border-ring/30",
          error && "border-destructive/60 focus-within:border-destructive focus-within:ring-destructive/30",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {prefix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-r border-border px-3",
              "[background-image:var(--bezel)]",
              "text-sm text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        <div
          className={cn(
            "flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:shadow-none",
            "[&_input]:focus-visible:border-0 [&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none",
            "[&_input]:h-full [&_input]:w-full [&_input]:bg-transparent",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {suffix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-l border-border px-3",
              "[background-image:var(--bezel)]",
              "text-sm text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
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
