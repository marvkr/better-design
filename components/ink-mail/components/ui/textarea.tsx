import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/**
 * Ink mail Textarea: the same dark well as Input, grown to several lines, for
 * a message body or a webhook payload.
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    data-slot="textarea"
    className={cn(formFieldBase, formFieldMultiLine, "leading-normal", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
