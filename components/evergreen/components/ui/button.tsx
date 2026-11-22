import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { emeraldPanelStyle } from "./_shared"

/*
 * Emerald Analytics Button — the dashboard's vivid emerald CTA.
 * The default (hero) variant is the solid emerald fill lit from above with a
 * soft emerald halo, exactly like the "Create New" action in the reference.
 * Hover brightens the emerald and deepens the halo; active presses it flat into
 * the surface. Secondary is the quiet charcoal-green panel tab.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-lg cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,filter] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-inset)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Hero — the vivid emerald CTA.
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-105 hover:[box-shadow:var(--shadow-primary),0_0.5rem_1.25rem_-0.1875rem_color-mix(in_oklch,var(--primary)_30%,transparent)]",
        // Primary — same emerald material as the hero default.
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-105 hover:[box-shadow:var(--shadow-primary),0_0.5rem_1.25rem_-0.1875rem_color-mix(in_oklch,var(--primary)_30%,transparent)]",
        // Secondary — quiet charcoal-green panel tab.
        secondary:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:text-foreground hover:[box-shadow:var(--shadow-button-hover)]",
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

// Filled variants carry a solid background, so they get the faint top-light
// sheen (laid over their token colour) to match the cards. Transparent variants
// (outline/ghost/link) skip it, otherwise the sheen would float on nothing.
const SHEENED_VARIANTS = new Set([undefined, "default", "primary", "secondary", "destructive"])

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const sheened = SHEENED_VARIANTS.has(variant ?? undefined)
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={sheened ? { ...emeraldPanelStyle, ...style } : style}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
