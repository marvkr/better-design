import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { folioGrainStyle } from "./_shared"

/*
 * Folio Button — a raised "folder tab".
 * The 4-sided rim (bright top + faint side walls) over a soft ambient pool reads
 * as a card lifted off the folder. Hover lifts higher (brighter rim, deeper
 * ambient); active presses it flat into the surface.
 * Primary swaps the black ambient for a warm amber glow (the paper-amber tab).
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-lg cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-inset)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-105 hover:[box-shadow:var(--shadow-primary),0_0.5rem_1.25rem_-0.1875rem_color-mix(in_oklch,var(--primary)_30%,transparent)]",
        secondary:
          "bg-muted text-muted-foreground " +
          "[box-shadow:var(--shadow-s)] " +
          "hover:bg-accent hover:text-accent-foreground hover:[box-shadow:var(--shadow-m)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/30",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-105 hover:[box-shadow:var(--shadow-button-hover)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4",
        lg: "h-10 px-6",
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

// Filled variants carry a solid background, so they get Folio's fractal grain
// (blended over their token color) to match the cards. Transparent variants
// (outline/ghost/link) skip it, otherwise raw noise would float on nothing.
const GRAINED_VARIANTS = new Set([undefined, "default", "primary", "secondary", "destructive"])

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const grained = GRAINED_VARIANTS.has(variant ?? undefined)
    return (
      <Comp
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={grained ? { ...folioGrainStyle, ...style } : style}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
