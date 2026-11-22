"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

/*
 * Ops Sharp TabsSubtle — the underline/ink tab style: bare triggers over a thin
 * graphite rule, with a precise ink underline that slides under the selected
 * tab (shared layoutId). The selected label reads as the graphite ink emphasis.
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

const TabsSubtleContext = React.createContext<TabsSubtleContextValue | null>(
  null
);

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

function TabsSubtle({
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsSubtleProps) {
  const layoutId = React.useId();

  return (
    <TabsSubtleContext.Provider value={{ value, onValueChange, layoutId }}>
      <div
        role="tablist"
        className={cn(
          "relative inline-flex items-center gap-1 border-b border-border select-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsSubtleContext.Provider>
  );
}

interface TabsSubtleItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
}

function TabsSubtleItem({
  value,
  icon,
  className,
  children,
  ...props
}: TabsSubtleItemProps) {
  const { value: selected, onValueChange, layoutId } = useTabsSubtle();
  const isSelected = selected === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 pb-2 pt-1.5 text-[0.8125rem]",
        "text-muted-foreground transition-colors duration-fast",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        isSelected && "text-foreground",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="font-medium">{children}</span>
      {isSelected && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
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

function TabsSubtlePanel({
  value,
  activeValue,
  children,
  className,
  ...props
}: TabsSubtlePanelProps) {
  const isSelected = value === activeValue;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected && (
        <motion.div
          key={value}
          role="tabpanel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
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
