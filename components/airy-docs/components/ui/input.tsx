import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Airy docs Input: a white box behind a quiet grey hairline with a 0.5rem
 * corner. Focus turns the edge green and adds a soft green halo.
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
      "file:me-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
