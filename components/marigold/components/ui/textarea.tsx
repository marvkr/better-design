import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Talentboard Textarea: same recessed material as Input.

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          formFieldBase,
          "flex min-h-[3.75rem] rounded-lg px-3 py-2 text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
