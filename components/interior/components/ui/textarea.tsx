import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/*
 * Interior Textarea — the same recessed well as the Input, at multi-line
 * height. Rest is a slot cut into the panel; focus is an accent border on a
 * white fill with the well shadow gone.
 */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(formFieldBase, formFieldMultiLine, className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
