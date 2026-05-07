import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: string
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon = "tabler:box-off", title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg p-8 text-center",
        "bg-card text-card-foreground border border-dashed border-border",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          "bg-muted text-muted-foreground",
          "[box-shadow:var(--shadow-s)]"
        )}
      >
        <Icon icon={icon} className="h-5 w-5" />
      </div>
      <div className="space-y-1 max-w-md">
        <div className="text-base font-semibold text-foreground">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
        )}
      </div>
      {action && <div className="pt-1">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
