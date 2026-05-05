import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Inset Dark Button — built on the same pill recipe as the toggle.
 *   - Top→bottom gradient (light from above)
 *   - 0.5px hairline border at 8% white
 *   - Inset top-edge highlight + outer drop shadow
 *   - Active label gets a 1px text-shadow to drop into the surface
 *   - Pressed state flattens: shadow shrinks, transform nudges down
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none tracking-[-0.01em]",
    "rounded-[9px] cursor-pointer select-none",
    "transition-[background,box-shadow,transform,color] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--pill-gradient)] text-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:[background:var(--pill-gradient-hover)] hover:[box-shadow:var(--shadow-pill-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        primary:
          "[background:var(--pill-gradient)] text-foreground " +
          "[text-shadow:var(--text-shadow-pressed)] " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:[background:var(--pill-gradient-hover)] hover:[box-shadow:var(--shadow-pill-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        secondary:
          "bg-card text-[rgba(255,255,255,0.78)] " +
          "[box-shadow:var(--shadow-sm)] " +
          "hover:bg-accent hover:text-foreground hover:[box-shadow:var(--shadow-md)] " +
          "active:[box-shadow:var(--shadow-xs)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-[rgba(255,255,255,0.16)]",
        ghost:
          "bg-transparent text-[rgba(255,255,255,0.55)] " +
          "hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-pill)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-pill-hover)]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[7px]",
        default: "h-9 px-4",
        lg: "h-11 px-6 rounded-[11px]",
        icon: "h-9 w-9",
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
