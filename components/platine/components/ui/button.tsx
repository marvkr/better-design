import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Platine Button — brushed-metal controls on near-black.
 *   - default: a raised neutral bezel frame (the snippet's outer ring).
 *   - primary: the brushed-silver pill (the snippet's active slider material):
 *     a vertical metal gradient under the exact inset-highlight + 1px-rim +
 *     outer-drop shadow stack from --shadow-primary, with dark text.
 * Every variant is a full pill; pressing flattens the lift.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,filter] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-s)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // default IS the signature: the brushed-silver pill (the snippet's
        // active slider material). The showcase + templates render the hero
        // CTA with no variant prop, so the metal lives here.
        default:
          "text-primary-foreground [background-image:var(--metal)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--metal-hover)] hover:brightness-[1.03]",
        primary:
          "text-primary-foreground [background-image:var(--metal)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--metal-hover)] hover:brightness-[1.03]",
        // secondary is the raised neutral bezel frame (the snippet's outer ring).
        secondary:
          "text-secondary-foreground [background-image:var(--bezel)] " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/40",
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
        default: "h-9 px-5",
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
