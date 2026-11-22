import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * Bevel AvatarGroup.
 *
 * Faces overlap by 8px and each one carries a ring in the page color, which is
 * what cuts the circle behind it cleanly. The overflow count is an inner
 * surface at the same size, so it reads as another seat in the row rather than
 * a control.
 */

/** Props for `AvatarGroup`; `max` caps the faces, `total` names the real count. */
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
          <div key={i} className="rounded-full ring-2 ring-background">
            {child}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full",
              "bg-[var(--inner)] text-[var(--strong)]",
              "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem]",
              "ring-2 ring-background [box-shadow:var(--shadow-inset)]",
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
    )
  },
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup }
