import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Interior Kbd — a key you could press: a 5px-radius cap on the card surface
 * with the bottom lip and hairline of the cap shadow. Keycaps are metadata,
 * so they run mono at 10.5px with tabular-nums.
 */

const Kbd = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded-[0.3125rem] px-1.5",
      "bg-card font-mono text-[0.6563rem] font-medium tabular-nums text-muted-foreground",
      "shadow-[var(--shadow-cap)]",
      className,
    )}
    {...props}
  />
));
Kbd.displayName = "Kbd";

export { Kbd };
