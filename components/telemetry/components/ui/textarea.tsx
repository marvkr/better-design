import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldMultiLine } from "./_shared"

// Control Room Textarea: multi-line instrument well, same recessed
// material as Input with the signal-green focus glow.

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
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
