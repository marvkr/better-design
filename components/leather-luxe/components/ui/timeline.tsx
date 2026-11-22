import * as React from "react"

import { cn } from "@/lib/utils"

// Leather Luxe Timeline: cognac dots with a warm halo on a hairline thread.

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative space-y-6 pl-8", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

const TimelineDot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute -left-8 top-1 flex h-4 w-4 items-center justify-center",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "h-2.5 w-2.5 rounded-full",
        "[background-image:var(--gradient-leather)]",
        "border border-[oklch(0.68_0.115_58/0.55)]",
        "shadow-[0_0_0.5rem_oklch(0.55_0.115_52/0.4)]"
      )}
    />
  </div>
))
TimelineDot.displayName = "TimelineDot"

const TimelineLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute -left-6 top-5 h-[calc(100%+1.5rem)] w-px bg-border",
      className
    )}
    {...props}
  />
))
TimelineLine.displayName = "TimelineLine"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pb-2", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

export { Timeline, TimelineItem, TimelineDot, TimelineLine, TimelineContent }
