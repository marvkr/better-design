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
 * Firefly TabsSubtle: a segmented control. The options sit in a warm paper
 * pill, and the chosen one rides on a white chip with a soft hairline
 * shadow that slides across in 150ms. Arrow keys, Home and End move the
 * choice, the way a tab list should.
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
          "inline-flex items-center gap-0.5 rounded-full bg-secondary p-0.5",
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

/** One option. The white chip slides under whichever option is chosen. */
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
        "relative isolate inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3",
        "text-sm font-medium transition-colors duration-fast ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        isActive
          ? "text-foreground"
          : "text-(--foreground-secondary) hover:text-foreground",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          aria-hidden="true"
          layoutId={context.layoutId}
          className="absolute inset-0 -z-10 rounded-full bg-popover shadow-(--shadow-card)"
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
        />
      )}
      {icon}
      {children}
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
          initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
          className={cn("pt-4", className)}
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
