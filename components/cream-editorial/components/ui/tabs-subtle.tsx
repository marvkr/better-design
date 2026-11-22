"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TabsSubtleContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId: string;
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(
  null,
);

function useTabsSubtle() {
  const context = React.useContext(TabsSubtleContext);
  if (!context) {
    throw new Error("TabsSubtle parts must be used inside <TabsSubtle>");
  }
  return context;
}

/** The key that moves the choice, mapped to where the choice lands. */
function nextTabIndex(key: string, current: number, count: number) {
  if (key === "ArrowRight" || key === "ArrowDown") return (current + 1) % count;
  if (key === "ArrowLeft" || key === "ArrowUp") return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

/**
 * Cream editorial TabsSubtle: underline tabs, like section links along the
 * top of an article. The labels stand on a warm hairline, and a thin ink
 * rule under the chosen one slides across in 150ms. Arrow keys, Home and
 * End move the choice, the way a tab list should.
 */
function TabsSubtle({
  value,
  onValueChange,
  className,
  children,
  onKeyDown,
  ...props
}: TabsSubtleProps) {
  const layoutId = React.useId();

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    );
    const current = tabs.findIndex((tab) => tab === document.activeElement);
    if (current === -1) return;
    const next = nextTabIndex(event.key, current, tabs.length);
    if (next === null) return;
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  }

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        role="tablist"
        data-slot="tabs-subtle"
        className={cn(
          "inline-flex items-center gap-5 border-b border-border",
          className,
        )}
        onKeyDown={handleKeyDown}
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

/** One option. The ink rule slides under whichever option is chosen. */
function TabsSubtleItem({
  value,
  icon,
  className,
  children,
  ...props
}: TabsSubtleItemProps) {
  const context = useTabsSubtle();
  const reduceMotion = useReducedMotion();
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      data-slot="tabs-subtle-item"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => context.onValueChange(value)}
      className={cn(
        "relative -mb-px inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-t-sm",
        "text-sm font-medium transition-colors duration-fast ease-out",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {isActive && (
        <motion.span
          aria-hidden="true"
          layoutId={context.layoutId}
          className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground"
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
        />
      )}
    </button>
  );
}

interface TabsSubtlePanelProps extends HTMLMotionProps<"div"> {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

/** The content for one option; fades in as the choice changes. */
function TabsSubtlePanel({
  value,
  activeValue,
  children,
  className,
  ...props
}: TabsSubtlePanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {value === activeValue && (
        <motion.div
          key={value}
          role="tabpanel"
          data-slot="tabs-subtle-panel"
          initial={{ opacity: 0, y: reduceMotion ? "0rem" : "0.25rem" }}
          animate={{ opacity: 1, y: "0rem" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
          className={cn("pt-5", className)}
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
