import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { amieGrainStyle } from "./_shared"

/*
 * Amie Pastel Button — a soft inflated pillow.
 * The default (hero) variant is Amie's signature soft-green fill: a bright inset
 * top highlight over a gentle green ambient glow (--shadow-primary), so the CTA
 * looks like a friendly squishy pill. Hover lifts the glow a touch; active
 * presses it gently into a soft inset. Secondary is a plain white pillow.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-inset)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero: soft green pillow. Same material as primary.
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        // Secondary: plain white pillow.
        secondary:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:text-accent-foreground hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/40 hover:text-accent-foreground",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-105 hover:[box-shadow:var(--shadow-button-hover)]",
        link: "text-primary-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        default: "h-9 px-5",
        lg: "h-11 px-7 text-base",
        icon: "h-9 w-9",
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

// Filled variants carry a solid background, so they get Amie's faint top sheen
// (a soft white highlight over their token color) to match the cards. Transparent
// variants (outline/ghost/link) skip it, otherwise the sheen would float on nothing.
const SHEEN_VARIANTS = new Set([undefined, "default", "primary", "secondary", "destructive"])

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const sheened = SHEEN_VARIANTS.has(variant ?? undefined)
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={sheened ? { ...amieGrainStyle, ...style } : style}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
