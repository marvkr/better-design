import * as React from "react"
import { cn } from "@/lib/utils"

// Precision InputGroup: input with prefix/suffix addons visually merged inside
// one hairline border. The outer container owns the field surface (crisp white,
// border-input, quiet blue focus ring matching _shared's formFieldBase). Addons
// sit on bg-muted with a hairline divider.

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
          // Outer container acts as the visible field surface.
          "flex w-full items-stretch overflow-hidden rounded-md",
          "border border-input bg-background",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-ring/45",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:ring-destructive/25",
          ],
          disabled && "cursor-not-allowed bg-muted opacity-50",
          size === "sm" && "rounded-sm",
          className
        )}
        {...props}
      >
        {/* Prefix addon */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center border-r border-border bg-muted px-3",
              "text-sm text-muted-foreground select-none shrink-0",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
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
              "flex items-center justify-center border-l border-border bg-muted px-3",
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
