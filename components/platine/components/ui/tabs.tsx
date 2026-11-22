"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

/*
 * Platine Tabs — the source PremiumNavBar, generalised for any tab set.
 *
 * Same four stacked layers as the snippet (outer bezel, inner sunken ring,
 * translucent glass track, brushed-silver slider) and the SAME framer-motion
 * spring (stiffness 300 / damping 30) driving the slider. The only change from
 * the snippet is fidelity to this repo's color rule: the snippet's hex/rgba
 * values are expressed as oklch() design tokens (--bezel, --ring-recess,
 * --track-sheen, --metal, --shadow-bezel, --shadow-inset, --shadow-track,
 * --shadow-primary). Because the tab set is dynamic rather than four fixed
 * 93px tabs, the slider's left/width are measured from the active trigger
 * (re-measured on data-state change + resize) instead of an index formula.
 */

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const [pill, setPill] = React.useState({ left: 0, width: 0, ready: false })

  // SAFETY: the handle is read only after mount, when the element this
  // component renders is attached, so the ref is non-null.
  React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement)

  const sync = React.useCallback(() => {
    const list = listRef.current
    const active = list?.querySelector<HTMLElement>('[data-state="active"]')
    if (!list || !active) return
    const lr = list.getBoundingClientRect()
    const ar = active.getBoundingClientRect()
    // A scaled preview (transform: scale) shrinks the rects; undo it so the pill fits the tab.
    const s = lr.width / list.offsetWidth || 1
    setPill({ left: (ar.left - lr.left) / s, width: ar.width / s, ready: true })
  }, [])

  React.useEffect(() => {
    sync()
    const list = listRef.current
    if (!list) return
    const mo = new MutationObserver(sync)
    mo.observe(list, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
    })
    const ro = new ResizeObserver(sync)
    ro.observe(list)
    return () => {
      mo.disconnect()
      ro.disconnect()
    }
  }, [sync])

  return (
    <TabsPrimitive.List
      ref={listRef}
      className={cn(
        "relative inline-flex h-16 items-center rounded-full p-2",
        className
      )}
      {...props}
    >
      {/* Outer bezel with gradient and shadow */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full [background-image:var(--bezel)] [box-shadow:var(--shadow-bezel)]"
      />
      {/* Inner darker ring */}
      <span
        aria-hidden
        className="absolute inset-[0.1875rem] rounded-full [background-image:var(--ring-recess)] [box-shadow:var(--shadow-inset)]"
      />
      {/* Track background */}
      <span
        aria-hidden
        className="absolute inset-x-2 top-2 bottom-2 rounded-full [background-image:var(--track-sheen)] [box-shadow:var(--shadow-track)] backdrop-blur-sm"
      />
      {/* Animated slider */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-2 bottom-2 left-0 rounded-full [background-image:var(--metal)] [box-shadow:var(--shadow-primary)]"
        style={{ opacity: pill.ready ? 1 : 0 }}
        initial={false}
        animate={{ left: pill.left, width: pill.width }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Tab buttons */}
      <div className="relative z-10 flex items-center gap-2">{children}</div>
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-3 text-base font-medium leading-tight",
      "cursor-pointer transition-colors",
      "text-foreground/70 hover:text-foreground",
      "data-[state=active]:text-primary-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
