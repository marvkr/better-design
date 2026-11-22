import * as React from "react";

import { cn } from "@/lib/utils";

// Concept-001 Pebble Input
// White pebble field on lavender bg, generous radius (16px), hairline ring + subtle inset highlight.
// Focus: vivid red ring glow, mirroring Concept 1's accent dot.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl bg-card px-4 py-3 text-sm text-foreground",
          "shadow-[var(--shadow-input)]",
          "placeholder:text-muted-foreground",
          "transition-all duration-fast",
          "hover:shadow-[var(--shadow-input-hover)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-input-focus)]",
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
