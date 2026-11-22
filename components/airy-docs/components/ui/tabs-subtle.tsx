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

/** Maps a navigation key to the index the selection moves to. */
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
 * Airy docs TabsSubtle: the language switcher above a code sample. Options
 * sit in the pale tray with a 0.5rem corner; the chosen one takes the green
 * wash with green ink, which slides across in 150ms. Arrow keys,
 * Home and End move the selection.
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
          "inline-flex items-center gap-0.5 rounded-lg border border-border bg-secondary p-0.5",
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

/** One option. The green wash slides under whichever option is chosen. */
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
        "relative isolate inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2.5",
        "text-xs font-medium transition-colors duration-fast ease-out",
        "outline-none focus-visible:ring-3 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:text-(--foreground-disabled)",
        "[&_svg]:size-3.5 [&_svg]:shrink-0",
        isActive
          ? "text-(--primary-text)"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          aria-hidden="true"
          layoutId={context.layoutId}
          className="absolute inset-0 -z-10 rounded-md bg-(--primary-wash) ring-1 ring-(--primary-line)"
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

/** The content for one option; fades in as the selection changes. */
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
          className={cn("pt-3 text-sm text-(--foreground-secondary)", className)}
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
