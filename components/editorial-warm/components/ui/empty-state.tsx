import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe EmptyState: dashed border card, icon slot centered, refined typography
// Perfect for zero-data screens — premium minimal, not cutesy

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
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
        "flex flex-col items-center justify-center gap-4",
        "rounded-xl border border-dashed border-border",
        "bg-card px-8 py-16 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-foreground tracking-wide">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export { EmptyState }
