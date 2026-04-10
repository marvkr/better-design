import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.04)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-150",
          "hover:border-border/60",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[0_0_0_3px_hsl(350_65%_52%/0.15),0_1px_2px_rgba(0,0,0,0.06)]",
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
