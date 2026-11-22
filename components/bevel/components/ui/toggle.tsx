"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Bevel Toggle.
 *
 * Off, the control is quiet: a transparent chip in the default variant, a
 * raised card chip in the outline one. On, it takes the primary Button's own
 * surface, the vertical gradient between --primary-from and --primary-to over
 * the primary shadow, so a pressed toggle and a primary button read as one
 * material. The radius sits at the 12px chip step, and the height matches the
 * small button so a toggle can stand in a row of controls.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[0.75rem]",
    "text-[0.9063rem] font-semibold tracking-[-0.0125rem]",
    "transition-[box-shadow,background-color,color] duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
    "[&_svg]:pointer-events-none [&_svg]:size-[1.125rem] [&_svg]:shrink-0",
    "data-[state=on]:text-primary-foreground",
    "data-[state=on]:bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]",
    "data-[state=on]:[box-shadow:var(--shadow-primary)]",
    "data-[state=on]:hover:bg-[linear-gradient(180deg,var(--primary-hover-from)_0%,var(--primary-hover-to)_100%)]",
    "data-[state=on]:hover:[box-shadow:var(--shadow-primary-hover)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        outline:
          "bg-card text-foreground [box-shadow:var(--shadow-button)] hover:[box-shadow:var(--shadow-button-hover)]",
      },
      size: {
        default: "h-10 px-3.5",
        sm: "h-9 rounded-[0.625rem] px-3 text-[0.8125rem]",
        lg: "h-11 px-5 text-[1rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
