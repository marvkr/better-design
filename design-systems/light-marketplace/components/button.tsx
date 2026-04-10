import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Energetic Button: clean light/neutral marketplace aesthetic
// Charcoal primary (#1b1c1e), 14px radius, heavier font-semibold
// Treatment: charcoal CTA with subtle outer shadow + inset top highlight
// Secondary: light gray #f0f0f0 — no border (browser-confirmed)

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold",
    "rounded-[14px] transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Charcoal primary — marketplace "buy/sign-up" CTA with subtle depth
        default:
          "bg-primary text-primary-foreground " +
          "shadow-[0_1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] " +
          "hover:bg-primary/90 hover:shadow-[0_2px_6px_rgba(0,0,0,0.25),0_4px_12px_rgba(0,0,0,0.12)]",
        // Light gray secondary — #f0f0f0 NO border (browser-confirmed)
        secondary:
          "bg-secondary text-secondary-foreground " +
          "shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] " +
          "hover:bg-secondary/80",
        // Outline
        outline:
          "border border-border bg-transparent text-foreground " +
          "hover:bg-secondary",
        // Ghost
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground " +
          "shadow-[0_1px_3px_rgba(0,0,0,0.2)] " +
          "hover:bg-destructive/90",
        link:
          "text-primary underline-offset-4 hover:underline",
        // Muted
        muted:
          "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
      },
      size: {
        sm:      "h-9 px-4 text-xs rounded-xl",
        default: "h-11 px-5",
        lg:      "h-12 px-8 text-base rounded-[14px]",
        icon:    "h-11 w-11",
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
