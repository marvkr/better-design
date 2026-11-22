"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, raisedBevel, wellInset } from "./_shared";
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

/** Tone per capture group: plain, comment, string, keyword, call. */
const TONES = [
  "",
  "italic text-muted-foreground",
  "text-glow/75",
  "text-primary-text",
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
 * Burnished CodeTabs: one sample in several languages.
 *
 * The tabs sit in a recessed well track on an umber slab. The chosen tab is
 * a raised graphite bevel pill that glides to its new place; the others are
 * muted text sunk in the track. The language and a ghost copy button close
 * the row, and the code below sits in its own well in Geist Mono, fading
 * across when the tab changes. Arrow keys, Home and End move between tabs.
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
      className={cn(cardSlab, "overflow-hidden rounded-2xl p-1.5", className)}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center justify-between gap-3 pb-1.5 pe-0.5"
      >
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className={cn(
            wellInset,
            "flex min-w-0 gap-0.5 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
                  "relative isolate h-8 shrink-0 whitespace-nowrap rounded-full px-3.5 text-xs font-semibold",
                  "transition-colors duration-fast ease-(--ease-out)",
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    aria-hidden="true"
                    className={cn(raisedBevel, "absolute inset-0 -z-10 rounded-full")}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.32, bounce: 0.12 }
                    }
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="font-mono text-xs text-muted-foreground">{active.lang}</span>
          <CopyButton
            value={active.code}
            size="icon-sm"
            label="Copy code"
            className="text-muted-foreground"
          />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className={cn(wellInset, "relative overflow-hidden rounded-xl")}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.pre
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
            className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed tracking-normal text-foreground/85"
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
