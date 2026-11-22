import * as React from "react"
import { cn } from "@/lib/utils"

// Ledger Light Empty: centered icon area (dashed border), title, description, optional action

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-5 rounded-xl",
          "border border-dashed border-border",
          "bg-secondary/30 p-12 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center",
              "rounded-lg border border-border bg-card",
              "shadow-[var(--shadow-soft)]",
              "text-muted-foreground"
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
              {icon}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-1.5 max-w-xs">
          <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-2">
            {action}
          </div>
        )}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty }
export type { EmptyProps }
