import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Field: one form row. The label sits on top, the field under it,
 * then a muted hint or a red error line, 0.375rem apart.
 */
const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="field"
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
));
Field.displayName = "Field";

/** A hint under the field, in muted ink at 0.8125rem. */
const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn("text-[0.8125rem] leading-normal text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

/**
 * The error line under the field, in the red that passes contrast on white.
 * Screen readers announce it as soon as it appears.
 */
const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    role="alert"
    data-slot="field-error"
    className={cn(
      "text-[0.8125rem] font-medium leading-normal text-(--destructive-text)",
      className,
    )}
    {...props}
  />
));
FieldError.displayName = "FieldError";

export { Field, FieldDescription, FieldError };
