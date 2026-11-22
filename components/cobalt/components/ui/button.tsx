import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Cobalt Inset Button — carved dark controls with a cobalt hero material.
 *   - default/primary: the cobalt material from the spec's active elements:
 *     a vertical blue gradient under a white top highlight, a 1px cyan rim,
 *     and a blue-tinted outer bloom (--shadow-primary). Checked controls
 *     reuse this exact stack.
 *   - secondary: the raised dark bezel of the spec's "Monthly" and
 *     "This month" pills: dark gradient face, 1px border, top inset
 *     highlight plus a soft outer drop.
 * Pressing flattens the lift into the surface (--shadow-press).
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium leading-none",
    "rounded-md cursor-pointer select-none",
    "transition-[background-color,box-shadow,border-color,transform] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px active:[box-shadow:var(--shadow-press)]",
  ].join(" "),
  {
    variants: {
      variant: {
        // default IS the signature: the cobalt material. The showcase and
        // templates render the hero CTA with no variant prop.
        default:
          "text-primary-foreground [background-image:var(--cobalt)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--cobalt-hover)] hover:[box-shadow:var(--shadow-primary-hover)]",
        primary:
          "text-primary-foreground [background-image:var(--cobalt)] " +
          "[box-shadow:var(--shadow-primary)] " +
          "hover:[background-image:var(--cobalt-hover)] hover:[box-shadow:var(--shadow-primary-hover)]",
        // secondary is the raised dark bezel pill from the spec's toolbar.
        secondary:
          "text-secondary-foreground border border-border [background-image:var(--bezel)] " +
          "[box-shadow:var(--shadow-raised)] " +
          "hover:[box-shadow:var(--shadow-raised-hover)] hover:border-ring/30",
        outline:
          "bg-transparent text-foreground border border-border " +
          "hover:bg-accent hover:border-ring/30",
        ghost:
          "bg-transparent text-muted-foreground " +
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "[box-shadow:var(--shadow-raised)] " +
          "hover:brightness-110 hover:[box-shadow:var(--shadow-raised-hover)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
