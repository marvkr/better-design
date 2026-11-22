import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/**
 * Playful console Input: a plain white well on the cream page with a firm
 * olive edge. The edge darkens under the pointer and turns bold blue, with a
 * soft blue ring, on focus.
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
      "file:me-3 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
