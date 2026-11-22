"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, wellInset } from "./_shared";

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

/** Tone per capture group: plain, comment, string, keyword, call. Teal stays for strings only. */
const TONES = [
  "",
  "text-muted-foreground",
  "text-(--primary-text)",
  "font-medium text-foreground",
  "text-info-text",
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

/** A small ghost icon button that copies the code and shows a tick for a moment. */
function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => setCopied(true));
      }}
      className={cn(
        focusRing,
        "inline-grid size-7 place-items-center rounded-sm text-muted-foreground",
        "transition-colors duration-fast ease-out hover:bg-accent hover:text-foreground",
      )}
    >
      <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} className="size-4" aria-hidden />
    </button>
  );
}

/**
 * Paddock CodeTabs: one sample in several languages.
 *
 * A white card holds a segmented control: a recessed grey
 * track where the chosen tab is a raised white tile that glides to its new
 * place. The language and a copy button close the row, and the code sits in
 * a flat grey well below, fading across when the tab changes. Arrow keys,
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
      className={cn(cardSlab, "overflow-hidden rounded-xl p-2", className)}
    >
      <div
        data-slot="code-tabs-header"
        className="flex items-center justify-between gap-3 pb-2"
      >
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className={cn(
            wellInset,
            "flex min-w-0 gap-0.5 overflow-x-auto rounded-md p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
                  "relative isolate h-7 shrink-0 whitespace-nowrap rounded-sm px-3 text-[0.8125rem]",
                  "transition-colors duration-fast ease-out",
                  selected
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-sm bg-card shadow-(--segment-lift)"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 300, damping: 34, mass: 1 }
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
          <CopyCode value={active.code} />
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className="relative overflow-hidden rounded-lg bg-muted"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.pre
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
            className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed text-foreground"
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
