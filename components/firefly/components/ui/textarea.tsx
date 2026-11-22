import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase, formFieldMultiLine } from "./_shared";

/**
 * Firefly Textarea: the same warm well as Input, grown to several lines.
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
