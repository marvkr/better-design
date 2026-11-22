"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/*
 * Command Noir Tabs — a segmented selector that behaves like the palette's
 * section switcher: a single accent-lit chip slides between triggers
 * (left/width interpolated). Each trigger stays flat; the chip underneath
 * carries the cool accent fill + glow, mirroring the primary Button.
 */

type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  /**
   * Accepted for showcase parity (`variant="underline"` is used by the
   * shadcn defaults). These Tabs only ship one variant — the sliding-chip
   * segmented control — so this is consumed and ignored.
   */
  variant?: string
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsRootProps
>(({ variant: _variant, ...props }, ref) => <TabsPrimitive.Root ref={ref} {...props} />)
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const pillRef = React.useRef<HTMLSpanElement | null>(null)
  const firstPaint = React.useRef(true)

  // SAFETY: the handle is read only after mount, when the element this
  // component renders is attached, so the ref is non-null.
  React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement)

  React.useLayoutEffect(() => {
    const track = listRef.current
    const pill = pillRef.current
    if (!track || !pill) return

    const measure = () => {
      const active = track.querySelector<HTMLElement>('[data-state="active"]')
      if (!active) {
        pill.style.opacity = "0"
        return
      }
      const trackRect = track.getBoundingClientRect()
      const r = active.getBoundingClientRect()
      // A scaled preview (transform: scale) shrinks the rects; undo it so the pill fits the tab.
      const s = trackRect.width / track.offsetWidth || 1
      pill.style.opacity = "1"
      pill.style.left = `${(r.left - trackRect.left) / s}px`
      pill.style.width = `${r.width / s}px`
    }

    if (firstPaint.current) {
      const prev = pill.style.transition
      pill.style.transition = "none"
      measure()
      void pill.offsetWidth
      pill.style.transition = prev
      firstPaint.current = false
    } else {
      measure()
    }

    const mo = new MutationObserver(measure)
    mo.observe(track, { subtree: true, attributes: true, attributeFilter: ["data-state"] })
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    track.querySelectorAll<HTMLElement>('[role="tab"]').forEach((el) => ro.observe(el))

    window.addEventListener("resize", measure)
    return () => {
      mo.disconnect()
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={listRef}
      className={cn(
        "relative inline-flex h-[2.625rem] items-center justify-center rounded-lg p-1",
        "bg-card border border-border text-muted-foreground",
        "[box-shadow:var(--shadow-well)]",
        className,
      )}
      {...props}
    >
      <span
        ref={pillRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 z-0 rounded-md",
          "[background:var(--accent-fill)]",
          "[box-shadow:var(--shadow-accent)]",
          "transition-[left,width,opacity] duration-[380ms]",
          "[transition-timing-function:cubic-bezier(0.32,0.72,0.28,1)]",
        )}
        style={{ opacity: 0 }}
      />
      {children}
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
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap",
      "rounded-md px-3.5 h-[2.125rem] text-sm font-medium tracking-[-0.005em]",
      "transition-[color] duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50",
      "text-muted-foreground hover:text-foreground",
      "data-[state=active]:text-primary-foreground",
      className,
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
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
