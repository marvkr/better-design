import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Firefly Skeleton: a warm paper block, rounded at the 0.625rem row corner,
 * that breathes slowly while the real content loads. Shape it with size
 * classes, and round it fully for avatars and pills.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-(--surface-2)", className)}
      {...props}
    />
  );
}

export { Skeleton };
