import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-md bg-background px-3 py-2 text-sm text-foreground",
          "border border-border",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-base",
          "hover:border-primary/40",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_15%,transparent)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
