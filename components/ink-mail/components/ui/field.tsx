import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ink mail Field: one form row stacked on a 0.5rem rhythm. The label sits on
 * top, the dark well under it, then a muted hint or a red error line.
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

/** A hint under the field, in the muted ink. */
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
 * The error line under the field, in the red status ink that reads on black.
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
