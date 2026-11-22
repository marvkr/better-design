import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/**
 * Cream editorial Textarea: the same pale paper field as Input, grown to
 * several lines with relaxed leading for longer prose.
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
