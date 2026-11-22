import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-md bg-input px-3 py-2 text-sm text-foreground",
          "border border-border",
          "shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.25)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-border/80",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_0.0625rem_0.125rem_oklch(0_0_0/0.15),0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_25%,transparent)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
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
