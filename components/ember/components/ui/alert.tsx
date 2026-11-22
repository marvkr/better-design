import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Amber Glass Alert: glass slab with a tinted rim per intent.

const alertVariants = cva(
  "relative w-full rounded-xl px-4 py-3 text-sm backdrop-blur-[var(--ag-blur)] " +
    "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.06)] " +
    "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--ag-fill)] border border-[color:var(--ag-border)] text-foreground [&>svg]:text-primary",
        destructive:
          "bg-destructive/10 border border-[color:oklch(0.6_0.21_27/0.35)] text-[oklch(0.78_0.13_27)] [&>svg]:text-[oklch(0.7_0.18_27)]",
        success:
          "bg-[oklch(0.72_0.15_155/0.08)] border border-[color:oklch(0.72_0.15_155/0.35)] text-[oklch(0.8_0.12_155)] [&>svg]:text-[oklch(0.72_0.15_155)]",
        warning:
          "bg-[oklch(0.78_0.14_80/0.08)] border border-[color:oklch(0.78_0.14_80/0.35)] text-[oklch(0.85_0.1_82)] [&>svg]:text-[oklch(0.78_0.14_80)]",
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
    className={cn("mb-1 font-bold leading-none tracking-[-0.01em]", className)}
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
    className={cn("text-sm opacity-90 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
