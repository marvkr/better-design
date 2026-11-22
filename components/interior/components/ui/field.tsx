import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

/*
 * Interior Field — label, control, hint and error in one stack, so a form
 * row is one component instead of four hand-aligned pieces. Hints and errors
 * run at 11.5px; the error carries the destructive ink.
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
        <p className="text-[0.7188rem] text-muted-foreground">{description}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-[0.7188rem] font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  ),
);
Field.displayName = "Field";

export { Field };
