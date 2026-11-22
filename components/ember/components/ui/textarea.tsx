import * as React from "react";

import { cn } from "@/lib/utils";
import { formFieldBase } from "./_shared";

// Amber Glass Textarea: same recessed well as Input, grows with content.

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[4rem] rounded-lg px-3 py-2 text-sm",
          formFieldBase,
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
