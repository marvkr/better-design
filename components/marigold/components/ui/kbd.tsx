import * as React from "react";

import { cn } from "@/lib/utils";

// Talentboard Kbd: tiny raised keycap, the same layered language as buttons.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 py-0.5",
        "border border-border bg-card font-mono text-xs font-medium text-muted-foreground",
        "shadow-[var(--tb-shadow-raise)]",
        className
      )}
      {...props}
    />
  );
}

export { Kbd };
