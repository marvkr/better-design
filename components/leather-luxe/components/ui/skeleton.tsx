import { cn } from "@/lib/utils"

// Leather Luxe Skeleton: a softly pulsing recessed well.

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-well [box-shadow:var(--shadow-well)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
