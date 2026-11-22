import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Field: one form row on a tight 0.375rem rhythm. The bold
 * label sits on top, the white well under it, then a muted hint or a red
 * error line.
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

/** A hint under the field, in muted ink at a compact size. */
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
 * The error line under the field, in the deeper red that reads on the cream
 * page. It announces itself to screen readers as soon as it appears.
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
      "text-[0.8125rem] font-semibold leading-normal text-(--destructive-text)",
      className,
    )}
    {...props}
  />
));
FieldError.displayName = "FieldError";

export { Field, FieldDescription, FieldError };
