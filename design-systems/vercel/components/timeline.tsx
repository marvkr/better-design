import * as React from "react"
import { cn } from "@/lib/utils"

// Vercel Timeline: vertical list of events with connector lines

interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "destructive"
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

const variantDotClass = {
  default: "bg-border",
  success: "bg-emerald-500",
  warning: "bg-orange-500",
  destructive: "bg-destructive",
}

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const variant = item.variant ?? "default"

        return (
          <div key={index} className="flex gap-3">
            {/* Left column: dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-2 ring-background",
                  item.icon ? "bg-secondary" : variantDotClass[variant]
                )}
              >
                {item.icon ? (
                  <span className="text-muted-foreground [&>svg]:h-3.5 [&>svg]:w-3.5">
                    {item.icon}
                  </span>
                ) : null}
              </div>
              {!isLast && (
                <div className="mt-1 h-full w-px bg-border" />
              )}
            </div>

            {/* Right column: content */}
            <div className={cn("pb-6", isLast && "pb-0")}>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                {item.date && (
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Timeline }
export type { TimelineProps, TimelineItem }
