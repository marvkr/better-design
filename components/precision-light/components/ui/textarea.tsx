import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[5rem] w-full rounded-[0.625rem] border-0 bg-input px-3 py-2 text-sm text-foreground",
          "shadow-[0_0_0_0.0625rem_oklch(0.3211_0_0/0.1)]",
          "placeholder:text-muted-foreground",
          "transition duration-base ease-out resize-y",
          "hover:shadow-[0_0_0_0.0625rem_oklch(0.3211_0_0/0.2)]",
          "focus-visible:outline-none focus-visible:shadow-[0_0_0_0.0938rem_oklch(0.5547_0.2451_266.7061),0_0_0_0.25rem_oklch(0.5547_0.2451_266.7061/0.12)]",
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
