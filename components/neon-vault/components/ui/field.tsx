import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

// Neon Vault Field: label, control, optional description and error. Errors
// retint the recessed track in the destructive hue.

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
              className={cn(
                "text-sm font-medium leading-none text-foreground",
                hasError && "text-destructive"
              )}
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
              "[&_input]:border-destructive",
              "[&_input]:focus-visible:border-destructive",
              "[&_input]:focus-visible:ring-destructive/30",
              "[&_textarea]:border-destructive",
              "[&_select]:border-destructive",
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3 shrink-0"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-10a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5Zm0 6.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
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
