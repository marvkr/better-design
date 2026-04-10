import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]",
          "placeholder:text-muted-foreground",
          "transition-[border-color,box-shadow] duration-150",
          "hover:border-border/80",
          "focus-visible:outline-none focus-visible:border-primary/60",
          "focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_0_3px_hsl(235_100%_71%/0.2)]",
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
