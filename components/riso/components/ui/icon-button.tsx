import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Retro-Playful Icon Button: square/circle button for icon-only actions

const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 outline-none border-2 border-border shadow-[var(--shadow-hard-sm)] transition-all duration-fast ease-out focus-visible:outline-none active:translate-x-[0.1875rem] active:translate-y-[0.1875rem] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-primary/30",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-foreground/20",
        ghost: "border-transparent shadow-none text-muted-foreground hover:bg-secondary hover:text-foreground active:translate-x-0 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline: "bg-background text-foreground hover:bg-secondary",
      },
      size: {
        xs: "h-7 w-7 rounded-lg text-xs",
        sm: "h-8 w-8 rounded-lg text-sm",
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
