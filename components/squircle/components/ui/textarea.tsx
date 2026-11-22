import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-[calc(0.875rem*var(--corner-factor,1))] bg-input backdrop-blur-md px-4 py-2 text-[0.9375rem] leading-[1.47] tracking-[-0.01em] text-foreground",
          "border border-border shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-base",
          "hover:border-[oklch(0_0_0/0.18)]",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[0_0_0_0.1875rem_color-mix(in_oklch,var(--primary)_18%,transparent),inset_0_0.0625rem_0_oklch(1_0_0/0.5)]",
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
