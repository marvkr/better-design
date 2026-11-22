"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing, selectedOption, optionTrack } from "./_shared";

const STAGES = [800, 600, 1800, 2600, 1600];

/** Advances a stage once per delay, then rests on the last one. */
function useSequence(steps: number[]) {
  const [stage, setStage] = React.useState(0);
  React.useEffect(() => {
    if (stage >= steps.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage, steps]);
  return stage;
}

type Row = {
  primary: string;
  secondary?: string;
  mono?: boolean;
  add?: number;
  del?: number;
  href?: string;
};

/** The labels and rows one trace plays: its working label, its settled label, an optional query, then rows. */
type TraceVariant = { active: string; done: string; rows: Row[]; query?: string };

const VARIANTS: { [variant: string]: TraceVariant } = {
  Steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading the brief" },
      { primary: "Checking last month's numbers" },
      { primary: "Comparing regions", secondary: "6 regions" },
      { primary: "Writing the summary" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "The question is about late orders, so the shipping log matters more than the returns sheet." },
      { primary: "The cut-off moved to 3 pm in June, so earlier weeks need the old rule." },
    ],
  },
  Search: {
    active: "Searching the notes",
    done: "Searched the notes",
    query: "late orders by region",
    rows: [
      { primary: "Shipping log", secondary: "/ops/shipping" },
      { primary: "Region targets", secondary: "/plans/regions" },
      { primary: "Carrier notes", secondary: "/ops/carriers" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "orders.csv", mono: true },
      { primary: "Edit", secondary: "report.md", mono: true, add: 42, del: 17 },
      { primary: "Run", secondary: "report build", mono: true },
    ],
  },
};

/** A turning ink arc in a small lilac circle: the trace is still working. */
function WorkingArc({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn(optionTrack, "relative shrink-0 rounded-full", className)}>
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground motion-reduce:animate-none" />
    </span>
  );
}

/** A page mark: a hash in a quiet chip. */
function SourceMark() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-(--tag) text-muted-foreground">
      <Icon icon="iconoir:hashtag" className="size-3" aria-hidden="true" />
    </span>
  );
}

interface ThinkingTraceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Steps" | "Reasoning" | "Search" | "Coding";
  /** Override the built-in demo rows. */
  data?: TraceVariant;
}

/**
 * Mallow ThinkingTrace: an expandable agent trace that plays once and
 * settles, its rows on a lilac option track where a picked tool row takes the violet tint and ring.
 */
