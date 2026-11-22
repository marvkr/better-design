import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Terminal Button — a key on a CRT control panel.
 *   - Monospace, UPPERCASE, wide tracking (panel labels: PWR / HDD / RUN).
 *   - Sharp 2px corners (boxes drawn in character cells).
 *   - primary = live phosphor: bright cyan fill, deep-navy legend, cyan bloom.
 *   - default/secondary = unlit panel keys with a thin cyan rim that lights on hover.
 *   - Press nudges down and drops the glow (key bottoming out).
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-mono text-xs font-medium uppercase tracking-[0.08em] leading-none",
    "rounded-sm cursor-pointer select-none",
    "transition-[background-color,box-shadow,transform,color] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-sm)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-primary),0_0_1.25rem_oklch(0.80_0.15_205_/_0.5)]",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-primary),0_0_1.25rem_oklch(0.80_0.15_205_/_0.5)]",
        secondary:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:bg-accent hover:text-accent-foreground hover:[box-shadow:var(--shadow-button-hover)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/60 hover:[box-shadow:0_0_0.625rem_oklch(0.80_0.15_205_/_0.18)]",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-button)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-button-hover)]",
        link: "text-primary underline-offset-4 hover:underline normal-case tracking-normal",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-6 text-sm",
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
