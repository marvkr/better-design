import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Clicky Badge — small rounded-full pill using semantic tokens only
// No gradients, no glass. Clean flat variants.

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-colors duration-fast",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-[color:oklch(0.57_0.22_264)]",
        secondary: "text-secondary-foreground hover:bg-secondary/80 bg-[color:oklch(0.91_0_186)] dark:text-[color:oklch(0.495_0_178.3)]",
        outline: "border border-border bg-transparent text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-4 gap-1 px-1.5 text-[0.625rem]",
        default: "h-5 gap-1.5 px-2 text-xs",
        lg: "h-6 gap-1.5 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
