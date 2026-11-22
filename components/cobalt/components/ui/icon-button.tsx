import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * IconButton — the spec's circular toolbar keys (refresh, bell): raised
 * bezel discs by default, the cobalt material for the primary action.
 */

const iconButtonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center outline-none",
    "transition-[background-color,box-shadow,border-color] duration-fast",
    "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-press)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground [background-image:var(--cobalt)] [box-shadow:var(--shadow-primary)] hover:[background-image:var(--cobalt-hover)] hover:[box-shadow:var(--shadow-primary-hover)]",
        secondary:
          "text-secondary-foreground border border-border [background-image:var(--bezel)] [box-shadow:var(--shadow-raised)] hover:[box-shadow:var(--shadow-raised-hover)]",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-raised)] hover:brightness-110",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent",
      },
      size: {
        xs: "h-7 w-7 rounded-sm text-xs",
        sm: "h-8 w-8 rounded-sm text-sm",
        default: "h-9 w-9 rounded-md text-sm",
        lg: "h-10 w-10 rounded-md text-base",
        xl: "h-11 w-11 rounded-lg text-base",
      },
      corners: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      corners: "square",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, corners, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, corners, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
