import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Paddock Kbd: a small white key with the card's hairline ring, set in the
 * mono face at note size so a shortcut reads beside a menu label.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 select-none items-center justify-center gap-0.5 rounded-xs px-1.5",
        "bg-card font-mono text-xs font-medium text-muted-foreground shadow-(--card-ring)",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
