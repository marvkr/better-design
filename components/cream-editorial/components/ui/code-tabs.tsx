"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

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

/** The tab a roving-focus key moves to, wrapping at both ends. */
function nextTabIndex(key: string, index: number, last: number): number | undefined {
  switch (key) {
    case "ArrowRight":
      return index === last ? 0 : index + 1;
    case "ArrowLeft":
      return index === 0 ? last : index - 1;
    case "Home":
      return 0;
    case "End":
      return last;
    default:
      return undefined;
  }
}

/**
 * Cream editorial CodeTabs: the dark warm product panel with file tabs.
 *
 * The header is a slightly lighter warm band. Each tab is a filename in
 * small muted type; the chosen one brightens to the panel's cream ink and
 * sits on a faint cream wash. The code swaps with a short fade. The active
 * language and a quiet copy button sit at the end of the header. Arrow keys,
 * Home and End move between tabs.
 */
function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    Math.min(Math.max(defaultTab, 0), Math.max(tabs.length - 1, 0)),
  );
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const uid = React.useId();

  if (tabs.length === 0) return null;

  const index = Math.min(activeIndex, tabs.length - 1);
  const active = tabs[index];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const next = nextTabIndex(event.key, index, tabs.length - 1);
    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      data-slot="code-tabs"
      className={cn(
        "overflow-hidden rounded-xl bg-(--code) text-(--code-foreground)",
        className,
      )}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center justify-between gap-3 bg-(--code-header) px-2 py-1.5"
      >
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className="inline-flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab, i) => {
            const selected = i === index;
            return (
              <button
                key={`${tab.label}-${i}`}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-7 shrink-0 whitespace-nowrap rounded-md px-2.5 text-xs font-medium",
                  "transition-colors duration-fast ease-out",
                  "outline-none focus-visible:ring-3 focus-visible:ring-ring",
                  selected
                    ? "bg-(--code-foreground)/10 text-(--code-foreground)"
                    : "text-(--code-muted) hover:text-(--code-foreground)",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="font-mono text-xs text-(--code-muted)">{active.lang}</span>
          <CopyButton
            value={active.code}
            size="icon-sm"
            label="Copy code"
            className="text-(--code-muted) hover:bg-(--code-foreground)/10 hover:text-(--code-foreground)"
          />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.pre
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="m-0 overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed"
          >
            <code>{active.code}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { CodeTabs };
export type { CodeTabsProps };
