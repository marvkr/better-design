import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Leather Luxe Textarea: the same recessed well as Input, multi-line.

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(formFieldBase, "flex min-h-[5rem] py-2 resize-y", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
