"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

/*
 * TabsSubtle: the quiet tab row for a panel header. No well; the selected
 * tab gets a muted fill that slides between tabs.
 *
 *   <TabsSubtle value={tab} onValueChange={setTab}>
 *     <TabsSubtleItem value="image">Image</TabsSubtleItem>
 *     <TabsSubtleItem value="video">Video</TabsSubtleItem>
 *   </TabsSubtle>
 */

interface TabsSubtleContextValue {
  value: string
  onValueChange: (value: string) => void
  layoutId: string
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(null)

function useTabsSubtle() {
  const ctx = React.useContext(TabsSubtleContext)
  if (!ctx) throw new Error("TabsSubtleItem must be used inside <TabsSubtle>")
  return ctx
}

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

function TabsSubtle({ value, onValueChange, children, className, ...props }: TabsSubtleProps) {
  const layoutId = React.useId()
  const listRef = React.useRef<HTMLDivElement>(null)

  // Arrow keys move between tabs, as a tablist should.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])') ?? []
    )
    const index = tabs.findIndex((tab) => tab === document.activeElement)
    if (index === -1) return
    event.preventDefault()
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length
    tabs[next]?.focus()
    tabs[next]?.click()
  }

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={onKeyDown}
        className={cn("relative inline-flex items-center gap-1 select-none", className)}
        {...props}
      >
        {children}
      </div>
    </TabsSubtleContext.Provider>
  )
}

interface TabsSubtleItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: React.ReactNode
}

function TabsSubtleItem({ value, icon, className, children, ...props }: TabsSubtleItemProps) {
  const { value: selected, onValueChange, layoutId } = useTabsSubtle()
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[0.8125rem] font-medium",
        "cursor-pointer text-muted-foreground transition-colors duration-fast",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        isSelected && "text-foreground",
        className
      )}
      {...props}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 -z-10 rounded-lg bg-muted"
          transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
        />
      )}
      {icon && <span className="shrink-0 [&_svg]:size-3.5">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string
  activeValue: string
  children: React.ReactNode
}

function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  const isSelected = value === activeValue
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
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
