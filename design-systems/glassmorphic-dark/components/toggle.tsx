"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium",
    "transition-all duration-200",
    "hover:bg-white/[0.08] hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=on]:bg-white/[0.1] data-[state=on]:text-foreground",
    "data-[state=on]:shadow-[inset_0_0_8px_rgba(255,255,255,0.12)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground",
        outline:
          "border border-white/10 bg-transparent text-muted-foreground " +
          "hover:border-white/[0.2] " +
          "data-[state=on]:border-white/[0.2]",
      },
      size: {
        sm: "h-8 px-2.5",
        default: "h-10 px-3",
        lg: "h-11 px-5",
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
