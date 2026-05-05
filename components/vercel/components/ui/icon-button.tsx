import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Vercel Icon Button: square/circle button for icon-only actions
// Based on Vercel's button pattern with icon sizes

const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 outline-none transition duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-primary/30",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80 ring-1 ring-border focus-visible:ring-2 focus-visible:ring-foreground/20",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline: "border border-border bg-background text-foreground hover:bg-secondary",
      },
      size: {
        xs: "h-7 w-7 rounded-lg text-xs",
        sm: "h-8 w-8 rounded-lg text-sm",
        default: "h-9 w-9 rounded-[10px] text-sm",
        lg: "h-10 w-10 rounded-[10px] text-base",
        xl: "h-11 w-11 rounded-[12px] text-base",
      },
      shape: {
        square: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
      shape: "square",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
