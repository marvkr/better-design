import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Timeline: vertical event list — white dot, dim gray connector line
// Clean editorial feel — no color accents, just luminance contrast

export interface TimelineItem {
  title: string
  description?: string
  timestamp?: string
  icon?: React.ReactNode
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={index} className="flex gap-4">
            {/* Dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  "bg-secondary border border-border",
                  item.icon ? "text-muted-foreground" : ""
                )}
              >
                {item.icon ?? (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
              {!isLast && (
                <div className="mt-1 w-px flex-1 min-h-[2rem] bg-border" />
              )}
            </div>
            {/* Content */}
            <div className={cn("pb-8 pt-0.5 min-w-0", isLast && "pb-0")}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-foreground tracking-wide">
                  {item.title}
                </p>
                {item.timestamp && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.timestamp}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
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
