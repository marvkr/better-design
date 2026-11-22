import * as React from "react"
import { cn } from "@/lib/utils"

// Dark Neon AI ButtonGroup: groups buttons horizontally/vertically, merging the
// rounded edges where buttons meet (outer corners keep the 10px pill radius).

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = true, children, ...props }, ref) => {
    const isHorizontal = orientation === "horizontal"

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row" : "flex-col",
          attached && [
            "rounded-[0.625rem]",
            "*:rounded-none",
            isHorizontal
              ? "[&>*:first-child]:rounded-l-[0.625rem] [&>*:last-child]:rounded-r-[0.625rem]"
              : "[&>*:first-child]:rounded-t-[0.625rem] [&>*:last-child]:rounded-b-[0.625rem]",
            isHorizontal
              ? "[&>*:not(:first-child)]:-ml-px"
              : "[&>*:not(:first-child)]:-mt-px",
            "*:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
          ],
          !attached && [
            isHorizontal ? "gap-2" : "gap-2 flex-col",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

interface ButtonGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("contents", className)} {...props}>
        {children}
      </div>
    )
  }
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem }
export type { ButtonGroupProps, ButtonGroupItemProps }
