import * as React from "react";

import { cn } from "@/lib/utils";

// Gauge Dark Kbd: a tiny machined keycap. Raised plate with a top bevel and
// a hard base shadow, the smallest member of the raised-control family.

type KbdProps = React.HTMLAttributes<HTMLElement>;

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground",
        "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.08),0_0.0625rem_0_oklch(0_0_0/0.45)]",
        className
      )}
      {...props}
    />
  );
}

export { Kbd };
