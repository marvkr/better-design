"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing, panelSpring, swapSpring } from "./_shared";

/**
 * Mallow TabsSubtle: plain text tabs with a thin ink bar under the
 * selected one. The bar slides between tabs on a critically damped spring
 * and moves at once under reduced motion.
 *
 * Usage:
 *   <TabsSubtle value={tab} onValueChange={setTab}>
 *     <TabsSubtleItem value="overview">Overview</TabsSubtleItem>
 *     <TabsSubtleItem value="activity">Activity</TabsSubtleItem>
 *   </TabsSubtle>
 */
interface TabsSubtleContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId: string;
  reduceMotion: boolean;
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

function TabsSubtle({ value, onValueChange, children, className, ...props }: TabsSubtleProps) {
  const layoutId = React.useId();
  const reduceMotion = useReducedMotion() ?? false;

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
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId, reduceMotion }}>
      <div
        role="tablist"
        data-slot="tabs-subtle"
        onKeyDown={handleKeyDown}
        className={cn("relative inline-flex select-none items-center gap-1 border-b border-border", className)}
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

function TabsSubtleItem({ value, icon, className, children, ...props }: TabsSubtleItemProps) {
  const { value: selected, onValueChange, layoutId, reduceMotion } = useTabsSubtle();
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
        "relative z-10 inline-flex items-center gap-2 rounded-md px-3 pb-2.5 pt-2 text-sm font-medium",
        "text-muted-foreground transition-colors duration-fast ease-(--ease-out) hover:text-foreground",
        focusRing,
        isSelected && "text-foreground",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          aria-hidden="true"
          className="absolute inset-x-2 -bottom-0.25 h-0.5 rounded-full bg-primary"
          transition={reduceMotion ? { duration: 0 } : panelSpring}
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  const isSelected = value === activeValue;
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          data-slot="tabs-subtle-panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={reduceMotion ? { duration: 0 } : swapSpring}
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
