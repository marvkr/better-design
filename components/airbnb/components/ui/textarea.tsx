import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground",
          "placeholder:text-muted-foreground",
          "transition-colors duration-fast",
          "hover:border-foreground",
          "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[inset_0_0_0_0.0625rem_var(--ring)]",
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
