import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Graphite Button — the only "accent" surface in the system: a raised pill.
 *   - Gentle top->bottom gradient fill (light from above)
 *   - Hairline white border at ~7% (via border-border)
 *   - Inset top-edge highlight + soft outer drop shadow (--shadow-pill)
 *   - Active label sinks with a text-shadow; the pill nudges down on press
 *   - Secondary/outline/ghost stay calm tiles or flat surfaces, never glowy
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none tracking-[-0.01em]",
    "rounded-full cursor-pointer select-none",
    "transition-[background,box-shadow,transform,color] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[image:var(--pill-gradient)] text-primary-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:bg-[image:var(--pill-gradient-hover)] hover:[box-shadow:var(--shadow-pill-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        primary:
          "bg-[image:var(--pill-gradient)] text-primary-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:bg-[image:var(--pill-gradient-hover)] hover:[box-shadow:var(--shadow-pill-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        secondary:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-tile)] " +
          "hover:bg-accent hover:text-foreground hover:[box-shadow:var(--shadow-md)] " +
          "active:[box-shadow:var(--shadow-xs)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "[box-shadow:var(--shadow-tile)] " +
          "hover:bg-accent hover:border-foreground/15",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-pill-hover)]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4",
        lg: "h-11 px-6",
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
