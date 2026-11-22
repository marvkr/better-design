import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Playful console Kbd: a little white key with an olive edge and a thin
 * slab under it, the same press the buttons wear, scaled down. The label
 * runs in bold mono, so a shortcut reads like a key on a real keyboard.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 rounded-md border border-(--line-strong) bg-card px-1.5 shadow-(--shadow-control-off)",
        "font-mono text-xs font-semibold text-foreground",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
