"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Bevel TabsSubtle.
 *
 * The quiet counterpart to the segmented control. There is no well and no
 * lifted segment here, only a two pixel rule in the accent that slides between
 * items, so a screen can carry a second row of tabs without gaining a second
 * raised surface. The rule takes the primary gradient rather than a flat fill.
 *
 * Usage:
 *   <TabsSubtle value={tab} onValueChange={setTab}>
 *     <TabsSubtleItem value="a">First</TabsSubtleItem>
 *     <TabsSubtleItem value="b">Second</TabsSubtleItem>
 *   </TabsSubtle>
 */

interface TabsSubtleContextValue {
  value: string
  onValueChange: (value: string) => void
  layoutId: string
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(
  null,
)

function useTabsSubtle(): TabsSubtleContextValue {
  const ctx = React.useContext(TabsSubtleContext)
  if (!ctx) {
    throw new Error("TabsSubtleItem must be used inside <TabsSubtle>")
  }
  return ctx
}

/** Props for `TabsSubtle`; the selected value is controlled by the caller. */
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
          "relative inline-flex select-none items-center gap-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsSubtleContext.Provider>
  )
}

/** Props for one `TabsSubtleItem`; `icon` sits ahead of the label. */
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
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex items-center gap-2 rounded-[0.625rem] px-3 py-2",
        "text-[0.9063rem] leading-[1.125rem] font-semibold tracking-[-0.0125rem]",
        "text-muted-foreground transition-colors duration-fast ease-out",
        "hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isSelected && "text-foreground",
        className,
      )}
      {...props}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[linear-gradient(180deg,var(--primary-from)_0%,var(--primary-to)_100%)]"
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

/** Props for `TabsSubtlePanel`; it renders only while `value` is active. */
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
