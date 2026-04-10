import * as React from "react"
import { cn } from "@/lib/utils"

// Luxe ButtonGroup: dark monochromatic, premium feel, rounded-xl outer edges
// Inner buttons flatten where they meet; border separation via border-white/5
// tracking-wide inherited from buttons; inset shadow on secondary group variant

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  attached?: boolean
  variant?: "default" | "bordered"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      attached = true,
      variant = "default",
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
          variant === "bordered" && [
            "rounded-xl border border-border overflow-hidden",
            "shadow-[inset_0_2px_4px_0_rgba(35,35,35,0.8)]",
          ],
          attached && [
            "[&>*]:rounded-none",
            isHorizontal
              ? [
                  "[&>*:first-child]:rounded-l-xl [&>*:last-child]:rounded-r-xl",
                  "[&>*:not(:first-child)]:-ml-px",
                ]
              : [
                  "[&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl",
                  "[&>*:not(:first-child)]:-mt-px",
                ],
            "[&>*]:relative [&>*:focus-visible]:z-10 [&>*:hover]:z-10",
            // Premium divider: very subtle white line
            isHorizontal
              ? "[&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-l-white/5"
              : "[&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-t-white/5",
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
