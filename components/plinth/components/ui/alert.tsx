import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Alert: an in-panel notice on a recessed well, its icon tinted by
 * tone. A destructive notice tints the well and its edge red; it never
 * floats, so it carries no drop shadow.
 */
const alertVariants = cva(
  [
    "relative w-full rounded-2xl border px-4 py-3.5 text-sm",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4",
    "[&>svg~*]:pl-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-input border-border text-foreground [box-shadow:var(--shadow-inset)] [&>svg]:text-muted-foreground",
        destructive:
          "bg-[oklch(0.22_0.05_25)] border-[oklch(0.62_0.2_25/0.45)] text-[color:oklch(0.9_0.06_25)] [&>svg]:text-destructive",
        success:
          "bg-[oklch(0.21_0.04_150)] border-[oklch(0.72_0.17_150/0.4)] text-[color:oklch(0.9_0.08_150)] [&>svg]:text-success",
        warning:
          "bg-[oklch(0.22_0.04_75)] border-[oklch(0.8_0.15_80/0.4)] text-[color:oklch(0.92_0.08_85)] [&>svg]:text-warning",
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
  <div ref={ref} role="alert" data-slot="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-tight tracking-tight", className)} {...props} />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm leading-relaxed opacity-90 [&_p]:leading-relaxed", className)} {...props} />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
