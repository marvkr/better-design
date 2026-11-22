import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Leather Luxe Input: a recessed well pressed into the card surface,
// cognac focus halo instead of a hue swap.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          formFieldBase,
          "flex h-10 py-2",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
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
