import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Timeline: glowing nodes on a hairline rail.

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

const nodeVariants = {
  default:
    "bg-primary shadow-[0_0_0.5rem_oklch(0.69_0.195_42/0.5)]",
  success:
    "bg-[oklch(0.72_0.15_155)] shadow-[0_0_0.5rem_oklch(0.72_0.15_155/0.5)]",
  warning:
    "bg-[oklch(0.78_0.14_80)] shadow-[0_0_0.5rem_oklch(0.78_0.14_80/0.5)]",
  destructive:
    "bg-destructive shadow-[0_0_0.5rem_oklch(0.6_0.21_27/0.5)]",
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, items, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1

        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-5 w-5 items-center justify-center">
                {item.icon ? (
                  <span className="text-primary [&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>
                ) : (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      nodeVariants[item.variant ?? "default"]
                    )}
                  />
                )}
              </span>
              {!isLast && <span className="w-px flex-1 bg-[var(--ag-border)]" />}
            </div>
            <div className={cn("flex flex-col gap-0.5", !isLast && "pb-6")}>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold tracking-[-0.01em]">
                  {item.title}
                </span>
                {item.date && (
                  <span className="text-[0.6875rem] text-muted-foreground">{item.date}</span>
                )}
              </div>
              {item.description && (
                <span className="text-xs text-muted-foreground">{item.description}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
)
Timeline.displayName = "Timeline"

export { Timeline }
export type { TimelineProps, TimelineItem }
