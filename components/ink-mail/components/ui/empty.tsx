import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ink mail Empty: a card-step panel behind a dashed hairline that holds
 * whatever you place in it, centred. Use it where a list of messages or a log
 * would sit, so the space keeps its shape while there is nothing to show.
 */
const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty"
    className={cn(
      "flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-(--line-strong) bg-card p-8 text-center text-sm text-muted-foreground",
      className,
    )}
    {...props}
  />
));
Empty.displayName = "Empty";

export { Empty };
