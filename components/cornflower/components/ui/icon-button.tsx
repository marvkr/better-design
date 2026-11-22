import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Ledger Light Icon Button: square/circle button for icon-only actions

const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 outline-none transition duration-base ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[var(--shadow-primary-control)] hover:bg-primary/90 focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80 ring-1 ring-border focus-visible:ring-[0.1875rem] focus-visible:ring-ring/30",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-card text-foreground hover:bg-secondary",
      },
      size: {
        xs: "h-7 w-7 rounded-md text-xs",
        sm: "h-8 w-8 rounded-md text-sm",
        default: "h-9 w-9 rounded-lg text-sm",
        lg: "h-10 w-10 rounded-lg text-base",
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
