import { cn } from "@/lib/utils";

/*
 * Interior Skeleton — a static well where content will land: recessed fill,
 * inset shadow, 6px radius. No pulse and no shimmer; an idle loop promises
 * progress the page cannot vouch for.
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[0.375rem] bg-secondary shadow-[var(--shadow-well)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
