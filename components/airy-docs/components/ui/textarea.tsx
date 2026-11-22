import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/**
 * Airy docs Textarea: the Input box grown to several lines, with the relaxed
 * line height of docs prose so a long answer stays easy to read back.
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
