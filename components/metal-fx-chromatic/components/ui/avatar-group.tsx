import * as React from "react"

import { cn } from "@/lib/utils"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  total?: number
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, total, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visible = max ? childArray.slice(0, max) : childArray
    const hiddenCount = (total ?? childArray.length) - visible.length

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {visible.map((child, i) => (
          <div
            key={i}
            className="ring-2 ring-background rounded-full"
          >
            {child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full",
              "bg-muted text-xs font-medium text-muted-foreground",
              "ring-2 ring-background [box-shadow:var(--shadow-s)]"
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
