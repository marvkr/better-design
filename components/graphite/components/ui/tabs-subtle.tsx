"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

// TabsSubtle: tab navigation with a smooth pill that slides between the
// selected tab. Ported from fluid-functionalism (mickadesign), simplified
// to drop proximity-hover/shape-context — uses motion's layoutId for the
// active pill and a CSS hover state for the hover highlight.
//
// Usage:
//   <TabsSubtle value={tab} onValueChange={setTab}>
//     <TabsSubtleItem value="a">First</TabsSubtleItem>
//     <TabsSubtleItem value="b">Second</TabsSubtleItem>
//   </TabsSubtle>

interface TabsSubtleContextValue {
  value: string
  onValueChange: (value: string) => void
  layoutId: string
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(
  null
)

function useTabsSubtle() {
  const ctx = React.useContext(TabsSubtleContext)
  if (!ctx) {
    throw new Error("TabsSubtleItem must be used inside <TabsSubtle>")
  }
  return ctx
}

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

function TabsSubtle({
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsSubtleProps) {
  const layoutId = React.useId()

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        role="tablist"
        className={cn(
          // Recessed segmented track: the tiles slide inside a pressed-in well.
          "relative inline-flex items-center gap-0.5 select-none",
          "rounded-full bg-secondary p-[0.1875rem] [box-shadow:var(--shadow-inset)]",
          className
        )}
        {...props}
        onKeyDown={(e) => {
          // Run any consumer handler first; bail if it handled the event.
          props.onKeyDown?.(e)
          if (e.defaultPrevented) return
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
          const tabs = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
          )
          const current = tabs.findIndex((t) => t === document.activeElement)
          if (current === -1) return
          e.preventDefault()
          const dir = e.key === "ArrowRight" ? 1 : -1
          const next = tabs[(current + dir + tabs.length) % tabs.length]
          next?.focus()
          next?.click()
        }}
      >
        {children}
      </div>
    </TabsSubtleContext.Provider>
  )
}

interface TabsSubtleItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: React.ReactNode
}

function TabsSubtleItem({
  value,
  icon,
  className,
  children,
  ...props
}: TabsSubtleItemProps) {
  const { value: selected, onValueChange, layoutId } = useTabsSubtle()
  const isSelected = selected === value

  return (
    <button
      {...props}
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem]",
        "text-foreground/70 transition-colors duration-fast",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected && "text-foreground",
        className
      )}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          className={cn(
            // Active item rises out of the well as the raised primary pill.
            "absolute inset-0 -z-10 rounded-full",
            "bg-[image:var(--pill-gradient)] [box-shadow:var(--shadow-pill)]"
          )}
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span
        className={cn(
          "font-medium",
          isSelected && "[text-shadow:var(--text-shadow-pressed)]"
        )}
      >
        {children}
      </span>
    </button>
  )
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string
  activeValue: string
  children: React.ReactNode
}

function TabsSubtlePanel({
  value,
  activeValue,
  children,
  className,
  ...props
}: TabsSubtlePanelProps) {
  const isSelected = value === activeValue
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
          className={cn("outline-none", className)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { TabsSubtle, TabsSubtleItem, TabsSubtlePanel }
export type { TabsSubtleProps, TabsSubtleItemProps, TabsSubtlePanelProps }
