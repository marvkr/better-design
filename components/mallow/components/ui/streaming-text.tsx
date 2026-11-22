"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { focusRing, optionTrack } from "./_shared";

const WORD_MS = 80;
const HOLD_MS = 3400;

/** A source the answer cites: a display name, its host and an optional link. */
interface StreamingSource {
  name: string;
  host: string;
  href?: string;
}

const DEFAULT_TEXT =
  "Storage costs fell 18% this month after the archive moved to cold tiers. Reads stayed flat, so the saving holds as long as restores stay under 40 a week.";

const DEFAULT_FOLLOW_UPS = ["Which buckets cost the most", "Show restores by week"];

const DEFAULT_SOURCES: StreamingSource[] = [
  { name: "Billing ledger", host: "ledger.example" },
  { name: "Usage report", host: "usage.example" },
  { name: "Archive log", host: "archive.example" },
];

/** A small square with the source's first letter, in the chip shade. */
function SourceMark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-sm bg-(--option-face) text-xs font-medium leading-none text-foreground",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  );
}

const ACTIONS = [
  { icon: "iconoir:copy", label: "Copy answer" },
  { icon: "iconoir:refresh", label: "Try again" },
  { icon: "iconoir:thumbs-up", label: "Good answer" },
  { icon: "iconoir:thumbs-down", label: "Poor answer" },
];

const actionButton = cn(
  focusRing,
  "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
);

interface StreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  sources?: StreamingSource[];
  /** Total source count shown next to the avatar stack. */
  totalSources?: number;
  followUps?: string[];
  /** Word index after which the inline citation chip appears. */
  citeAfterWord?: number;
  onFollowUp?: (item: string) => void;
}

/**
 * Mallow StreamingText: an answer that streams in word by word, with an
 * inline citation chip, then actions, a lilac sources list and follow-up prompts.
 */
function StreamingText({
  text = DEFAULT_TEXT,
  sources = DEFAULT_SOURCES,
  totalSources = 10,
  followUps = DEFAULT_FOLLOW_UPS,
  citeAfterWord = 19,
  onFollowUp,
  className,
  ...props
}: StreamingTextProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const tokens = React.useMemo(() => {
    const words = text.split(" ").map((word) => ({ text: word, cite: false }));
    if (citeAfterWord > 0 && citeAfterWord <= words.length) {
      words.splice(citeAfterWord, 0, { text: "", cite: true });
    }
    return words;
  }, [text, citeAfterWord]);

  const [count, setCount] = React.useState(0);
  const [sourcesOpen, setSourcesOpen] = React.useState(false);
  const shown = reduceMotion ? tokens.length : count;
  const done = shown >= tokens.length;

  React.useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setCount((c) => (c >= tokens.length ? 0 : c + 1)), done ? HOLD_MS : WORD_MS);
    return () => clearTimeout(t);
  }, [count, done, tokens.length, reduceMotion]);

  const primarySource = sources[0];
  const reveal = done ? "opacity-100" : "pointer-events-none opacity-0";

  return (
    <div className={cn("min-h-52 w-full max-w-96", className)} {...props}>
      <p className="text-sm leading-relaxed text-foreground" aria-busy={!done}>
        {tokens.slice(0, shown).map((token, i) =>
          token.cite && primarySource ? (
            <a
              key={i}
              href={primarySource.href ?? `https://${primarySource.host}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                focusRing,
                "me-1 inline-flex h-5 items-center gap-1 rounded-full bg-(--tag) ps-0.5 pe-2 align-middle text-xs text-muted-foreground",
                "transition-colors duration-fast hover:text-foreground",
                "animate-in fade-in zoom-in-90 duration-base motion-reduce:animate-none",
              )}
            >
              <SourceMark name={primarySource.name} className="size-4 rounded-full" />
              <span>{primarySource.host}</span>
            </a>
          ) : (
            <span key={i} className="animate-in fade-in duration-base motion-reduce:animate-none">
              {token.text}{" "}
            </span>
          ),
        )}
        {!done && (
          <span aria-hidden="true" className="ms-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 rounded-full bg-foreground" />
        )}
      </p>

      <div className={cn("mt-2 flex items-center gap-0.5 transition-opacity duration-slow", reveal)}>
        {ACTIONS.map((action) => (
          <button key={action.label} type="button" aria-label={action.label} className={actionButton}>
            <Icon icon={action.icon} className="size-4" aria-hidden="true" />
          </button>
        ))}
        <button
          type="button"
          aria-expanded={sourcesOpen}
          onClick={() => setSourcesOpen((current) => !current)}
          className={cn(
            focusRing,
            "ms-1.5 flex h-8 items-center gap-2 rounded-full px-2 text-left transition-colors duration-fast hover:bg-accent",
          )}
        >
          <span className="flex -space-x-1">
            {sources.map((source) => (
              <SourceMark key={source.host} name={source.name} className="size-4 rounded-full ring-2 ring-background" />
            ))}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">{totalSources} sources</span>
        </button>
      </div>

      {done && sourcesOpen && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-slow motion-reduce:animate-none">
          <div className={cn(optionTrack, "mt-2 flex flex-col gap-0.5 rounded-2xl p-1")}>
            {sources.map((source) => (
              <a
                key={source.host}
                href={source.href ?? `https://${source.host}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  focusRing,
                  "flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-foreground transition-colors duration-fast hover:bg-accent",
                )}
              >
                <SourceMark name={source.name} className="size-5" />
                <span>{source.name}</span>
                <span className="ms-auto text-xs text-muted-foreground">{source.host}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className={cn("mt-3 transition-opacity duration-slow", reveal)}>
        <p className="text-xs text-muted-foreground">Follow-ups</p>
        <div className="mt-1 flex flex-col">
          {followUps.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onFollowUp?.(item)}
              tabIndex={done ? undefined : -1}
              className={cn(
                focusRing,
                "flex items-center gap-2 rounded-md border-b border-border px-1.5 py-2 text-left text-sm text-foreground transition-colors duration-fast hover:bg-accent",
              )}
            >
              <Icon icon="iconoir:arrow-right" className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StreamingSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: StreamingSource[];
  totalCount?: number;
}

/** A static row of cited sources as quiet chips, with a count above them. */
function StreamingSources({ sources, totalCount, className, ...props }: StreamingSourcesProps) {
  const count = totalCount ?? sources.length;
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <span className="text-xs text-muted-foreground tabular-nums">
        {count} {count === 1 ? "source" : "sources"}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source) => (
          <a
            key={source.host}
            href={source.href ?? `https://${source.host}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              focusRing,
              "inline-flex h-7 items-center gap-1.5 rounded-full bg-(--tag) ps-1 pe-2.5 text-xs text-foreground transition-colors hover:bg-accent",
            )}
          >
            <SourceMark name={source.name} className="size-5 rounded-full" />
            <span className="font-medium">{source.name}</span>
            <span className="text-muted-foreground">{source.host}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

interface StreamingFollowUpsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: string[];
  onSelect?: (item: string) => void;
}

/** Suggested next questions as lilac tag pills. */
function StreamingFollowUps({ items, onSelect, className, ...props }: StreamingFollowUpsProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <span className="text-xs text-muted-foreground">Follow-ups</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onSelect?.(item)}
            className={cn(
              focusRing,
              "h-8 rounded-full bg-(--tag) px-3 text-sm text-foreground transition-colors hover:bg-accent",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export { StreamingText, StreamingSources, StreamingFollowUps };
export type { StreamingSource };
