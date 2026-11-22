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
 * Ink mail CodeTabs: the code window with one tab per language.
 *
 * The title bar opens with the three window dots, then a row of mono tab
 * chips. The chosen chip takes the white wash and full ink, and the wash
 * slides to its new place. The code below swaps with a short fade and a
 * small shift in the direction of travel. The active language and a ghost
 * copy control sit at the end of the bar. Arrow keys, Home and End move
 * between tabs.
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

  // The exiting pane reads `custom` from AnimatePresence, so it moves out in
  // the direction of the new selection rather than the one before it.
  const shift = reduceMotion ? 0 : 0.5;
  const paneVariants = {
    enter: (travel: number) => ({ opacity: 0, x: `${travel * shift}rem` }),
    center: { opacity: 1, x: "0rem" },
    exit: (travel: number) => ({ opacity: 0, x: `${travel * -shift}rem` }),
  };

  return (
    <div
      data-slot="code-tabs"
      className={cn(
        "overflow-hidden rounded-lg border border-(--line-strong) bg-(--code) text-(--code-foreground)",
        className,
      )}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center gap-3 border-b border-border px-4 py-2 pe-2"
      >
        <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-(--dot-red)" />
          <span className="size-2.5 rounded-full bg-(--dot-yellow)" />
          <span className="size-2.5 rounded-full bg-(--dot-green)" />
        </span>
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  "relative shrink-0 whitespace-nowrap rounded-sm px-3 py-1.5 font-mono text-xs",
                  "transition-colors duration-fast ease-out",
                  "outline-none focus-visible:ring-3 focus-visible:ring-ring",
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-indicator`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-sm bg-(--wash)"
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
            className="m-0 overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-(--code-foreground)"
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
