import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Editorial Warm Button — translucent white pill on warm cream.
//  - --glass-* tokens for fill (all tiers stay translucent so blur shows)
//  - --glass-blur token applied via backdrop-filter so the canvas halos
//    behind every pill get blurred — that's the actual frosted look
//  - 1.5px white top inset highlight, dim bottom inset
//  - tiny outer halo
//  - 99px pill radius
// Primary differs from secondary via alpha + inner-highlight intensity, NOT
// by being opaque (opaque would kill the blur). Terracotta only as link
// text + focus ring.

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium tracking-[-0.005em]",
    "outline-none transition-all duration-base ease-out",
    "[backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Default / hero — strongest glass tier, brighter top inset, lifted halo.
        default: [
          "rounded-full text-foreground/90",
          "bg-[var(--glass-strong)]",
          "shadow-[inset_0_0.0938rem_0_oklch(1_0_0_/_0.75),inset_0_-0.0938rem_0_oklch(1_0_0_/_0.25),0_0.0625rem_0.125rem_oklch(0_0_0_/_0.06),0_0.25rem_0.625rem_oklch(0_0_0_/_0.08)]",
          "hover:bg-[var(--glass-hover-strong)]",
          "hover:shadow-[inset_0_0.0938rem_0_oklch(1_0_0_/_0.85),inset_0_-0.0938rem_0_oklch(1_0_0_/_0.28),0_0.125rem_0.25rem_oklch(0_0_0_/_0.08),0_0.375rem_0.875rem_oklch(0_0_0_/_0.10)]",
          "hover:-translate-y-px",
        ].join(" "),

        // Secondary — mid translucent tier.
        secondary: [
          "rounded-full text-foreground/75",
          "bg-[var(--glass)]",
          "shadow-[var(--shadow-glass)]",
          "hover:bg-[var(--glass-hover)]",
          "hover:shadow-[var(--shadow-glass-hover)]",
        ].join(" "),

        // Outline — ink hairline only, no glass fill.
        outline:
          "rounded-full border border-border bg-transparent text-foreground/70 backdrop-blur-0 hover:bg-[var(--glass-soft)]",

        // Ghost — faint text only.
        ghost:
          "rounded-full text-foreground/30 backdrop-blur-0 hover:text-foreground/60",

        // Destructive — saturated red.
        destructive: [
          "rounded-full font-semibold bg-destructive text-destructive-foreground backdrop-blur-0",
          "shadow-[inset_0_0.0938rem_0_oklch(1_0_0_/_0.3),0_0_0.25rem_color-mix(in_oklch,var(--destructive)_30%,transparent)]",
          "hover:bg-destructive/95",
          "hover:shadow-[inset_0_0.0938rem_0_oklch(1_0_0_/_0.35),0_0.125rem_0.5rem_color-mix(in_oklch,var(--destructive)_40%,transparent)]",
        ].join(" "),

        // Link — terracotta text.
        link:
          "text-primary underline-offset-4 hover:underline backdrop-blur-0 shadow-none",

        // Muted — lightest tier.
        muted: [
          "rounded-full text-foreground/50",
          "bg-[var(--glass-soft)]",
          "shadow-[var(--shadow-glass)]",
          "hover:text-foreground/75",
          "hover:bg-[var(--glass-hover-soft)]",
        ].join(" "),
      },
      size: {
        sm:      "h-8 px-4 text-xs",
        default: "h-11 px-7 text-[0.9375rem]",
        lg:      "h-12 px-8 text-base",
        xl:      "h-14 px-10 text-base",
        icon:    "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
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
