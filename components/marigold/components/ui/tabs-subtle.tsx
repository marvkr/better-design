"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Talentboard TabsSubtle: underline tabs like the billing portal header
// (Subscriptions / Credits / Invoices). Orange indicator slides between tabs.

interface TabsSubtleContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId: string;
}

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(null);

function useTabsSubtle() {
  const context = React.useContext(TabsSubtleContext);
  if (!context) throw new Error("TabsSubtle components must be used within <TabsSubtle>");
  return context;
}

interface TabsSubtleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

function TabsSubtle({ value, onValueChange, className, children, ...props }: TabsSubtleProps) {
  const layoutId = React.useId();
  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div role="tablist" className={cn("w-full", className)} {...props}>
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
  const context = useTabsSubtle();
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.onValueChange(value)}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 pb-2.5 pt-1 text-sm font-medium",
        "transition-colors duration-fast ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-md",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon}
      {children}
      {isActive && (
        <motion.span
          layoutId={context.layoutId}
          className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
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

function TabsSubtlePanel({ value, activeValue, children, className, ...props }: TabsSubtlePanelProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {value === activeValue && (
        <motion.div
          key={value}
          role="tabpanel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
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
