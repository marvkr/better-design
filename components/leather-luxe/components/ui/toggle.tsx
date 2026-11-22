"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Leather Luxe Toggle: quiet at rest; pressed, it becomes a raised charcoal
// pill so the on state reads as a physically latched control.

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium",
    "text-muted-foreground transition-[background,box-shadow,color] duration-base",
    "hover:bg-accent hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:[background-image:var(--gradient-raised)]",
    "data-[state=on]:text-foreground data-[state=on]:border data-[state=on]:border-highlight",
    "data-[state=on]:[box-shadow:var(--shadow-raised-sm)]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-highlight bg-transparent",
      },
      size: {
        default: "h-9 px-3.5 min-w-9",
        sm: "h-8 px-2.5 min-w-8",
        lg: "h-10 px-4 min-w-10",
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
