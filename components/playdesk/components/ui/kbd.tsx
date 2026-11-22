import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Playdesk Kbd — the shortcut chip from the desk's hint bar: a small recessed
 * key with a hairline rim.
 */

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5",
      "bg-muted font-sans text-[0.6875rem] font-medium tracking-[0.02em] text-muted-foreground",
      "[box-shadow:var(--shadow-rim)]",
      className,
    )}
    {...props}
  />
));
Kbd.displayName = "Kbd";

export { Kbd };
