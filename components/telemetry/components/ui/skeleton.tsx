import { cn } from "@/lib/utils"

// Control Room Skeleton: signal-loss placeholder. Flat dark block, sharp
// corners, subtle pulse like a panel waiting for telemetry.

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
