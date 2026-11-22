import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel Alert.
 *
 * An alert is a card, not a striped banner. The surface never carries a border
 * or a left rule: it takes the same inset highlight, 1px ring and soft drop as
 * every other card, at the 20px card radius. The variant lives in the icon
 * color alone, so a run of alerts reads as one stack of cards instead of five
 * colored boxes. Padding is 18px, and the icon sits in the top left corner
 * with the text indented past it.
 */

const alertVariants = cva(
  [
    "relative w-full rounded-[1.25rem] bg-card text-card-foreground p-[1.125rem]",
    "[box-shadow:var(--shadow-card)]",
    "[&>svg]:absolute [&>svg]:left-[1.125rem] [&>svg]:top-[1.125rem] [&>svg]:size-5",
    "[&>svg~*]:pl-8 [&>svg+div]:translate-y-[-0.0625rem]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "[&>svg]:text-muted-foreground",
        info: "[&>svg]:text-primary",
        success: "[&>svg]:text-[var(--success)]",
        warning: "[&>svg]:text-[var(--warning)]",
        destructive: "[&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

/** Props for `Alert`; the variant tints the icon and nothing else. */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-[1rem] leading-[1.375rem] font-semibold tracking-[-0.025rem] text-foreground",
      className,
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-[0.9063rem] leading-[1.3125rem] tracking-[0.0188rem] text-muted-foreground [&_p]:leading-[1.3125rem]",
      className,
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
