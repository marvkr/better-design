import { cn } from "@/lib/utils"

/* A graphite placeholder that breathes slowly, one step above the panel. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-lg bg-muted motion-reduce:animate-none", className)} {...props} />
}

export { Skeleton }
