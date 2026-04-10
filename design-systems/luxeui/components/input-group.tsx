import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe InputGroup: dark monochromatic, rounded-xl, border-border
// Addons: bg-accent with inset shadow depth, border separators
// Focus: white ring (ring = white in Luxe)

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
          "rounded-xl border border-border bg-secondary",
          "transition-colors duration-200",
          "hover:border-border/80 hover:bg-accent",
          "focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0",
          "focus-within:border-primary/30",
          error && "border-destructive/60 focus-within:ring-destructive/40",
          disabled && "cursor-not-allowed opacity-40",
          size === "sm" && "rounded-lg",
          size === "lg" && "rounded-xl",
          className
        )}
        {...props}
      >
        {/* Prefix addon */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center px-3 shrink-0",
              "bg-accent border-r border-border",
              "shadow-[inset_0_2px_4px_0_rgba(35,35,35,0.8)]",
              "text-muted-foreground select-none",
              "text-sm tracking-wide",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10"
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
            "[&_input]:tracking-wide",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix addon */}
        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center px-3 shrink-0",
              "bg-accent border-l border-border",
              "shadow-[inset_0_2px_4px_0_rgba(35,35,35,0.8)]",
              "text-muted-foreground select-none",
              "text-sm tracking-wide",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10"
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
