import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

/*
 * Plinth Field: a label, its control, and a hint or an error under it.
 * The error swaps in for the hint, in the destructive colour with an icon.
 */

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  description?: string
  error?: string
  required?: boolean
  optional?: boolean
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, htmlFor, description, error, required, optional, className, children, ...props }, ref) => {
    const hasError = Boolean(error)

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        {label && (
          <div className="flex items-center gap-1.5">
            <Label htmlFor={htmlFor} className={cn(hasError && "text-destructive")}>
              {label}
            </Label>
            {required && (
              <span className="text-sm leading-none text-destructive" aria-hidden="true">
                *
              </span>
            )}
            {optional && !required && (
              <span className="text-xs text-muted-foreground">Optional</span>
            )}
          </div>
        )}

        <div className={cn(hasError && "[&_input]:border-destructive [&_textarea]:border-destructive [&_select]:border-destructive")}>
          {children}
        </div>

        {description && !hasError && (
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        )}

        {hasError && (
          <p className="flex items-center gap-1.5 text-xs leading-relaxed text-destructive" role="alert">
            <AlertCircleIcon className="size-3.5 shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Field.displayName = "Field"

// feather:alert-circle
function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </g>
    </svg>
  )
}

export { Field }
export type { FieldProps }
