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
  "relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-base ease-out focus-visible:outline-none disabled:pointer-events-none disabled:bg-secondary disabled:text-muted-foreground font-medium",
  {
    variants: {
      variant: {
        // Primary: charcoal (#2e2e2e) — precision multi-layer upward shadow + 1px outer ring
        default:
          "bg-primary text-primary-foreground hover:bg-primary/85 active:bg-primary/90 " +
          "shadow-[0_1rem_0.5rem_oklch(0.2393_0_0/0.01),0_0.75rem_0.375rem_oklch(0.2393_0_0/0.04),0_0.25rem_0.25rem_oklch(0.2393_0_0/0.07),0_0.0938rem_0.1875rem_oklch(0.2393_0_0/0.08),0_0_0_0.0625rem_oklch(0.1684_0_0),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.12)] " +
          "hover:shadow-[0_1rem_0.5rem_oklch(0.2393_0_0/0.02),0_0.75rem_0.375rem_oklch(0.2393_0_0/0.06),0_0.25rem_0.25rem_oklch(0.2393_0_0/0.1),0_0.0938rem_0.1875rem_oklch(0.2393_0_0/0.12),0_0_0_0.0625rem_oklch(0.1684_0_0),inset_0_0.0625rem_0.125rem_oklch(1_0_0/0.14)] " +
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

        // Neutral/white surface button with layered card shadow + 1px outer ring
        neutral:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 active:bg-secondary/80 " +
          "shadow-[0_0.0625rem_0.0625rem_0.0313rem_oklch(0.3211_0_0/0.04),0_0.1875rem_0.1875rem_-0.0938rem_oklch(0.3211_0_0/0.02),0_0.375rem_0.375rem_-0.1875rem_oklch(0.3211_0_0/0.04),0_0.75rem_0.75rem_-0.375rem_oklch(0.3211_0_0/0.04),0_1.5rem_1.5rem_-0.75rem_oklch(0.3211_0_0/0.04),0_0_0_0.0625rem_oklch(0.3211_0_0/0.1),inset_0_-0.0625rem_0.0625rem_-0.0313rem_oklch(0.3211_0_0/0.06)] " +
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
        default: "h-10 gap-3 rounded-[0.625rem] px-3.5 text-sm",
        sm:      "h-9 gap-3 rounded-lg px-3 text-sm",
        xs:      "h-8 gap-2.5 rounded-lg px-2.5 text-sm",
        xxs:     "h-7 gap-2.5 rounded-lg px-2 text-xs",
        lg:      "h-11 gap-3 rounded-[0.625rem] px-4 text-sm",
        xl:      "h-[2.75rem] gap-3 rounded-[0.8125rem] px-[1.125rem] text-sm",
        icon:    "h-10 w-10 rounded-[0.625rem]",
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
        type={asChild ? undefined : "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
