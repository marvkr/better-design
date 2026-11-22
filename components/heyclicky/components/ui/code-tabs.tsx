"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

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
        "rounded-lg bg-card overflow-hidden shadow-[var(--shadow-window)]",
        className,
      )}
    >
      {/* Title bar: the silver desktop window chrome, traffic lights and all */}
      <div className="relative flex items-center gap-3 bg-[image:var(--gradient-chrome)] px-3 py-2">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="block h-3 w-3 rounded-full bg-[oklch(0.72_0.17_25)]" />
          <span className="block h-3 w-3 rounded-full bg-[oklch(0.83_0.15_85)]" />
          <span className="block h-3 w-3 rounded-full bg-[oklch(0.78_0.17_145)]" />
        </span>
        <div className="flex items-center gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(i)}
              className={cn(
                "relative rounded-full px-3 py-1 text-xs font-medium transition-colors",
                i === activeIndex
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {i === activeIndex && (
                <motion.span
                  layoutId={`code-tab-indicator-${uid}`}
                  className="absolute inset-0 rounded-full bg-[image:var(--gradient-chip)] shadow-[var(--shadow-button)]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <pre className="p-4 m-0 bg-transparent text-xs leading-relaxed overflow-x-auto text-foreground">
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
