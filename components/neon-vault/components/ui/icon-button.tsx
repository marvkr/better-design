import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Neon Vault IconButton: circular pucks for icon-only actions, like the
// wallet's swap and history buttons. Default ghost; primary takes the hero
// magenta material.

const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center outline-none transition duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary [background-image:var(--gradient-primary)] text-primary-foreground [box-shadow:var(--shadow-button)] hover:brightness-110",
        secondary:
          "bg-secondary text-foreground border border-border [box-shadow:var(--shadow-raised)] hover:bg-accent",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-110",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
      },
      size: {
        xs: "h-7 w-7 rounded-full text-xs",
        sm: "h-8 w-8 rounded-full text-sm",
        default: "h-9 w-9 rounded-full text-sm",
        lg: "h-10 w-10 rounded-full text-base",
        xl: "h-11 w-11 rounded-full text-base",
      },
      corners: {
        square: "rounded-md",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      corners: "circle",
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
