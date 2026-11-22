import * as React from "react";
import { cn } from "@/lib/utils";

// Carbon (Concept 002) Input : smoked dark glass field with hairline ring, focus = white glow.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl bg-input px-4 py-3 text-sm text-foreground",
          "backdrop-blur-md",
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
