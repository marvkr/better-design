"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Paddock TabsSubtle: plain text tabs with no track. The selected tab sits on
 * a soft grey rounded rectangle, and that highlight glides to the next tab
 * when the selection moves.
 *
 * Usage:
 *   <TabsSubtle value={tab} onValueChange={setTab}>
 *     <TabsSubtleItem value="a">Overview</TabsSubtleItem>
 *     <TabsSubtleItem value="b">Activity</TabsSubtleItem>
 *   </TabsSubtle>
 */
interface TabsSubtleContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId: string;
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(null);

function useTabsSubtle() {
  const ctx = React.useContext(TabsSubtleContext);
  if (!ctx) {
    throw new Error("TabsSubtleItem must be used inside <TabsSubtle>");
  }
  return ctx;
}

/** Props for the TabsSubtle list, which owns the selected value. */
interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

function TabsSubtle({ value, onValueChange, children, className, ...props }: TabsSubtleProps) {
  const layoutId = React.useId();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    const index = tabs.findIndex((tab) => tab === document.activeElement);
    if (index === -1) return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + step + tabs.length) % tabs.length];
    next.focus();
    next.click();
  };

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        role="tablist"
        data-slot="tabs-subtle"
        onKeyDown={handleKeyDown}
        className={cn("relative inline-flex select-none items-center gap-0.5", className)}
        {...props}
      >
        {children}
      </div>
    </TabsSubtleContext.Provider>
  );
}

/** Props for one tab, with an optional leading icon. */
interface TabsSubtleItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
}

function TabsSubtleItem({ value, icon, className, children, ...props }: TabsSubtleItemProps) {
  const { value: selected, onValueChange, layoutId } = useTabsSubtle();
  const isSelected = selected === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-slot="tabs-subtle-item"
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative isolate inline-flex h-8 items-center gap-1.5 rounded-sm px-3 text-sm",
        "text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground",
        focusRing,
        "disabled:pointer-events-none disabled:opacity-50",
        isSelected && "font-medium text-foreground",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          aria-hidden
          className="absolute inset-0 -z-10 rounded-sm bg-accent"
          transition={{ type: "spring", duration: 0.32, bounce: 0 }}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

/** Props for a panel, shown when its value matches the active one. */
interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  const isSelected = value === activeValue;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          data-slot="tabs-subtle-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.165, 0.84, 0.44, 1] }}
          className={cn("outline-none", className)}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { TabsSubtle, TabsSubtleItem, TabsSubtlePanel };
export type { TabsSubtleProps, TabsSubtleItemProps, TabsSubtlePanelProps };
