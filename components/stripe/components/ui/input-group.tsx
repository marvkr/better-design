import * as React from "react"
import { cn } from "@/lib/utils"

// InputGroup: input with prefix/suffix addons, visually merged inside border
// Addons share the same rounded-[0.625rem] container as the input
// Prefix/suffix: bg-secondary border-r/l border-border, text-muted-foreground

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
          "rounded-md bg-input [box-shadow:var(--shadow-control)]",
          "transition-[box-shadow] duration-fast",
          "focus-within:[box-shadow:var(--shadow-focus)]",
          "hover:[box-shadow:var(--shadow-control-hover)]",
          error && [
            "[box-shadow:var(--shadow-destructive-control)]",
            "hover:[box-shadow:var(--shadow-destructive-control)]",
            "focus-within:[box-shadow:var(--shadow-destructive-focus)]",
          ],
          disabled && "cursor-not-allowed bg-secondary opacity-70",
          size === "sm" && "rounded-lg",
          className
        )}
        {...props}
      >
        {/* Prefix addon */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center border-r border-border bg-secondary px-3",
              "text-sm text-muted-foreground select-none shrink-0",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child — strip its own border/shadow/rounded since parent handles it */}
        <div
          className={cn(
            "flex-1 [&_input]:border-0 [&_input]:shadow-none [&_input]:rounded-none",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none [&_input]:focus-visible:border-0",
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
              "flex items-center justify-center border-l border-border bg-secondary px-3",
              "text-sm text-muted-foreground select-none shrink-0",
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
