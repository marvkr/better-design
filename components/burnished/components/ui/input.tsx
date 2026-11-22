import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Burnished Input: a graphite bevel field with a 0.875rem corner. The rim
 * brightens on hover and the copper glow rings it on focus.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      data-slot="input"
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
