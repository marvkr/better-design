"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Pressed state lifts to the raised velour face, the same material as the
 * secondary Button (this DS's button family is raised velvet, so the
 * toggle mirrors it; champagne stays reserved for primary actions).
 */

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
    "transition-[background-image,background-color,box-shadow,color] duration-fast",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:text-foreground",
    "data-[state=on]:[background-image:var(--velour-raised)]",
    "data-[state=on]:[box-shadow:var(--shadow-button)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-border bg-transparent text-muted-foreground " +
          "hover:border-ring/30 " +
          "data-[state=on]:border-transparent",
      },
      size: {
        sm: "h-8 px-2.5",
        default: "h-9 px-3",
        lg: "h-10 px-5",
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
