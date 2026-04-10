import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.95]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_1px_3px_0_hsl(239_84%_67%/0.3)]",
        secondary:
          "bg-card text-foreground border border-border hover:bg-accent hover:border-border/60",
        neutral:
          "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground",
        ghost:
          "text-muted-foreground hover:bg-secondary hover:text-foreground",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary/10",
      },
      size: {
        sm:      "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5",
        default: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4",
        lg:      "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
      },
      shape: {
        square: "rounded-[10px]",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "square",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(iconButtonVariants({ variant, size, shape }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
