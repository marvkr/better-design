import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Empty: a square soft grey well that centres whatever you put
 * in it. Use it where a product grid or a result list would sit, so the
 * space keeps its shape while there is nothing to show.
 */
const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "flex min-h-48 flex-col items-center justify-center gap-3 rounded-none bg-secondary p-8 text-center text-sm text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Empty.displayName = "Empty";

export { Empty };
