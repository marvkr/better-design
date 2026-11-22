import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel Button.
 *
 * No variant is a flat fill. Every filled button carries a vertical gradient
 * between --primary-from and --primary-to, a 1px rim in the same hue, six
 * pixels of inset highlight along the top edge and a soft drop shadow. The
 * default height is 44px, the iOS tap target, and the radius sits at the
 * chip step so a button matches the rows it sits between.
 */

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[0.9063rem] font-semibold tracking-[-0.0125rem]",
    "rounded-[0.75rem] transition-[box-shadow,transform,background-color] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:size-[1.125rem] [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "text-primary-foreground",
          "bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
          "[box-shadow:var(--shadow-primary)]",
          "hover:bg-[linear-gradient(180deg,var(--primary-hover-from)_0%,var(--primary-hover-to)_100%)]",
          "hover:[box-shadow:var(--shadow-primary-hover)]",
        ].join(" "),
        secondary: [
          "text-foreground bg-card",
          "[box-shadow:var(--shadow-button)]",
          "hover:[box-shadow:var(--shadow-button-hover)]",
        ].join(" "),
        outline: [
          "text-foreground bg-transparent",
          "[box-shadow:var(--shadow-ring)]",
          "hover:bg-muted",
        ].join(" "),
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive: [
          "text-destructive-foreground",
          "bg-[linear-gradient(180deg,var(--destructive-from)_0%,var(--destructive-to)_100%)]",
          "[box-shadow:var(--shadow-destructive)]",
          "hover:[box-shadow:var(--shadow-destructive-hover)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-[0.625rem] px-3.5 text-[0.8125rem]",
        lg: "h-12 px-7 text-[1rem]",
        /* Circular, the spec's 42px step. */
        icon: "size-[2.625rem] rounded-full px-0",
        "icon-sm": "size-9 rounded-full px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

/** Props for `Button`, with `asChild` to render an anchor or a link component. */
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
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
