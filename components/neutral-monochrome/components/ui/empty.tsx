import * as React from "react"
import { cn } from "@/lib/utils"

// Earthy Empty: dark neutral, rounded-lg container with dashed border
// No colored glows — monochromatic icon box, minimal white-on-dark text

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
          "flex flex-col items-center justify-center gap-5",
          "rounded-lg border border-dashed border-border",
          "bg-secondary/30 p-12 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              "border border-border bg-secondary",
              "text-muted-foreground",
              "[&>svg]:h-5 [&>svg]:w-5"
            )}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-1.5 max-w-xs">
          <p className="text-sm font-medium text-foreground leading-snug">
            {title}
          </p>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
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
