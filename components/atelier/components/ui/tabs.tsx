"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Atelier Tabs — the reference toolbar's segmented pill control (USD, 6 Months).
 *
 * A recessed warm-gray track holds the triggers; the active one is marked by a
 * white pill floating a hair above the track (hairline border, one soft
 * shadow), slid into place by a gentle framer-motion spring. Because the tab
 * set is dynamic, the pill's left/width are measured from the active trigger
 * (re-measured on data-state change + resize).
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
        "relative inline-flex h-10 items-center rounded-full p-1",
        "bg-secondary border border-border [box-shadow:var(--shadow-inset)]",
        className
      )}
      {...props}
    >
      {/* Active pill: a white card surface sliding along the recessed track */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-card border border-border [box-shadow:var(--shadow-s)]"
        style={{ opacity: pill.ready ? 1 : 0 }}
        initial={false}
        animate={{ left: pill.left, width: pill.width }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Tab buttons */}
      <div className="relative z-10 flex items-center">{children}</div>
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium leading-tight",
      "cursor-pointer transition-colors duration-fast",
      "text-muted-foreground hover:text-foreground",
      "data-[state=active]:text-foreground",
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
