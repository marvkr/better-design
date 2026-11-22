import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Field: one checkout row. The label sits on top, the field
 * under it, then a grey hint or a red error line, 0.5rem apart.
 */
const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="field"
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
Field.displayName = "Field";

/** A hint under the field, in grey at the small size. */
const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn("text-sm leading-normal text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

/**
 * The error line under the field, in the red that passes contrast on white.
 * It announces itself to screen readers as soon as it appears.
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
      "text-sm font-medium leading-normal text-(--destructive-text)",
      className,
    )}
    {...props}
  />
));
FieldError.displayName = "FieldError";

export { Field, FieldDescription, FieldError };
