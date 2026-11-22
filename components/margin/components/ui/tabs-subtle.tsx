"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Margin TabsSubtle: plain text tabs like the sidebar's rows. The selected
 * tab sits on a field-grey highlight that slides between tabs on a short
 * spring, with no raised object and no colour.
 *
 * Usage:
 *   <TabsSubtle value={tab} onValueChange={setTab}>
 *     <TabsSubtleItem value="a">First</TabsSubtleItem>
 *     <TabsSubtleItem value="b">Second</TabsSubtleItem>
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

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

/** The tab list: holds the selected value and moves focus with the arrow keys. */
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

interface TabsSubtleItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
}

/** One text tab; the selected one sits on the sliding grey highlight. */
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
        "relative inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-sm",
        "text-muted-foreground transition-colors duration-fast ease-(--ease-out) hover:text-foreground",
        focusRing,
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
          className="absolute inset-0 rounded-lg bg-(--field)"
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        />
      )}
      {icon && <span className="relative shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
    </button>
  );
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

/** The panel for one tab, shown with a short fade when its tab is selected. */
function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  const isSelected = value === activeValue;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          data-slot="tabs-subtle-panel"
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
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
