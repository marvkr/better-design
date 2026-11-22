import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldSingleLine } from "./_shared";

/*
 * Interior Input — an empty field is a slot; entering it brings it to the
 * surface. Rest is a recessed well; focus is an accent border on a white
 * fill with the well shadow gone. No focus ring.
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        formFieldBase,
        formFieldSingleLine,
        "file:border-0 file:bg-transparent file:text-[0.8125rem] file:font-medium file:text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
