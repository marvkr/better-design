import * as React from "react";

import { cn } from "@/lib/utils";

// Kbd: tiny raised keycap, the same layered language as buttons.

interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 py-0.5",
        "border border-border/70 bg-secondary font-mono text-xs font-medium text-muted-foreground",
        "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.07),0_0.0625rem_0.125rem_oklch(0_0_0/0.3)]",
        className
      )}
      {...props}
    />
  );
}

export { Kbd };
