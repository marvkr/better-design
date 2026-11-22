"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

/*
 * Dark Neon AI ToggleGroup.
 *
 * The group is a recessed bar; the pressed item carries the neon-green
 * material (the same signature as the primary Button), rendered directly via
 * radix data-[state=on] classes (no animation lib in this DS).
 */

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "flex items-center gap-1 rounded-[0.75rem] border border-border bg-input p-1 [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  // The group sets variant/size via context (callers configure the group, not
  // each item), matching the linear toggle-group API. The neon pressed classes
  // are appended last so they win the active-state coloring over the base.
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size,
        }),
        "relative rounded-[0.5625rem]",
        "data-[state=on]:[background:var(--neon-gradient)] data-[state=on]:text-primary-foreground data-[state=on]:[box-shadow:var(--shadow-neon)] data-[state=on]:hover:bg-transparent",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </ToggleGroupPrimitive.Item>
  )
}
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
