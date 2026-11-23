import { cn } from "@/lib/utils";

// Skeleton: pulsing recessed placeholder.

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted shadow-[var(--tb-shadow-inset)]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
