import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineEvent {
  title: string
  description?: string
  timestamp?: string
  icon?: React.ReactNode
  status?: "complete" | "current" | "upcoming"
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[]
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ events, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {events.map((event, index) => {
          const isLast = index === events.length - 1
          const status = event.status ?? "complete"

          return (
            <div key={index} className="flex gap-4">
              {/* Left: dot + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                    status === "complete"  && "bg-foreground border-foreground text-background",
                    status === "current"   && "bg-background border-foreground text-foreground",
                    status === "upcoming"  && "bg-background border-border text-muted-foreground",
                  )}
                >
                  {event.icon ?? (
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        status === "complete" && "bg-background",
                        status === "current"  && "bg-foreground",
                        status === "upcoming" && "bg-border",
                      )}
                    />
                  )}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-border mt-1 min-h-[1.5rem]" />
                )}
              </div>

              {/* Right: content */}
              <div className={cn("pb-6 pt-0.5", isLast && "pb-0")}>
                <div className="flex items-baseline gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                  {event.timestamp && (
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  )}
                </div>
                {event.description && (
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline }
