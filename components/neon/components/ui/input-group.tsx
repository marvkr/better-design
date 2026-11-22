import * as React from "react"
import { cn } from "@/lib/utils"

// neon InputGroup: input with prefix/suffix addons, visually merged
// inside one well. Addons share the same rounded-[0.625rem] dark well as the input.
// Prefix/suffix: bg-secondary, hairline divider (border-border), muted text.
// Focus lifts the whole well to the neon-green border + glow.

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
          // Outer container is the visible well: dark surface, hairline border, inset shadow
          "flex w-full items-stretch overflow-hidden",
          "rounded-[0.625rem] border border-border bg-input",
          "[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4)]",
          "transition-[color,box-shadow,border-color] duration-fast",
          "hover:border-[oklch(1_0_0_/_0.16)]",
          "focus-within:border-[oklch(0.86_0.22_145_/_0.6)]",
          "focus-within:[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4),0_0_0_0.1875rem_oklch(0.86_0.22_145_/_0.18),0_0.25rem_0.875rem_-0.25rem_oklch(0.86_0.22_145_/_0.22)]",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:[box-shadow:inset_0_0.0625rem_0.125rem_oklch(0_0_0_/_0.4),0_0_0_0.1875rem_oklch(0.64_0.21_25_/_0.22)]",
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
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child: strip its own border/shadow/rounded since the well handles it */}
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
