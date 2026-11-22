import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard Input: recessed field over the card surface. Soft inset shadow
// sinks it below the raised controls; focus brings up the orange ring.

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          formFieldBase,
          "flex h-9 rounded-lg px-3 py-1 text-sm",
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
