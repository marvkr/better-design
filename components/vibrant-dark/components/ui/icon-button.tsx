import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Dynamic Icon Button: square/circle, vibrant colors, press animation

const iconButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center shrink-0 select-none outline-none",
    "transition-[transform,opacity] duration-150",
    "active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_14px_0_hsl(212_100%_47%/0.4)]",
        secondary:   "bg-accent text-accent-foreground hover:bg-accent/90",
        neutral:     "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "text-muted-foreground hover:bg-secondary hover:text-foreground",
        outline:     "border border-border bg-transparent text-foreground hover:bg-secondary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm:      "h-8 w-8 rounded-lg text-xs",
        default: "h-10 w-10 rounded-xl text-sm",
        lg:      "h-12 w-12 rounded-[14px] text-base",
      },
      shape: {
        square: "",
        circle: "!rounded-full",
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
