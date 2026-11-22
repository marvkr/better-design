import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-[0.625rem] border border-border bg-background px-3 py-2 text-sm",
          "shadow-[0_0.0625rem_0.125rem_0_oklch(0_0_0/0.04)]",
          "placeholder:text-muted-foreground",
          "transition duration-base ease-out resize-y",
          "hover:border-foreground/30",
          "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[0_0_0_0.1875rem_oklch(0_0_0/0.06)]",
          "disabled:cursor-not-allowed disabled:bg-secondary disabled:opacity-70",
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
