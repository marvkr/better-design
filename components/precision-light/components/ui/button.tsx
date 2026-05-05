import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Sharp Light — browser-extracted from the original site (2026)
// Primary: charcoal near-black #2e2e2e (rgb 46,46,46 — same as body text)
// Shadow: precision multi-layer upward diffuse + 1px outer ring + inset white highlight
// Extracted exact shadow: rgba(31,31,31,0.01) 0px 16px 8px, rgba(31,31,31,0.04) 0px 12px 6px,
//   rgba(31,31,31,0.07) 0px 4px 4px, rgba(31,31,31,0.08) 0px 1.5px 3px,
//   rgb(15,15,15) 0px 0px 0px 1px, rgba(255,255,255,0.12) 0px 1px 2px inset
// Neutral/white surface button: white bg + same card shadow pattern
// Radius: 10px default, 13px for xl (CTA size)
// Ring/focus: blue #335cff = hsl(228,100%,60%)

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:bg-secondary disabled:text-muted-foreground font-medium",
  {
    variants: {
      variant: {
        // Primary: charcoal (#2e2e2e) — precision multi-layer upward shadow + 1px outer ring
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85 active:bg-primary/90 " +
          "shadow-[0_16px_8px_rgba(31,31,31,0.01),0_12px_6px_rgba(31,31,31,0.04),0_4px_4px_rgba(31,31,31,0.07),0_1.5px_3px_rgba(31,31,31,0.08),0_0_0_1px_rgb(15,15,15),inset_0_1px_2px_rgba(255,255,255,0.12)] " +
          "hover:shadow-[0_16px_8px_rgba(31,31,31,0.02),0_12px_6px_rgba(31,31,31,0.06),0_4px_4px_rgba(31,31,31,0.10),0_1.5px_3px_rgba(31,31,31,0.12),0_0_0_1px_rgb(15,15,15),inset_0_1px_2px_rgba(255,255,255,0.14)] " +
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        // Neutral/white surface button with layered card shadow + 1px outer ring
        neutral:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 active:bg-secondary/80 " +
          "shadow-[0_1px_1px_0.5px_rgba(51,51,51,0.04),0_3px_3px_-1.5px_rgba(51,51,51,0.02),0_6px_6px_-3px_rgba(51,51,51,0.04),0_12px_12px_-6px_rgba(51,51,51,0.04),0_24px_24px_-12px_rgba(51,51,51,0.04),0_0_0_1px_rgba(51,51,51,0.1),inset_0_-1px_1px_-0.5px_rgba(51,51,51,0.06)] " +
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/85 active:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-destructive/30",

        // Outline: 1px ring border (stroke-soft-200 equivalent)
        outline:
          "ring-1 ring-inset ring-border bg-background text-foreground hover:bg-accent hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        // Secondary: muted bg, foreground text
        secondary:
          "bg-muted text-foreground ring-1 ring-inset ring-border hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",

        // Ghost
        ghost:
          "bg-transparent text-foreground/70 hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring",

        // Link (uses ring color = blue)
        link: "bg-transparent text-ring underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-3 rounded-[10px] px-3.5 text-sm",
        sm:      "h-9 gap-3 rounded-lg px-3 text-sm",
        xs:      "h-8 gap-2.5 rounded-lg px-2.5 text-sm",
        xxs:     "h-7 gap-2.5 rounded-lg px-2 text-xs",
        lg:      "h-11 gap-3 rounded-[10px] px-4 text-sm",
        xl:      "h-[44px] gap-3 rounded-[13px] px-[18px] text-sm",
        icon:    "h-10 w-10 rounded-[10px]",
        "icon-sm": "h-9 w-9 rounded-lg",
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
