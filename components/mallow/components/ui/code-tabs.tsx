"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, panelSpring, selectedOption, swapSpring, optionTrack } from "./_shared";
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

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|const|let|function|return|await|async|new|def|curl|true|false|null)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()/g;

/**
 * Tone per capture group: plain, comment, string, keyword, call. Mallow keeps
 * code in the ink and muted text colours and tells the parts apart by weight
 * and tone, since coral is kept for a fee and violet for focus.
 */
const TONES = [
  "",
  "italic text-muted-foreground/80",
  "text-foreground",
  "text-muted-foreground",
  "font-medium text-foreground",
];

/** Tones comments, strings, keywords and calls in one pass. */
function highlight(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(code.slice(last, start));
    const group = [1, 2, 3, 4].find((g) => match[g] !== undefined) ?? 0;
    parts.push(
      <span key={start} className={TONES[group]}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < code.length) parts.push(code.slice(last));
  return parts;
}

/**
 * Mallow CodeTabs: one sample in several languages.
 *
 * The tabs sit on a lilac option track on the white card. The chosen tab
 * takes the light violet tint inside a violet ring, which slides to its new
 * place on a critically damped spring and never overshoots. The code below
 * sits on its own track in Geist Mono and fades across when the tab changes.
 * Arrow keys, Home and End move between tabs. Under reduced motion the
 * chosen tab and the code change at once.
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
    <div data-slot="code-tabs" className={cn(cardSlab, "overflow-hidden rounded-3xl p-2", className)}>
      <div data-slot="code-tabs-header" className="flex items-center justify-between gap-3 pb-2 pe-1">
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className={cn(
            optionTrack,
            "isolate flex min-w-0 gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
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
                  focusRing,
                  "relative h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
                  "transition-colors duration-fast ease-(--ease-out)",
                  selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-panel-thumb`}
                    aria-hidden="true"
                    className={cn(selectedOption, "absolute inset-0 z-0 rounded-full")}
                    transition={reduceMotion ? { duration: 0 } : panelSpring}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="font-mono text-xs text-muted-foreground">{active.lang}</span>
          <CopyButton value={active.code} size="icon-sm" label="Copy code" />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className={cn(optionTrack, "relative overflow-hidden rounded-2xl")}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.pre
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : swapSpring}
            className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-sm leading-relaxed text-foreground/80"
          >
            <code>{highlight(active.code)}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { CodeTabs };
export type { CodeTabsProps };
