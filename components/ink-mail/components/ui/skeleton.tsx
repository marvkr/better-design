import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ink mail Skeleton: a muted block one step above the card that pulses
 * slowly while the real content loads. Shape it with size classes, and round
 * it fully for avatars and status pills.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
