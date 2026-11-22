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

const TOKEN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|const|let|function|return|await|async|new|def|curl|true|false|null)\b|\b([A-Za-z_$][\w$]*)(?=\s*\()/g;

const TONES = [
  "",
  "text-(--syntax-comment) italic",
  "text-(--syntax-string)",
  "text-(--syntax-keyword)",
  "text-(--syntax-fn)",
];

/** Colours comments, strings, keywords and calls in one pass. */
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
 * Airy docs CodeTabs: one sample in several languages, the docs way.
 *
 * The pale tray carries a row of text tabs; the chosen one turns to ink
 * and sits on a thin green bar that slides to its new place. The language
 * and a quiet copy button close the row. The code below sits on a white
 * inner panel in Geist Mono and fades across when the tab changes. Arrow
 * keys, Home and End move between tabs.
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
        "overflow-hidden rounded-xl border border-border bg-secondary p-0.5 text-foreground",
        className,
      )}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center justify-between gap-3 ps-1 pe-0.5"
      >
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className="flex min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  "relative h-9 shrink-0 whitespace-nowrap rounded-md px-2.5 text-xs font-medium outline-none",
                  "transition-colors duration-fast ease-out",
                  "focus-visible:ring-3 focus-visible:ring-ring",
                  selected
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                {selected && (
                  <motion.span
                    layoutId={`${uid}-bar`}
                    aria-hidden="true"
                    className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-primary"
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }
                    }
                  />
                )}
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
            className="text-muted-foreground hover:bg-muted hover:text-foreground"
          />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className="relative overflow-hidden rounded-lg bg-(--code)"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.pre
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="m-0 overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-(--code-foreground)"
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
