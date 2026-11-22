import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-md bg-input px-3 py-1.5 text-[0.875rem] tracking-[-0.006em] text-foreground",
          "border border-border",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-fast ease-out",
          "hover:border-[oklch(1_0_0/0.3)]",
          "focus-visible:outline-none focus-visible:border-[oklch(0.6268_0_0)]",
          "focus-visible:shadow-[0_0_0_0.1875rem_oklch(1_0_0/0.05)]",
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
