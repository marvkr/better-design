import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineEvent {
  id: string | number
  title: string
  description?: string
  time?: string
  icon?: React.ReactNode
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[]
}

function Timeline({ events, className, ...props }: TimelineProps) {
  return (
    <div className={cn("relative space-y-0", className)} {...props}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1
        return (
          <div key={event.id} className="relative flex gap-4">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  "bg-primary/15 border border-primary/40 text-primary"
                )}
              >
                {event.icon ?? (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border my-1" />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6 pt-1 min-w-0 flex-1", isLast && "pb-0")}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  {event.title}
                </p>
                {event.time && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {event.time}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Timeline }
