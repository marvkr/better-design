import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Firefly Input: a warm paper well behind a strong hairline. The line darkens
 * under the pointer and turns olive with a flush outline on focus.
 */
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    data-slot="input"
    className={cn(
      formFieldBase,
      formFieldSingleLine,
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
