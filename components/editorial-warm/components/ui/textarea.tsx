import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5.5rem] w-full rounded-2xl bg-input px-4 py-2",
          "[backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]",
          "shadow-[var(--shadow-glass)]",
          "font-sans text-sm text-foreground placeholder:text-foreground/40",
          "transition-shadow duration-base ease-out resize-y",
          "hover:shadow-[var(--shadow-glass-hover)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
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
