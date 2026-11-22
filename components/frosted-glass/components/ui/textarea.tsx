import * as React from "react"

import { cn } from "@/lib/utils"
import { formFieldBase } from "./_shared"

// Frosted Glass Textarea — same glass form-field base as Input, larger radius.

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] rounded-[var(--radius-md)] px-5 py-3 text-[0.9375rem]",
          formFieldBase,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
