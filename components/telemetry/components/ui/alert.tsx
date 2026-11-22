import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room Alert: inline status panel.
// Tinted signal fill with a matching hairline border and a thick signal
// edge on the left, like a severity row in the alarm console.

const alertVariants = cva(
  [
    "relative w-full rounded-sm border p-4",
    "border-l-2",
    "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-card border-border border-l-primary text-foreground [&>svg]:text-primary",
        destructive:
          "bg-destructive/10 border-destructive/30 border-l-destructive text-destructive [&>svg]:text-destructive",
        warning:
          "bg-(--warning)/10 border-(--warning)/30 border-l-(--warning) text-(--warning) [&>svg]:text-(--warning)",
        info:
          "bg-(--info)/10 border-(--info)/30 border-l-(--info) text-(--info) [&>svg]:text-(--info)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 text-xs font-semibold uppercase tracking-widest leading-none",
      className
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
    className={cn("text-xs leading-relaxed opacity-90 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
