import * as React from "react"
import { cn } from "@/lib/utils"

// Midnight Glass InputGroup: glass pill input with prefix/suffix addons

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
          "rounded-full border border-white/[0.08] backdrop-blur-xl bg-white/[0.05]",
          "shadow-[inset_0_0_6px_rgba(255,255,255,0.05)]",
          "transition duration-300 ease-out",
          "focus-within:shadow-[inset_0_0_6px_rgba(255,255,255,0.05),0_0_0_3px_rgba(255,255,255,0.2)] focus-within:border-primary/50",
          "hover:bg-white/[0.07] hover:border-white/[0.12]",
          error && [
            "border-destructive",
            "focus-within:border-destructive focus-within:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
          ],
          disabled && "cursor-not-allowed opacity-70",
          size === "sm" && "rounded-2xl",
          className
        )}
        {...props}
      >
        {/* Prefix addon */}
        {prefix && (
          <div
            className={cn(
              "flex items-center justify-center border-r border-white/[0.08] bg-white/[0.03] px-5",
              "text-[15px] text-white/50 select-none shrink-0",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-12" : "h-9"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child */}
        <div
          className={cn(
            "flex-1 [&_input]:border-0 [&_input]:shadow-none [&_input]:rounded-none",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:shadow-none [&_input]:focus-visible:border-0",
            "[&_input]:h-full [&_input]:w-full [&_input]:bg-transparent",
            "[&_input]:text-white/90 [&_input]:placeholder:text-white/40",
            disabled && "[&_input]:cursor-not-allowed"
          )}
        >
          {children}
        </div>

        {/* Suffix addon */}
        {suffix && (
          <div
            className={cn(
              "flex items-center justify-center border-l border-white/[0.08] bg-white/[0.03] px-5",
              "text-[15px] text-white/50 select-none shrink-0",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-12" : "h-9"
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
