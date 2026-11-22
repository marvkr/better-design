import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock Field: a label, a control and its note stacked with a tight gap,
 * for forms that do not use react-hook-form.
 */
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Stacks a label, a control and its helper or error text. */
const Field = React.forwardRef<HTMLDivElement, FieldProps>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="field" className={cn("flex flex-col gap-1.5", className)} {...props} />
));
Field.displayName = "Field";

/** The field's label; `required` adds a quiet asterisk that screen readers skip. */
const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "text-sm font-medium leading-none text-foreground",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden className="ml-0.5 text-muted-foreground">
        *
      </span>
    )}
  </label>
));
FieldLabel.displayName = "FieldLabel";

/** Muted helper text under the control, at the small note size. */
const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn("text-[0.8125rem] text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

/** The error message, announced as an alert and set in the deep destructive text colour. */
const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      role="alert"
      data-slot="field-error"
      className={cn("text-[0.8125rem] font-medium text-destructive-text", className)}
      {...props}
    />
  ),
);
FieldError.displayName = "FieldError";

export { Field, FieldLabel, FieldDescription, FieldError };
