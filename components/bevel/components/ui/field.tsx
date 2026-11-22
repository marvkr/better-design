import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel Field.
 *
 * The same stacked column Form gives a react-hook-form field, without the
 * form library. A label, a control and one helper or error line, spaced 6px
 * apart. The label and both message lines sit on the 12.5px step with +0.3px
 * tracking, which is the smallest text this system lets you read.
 */

/** Props for `Field`, the column that wraps one label, control and message. */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  ),
)
Field.displayName = "Field"

/** Props for `FieldLabel`; `required` appends a destructive asterisk. */
export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-[0.7813rem] leading-4 font-medium tracking-[0.0188rem] text-muted-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  ),
)
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.7813rem] leading-4 tracking-[0.0188rem] text-muted-foreground",
      className,
    )}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[0.7813rem] leading-4 font-medium tracking-[0.0188rem] text-destructive",
      className,
    )}
    {...props}
  />
))
FieldError.displayName = "FieldError"

export { Field, FieldLabel, FieldDescription, FieldError }
