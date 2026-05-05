import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel InputGroup: input with prefix/suffix addons, visually merged inside border
// Addons share the same rounded-[10px] container as the input
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
          "rounded-[10px] border border-border bg-background",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
          "transition duration-200 ease-out",
          "focus-within:border-foreground focus-within:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
          "hover:border-foreground/30",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
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
              size === "default" ? "h-10" : "h-9"
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
