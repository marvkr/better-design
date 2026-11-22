import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

// Luxe Field: premium dark monochromatic field wrapper
// Labels use tracking-wide, muted warm gray
// Error state uses subtle red (only non-mono accent)

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
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {label && (
          <div className="flex items-center gap-1.5">
            <Label
              htmlFor={htmlFor}
              className={cn(
                "text-xs font-medium tracking-wide uppercase text-muted-foreground/70",
                "leading-none",
                hasError && "text-destructive/80"
              )}
            >
              {label}
            </Label>
            {required && (
              <span className="text-destructive text-xs" aria-hidden="true">
                *
              </span>
            )}
            {optional && !required && (
              <span className="text-xs text-muted-foreground/50 tracking-wide">
                optional
              </span>
            )}
          </div>
        )}

        <div
          className={cn(
            hasError && [
              "[&_input]:border-destructive/60",
              "[&_input]:focus-visible:ring-destructive/40",
              "[&_input]:focus-visible:border-destructive/60",
              "[&_textarea]:border-destructive/60",
            ]
          )}
        >
          {children}
        </div>

        {description && !hasError && (
          <p className="text-xs text-muted-foreground/60 leading-relaxed tracking-wide">
            {description}
          </p>
        )}

        {hasError && (
          <p className="flex items-center gap-1.5 text-xs text-destructive/80 leading-relaxed">
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
