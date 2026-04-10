import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe Empty: ultra-dark monochromatic, premium dashed border
// Icon in a precise square with inset shadow, tracking-wide text
// Minimal — no colored glows, pure monochromatic

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
          "flex flex-col items-center justify-center gap-6",
          "rounded-xl border border-dashed border-border bg-card/40",
          "p-14 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              "border border-border bg-secondary",
              "shadow-[inset_0_2px_4px_0_rgba(35,35,35,0.8)]",
              "text-muted-foreground",
              "[&>svg]:h-6 [&>svg]:w-6"
            )}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-2 max-w-xs">
          <p className="text-sm font-medium tracking-wide text-foreground">
            {title}
          </p>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">
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
