import * as React from "react"

import { cn } from "@/lib/utils"

// Amber Glass Empty: quiet centered prompt (the board's Add new affordance).

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ag-fill)] border border-[color:var(--ag-border)] text-primary [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold tracking-[-0.01em]">{title}</span>
        {description && (
          <span className="max-w-xs text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      {action}
    </div>
  )
)
Empty.displayName = "Empty"

export { Empty }
export type { EmptyProps }
