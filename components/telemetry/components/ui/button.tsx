import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room Button: raised signal control.
// default/primary: solid signal-green plate, near-black uppercase label,
// bright rim + inner top highlight + outer green glow (glow IS the elevation).
// destructive: alarm red with the same plate material in red.
// outline/secondary/ghost: dark console surfaces that energize toward green.

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-xs font-semibold uppercase tracking-wider leading-none",
    "rounded-sm transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:translate-y-px",
    "select-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-control)] " +
          "hover:[box-shadow:var(--shadow-control-hover)] hover:brightness-105",
        primary:
          "bg-primary text-primary-foreground " +
          "[box-shadow:var(--shadow-control)] " +
          "hover:[box-shadow:var(--shadow-control-hover)] hover:brightness-105",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-control-destructive)] " +
          "hover:brightness-110",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:border-ring/50 hover:text-primary " +
          "hover:[box-shadow:0_0_0.625rem_oklch(0.78_0.21_148/0.15)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-border " +
          "shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.04)] " +
          "hover:bg-accent hover:text-accent-foreground",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline " +
          "normal-case tracking-normal text-sm",
      },
      size: {
        sm: "h-7 px-2.5 gap-1.5",
        default: "h-9 px-4",
        lg: "h-10 px-5 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
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
