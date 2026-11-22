import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Field: label + control + description/error stack.

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
}

function Field({
  label,
  htmlFor,
  description,
  error,
  required,
  optional,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      {label && (
        <div className="flex items-baseline justify-between">
          <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </label>
          {optional && <span className="text-xs text-muted-foreground">Optional</span>}
        </div>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : (
        description && <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { Field };
export type { FieldProps };
