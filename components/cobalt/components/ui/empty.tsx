import * as React from "react"

import { cn } from "@/lib/utils"

/* Empty — larger empty surface: dashed recessed well, raised icon plinth. */

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
          "flex flex-col items-center justify-center gap-5 rounded-lg p-12 text-center",
          "border border-dashed border-border bg-input [box-shadow:var(--shadow-inset)]",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-md",
              "border border-border text-muted-foreground",
              "[background-image:var(--bezel)] [box-shadow:var(--shadow-raised)]"
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
              {icon}
            </span>
          </div>
        )}

        <div className="flex max-w-xs flex-col gap-1.5">
          <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>

        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
    )
  }
)
Empty.displayName = "Empty"

export { Empty }
export type { EmptyProps }
