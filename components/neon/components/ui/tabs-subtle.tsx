"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// TabsSubtle: tab navigation where the selected tab carries a quiet filled
// pill. Same API as the motion-based reference, but the sliding pill is
// rendered as a static per-item background (no animation lib in this DS) so
// the exports and props stay identical.
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
          "relative inline-flex items-center gap-0.5 select-none",
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

function TabsSubtleItem({
  value,
  icon,
  className,
  children,
  ...props
}: TabsSubtleItemProps) {
  const { value: selected, onValueChange } = useTabsSubtle()
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative z-10 inline-flex items-center gap-2 rounded-[0.5rem] px-3 py-1.5 text-[0.8125rem]",
        "text-muted-foreground transition-colors duration-fast",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected &&
          "[background:var(--neon-gradient)] text-primary-foreground [box-shadow:var(--shadow-neon)]",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className={cn("font-medium")}>{children}</span>
    </button>
  )
}

interface TabsSubtlePanelProps extends React.HTMLAttributes<HTMLDivElement> {
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
  if (!isSelected) return null
  return (
    <div role="tabpanel" className={cn("outline-none", className)} {...props}>
      {children}
    </div>
  )
}

export { TabsSubtle, TabsSubtleItem, TabsSubtlePanel }
export type { TabsSubtleProps, TabsSubtleItemProps, TabsSubtlePanelProps }
