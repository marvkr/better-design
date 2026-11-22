import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cream editorial Kbd: a small oat key cap behind a warm hairline, with the
 * label in mono at the caption ink, so a shortcut reads as a quiet hint.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 rounded-sm border border-border bg-secondary px-1.5",
        "font-mono text-[0.6875rem] font-medium leading-none text-muted-foreground",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
