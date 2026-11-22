"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants, toggleSizeClasses } from "./toggle"

/*
 * Graphite ToggleGroup — a recessed segmented track.
 *
 * The container is a well pressed into the card: bg-secondary with a top
 * inset shadow so it reads as carved in. Items are the same pill primitives
 * as <Toggle>; their active state lifts into a raised gradient pill that sits
 * proud of the track, the same material as the primary button.
 */

type Size = keyof typeof toggleSizeClasses

const ToggleGroupContext = React.createContext<{
  variant: VariantProps<typeof toggleVariants>["variant"]
  size: Size
}>({
  variant: "default",
  size: "default",
})

interface ToggleGroupRootProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  size?: Size
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupRootProps
>(({ className, variant, size = "default", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-full p-[0.1875rem] bg-secondary",
      "[box-shadow:var(--shadow-inset)]",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {
  size?: Size
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const ctx = React.useContext(ToggleGroupContext)
  const resolvedSize = size ?? ctx.size
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({ variant: variant ?? ctx.variant }),
        toggleSizeClasses[resolvedSize],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
