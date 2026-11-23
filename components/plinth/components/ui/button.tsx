import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Button: a machined control seated in the panel.
 *   - default/primary: the ember gradient, a white catch-light along the top
 *     edge, an ember rim and a dark groove ring that seats it in the panel.
 *   - secondary: the same shape in graphite, the toolbar's resting control.
 *   - outline / ghost: quiet actions inside a panel row.
 * 0.875rem corners on a 2.25rem control, the radius of every tool button.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-lg cursor-pointer select-none",
    "transition-[background,box-shadow,color,border-color,scale] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-safe:active:scale-[0.98]",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--ember-gradient)] text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-105",
        primary:
          "[background:var(--ember-gradient)] text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-105",
        secondary:
          "[background:var(--graphite-gradient)] text-secondary-foreground font-normal " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:[box-shadow:var(--shadow-button-hover)] hover:text-foreground",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-muted",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:inset_0_0.0625rem_0_oklch(1_0_0/0.3),0_0_0_0.0625rem_oklch(0.48_0.17_25)] " +
          "hover:brightness-105",
        link: "h-auto px-0 text-foreground underline-offset-4 hover:text-primary",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-3.5",
        lg: "h-11 px-6 text-sm rounded-xl",
        icon: "size-9",
        "icon-sm": "size-8 rounded-md",
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
