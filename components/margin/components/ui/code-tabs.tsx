"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { sheetSurface, codeToneClass, focusRing, tokenizeCodeLines } from "./_shared";
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
 * Margin CodeTabs: one sample in several languages.
 *
 * The bar above the sheet is a grey track of language names; the chosen one
 * is a paper tab with a hairline ring, the others muted text. The copy
 * button closes the bar. Below, the code sits on a white sheet with a gutter
 * of faint line numbers and the editor's clause inks. Arrow keys, Home
 * and End move between tabs.
 */
function CodeTabs({ tabs, defaultTab = 0, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(() =>
    Math.min(Math.max(defaultTab, 0), Math.max(tabs.length - 1, 0)),
  );
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const uid = React.useId();

  const index = Math.min(activeIndex, Math.max(tabs.length - 1, 0));
  const active = tabs[index];
  const lines = React.useMemo(() => tokenizeCodeLines(active?.code ?? ""), [active?.code]);

  if (!active) return null;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const next = nextTabIndex(event.key, index, tabs.length - 1);
    if (next === undefined) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div data-slot="code-tabs" className={cn("flex flex-col gap-2", className)}>
      <div data-slot="code-tabs-header" className="flex items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Code examples"
          onKeyDown={onKeyDown}
          className="flex min-w-0 gap-0.5 overflow-x-auto rounded-lg bg-(--field) p-0.5 shadow-(--field-shade)"
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
                  "h-6 shrink-0 whitespace-nowrap rounded-md px-2.5 text-sm",
                  "transition duration-fast ease-(--ease-out)",
                  selected
                    ? "bg-card text-foreground shadow-(--pill-edge)"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{active.lang}</span>
          <CopyButton value={active.code} size="icon-sm" label="Copy code" />
        </div>
      </div>

      <pre
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        tabIndex={0}
        className={cn(
          sheetSurface,
          focusRing,
          "m-0 overflow-x-auto rounded-xl pt-4 pb-5 pe-5 font-mono text-[0.8125rem] leading-6",
        )}
      >
        <code className="block">
          {lines.map((line, i) => (
            <span key={i} className="block whitespace-pre text-foreground">
              <span
                aria-hidden
                className="me-4 inline-block w-9.5 select-none text-right tabular-nums text-(--clause-gutter)"
              >
                {i + 1}
              </span>
              {line.map((token, j) => (
                <span key={j} className={codeToneClass[token.tone]}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export { CodeTabs };
export type { CodeTabsProps };
