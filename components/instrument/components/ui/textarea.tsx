import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

// Gauge Dark Textarea: the same recessed well as Input, multi-line.

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(formFieldBase, formFieldMultiLine, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
