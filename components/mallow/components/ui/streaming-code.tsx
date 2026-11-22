"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, optionTrack } from "./_shared";

const LINE_MS = 240;
const HOLD_MS = 3200;

/** One run of code text, with an optional tone: keyword, string, number, function or dim. */
type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" };

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "import ", c: "kw" }, { t: "{ Queue } " }, { t: "from ", c: "kw" }, { t: "\"./queue\"", c: "str" }, { t: ";", c: "dim" }],
  [{ t: "" }],
  [{ t: "const ", c: "kw" }, { t: "queue = " }, { t: "new ", c: "kw" }, { t: "Queue", c: "fn" }, { t: "({ region });", c: "dim" }],
  [{ t: "const ", c: "kw" }, { t: "job = " }, { t: "await ", c: "kw" }, { t: "queue." }, { t: "add", c: "fn" }, { t: "(", c: "dim" }, { t: "\"export\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "console." }, { t: "log", c: "fn" }, { t: "(job.id, job.retries ?? ", c: "dim" }, { t: "3", c: "num" }, { t: ");", c: "dim" }],
];

const DEFAULT_RAW = `import { Queue } from "@acme/jobs";

const queue = new Queue({ region });
const job = await queue.add("export");
console.log(job.id, job.retries ?? 3);`;

/** Mallow's code tones: blue keywords, green strings, coral numbers and ink names. */
const TONE: { [tone in NonNullable<CodeToken["c"]>]: string } = {
  kw: "text-info-text",
  str: "text-success-text",
  num: "text-(--fee)",
  fn: "font-medium text-foreground",
  dim: "text-muted-foreground",
};

interface StreamingCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string;
  language?: string;
  lines?: CodeToken[][];
  /** Plain-text form used by the copy button. */
  raw?: string;
  /** Alternative to lines/raw: plain code split on newlines, no token colours. */
  code?: string;
}

/**
 * Mallow StreamingCode: a card with a lilac code panel where lines arrive
 * one at a time behind a caret, then hold and loop; reduced motion shows it whole.
 */
function StreamingCode({
  filename = "export.ts",
  language = "TypeScript",
  lines,
  raw,
  code,
  className,
  ...props
}: StreamingCodeProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const tokenLines = React.useMemo<CodeToken[][]>(() => {
    if (lines) return lines;
    if (code) return code.split("\n").map((text) => [{ t: text || " " }]);
    return DEFAULT_LINES;
  }, [lines, code]);
  const rawText = raw ?? code ?? DEFAULT_RAW;

  const [count, setCount] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const shown = reduceMotion ? tokenLines.length : count;
  const done = shown >= tokenLines.length;

  React.useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(
      () => setCount((c) => (c >= tokenLines.length ? 0 : c + 1)),
      count === 0 ? 400 : done ? HOLD_MS : LINE_MS,
    );
    return () => clearTimeout(t);
  }, [count, done, tokenLines.length, reduceMotion]);

  const copy = React.useCallback(() => {
    navigator.clipboard
      .writeText(rawText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // The clipboard may be unavailable. The code stays selectable.
      });
  }, [rawText]);

  return (
    <div className={cn(cardSlab, "w-full max-w-96 overflow-hidden rounded-3xl p-2", className)} {...props}>
      <div className="flex h-10 items-center justify-between ps-3 pe-1">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-sm text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </span>
        <button
          aria-label="Copy code"
          type="button"
          onClick={copy}
          className={cn(
            focusRing,
            "flex h-8 items-center gap-1.5 rounded-full px-3 text-xs transition-colors duration-fast hover:bg-accent",
            copied ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon icon={copied ? "iconoir:check" : "iconoir:copy"} className="size-4" aria-hidden="true" />
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre
        aria-busy={!done}
        className={cn(optionTrack, "min-h-36 overflow-x-auto rounded-2xl p-4 font-mono text-xs leading-relaxed text-foreground")}
      >
        {tokenLines.slice(0, shown).map((line, i) => (
          <div key={i} className="flex animate-in fade-in slide-in-from-bottom-1 duration-base motion-reduce:animate-none">
            <span className="w-5 shrink-0 select-none text-right text-muted-foreground/60 tabular-nums">{i + 1}</span>
            <span className="whitespace-pre ps-3">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TONE[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === shown - 1 && !done && (
                <span aria-hidden="true" className="ms-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-foreground" />
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export { StreamingCode };
export type { CodeToken };
