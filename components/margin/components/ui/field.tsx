import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Field: stacks a small label, its control and a grey helper or red
 * error line, for forms that do not use react-hook-form.
 */
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="field" className={cn("flex flex-col gap-1.5", className)} {...props} />
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
      "text-sm font-medium leading-none text-foreground",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span aria-hidden className="ml-0.5 text-destructive-text">
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
    className={cn("text-xs leading-normal text-muted-foreground", className)}
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
      className={cn("text-xs font-medium text-destructive-text", className)}
      {...props}
    />
  ),
);
FieldError.displayName = "FieldError";

export { Field, FieldLabel, FieldDescription, FieldError };
