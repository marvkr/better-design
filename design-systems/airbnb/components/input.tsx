import * as React from "react";

import { cn } from "@/lib/utils";

// Airbnb Input — extracted from airbnb.com (2026-04)
// Rounded 8px, 1px #DDDDDD border, white bg
// Focus: border goes #222, no shadow bloom — just the border change
// Height: ~48px on search fields, 40px on forms
// No inset shadows

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "transition-border duration-150",
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
