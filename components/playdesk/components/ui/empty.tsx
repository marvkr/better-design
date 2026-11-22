import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, message = "Nothing here yet", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed border-border px-6 py-10",
        "text-sm text-muted-foreground",
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
