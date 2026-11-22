import * as React from "react";
import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Frosted Glass Input — frosted glass pill field sharing the DS's form-field base.

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 rounded-full px-5 py-2 text-[0.9375rem]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          formFieldBase,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
