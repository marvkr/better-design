import * as React from "react"
import { cn } from "@/lib/utils"

// Energetic InputGroup: light marketplace, rounded-[14px], NO shadows, NO extra borders
// Addons: bg-secondary (#f0f0f0) flat, slight tonal separation
// Focus: ring-1 ring-ring (charcoal ring) only

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: "sm" | "default" | "lg"
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
          "rounded-[14px] bg-background",
          "ring-1 ring-inset ring-border",
          "transition-colors duration-150",
          "focus-within:ring-2 focus-within:ring-ring",
          error && "ring-destructive focus-within:ring-destructive",
          disabled && "cursor-not-allowed opacity-50 bg-secondary",
          size === "sm" && "rounded-xl",
          className
        )}
        {...props}
      >
        {/* Prefix */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center px-3.5 shrink-0",
              "bg-secondary text-muted-foreground select-none",
              "text-sm font-medium",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-9" : size === "lg" ? "h-12" : "h-11"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input slot */}
        <div
          className={cn(
            "flex-1",
            "[&_input]:border-0 [&_input]:bg-transparent [&_input]:shadow-none",
            "[&_input]:rounded-none [&_input]:ring-0",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none",
            "[&_input]:focus-visible:border-0",
            "[&_input]:h-full [&_input]:w-full",
            "[&_input]:text-foreground [&_input]:placeholder:text-muted-foreground",
            "[&_input]:font-medium",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix */}
        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center px-3.5 shrink-0",
              "bg-secondary text-muted-foreground select-none",
              "text-sm font-medium",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-9" : size === "lg" ? "h-12" : "h-11"
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
