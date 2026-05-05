import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic InputGroup: dark flat input with prefix/suffix inside border
// rounded-xl container, bg-secondary flat look, no visible border normally
// Focus glow with ring-2 ring-primary

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  error?: boolean
}

const sizeMap = {
  sm: { height: "h-8", text: "text-xs", px: "px-3" },
  default: { height: "h-10", text: "text-sm", px: "px-4" },
  lg: { height: "h-12", text: "text-base", px: "px-5" },
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
    const s = sizeMap[size]

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-stretch overflow-hidden",
          "rounded-xl bg-secondary",
          "transition-[background,box-shadow] duration-150",
          "focus-within:bg-secondary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0",
          "hover:bg-secondary/80",
          error && "ring-2 ring-destructive focus-within:ring-destructive",
          disabled && "cursor-not-allowed opacity-50",
          s.height,
          className
        )}
        {...props}
      >
        {/* Prefix */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center bg-white/5 px-3",
              "text-muted-foreground select-none shrink-0 border-r border-white/5",
              s.text,
              "[&>svg]:h-4 [&>svg]:w-4"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input slot — strip input's own styles */}
        <div
          className={cn(
            "flex-1",
            "[&_input]:border-0 [&_input]:bg-transparent [&_input]:shadow-none",
            "[&_input]:rounded-none [&_input]:ring-0",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none",
            "[&_input]:h-full [&_input]:w-full",
            "[&_input]:outline-none [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground",
            s.text, s.px,
            "[&_input]:px-0",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix */}
        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center bg-white/5 px-3",
              "text-muted-foreground select-none shrink-0 border-l border-white/5",
              s.text,
              "[&>svg]:h-4 [&>svg]:w-4"
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
