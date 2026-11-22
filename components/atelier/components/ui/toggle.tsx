"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Atelier Toggle — an understated pill; pressed state settles into the pale
 * mint wash with deep green text, like the reference's quiet highlights.
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium",
    "transition-[background-color,color,box-shadow] duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:bg-secondary hover:text-foreground",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-border bg-card text-foreground [box-shadow:var(--shadow-s)] hover:bg-secondary data-[state=on]:border-accent-foreground/20",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
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
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
