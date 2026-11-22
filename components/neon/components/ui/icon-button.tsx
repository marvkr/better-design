import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// neon Icon Button: square/circle button for icon-only actions
// Default/primary filled variant uses the neon gradient + neon glow.
// Ghost/outline are transparent and lift to bg-accent on hover.

const iconButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 outline-none transition duration-base ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground [background:var(--neon-gradient)] [box-shadow:var(--shadow-neon)] hover:[background:var(--neon-gradient-hover)] hover:[box-shadow:var(--shadow-neon-hover)]",
        secondary:
          "bg-secondary text-foreground border border-border hover:bg-accent",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/85",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent",
      },
      size: {
        xs: "h-7 w-7 rounded-[0.5rem] text-xs",
        sm: "h-8 w-8 rounded-[0.5rem] text-sm",
        default: "h-9 w-9 rounded-[0.625rem] text-sm",
        lg: "h-10 w-10 rounded-[0.625rem] text-base",
        xl: "h-11 w-11 rounded-[0.75rem] text-base",
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
