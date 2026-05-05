import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[10px] border-0 bg-input px-3 py-2 text-sm text-foreground",
          "shadow-[0_0_0_1px_rgba(51,51,51,0.1)]",
          "placeholder:text-muted-foreground",
          "transition duration-200 ease-out resize-y",
          "hover:shadow-[0_0_0_1px_rgba(51,51,51,0.2)]",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_1.5px_hsl(228_100%_60%),0_0_0_4px_hsl(228_100%_60%/0.12)]",
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
