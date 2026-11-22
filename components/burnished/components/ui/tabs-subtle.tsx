"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";

/**
 * Burnished TabsSubtle: plain text tabs with a thin warm bar under the
 * selected one. The bar is the lit copper gradient and slides between tabs
 * on a soft spring, so the selection reads without a raised object.
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
        className={cn(
          "relative inline-flex select-none items-center gap-1 shadow-[inset_0_-0.0625rem_0_var(--border)]",
          className,
        )}
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
        "relative z-10 inline-flex items-center gap-2 rounded-md px-3 pb-2.5 pt-2 text-sm font-semibold",
        "text-muted-foreground transition-colors duration-fast ease-(--ease-out)",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
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
          aria-hidden
          className="absolute inset-x-2 -bottom-[0.0625rem] h-0.5 rounded-full bg-(image:--fill-lit) shadow-(--bevel-glow)"
          transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
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
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          data-slot="tabs-subtle-panel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
