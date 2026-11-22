import * as React from "react";
import { cn } from "@/lib/utils";

// Ops Sharp InputGroup - wraps a field with prefix/suffix addons merged inside
// one shared well. The outer container owns the field border + inset + focus
// ring; the child input has its own border/shadow/rounding stripped so the
// group reads as a single control. Addons sit on bg-secondary, divided by a
// hairline border.

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
    { prefix, suffix, size = "default", disabled, error, className, children, ...props },
    ref
  ) => {
    const addonHeight = size === "default" ? "h-9" : "h-8";

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-stretch overflow-hidden rounded-md border border-border bg-card",
          "[box-shadow:var(--shadow-inset)]",
          "transition-[border-color,box-shadow] duration-fast",
          "hover:border-ring/30",
          "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/25",
          disabled && "cursor-not-allowed opacity-50",
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
              addonHeight
            )}
          >
            {prefix}
          </div>
        )}

        {/* Field child - strip its own border/shadow/rounding so the group owns it */}
        <div
          className={cn(
            "flex-1 [&_input]:border-0 [&_input]:shadow-none [&_input]:rounded-none",
            "[&_input]:focus-visible:ring-0 [&_input]:focus-visible:border-0",
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
              addonHeight
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
