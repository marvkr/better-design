import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0 transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.96]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-muted-foreground border border-border hover:bg-border/60 hover:text-foreground",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost:
          "text-muted-foreground hover:bg-secondary hover:text-foreground",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary",
      },
      size: {
        sm:      "h-8 w-8 rounded-xl",
        default: "h-10 w-10 rounded-[14px]",
        lg:      "h-11 w-11 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  label: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, label, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
