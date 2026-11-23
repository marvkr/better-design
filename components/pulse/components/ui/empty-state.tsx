import * as React from "react"
import { cn } from "@/lib/utils"

// Empty State: centered content with icon, title, description, and optional action

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-secondary/30 p-10 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background ring-1 ring-border [box-shadow:0_0.0625rem_0.125rem_oklch(0_0_0/0.3)] text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export { EmptyState }
export type { EmptyStateProps }
