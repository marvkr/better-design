import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 transition-all duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.95]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0.0625rem_0.1875rem_0_oklch(0.5875_0.2039_277.3624/0.3)]",
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
      corners: {
        square: "rounded-[0.625rem]",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      corners: "square",
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
  ({ className, variant, size, corners, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(iconButtonVariants({ variant, size, corners }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
