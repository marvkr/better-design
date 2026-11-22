"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Control Room Toggle: mode key.
// Off: muted console key. On: signal-green tinted fill with green text and
// a faint glow, like an armed function key.

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-sm",
    "text-xs font-semibold uppercase tracking-wider",
    "transition-all duration-fast",
    "hover:bg-accent hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-40",
    "data-[state=on]:bg-primary/15 data-[state=on]:text-primary",
    "data-[state=on]:[box-shadow:inset_0_0_0_0.0625rem_oklch(0.78_0.21_148/0.35),0_0_0.5rem_oklch(0.78_0.21_148/0.15)]",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-border bg-transparent text-muted-foreground " +
          "hover:border-ring/40 " +
          "data-[state=on]:border-transparent",
      },
      size: {
        sm: "h-7 px-2",
        default: "h-9 px-3",
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
