import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center outline-none transition-[background-color,color,box-shadow] duration-fast focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [box-shadow:var(--shadow-primary)] hover:bg-primary/90",
        secondary: "bg-background text-foreground [box-shadow:var(--shadow-control)] hover:bg-secondary hover:[box-shadow:var(--shadow-control-hover)]",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-control)] hover:bg-destructive/90",
        outline: "bg-background text-foreground [box-shadow:var(--shadow-control)] hover:bg-secondary hover:[box-shadow:var(--shadow-control-hover)]",
      },
      size: {
        xs: "h-7 w-7 rounded text-xs",
        sm: "h-8 w-8 rounded-md text-sm",
        default: "h-9 w-9 rounded-md text-sm",
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
