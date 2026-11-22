import { cn } from "@/lib/utils";

// Gauge Dark Skeleton: a shimmer on the nested-panel surface so loading
// blocks sit one level above the card they occupy, like blank gauge faces.

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[var(--gauge-nested)] shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.04)]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
