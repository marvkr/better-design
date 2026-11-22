import { cn } from "@/lib/utils"

// Neon Vault Skeleton: a pulsing muted block with the DS radius scale.

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
