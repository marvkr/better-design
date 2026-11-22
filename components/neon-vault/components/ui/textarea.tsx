import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

// Neon Vault Textarea: the recessed track softened into a rounded panel for
// multi-line entry. Same sunken material as Input, magenta focus ring.

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
