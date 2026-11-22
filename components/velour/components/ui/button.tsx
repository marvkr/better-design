import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Velour Glass Button - velvet pills on a dim canvas.
 *   - default IS the signature: the pale champagne ivory pill from the
 *     reference's Gold/Dawn swatches. Opaque ivory gradient, bright inset
 *     top rim, warm lower bloom, deep ambient drop, dark text on top.
 *   - secondary: a raised velour face (opaque dark-to-darker gradient with
 *     an inset light rim), the material every panel in the reference wears.
 * No blur, no glow rings; pressing settles the lift.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-md cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,filter] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-s)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // The hero treatment lives on default: the showcase and templates
        // render the primary CTA with no variant prop.
        default:
          "text-primary-foreground [background-image:var(--champagne)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--champagne-hover)]",
        primary:
          "text-primary-foreground [background-image:var(--champagne)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--champagne-hover)]",
        // Raised velour face: the panel material as a control.
        secondary:
          "text-secondary-foreground [background-image:var(--velour-raised)] " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:[background-image:var(--velour-hover)] hover:[box-shadow:var(--shadow-button-hover)]",
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
        sm: "h-8 px-3.5 text-xs",
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
