import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/** Burnished Textarea: the same graphite bevel field as Input, grown tall. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(formFieldBase, formFieldMultiLine, "resize-y", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
