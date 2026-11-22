import * as React from "react"

import { cn } from "@/lib/utils"

/* EmptyState — a dashed recessed well with a raised bezel icon plinth. */

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
        "flex flex-col items-center justify-center gap-4 rounded-lg p-10 text-center",
        "border border-dashed border-border bg-input [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border text-muted-foreground [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]">
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
