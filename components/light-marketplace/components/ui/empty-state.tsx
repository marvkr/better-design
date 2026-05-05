import * as React from "react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          "rounded-[14px] border-2 border-dashed border-border",
          "bg-secondary/30 px-8 py-12",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="mb-1.5 text-base font-semibold text-foreground">
            {title}
          </h3>
        )}
        {description && (
          <p className="mb-6 max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
        {children}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
