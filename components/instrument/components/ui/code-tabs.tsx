"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Gauge Dark CodeTabs.
// The frame is a level-1 panel; the code surface is a recessed well one level
// below it (nested depth, the DS trait). The active tab carries the gold
// accent hairline along its bottom edge, like a gauge needle mark.

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
  const [direction, setDirection] = React.useState(0);
  const uid = React.useId();

  const handleTabChange = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const active = tabs[activeIndex];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        "shadow-[var(--shadow-panel)]",
        className
      )}
    >
      {/* Tab bar: panel chrome */}
      <div className="relative flex border-b border-border/70">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(i)}
            className={cn(
              "relative px-4 py-2.5 text-xs font-medium transition-colors",
              i === activeIndex
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {i === activeIndex && (
              <motion.div
                layoutId={`code-tab-indicator-${uid}`}
                className="absolute inset-x-2 bottom-0 h-px bg-[var(--gauge-line)] shadow-[0_0_0.375rem_var(--gauge-line-soft)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code content: recessed well inside the panel */}
      <div className="relative m-3 overflow-hidden rounded-lg border border-[var(--gauge-well-border)] bg-input shadow-[var(--shadow-well)]">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -16 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
          >
            <pre className="m-0 overflow-x-auto bg-transparent p-4 font-mono text-xs leading-relaxed text-foreground">
              <code>{active.code}</code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { CodeTabs };
export type { CodeTabsProps };
