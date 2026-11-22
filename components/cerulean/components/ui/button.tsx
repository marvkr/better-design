import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Command Noir Button — the hero "run command" control.
 *   - default/primary: solid cool accent fill, hairline cool rim, faint top
 *     highlight, and a soft cool outer glow (the --accent material). This is
 *     the same skin the filled controls reuse, scaled down.
 *   - secondary: a raised keycap-style chip on the palette body.
 *   - outline / ghost: quiet list-row actions.
 *   - Small, precise 8px radius; tight mono-leaning label.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none tracking-[-0.005em]",
    "rounded-md cursor-pointer select-none",
    "transition-[background,box-shadow,transform,color,border-color] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "[background:var(--accent-fill)] text-primary-foreground " +
          "[box-shadow:var(--shadow-accent)] " +
          "hover:[background:var(--accent-fill-hover)] hover:[box-shadow:var(--shadow-accent-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        primary:
          "[background:var(--accent-fill)] text-primary-foreground " +
          "[box-shadow:var(--shadow-accent)] " +
          "hover:[background:var(--accent-fill-hover)] hover:[box-shadow:var(--shadow-accent-hover)] " +
          "active:[box-shadow:var(--shadow-sm)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border " +
          "[box-shadow:var(--shadow-xs)] " +
          "hover:bg-accent hover:text-foreground hover:[box-shadow:var(--shadow-sm)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-border/80",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:0_0_0_0.03125rem_oklch(0.62_0.2_22/0.6),0_0.0625rem_0.1875rem_oklch(0_0_0/0.5)] " +
          "hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm",
        default: "h-9 px-4",
        lg: "h-11 px-6 rounded-lg",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8 rounded-sm",
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
