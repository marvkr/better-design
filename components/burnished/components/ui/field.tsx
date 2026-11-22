import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished Field: stacks a label, a control and its helper or error text
 * with even spacing, for forms that do not use react-hook-form.
 */
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="field" className={cn("flex flex-col gap-2", className)} {...props} />
));
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "text-sm font-semibold leading-none tracking-[0.016em] text-foreground",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden className="ml-0.5 text-primary-text">
        *
      </span>
    )}
  </label>
));
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn("text-[0.8125rem] leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      role="alert"
      data-slot="field-error"
      className={cn("text-[0.8125rem] font-medium text-destructive", className)}
      {...props}
    />
  ),
);
FieldError.displayName = "FieldError";

export { Field, FieldLabel, FieldDescription, FieldError };
