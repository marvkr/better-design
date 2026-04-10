import * as React from "react"
import { cn } from "@/lib/utils"

// Dynamic ButtonGroup: pill-shaped groups, dark theme, active:scale press
// Outer container gets full pill radius; inner buttons flatten on meeting edges
// Vibrant primary, divider via border-l border-primary/40 on non-first items

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
  pill?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
      pill = false,
      children,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal"

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          isHorizontal ? "flex-row" : "flex-col",
          attached && [
            "[&>*]:rounded-none",
            isHorizontal
              ? [
                  pill
                    ? "[&>*:first-child]:rounded-l-full [&>*:last-child]:rounded-r-full"
                    : "[&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl",
                  "[&>*:not(:first-child)]:-ml-px",
                ]
              : [
                  pill
                    ? "[&>*:first-child]:rounded-t-full [&>*:last-child]:rounded-b-full"
                    : "[&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl",
                  "[&>*:not(:first-child)]:-mt-px",
                ],
            "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
            // Divider line between buttons
            isHorizontal
              ? "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-white/10"
              : "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-t-white/10",
          ],
          !attached && [
            isHorizontal ? "gap-2" : "flex-col gap-2",
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
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("contents", className)} {...props}>
      {children}
    </div>
  )
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem }
export type { ButtonGroupProps, ButtonGroupItemProps }
