import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Leather Luxe Alert: a raised card slip with a hairline sheen; the
// destructive variant warms toward saddle red.

const alertVariants = cva(
  [
    "relative w-full rounded-lg border p-4",
    "[box-shadow:var(--shadow-card)]",
    "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem]",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-highlight bg-card text-card-foreground [&>svg]:text-muted-foreground",
        destructive:
          "border-[oklch(0.62_0.16_30/0.4)] bg-[oklch(0.52_0.16_28/0.12)] text-[oklch(0.78_0.12_30)] [&>svg]:text-[oklch(0.78_0.12_30)]",
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
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
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
    className={cn("text-sm opacity-85 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
