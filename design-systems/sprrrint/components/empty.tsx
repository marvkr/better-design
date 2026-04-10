import * as React from "react"
import { cn } from "@/lib/utils"

// Energetic Empty: light marketplace, rounded-[14px], NO shadows, NO borders on icon
// bg-[#f0f0f0] (bg-secondary) container; charcoal text; dashed border for empty area
// Clean and airy — marketplace style like an empty shop shelf

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
          "rounded-[14px] bg-secondary",
          "p-12 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center",
              "rounded-[10px] bg-background",
              "text-foreground/40",
              "[&>svg]:h-6 [&>svg]:w-6"
            )}
          >
            {icon}
          </div>
        )}

        <div className="flex flex-col gap-1.5 max-w-sm">
          <p className="text-sm font-semibold text-foreground leading-snug">
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
