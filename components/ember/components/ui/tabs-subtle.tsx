"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Amber Glass TabsSubtle: text tabs with a sliding amber underline.

interface TabsSubtleContextValue {
  value: string
  onValueChange: (value: string) => void
  layoutId: string
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(null)

function useTabsSubtle() {
  const ctx = React.useContext(TabsSubtleContext)
  if (!ctx) throw new Error("TabsSubtleItem must be used within TabsSubtle")
  return ctx
}

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

function TabsSubtle({ value, onValueChange, className, children, ...props }: TabsSubtleProps) {
  const layoutId = React.useId()

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        role="tablist"
        className={cn(
          "flex items-center gap-1 border-b border-[color:var(--ag-border)]",
          className
        )}
        {...props}
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

function TabsSubtleItem({ value: itemValue, icon, className, children, ...props }: TabsSubtleItemProps) {
  const { value, onValueChange, layoutId } = useTabsSubtle()
  const active = value === itemValue

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onValueChange(itemValue)}
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold transition-colors duration-fast",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:rounded-md",
        className
      )}
      {...props}
    >
      {icon}
      {children}
      {active && (
        <motion.span
          layoutId={`tabs-subtle-indicator-${layoutId}`}
          className="absolute inset-x-1 -bottom-px h-[0.125rem] rounded-full bg-primary shadow-[0_0_0.625rem_oklch(0.69_0.195_42/0.6)]"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </button>
  )
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string
  activeValue: string
  children: React.ReactNode
}

function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  return (
    <AnimatePresence mode="wait">
      {value === activeValue && (
        <motion.div
          role="tabpanel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn("pt-3", className)}
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
