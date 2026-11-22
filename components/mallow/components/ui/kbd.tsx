import * as React from "react";

import { cn } from "@/lib/utils";
import { selectedOption } from "./_shared";

/**
 * Mallow Kbd: a small key in the light violet tint inside a violet ring, so
 * a shortcut reads as something you press.
 */
const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        selectedOption,
        "inline-flex h-6 min-w-6 select-none items-center justify-center gap-1 rounded-sm px-1.5",
        "font-mono text-xs font-medium text-muted-foreground",
        "[&_svg]:size-3",
        className,
      )}
      {...props}
    />
  ),
);
Kbd.displayName = "Kbd";

export { Kbd };