function ThinkingTrace({ variant = "Steps", data, className, ...props }: ThinkingTraceProps) {
  const stage = useSequence(STAGES);
  const [manualExpanded, setManualExpanded] = React.useState<boolean | null>(null);
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
  const v = data ?? VARIANTS[variant] ?? VARIANTS.Steps;
  const autoExpanded = stage >= 1 && stage < 4;
  const expanded = manualExpanded ?? autoExpanded;
  const working = stage < 3;
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, v.rows.length) : v.rows.length;
  const panelId = React.useId();

  return (
    <div key={variant} className={cn("flex min-h-32 w-full max-w-96 flex-col", className)} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className={cn(
          focusRing,
          "-mx-2 flex h-8 w-fit items-center gap-2 rounded-full px-2 transition-colors duration-fast hover:bg-accent/60",
        )}
      >
        {working ? (
          <WorkingArc className="size-4" />
        ) : (
          <Icon icon="iconoir:check-circle" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        <span
          role="status"
          className={cn(
            "whitespace-nowrap text-sm font-medium",
            working
              ? "animate-pulse text-foreground motion-reduce:animate-none"
              : "text-muted-foreground animate-in fade-in duration-slow motion-reduce:animate-none",
          )}
        >
          {working ? v.active : v.done}
        </span>
        <Icon
          icon="iconoir:nav-arrow-down"
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-base motion-reduce:transition-none",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div id={panelId} className="mt-2 animate-in fade-in duration-slow motion-reduce:animate-none">
          <div className={cn(optionTrack, "flex min-w-0 flex-col gap-0.5 rounded-2xl p-1")}>
            {v.query && (
              <div className="flex h-9 items-center gap-2 px-3 text-sm text-foreground">
                <Icon icon="iconoir:search" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate">{v.query}</span>
              </div>
            )}
            {visible === 0 && <div className="h-9" aria-hidden="true" />}
            {v.rows.slice(0, visible).map((row, i) => {
              const content = (
                <>
                  {variant === "Search" && <SourceMark />}
                  {variant === "Steps" &&
                    (i < visible - 1 || !working ? (
                      <Icon icon="iconoir:check" className="size-4 shrink-0 text-foreground" aria-hidden="true" />
                    ) : (
                      <WorkingArc className="size-4" />
                    ))}
                  <span
                    className={cn(
                      "min-w-0 truncate text-sm",
                      variant === "Reasoning"
                        ? "whitespace-normal leading-relaxed text-muted-foreground"
                        : "text-foreground",
                    )}
                  >
                    {row.primary}
                  </span>
                  {row.secondary && (
                    <span
                      className={cn(
                        "shrink-0 text-xs text-muted-foreground",
                        (row.mono || variant === "Search") && "font-mono",
                      )}
                    >
                      {row.secondary}
                    </span>
                  )}
                  {row.add !== undefined && (
                    <span className="ms-auto shrink-0 font-mono text-xs tabular-nums">
                      <span className="text-success-text">+{row.add}</span>{" "}
                      <span className="text-destructive-text">-{row.del}</span>
                    </span>
                  )}
                </>
              );
              const rowClass = cn(
                focusRing,
                "flex min-h-9 w-full items-center gap-2.5 rounded-xl px-3 py-1 text-left",
                "animate-in fade-in slide-in-from-bottom-1 duration-slow motion-reduce:animate-none",
              );
              const delay = { animationDelay: `${i * 120}ms`, animationFillMode: "both" as const };

              if (variant === "Search") {
                return (
                  <a
                    key={row.primary}
                    href={row.href ?? "#"}
                    className={cn(rowClass, "transition-colors duration-fast hover:bg-accent/60")}
                    style={delay}
                  >
                    {content}
                  </a>
                );
              }
              if (variant === "Coding") {
                const isSelected = selectedTool === row.primary;
                return (
                  <button
                    key={row.primary}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTool(isSelected ? null : row.primary)}
                    className={cn(
                      rowClass,
                      "transition-[background-color,box-shadow] duration-fast",
                      isSelected ? selectedOption : "hover:bg-accent/60",
                    )}
                    style={delay}
                  >
                    {content}
                  </button>
                );
              }
              return (
                <div key={row.primary} className={rowClass} style={delay}>
                  {content}
                </div>
              );
            })}
            {variant === "Search" && stage >= 3 && (
              <span className="px-3 py-1.5 text-xs text-muted-foreground tabular-nums animate-in fade-in duration-slow motion-reduce:animate-none">
                7 more pages
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface ThinkingTraceItemProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: "step" | "reasoning" | "search" | "coding";
  title: string;
}

/** Mallow ThinkingTraceItem: one finished trace row with a check and optional detail. */
function ThinkingTraceItem({ kind = "step", title, className, children, ...props }: ThinkingTraceItemProps) {
  return (
    <div data-kind={kind} className={cn("flex items-center gap-2", className)} {...props}>
      <Icon icon="iconoir:check" className="size-4 shrink-0 text-foreground" aria-hidden="true" />
      <span className="min-w-0 truncate text-sm text-foreground">{title}</span>
      {children && <span className="shrink-0 text-xs text-muted-foreground">{children}</span>}
    </div>
  );
}

export { ThinkingTrace, ThinkingTraceItem };
export type { TraceVariant };
