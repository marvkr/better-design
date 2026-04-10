import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Monochrome Industrial Button — monochrome, industrial, sharp corners.
// Default = white-on-black (or black-on-white in light mode), no shadows,
// 1px hairline border separation, Space Mono ALL CAPS for the label.
// Destructive uses the signal-light red (#D71921).

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-[family-name:var(--font-mono)] uppercase tracking-[0.08em] text-[12px] font-medium",
    "rounded-none border transition-[background-color,color,border-color] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mono-accent)] focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-[1px]",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary — high-contrast slab. Inverted background, no shadow.
        default:
          "bg-primary text-primary-foreground border-primary " +
          "hover:bg-primary/90 hover:border-primary/90",
        // Secondary — surface with hairline border.
        secondary:
          "bg-[var(--mono-surface-raised)] text-foreground border-[var(--mono-border-visible)] " +
          "hover:border-foreground/60",
        // Outline — fully transparent, border carries the weight.
        outline:
          "bg-transparent text-foreground border-[var(--mono-border-visible)] " +
          "hover:border-foreground hover:bg-[var(--mono-surface)]",
        // Ghost — no border, no fill, label only. The minimal end of the system.
        ghost:
          "bg-transparent text-muted-foreground border-transparent " +
          "hover:text-foreground hover:bg-[var(--mono-surface)]",
        // Destructive — the signal-light red moment.
        destructive:
          "bg-[var(--mono-accent)] text-white border-[var(--mono-accent)] " +
          "hover:bg-[var(--mono-accent)]/90",
        // Link — Space Mono underlined.
        link:
          "border-transparent text-foreground underline underline-offset-[6px] decoration-[1px] " +
          "hover:text-[var(--mono-accent)]",
      },
      size: {
        sm:      "h-8  px-3 text-[11px]",
        default: "h-10 px-5",
        lg:      "h-12 px-7 text-[13px]",
        icon:    "h-10 w-10",
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
