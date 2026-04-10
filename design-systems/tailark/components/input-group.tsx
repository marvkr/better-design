import * as React from "react"
import { cn } from "@/lib/utils"

// Earthy InputGroup: dark neutral, rounded-lg, border-border, bg-secondary
// Addons: slightly lighter bg, divider border; no glows
// Focus: white ring-1 (ring = white in Earthy)

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
          "rounded-lg border border-border bg-secondary",
          "transition-colors duration-150",
          "hover:border-border/60",
          "focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0",
          error && "border-destructive focus-within:ring-destructive",
          disabled && "cursor-not-allowed opacity-50",
          size === "sm" && "rounded-md",
          className
        )}
        {...props}
      >
        {/* Prefix */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center px-3 shrink-0",
              "bg-accent border-r border-border",
              "text-muted-foreground select-none text-sm",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9"
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
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix */}
        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center px-3 shrink-0",
              "bg-accent border-l border-border",
              "text-muted-foreground select-none text-sm",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-8" : size === "lg" ? "h-10" : "h-9"
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
