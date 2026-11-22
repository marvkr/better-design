import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark InputGroup: one shared recessed well with raised addon plates
// fused to its ends; the inner input gives up its own border and shadow.

interface InputGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "default" | "sm";
  disabled?: boolean;
  error?: boolean;
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
          // Outer container owns the well border + shadow.
          "flex w-full items-stretch overflow-hidden",
          "rounded-lg border border-[var(--gauge-well-border)] bg-input",
          "shadow-[var(--shadow-well)]",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-border",
          "focus-within:border-[var(--gauge-rim)] focus-within:shadow-[var(--shadow-well),var(--shadow-focus)]",
          error && [
            "border-destructive/60",
            "focus-within:border-destructive focus-within:shadow-[var(--shadow-well),0_0_0_0.1875rem_oklch(0.55_0.19_25/0.25)]",
          ],
          disabled && "cursor-not-allowed opacity-50",
          size === "sm" && "rounded-md",
          className
        )}
        {...props}
      >
        {/* Prefix addon: etched plate inside the well */}
        {prefix && (
          <div
            className={cn(
              "flex shrink-0 select-none items-center justify-center border-r border-[var(--gauge-well-border)] bg-secondary px-3",
              "text-sm text-muted-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {prefix}
          </div>
        )}

        {/* Input child: strip its own border/shadow/rounding */}
        <div
          className={cn(
            "flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:shadow-none",
            "[&_input]:focus-visible:border-0 [&_input]:focus-visible:shadow-none [&_input]:focus-visible:ring-0",
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
              "flex shrink-0 select-none items-center justify-center border-l border-[var(--gauge-well-border)] bg-secondary px-3",
              "text-sm text-muted-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)]",
              "[&>svg]:h-4 [&>svg]:w-4",
              size === "default" ? "h-9" : "h-8"
            )}
          >
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };
export type { InputGroupProps };
