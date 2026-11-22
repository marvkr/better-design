import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

/*
 * Playdesk Field — label, control, hint and error in one stack, so a form row
 * is one component instead of four hand-aligned pieces.
 */

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    { className, label, htmlFor, description, error, required, children, ...props },
    ref,
  ) => (
    <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor}>
          {label}
          {required ? (
            <span aria-hidden className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {children}
      {description && !error ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  ),
);
Field.displayName = "Field";

export { Field };
