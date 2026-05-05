import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { BorderBeam } from "./border-beam"

/*
 * Beam Custom Button — pill-shaped surface wrapped with a hand-rolled
 * conic-gradient beam. The "primary" and "default" variants render the
 * beam; outline/ghost/link skip it for visual quietness. The beam itself
 * is opt-in per-call via the `beam` prop (defaults to true on default + primary).
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap relative",
    "text-sm font-medium leading-none",
    "rounded-full cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:text-foreground",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-110",
        secondary:
          "bg-muted text-muted-foreground " +
          "[box-shadow:var(--shadow-s)] " +
          "hover:bg-accent hover:text-accent-foreground",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/30",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-105",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        default: "h-9 px-4",
        lg: "h-10 px-6",
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
  beam?: boolean
}

const beamVariants = new Set(["default", "primary"])

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, beam, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const showBeam = beam ?? beamVariants.has(variant ?? "default")
    const button = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!showBeam) return button

    return (
      <BorderBeam size="sm" variant="colorful" borderRadius={9999} className="inline-flex align-middle">
        {button}
      </BorderBeam>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
