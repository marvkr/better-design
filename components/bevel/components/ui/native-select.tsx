import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { formFieldBase, formFieldSingleLine } from "./_shared"

/*
 * Bevel NativeSelect.
 *
 * The platform select dropped into the system's own well. The browser chrome
 * is stripped and a Solar chevron sits in the right gutter, so the control
 * matches the Radix Select beside it while the phone still opens its native
 * picker.
 */

/** Props for `NativeSelect`, the platform select in the system's field well. */
export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          formFieldBase,
          formFieldSingleLine,
          "cursor-pointer appearance-none pr-10",
          "text-[0.9063rem] leading-[1.125rem] tracking-[0.0188rem]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        icon="solar:alt-arrow-down-linear"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  ),
)
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
