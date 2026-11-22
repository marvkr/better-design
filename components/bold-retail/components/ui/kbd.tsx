import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Bold retail Kbd: a flat white key cap behind a hairline with a small
 * corner. The label runs in mono in the secondary ink, so a shortcut reads
 * as a hint and never as a button.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 rounded-sm border border-border bg-background px-1.5",
        "font-mono text-xs font-medium text-(--foreground-secondary)",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
