"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Plinth Toggle: a tool button that latches. Pressed, it rises as the
 * editor's graphite segment: a lighter gradient, a catch-light and a dark
 * seating ring, so it reads as the option currently chosen.
 */
const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium",
    "text-muted-foreground cursor-pointer select-none",
    "transition-[background,box-shadow,color] duration-fast",
    "hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:[background:var(--segment-gradient)] data-[state=on]:[box-shadow:var(--shadow-segment)] data-[state=on]:text-foreground",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted",
        outline: "bg-input [box-shadow:var(--shadow-inset)] hover:bg-muted",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
