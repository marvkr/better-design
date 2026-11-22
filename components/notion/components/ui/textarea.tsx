import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-[0.375rem] bg-[oklch(0_0_0/0.04)] px-2.5 py-1.5 text-sm text-foreground",
          "border-0 outline-none",
          "placeholder:text-muted-foreground",
          "transition-[box-shadow] duration-fast ease-in",
          "hover:bg-[oklch(0_0_0/0.06)]",
          "focus-visible:bg-white focus-visible:shadow-[0_0_0_0.125rem_color-mix(in_oklch,var(--primary)_35%,transparent)]",
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
