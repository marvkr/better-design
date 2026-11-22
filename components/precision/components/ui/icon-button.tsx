import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Precision Icon Button: square/circle button for icon-only actions. The
// default mirrors the primary Button material (solid blue, 1px rim, inset
// highlight); neutral variants stay crisp and border-first. Precise small radius.

const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 outline-none transition-[background-color,box-shadow,border-color] duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/92 shadow-[0_0_0_0.0625rem_oklch(0.5_0.18_268),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.16)]",
        secondary:
          "bg-background text-secondary-foreground border border-border shadow-[0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.06)] hover:bg-accent",
        ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/92 shadow-[0_0_0_0.0625rem_oklch(0.5_0.2_24),0_0.0625rem_0.125rem_oklch(0.21_0.006_271/0.12),inset_0_0.0625rem_0_oklch(1_0_0/0.14)]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent hover:border-ring/40",
      },
      size: {
        xs: "h-7 w-7 rounded-sm text-xs",
        sm: "h-8 w-8 rounded-md text-sm",
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
