"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

// Talentboard CodeTabs: a light code card on the soft card shadow; the active
// tab gets the orange underline like the portal's section tabs.

interface CodeTab {
  label: string;
  lang: string;
  code: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  defaultTab?: number;
  className?: string;
}

function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(defaultTab);
  const uid = React.useId();

  const active = tabs[activeIndex] ?? tabs[0];
  if (!active) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl",
        "bg-card border border-border",
        "shadow-[var(--tb-shadow-card)]",
        className
      )}
    >
      <div className="flex items-center gap-1 border-b border-border/60 px-2 pt-2">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId={`${uid}-tab-indicator`}
                  className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.pre
          key={activeIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="overflow-x-auto p-4 text-xs leading-relaxed text-foreground/90"
        >
          <code className="font-mono" data-lang={active.lang}>
            {active.code}
          </code>
        </motion.pre>
      </AnimatePresence>
    </div>
  );
}

export { CodeTabs };
export type { CodeTabsProps };
