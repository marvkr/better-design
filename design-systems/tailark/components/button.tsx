import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Earthy Button: neutral monochromatic — near-white primary on near-black bg
// 8px radius, precise shadows, understated depth
// Primary: white CTA with subtle ring + depth shadow
// Secondary: dark panel with border + inset shadow

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
    "rounded-lg transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary: near-white on near-black with ring + shadow depth
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.85)] " +
          "hover:bg-primary/95 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.85)]",
        // Secondary: dark panel with border + depth
        secondary:
          "bg-secondary text-secondary-foreground border border-border " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] " +
          "hover:bg-accent hover:border-border/60",
        // Outline: border only
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary hover:border-border/60",
        // Ghost
        ghost:
          "text-muted-foreground hover:bg-secondary hover:text-foreground",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.3)] " +
          "hover:bg-destructive/90",
        // Link
        link:
          "text-foreground underline-offset-4 hover:underline",
        // Muted
        muted:
          "bg-muted text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
      },
      size: {
        sm:      "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4",
        lg:      "h-10 px-6 text-base",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
