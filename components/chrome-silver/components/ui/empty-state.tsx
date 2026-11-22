import * as React from "react"

import { cn } from "@/lib/utils"

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Optional custom icon node. Kept for API compatibility; when omitted a
   * brushed-steel "empty box" glyph is rendered inline (no runtime icon font).
   */
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const DefaultEmptyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M21 8l-9 4-9-4 9-4 9 4z" />
    <path d="M3 8v8l9 4 9-4V8" />
    <path d="M12 12v8" />
  </svg>
)

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center",
        "bg-card text-card-foreground border border-dashed border-white/10",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          "bg-muted text-muted-foreground",
          "[box-shadow:var(--shadow-sm)]"
        )}
      >
        {icon ?? <DefaultEmptyIcon className="h-5 w-5" />}
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
