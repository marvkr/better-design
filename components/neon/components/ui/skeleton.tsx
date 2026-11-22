import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-[0.625rem] bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
