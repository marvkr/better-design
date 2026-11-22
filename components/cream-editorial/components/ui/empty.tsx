import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Empty: an oat card behind a hairline that holds whatever
 * you place in it, centred. Use it where a list or a result would sit, so
 * the space keeps its shape while there is nothing to show.
 */
const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Empty.displayName = "Empty";

export { Empty };
