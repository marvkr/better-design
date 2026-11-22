import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Field: label + control + description/error stack.

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
  optional?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    { className, label, htmlFor, description, error, required, optional, children, ...props },
    ref
  ) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1 text-sm font-semibold leading-none tracking-[-0.01em]"
        >
          {label}
          {required && <span className="text-primary">*</span>}
          {optional && (
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          )}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-[oklch(0.74_0.16_27)]">{error}</p>
      )}
    </div>
  )
)
Field.displayName = "Field"

export { Field }
export type { FieldProps }
