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
 * Firefly CodeTabs: the warm code panel with a segmented switch.
 *
 * The header holds a warm track of pill tabs. The chosen tab is a raised
 * white pill on a hairline shadow that glides to its new place, and the
 * code below swaps with a short fade and a small slide in the direction
 * of travel. The active language and a ghost copy pill sit at the end of
 * the header. Arrow keys, Home and End move between tabs.
 */
function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    Math.min(Math.max(defaultTab, 0), Math.max(tabs.length - 1, 0)),
  );
  const [direction, setDirection] = React.useState(0);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const uid = React.useId();

  if (tabs.length === 0) return null;

  const index = Math.min(activeIndex, tabs.length - 1);
  const active = tabs[index];

  const select = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setActiveIndex(next);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next = nextTabIndex(event.key, index, last);
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  // The exiting pane reads `custom` from AnimatePresence, so it slides out
  // in the direction of the new selection rather than the one before it.
  const shift = reduceMotion ? 0 : 12;
  const paneVariants = {
    enter: (travel: number) => ({ opacity: 0, x: travel * shift }),
    center: { opacity: 1, x: 0 },
    exit: (travel: number) => ({ opacity: 0, x: travel * -shift }),
  };

  return (
    <div
      data-slot="code-tabs"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card text-foreground",
        className,
      )}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center justify-between gap-3 border-b border-border px-2 py-1.5"
      >
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className="inline-flex min-w-0 gap-0.5 overflow-x-auto rounded-full bg-secondary p-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                onClick={() => select(i)}
                className={cn(
                  "relative h-8 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-medium",
                  "transition-colors duration-fast ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  selected
                    ? "text-foreground"
                    : "text-(--foreground-secondary) hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-indicator`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-popover shadow-(--shadow-card)"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.15, ease: "easeOut" }
                    }
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="font-mono text-xs text-muted-foreground">
            {active.lang}
          </span>
          <CopyButton
            value={active.code}
            size="icon-sm"
            label="Copy code"
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.pre
            key={index}
            custom={direction}
            variants={paneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="m-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed"
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
