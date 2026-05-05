import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[10px] border border-border bg-background px-3 py-2 text-sm",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
          "placeholder:text-muted-foreground",
          "transition duration-200 ease-out resize-y",
          "hover:border-foreground/30",
          "focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[0_0_0_3px_rgb(0_0_0/0.06)]",
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
