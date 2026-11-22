import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-2xl bg-card px-4 py-3 text-sm text-foreground",
          "shadow-[var(--shadow-input)]",
          "placeholder:text-muted-foreground",
          "transition-all duration-fast",
          "hover:shadow-[var(--shadow-input-hover)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--shadow-input-focus)]",
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
