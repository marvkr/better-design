import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/**
 * Playful console Textarea: the white well of Input, grown to several lines
 * with a relaxed line height for notes and query descriptions.
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="textarea"
    className={cn(formFieldBase, formFieldMultiLine, "leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
