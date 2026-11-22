import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Cashmere Button: a flat action pill.
 * Fully pill-shaped (rounded-full), a flat solid fill with NO gradient, sheen or
 * glow. The default (hero) variant is the warm near-black primary, exactly the
 * site's main CTA. Depth is just a hairline; tactility comes from a gentle
 * spring press (active:scale) rather than a pressed-in shadow — Cashmere is
 * clean paper, not a squishy pillow.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,color] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero: warm near-black pill, flat. Hover lifts a hair lighter.
        default:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-xs)] " +
          "hover:bg-primary/90",
        primary:
          "bg-primary text-primary-foreground [box-shadow:var(--shadow-xs)] " +
          "hover:bg-primary/90",
        // Secondary: the cream pill — flat with a hairline ring.
        secondary:
          "bg-secondary text-secondary-foreground [box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-foreground/20 hover:text-accent-foreground",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground [box-shadow:var(--shadow-xs)] " +
          "hover:brightness-105",
        link: "text-foreground underline-offset-4 hover:underline hover:text-ring",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        default: "h-10 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
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
