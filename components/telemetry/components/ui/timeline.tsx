import * as React from "react"

import { cn } from "@/lib/utils"

// Control Room Timeline: event log spine. Hairline rail with glowing
// signal-green event lamps, like timestamps in the alarm console.

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
    <div className="size-2 rounded-full bg-primary shadow-[0_0_0.5rem_oklch(0.78_0.21_148/0.5)]" />
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
      "absolute -left-[1.5625rem] top-5 h-[calc(100%+1.5rem)] w-px bg-border",
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
