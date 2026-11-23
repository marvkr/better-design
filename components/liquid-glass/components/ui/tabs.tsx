"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { GlassLens } from "./glass-lens"

/*
 * Liquid Glass Tabs — Radix Tabs (roving focus, arrow keys, tab and panel
 * wiring) with the kit's travelling lens. When the selection changes, the
 * lens leaves the old tab, swells into clear glass that bends the labels it
 * passes, then settles into the flat highlight under the new tab. Press and
 * hold opens the lens in place; drag it and let go to select. Without WebGL2
 * or with reduced motion the highlight simply jumps.
 */

const TabsValueContext = React.createContext<string | null>(null)

function Tabs({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  // Radix owns the selection; this mirror tells the lens and the triggers which tab holds it.
  const [own, setOwn] = React.useState(defaultValue ?? null)
  const current = value ?? own
  return (
    <TabsValueContext.Provider value={current}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-3", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => {
          setOwn(next)
          onValueChange?.(next)
        }}
        {...props}
      />
    </TabsValueContext.Provider>
  )
}

function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const value = React.useContext(TabsValueContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-glass-host=""
      className={cn("relative isolate inline-flex w-fit items-center gap-1 rounded-full bg-(--glass-wash) p-1", className)}
      {...props}
    >
      {/* The lens must be the list's first child. */}
      <GlassLens value={value} />
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, children, value, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const selected = React.useContext(TabsValueContext) === value
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "relative inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-semibold whitespace-nowrap outline-none select-none",
        "text-muted-foreground transition-colors duration-base hover:text-foreground",
        "data-[state=active]:text-foreground [[data-glass-traveling]_&]:data-[state=active]:text-muted-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {selected ? (
        <span
          aria-hidden
          data-glass-highlight=""
          className="absolute inset-0 rounded-full bg-background [box-shadow:0_0_0_0.0625rem_var(--border)] [[data-glass-moving]_&]:opacity-0"
        />
      ) : null}
      <span className="relative z-20 inline-flex items-center gap-1.5">{children}</span>
    </TabsPrimitive.Trigger>
  )
}

/** Radix makes a panel focusable; its ring sits inside, so a clipping frame never hides it. */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
