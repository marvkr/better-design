import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Chrome Azure Button — a raised metal chip. `default` is brushed silver,
 * `primary` is the azure alloy (same material as a checked switch). Both carry
 * a beveled rim (inset top highlight) and a soft drop shadow, and depress a
 * pixel on press. Quiet variants (outline / ghost / link) drop the metal.
 */

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none rounded-full cursor-pointer select-none",
    "transition-[background,box-shadow,transform,color] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-[0.0938rem] border-transparent bg-origin-border text-foreground " +
          "[background:var(--surface-silver)_padding-box,var(--metal-rim)_border-box] " +
          "[box-shadow:var(--shadow-button)] hover:brightness-110 hover:[box-shadow:var(--shadow-button-hover)]",
        primary:
          "border-[0.0938rem] border-transparent bg-origin-border text-primary-foreground " +
          "[background:var(--surface-on)_padding-box,var(--metal-rim)_border-box] " +
          "[box-shadow:var(--shadow-primary)] hover:brightness-110",
        secondary:
          "bg-secondary text-secondary-foreground " +
          "[box-shadow:var(--shadow-sm)] hover:bg-accent hover:[box-shadow:var(--shadow-md)]",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/40",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-button)] hover:brightness-110 hover:[box-shadow:var(--shadow-button-hover)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        default: "h-9 px-5",
        lg: "h-11 px-7",
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
