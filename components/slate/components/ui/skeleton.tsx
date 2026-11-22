import { cn } from "@/lib/utils";

/*
 * Ops Sharp Skeleton : a quiet loading placeholder on the muted secondary
 * surface, with a sharp 6px corner to match the DS controls.
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
