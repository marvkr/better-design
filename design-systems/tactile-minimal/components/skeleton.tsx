import { cn } from "@/lib/utils"

// Tactile Minimal Skeleton — muted pulsing placeholder, rounded-[6px]

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-[6px]", className)}
      {...props}
    />
  )
}

export { Skeleton }
