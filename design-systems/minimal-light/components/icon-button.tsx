import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Luxe IconButton: square or circle icon buttons — consistent with Button styling
// Square = rounded-xl (default); circle = rounded-full

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "outline-none transition-all duration-200 ease-out",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.96]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-accent",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        muted:
          "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
      },
      size: {
        xs:      "h-6 w-6 text-[10px]",
        sm:      "h-8 w-8 text-xs",
        default: "h-10 w-10",
        lg:      "h-12 w-12",
        xl:      "h-14 w-14",
      },
      shape: {
        square:  "rounded-xl",
        circle:  "rounded-full",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "secondary",
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
        className={cn(iconButtonVariants({ variant, size, shape, className }))}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
