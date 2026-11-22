"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

// ContextCards: retrieved knowledge chunks with their sources. Cards enter
// once, source chips settle in after, then everything stays put.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <ContextCards />
//   <ContextCards label="All chunks" count={32} chunks={...} />

interface ContextChunk {
  title: string;
  chars: string;
  body: string;
  source: string;
  /** File kind badge, e.g. "PDF" or "CSV". */
  badge: string;
}

const DEFAULT_CHUNKS: ContextChunk[] = [
  {
    title: "Vendor onboarding rule",
    chars: "290 characters",
    body: "Cold-chain certification must be verified before a new supplier can be added to the reorder workflow.",
    source: "Supplier Onboarding SOP.pdf",
    badge: "PDF",
  },
  {
    title: "Seasonal demand row",
    chars: "1,250 characters",
    body: "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
    source: "Sales Velocity Export.csv",
    badge: "CSV",
  },
];

/** The file-kind tile beside a source name: a small ink square, one per row. */
const kindTile =
  "flex h-4 min-w-4 items-center justify-center rounded-sm bg-foreground px-1 font-mono text-[0.5625rem] font-medium text-background";

/** The source chip under each card: an oat pill with the file name. */
const sourceChip =
  "inline-flex h-6 items-center gap-1.5 rounded-full bg-secondary ps-1 pe-2.5 text-xs text-(--foreground-secondary)";

interface ContextCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  count?: number;
  chunks?: ContextChunk[];
}

/**
 * Cream editorial ContextCards: the passages an assistant read, laid out as
 * oat index cards on the cream page. Each card has a sans title row ruled off
 * by the hairline, the passage in secondary ink, and an oat chip naming the
 * source file. Cards fade up in turn; the chips settle in a beat later.
 */
function ContextCards({
  label = "All chunks",
  count = 32,
  chunks = DEFAULT_CHUNKS,
  className,
  ...props
}: ContextCardsProps) {
  const [chipsShown, setChipsShown] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setChipsShown(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      data-slot="context-cards"
      className={cn("flex w-full max-w-[23.75rem] flex-col gap-2.5", className)}
      {...props}
    >
      <div className="flex items-center gap-2 px-0.5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-slow">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="inline-flex h-5 items-center rounded-full bg-muted px-2 text-xs font-medium text-foreground tabular-nums">
          {count}
        </span>
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className="overflow-hidden rounded-xl border border-border bg-card motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-both motion-safe:duration-slow"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <Icon icon="ph:file-text" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="min-w-0 truncate text-sm font-medium text-foreground">{chunk.title}</span>
            <span className="ms-auto shrink-0 text-xs text-muted-foreground tabular-nums">{chunk.chars}</span>
          </div>
          <p className="px-4 pt-3 pb-2 text-[0.8125rem] leading-relaxed text-(--foreground-secondary)">
            {chunk.body}
          </p>
          <div className="px-4 pb-3.5">
            <span
              className={cn(
                sourceChip,
                "transition-opacity duration-slow ease-out",
                chipsShown ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={kindTile}>{chunk.badge}</span>
              {chunk.source}
              <Icon icon="ph:arrow-square-out" className="size-3 text-muted-foreground" aria-hidden="true" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Standalone card kept for the showcase bundle contract.
interface ContextCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  chars?: number;
  source?: { kind: string; name: string };
}

/** One oat index card: a title row, the passage, and its source chip. */
function ContextCard({ title, chars, source, className, children, ...props }: ContextCardProps) {
  return (
    <div
      data-slot="context-card"
      className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="min-w-0 truncate text-sm font-medium text-foreground">{title}</span>
        {chars !== undefined && (
          <span className="ms-auto shrink-0 text-xs text-muted-foreground tabular-nums">
            {chars.toLocaleString()} characters
          </span>
        )}
      </div>
      {children && (
        <p className="px-4 pt-3 pb-2 text-[0.8125rem] leading-relaxed text-(--foreground-secondary)">
          {children}
        </p>
      )}
      {source && (
        <div className="px-4 pb-3.5">
          <span className={sourceChip}>
            <span className={kindTile}>{source.kind}</span>
            {source.name}
          </span>
        </div>
      )}
    </div>
  );
}

export { ContextCards, ContextCard };
export type { ContextChunk };
