import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visible = max ? childArray.slice(0, max) : childArray
    const overflow = max ? childArray.length - max : 0

    return (
      <div ref={ref} className={cn("flex -space-x-3", className)} {...props}>
        {visible}
        {overflow > 0 && (
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full",
              "ring-1 ring-border [background-image:var(--velour-raised)]",
              "[box-shadow:var(--shadow-s)]",
              "text-xs font-medium text-secondary-foreground"
            )}
          >
            +{overflow}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
