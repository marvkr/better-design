import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldMultiLine } from "./_shared"

/** Props for `Textarea`, the system's multi-line field. */
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
)
Textarea.displayName = "Textarea"

export { Textarea }
