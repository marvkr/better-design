import { cn } from "@/lib/utils"

// Clicky Skeleton — muted pulsing placeholder, rounded-[0.375rem]

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-[0.375rem]", className)}
      {...props}
    />
  )
}

export { Skeleton }
