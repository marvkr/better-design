import * as React from "react"
import { CircleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

/* Field — Label + control + description/error wiring for the well fields. */

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
    {
      label,
      htmlFor,
      description,
      error,
      required,
      optional,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error)

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5", className)}
        {...props}
      >
        {label && (
          <div className="flex items-center gap-1.5">
            <Label
              htmlFor={htmlFor}
              className={cn(hasError && "text-destructive")}
            >
              {label}
            </Label>
            {required && (
              <span className="text-sm leading-none text-destructive" aria-hidden="true">
                *
              </span>
            )}
            {optional && !required && (
              <span className="text-xs text-muted-foreground">(optional)</span>
            )}
          </div>
        )}

        <div
          className={cn(
            hasError && [
              "[&_input]:border-destructive/60",
              "[&_input]:focus-visible:border-destructive",
              "[&_input]:focus-visible:ring-destructive/30",
              "[&_textarea]:border-destructive/60",
              "[&_select]:border-destructive/60",
            ]
          )}
        >
          {children}
        </div>

        {description && !hasError && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        {hasError && (
          <p className="flex items-center gap-1 text-xs leading-relaxed text-destructive">
            <CircleAlert className="h-3 w-3 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Field.displayName = "Field"

export { Field }
export type { FieldProps }
