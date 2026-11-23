import * as React from "react";

import { cn } from "@/lib/utils";

// Input, measured on airbnb.com (13 November 2026)
// 12px radius, a 1px grey line, clear fill, 16px text
// Focus: the line turns dark and thickens to 2px, with no glow

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-in-out",
          "hover:border-foreground",
          "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
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
