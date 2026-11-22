import * as React from "react"
import { cn } from "@/lib/utils"

// Ledger Light InputGroup: input with prefix/suffix addons, visually merged inside border
// Addons share the same rounded container as the input
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
          // Outer container acts as the visible border+shadow container
          "flex w-full items-stretch overflow-hidden",
          "rounded-lg border border-border bg-input",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[color,box-shadow,border-color] duration-fast ease-out",
          "focus-within:border-ring focus-within:ring-[0.1875rem] focus-within:ring-ring/30",
          "hover:border-ring/35",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:shadow-[var(--shadow-destructive)]",
          ],
          disabled && "cursor-not-allowed bg-secondary opacity-70",
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
              size === "default" ? "h-10" : "h-9"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child: strip its own border/shadow/rounded since parent handles it */}
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
