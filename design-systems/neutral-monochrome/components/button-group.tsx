import * as React from "react"
import { cn } from "@/lib/utils"

// Earthy ButtonGroup: dark neutral, rounded-lg (8px), minimal — no glows
// Monochromatic dividers via border-white/10 between attached buttons
// Clean and sharp — nearest to a standard shadcn group but darker

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
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
                  "[&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg",
                  "[&>*:not(:first-child)]:-ml-px",
                ]
              : [
                  "[&>*:first-child]:rounded-t-lg [&>*:last-child]:rounded-b-lg",
                  "[&>*:not(:first-child)]:-mt-px",
                ],
            "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
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
