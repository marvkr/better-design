import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-lg border border-border bg-input px-4 py-3 font-mono text-sm text-foreground",
          "shadow-[inset_0_0.125rem_0.25rem_oklch(0_0_0/0.12)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color] duration-fast",
          "hover:border-foreground/40",
          "focus-visible:outline-none focus-visible:border-foreground",
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
