import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin Kbd: a tiny white key with a hairline ring and the toolbar pill's
 * faint shadow, set in the monospace, for shortcut hints.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 select-none items-center justify-center gap-0.5 rounded-sm px-1",
        "bg-card font-mono text-xs font-medium text-muted-foreground shadow-sm",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
