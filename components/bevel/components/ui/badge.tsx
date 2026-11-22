import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel Badge — a 10px chip for counts, states and day labels. Filled
 * badges reuse the button gradient so a badge and a button read as one
 * material; tinted badges stay flat, because a status is not a control.
 */

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[0.625rem] px-2.5 py-1 " +
    "text-[0.7813rem] leading-4 font-semibold tracking-[0.0188rem] " +
    "transition-colors duration-fast",
  {
    variants: {
      variant: {
        default: "text-[var(--strong)] [box-shadow:var(--shadow-ring)] bg-[color:oklch(0.9_0.003_264.5)] dark:text-[color:oklch(0.491_0.015_267)]",
        primary:
          "text-primary-foreground bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)] [box-shadow:var(--shadow-primary)]",
        secondary: "bg-[color:oklch(0.898_0.003_264.5)] text-[color:oklch(0.49_0.023_264.4)]",
        outline: "bg-transparent text-foreground [box-shadow:var(--shadow-ring)] border border-[color:oklch(0.159_0.011_268)] dark:border-[color:oklch(0.279_0.011_268)]",
        destructive:
          "text-destructive-foreground bg-[linear-gradient(180deg,var(--destructive-from)_0%,var(--destructive-to)_100%)] [box-shadow:var(--shadow-destructive)]",
        success: "text-[var(--pop-green-foreground)] bg-[color:oklch(0.893_0.046_158)] dark:text-[color:oklch(0.476_0.102_160)]",
        warning: "text-[var(--pop-yellow-foreground)] bg-[color:oklch(0.896_0.064_95)] dark:text-[color:oklch(0.486_0.1_95)]",
        blue: "text-[var(--pop-blue-foreground)] bg-[color:oklch(0.898_0.031_264.5)] dark:text-[color:oklch(0.491_0.086_265)]",
        green: "text-[var(--pop-green-foreground)] bg-[color:oklch(0.893_0.046_158)] dark:text-[color:oklch(0.476_0.102_160)]",
        orange: "bg-[color:oklch(0.901_0.045_62)] text-[color:oklch(0.501_0.129_52)]",
        yellow: "text-[var(--pop-yellow-foreground)] bg-[color:oklch(0.896_0.064_95)] dark:text-[color:oklch(0.486_0.1_95)]",
        purple: "text-[var(--pop-purple-foreground)] bg-[color:oklch(0.903_0.043_293.5)] dark:text-[color:oklch(0.496_0.091_293.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

/** Props for `Badge`. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
