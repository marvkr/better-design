import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Burnished Kbd: a tiny graphite key. It carries the raised bevel at small
 * scale, lit along the top edge with a soft drop beneath, so a shortcut
 * looks like a key you could press.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5.5 min-w-5.5 select-none items-center justify-center gap-1 rounded-sm px-1.5",
        "font-mono text-[0.6875rem] font-medium text-muted-foreground",
        "bg-(image:--fill-raised) shadow-(--bevel-raised)",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
