import * as React from "react";

import { cn } from "@/lib/utils";

// Retro LCD Input — a recessed LCD entry field.
// Slightly darker screen fill with an inset glass shadow so text sits "in" the
// panel; olive border + focus that deepens the trace, no shadow bloom.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground",
          "shadow-[inset_0_0.125rem_0.25rem_oklch(0_0_0/0.12)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color] duration-fast",
          "hover:border-foreground/40",
          "focus-visible:outline-none focus-visible:border-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
