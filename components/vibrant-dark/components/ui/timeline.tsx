import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic Timeline: vertical event list, primary dot, card bg entries

interface TimelineItem {
  title: string
  description?: string
  timestamp?: string
  icon?: React.ReactNode
  color?: "default" | "primary" | "success" | "warning" | "destructive"
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

const dotColors = {
  default:     "bg-secondary",
  primary:     "bg-primary shadow-[0_0_0_4px_hsl(212_100%_47%/0.2)]",
  success:     "bg-[hsl(var(--success))] shadow-[0_0_0_4px_hsl(146_80%_44%/0.2)]",
  warning:     "bg-[hsl(var(--warning))] shadow-[0_0_0_4px_hsl(37_91%_55%/0.2)]",
  destructive: "bg-destructive shadow-[0_0_0_4px_hsl(339_90%_51%/0.2)]",
}

function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          {/* Left: dot + line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs",
                item.icon ? "bg-secondary text-muted-foreground" : dotColors[item.color ?? "primary"]
              )}
            >
              {item.icon ?? <span className="h-2 w-2 rounded-full bg-current" />}
            </div>
            {i < items.length - 1 && (
              <div className="mt-1 flex-1 w-px bg-border" />
            )}
          </div>

          {/* Right: content */}
          <div className={cn("pb-6 min-w-0", i === items.length - 1 && "pb-0")}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              {item.timestamp && (
                <span className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export { Timeline }
export type { TimelineProps }
