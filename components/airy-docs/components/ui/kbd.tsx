import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Kbd: the key hint a docs search box shows. A white key with a
 * hairline edge and a slightly heavier bottom edge, mono text in muted ink.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-0.5 rounded-sm border border-b-2 border-border bg-background px-1",
        "font-mono text-[0.6875rem] font-medium text-muted-foreground",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
