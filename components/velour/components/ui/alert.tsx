import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * A quiet velvet strip: resting card material with a soft inset rim.
 * Status hues stay dim, like the reference's muted labels.
 */

const alertVariants = cva(
  [
    "relative w-full rounded-lg p-4",
    "[box-shadow:var(--shadow-s)]",
    "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background-image:var(--velour)] text-foreground",
        destructive:
          "bg-destructive/10 text-[oklch(0.78_0.14_22)] [box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.05),0_0.0625rem_0.125rem_oklch(0_0_0/0.4)] [&>svg]:text-[oklch(0.78_0.14_22)]",
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
    className={cn("text-sm text-muted-foreground [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
