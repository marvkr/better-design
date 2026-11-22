import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Empty: a dashed hairline box with a 1rem corner that holds its
 * content centred. It keeps the shape of a list or a result while there is
 * nothing in it yet.
 */
const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-(--line-strong) p-8 text-center text-sm text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Empty.displayName = "Empty";

export { Empty };
