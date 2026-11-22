import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Airy docs Skeleton: a pale tray block at the 0.5rem field corner that
 * pulses while content loads. Stack a few at text height to stand in for a
 * paragraph; round one fully for an avatar.
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
