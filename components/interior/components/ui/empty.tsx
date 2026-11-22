import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior Empty — a slot not yet filled, drawn in the drop-target language:
 * a dashed hairline at the 10px drop-target radius, quiet muted text, no
 * decoration.
 */

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, message = "Nothing here yet", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-[0.625rem] border border-dashed border-border px-6 py-10",
        "text-[0.8125rem] leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children ?? message}
    </div>
  ),
);
Empty.displayName = "Empty";

export { Empty };
