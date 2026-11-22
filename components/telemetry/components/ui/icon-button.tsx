import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room IconButton: square console key.
// default carries the signal-green plate like the primary Button;
// ghost/outline are quiet dark keys that energize toward green.

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-sm transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-px",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-control)] " +
          "hover:[box-shadow:var(--shadow-control-hover)] hover:brightness-105",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        outline:
          "bg-transparent text-foreground " +
          "border border-border " +
          "hover:border-ring/50 hover:text-primary",
      },
      size: {
        sm: "h-8 w-8 [&>svg]:size-3.5",
        default: "h-9 w-9 [&>svg]:size-4",
        lg: "h-10 w-10 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
