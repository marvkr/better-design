import * as React from "react"
import { cn } from "@/lib/utils"

// Energetic ButtonGroup: light marketplace, rounded-[14px] outer, charcoal theme
// No shadows, no extra borders — Energetic philosophy is borderless and flat
// Divider: very subtle bg separation between attached buttons

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
                  "[&>*:first-child]:rounded-l-[14px] [&>*:last-child]:rounded-r-[14px]",
                  "[&>*:not(:first-child)]:-ml-px",
                ]
              : [
                  "[&>*:first-child]:rounded-t-[14px] [&>*:last-child]:rounded-b-[14px]",
                  "[&>*:not(:first-child)]:-mt-px",
                ],
            "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
            // Very subtle separator — no border, just a 1px bg bleed
            isHorizontal
              ? "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-foreground/5"
              : "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-t-foreground/5",
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
