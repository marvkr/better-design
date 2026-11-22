import * as React from "react"

import { cn } from "@/lib/utils"

// Neon Vault InputGroup: prefix/suffix addons merged into one recessed pill.
// Addons sit as graphite caps on the sunken track; focus lights the magenta
// ring around the whole group.

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
          // Outer container owns the border, inset shadow and pill radius
          "flex w-full items-stretch overflow-hidden",
          "rounded-full border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          "focus-within:border-ring/60 focus-within:ring-2 focus-within:ring-ring/40",
          "hover:border-ring/35",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:ring-destructive/30",
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
              "text-sm text-muted-foreground",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child: strip its own chrome since the parent owns it */}
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

        {/* Suffix addon */}
        {suffix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-l border-border bg-secondary px-3",
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
