"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, surfacePlate } from "./_shared"

// StreamingCode: agent-written code arrives line by line in a grey well on a
// white card, with line numbers, quiet token tones and a copy button.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="sync.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "import ", c: "kw" }, { t: "{ schedule } " }, { t: "from ", c: "kw" }, { t: "\"./workspace\"", c: "str" }, { t: ";", c: "dim" }],
  [{ t: "" }],
  [{ t: "const ", c: "kw" }, { t: "stage = " }, { t: "await ", c: "kw" }, { t: "schedule." }, { t: "column", c: "fn" }, { t: "(", c: "dim" }, { t: "\"review\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "const ", c: "kw" }, { t: "late = stage.cards." }, { t: "filter", c: "fn" }, { t: "((c) => c.daysLeft < ", c: "dim" }, { t: "2", c: "num" }, { t: ");", c: "dim" }],
  [{ t: "await ", c: "kw" }, { t: "schedule." }, { t: "flag", c: "fn" }, { t: "(late, ", c: "dim" }, { t: "\"urgent\"", c: "str" }, { t: ");", c: "dim" }],
]

const DEFAULT_RAW = `import { schedule } from "@acme/workspace";

const stage = await schedule.column("review");
const late = stage.cards.filter((c) => c.daysLeft < 2);
await schedule.flag(late, "urgent");`

/** Paddock keeps code nearly monochrome: slate for structure, violet only for literals. */
const TONE: { [tone in NonNullable<CodeToken["c"]>]: string } = {
  kw: "font-medium text-foreground",
  str: "text-(--status-in-room-text)",
  num: "text-(--status-in-room-text)",
  fn: "text-info-text",
  dim: "text-muted-foreground",
}

interface StreamingCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string
  language?: string
  lines?: CodeToken[][]
  /** Plain-text form used by the copy button. */
  raw?: string
  /** Alternative to lines/raw: plain code split on newlines, no token colours. */
  code?: string
}

/**
 * Paddock StreamingCode: a white card whose grey well fills one line at a
 * time behind a solid caret, then holds and starts again.
 */
function StreamingCode({
  filename = "flag-late.ts",
  language = "TypeScript",
  lines,
  raw,
  code,
  className,
  ...props
}: StreamingCodeProps) {
  const tokenLines = React.useMemo<CodeToken[][]>(() => {
    if (lines) return lines
    if (code) return code.split("\n").map((text) => [{ t: text || " " }])
    return DEFAULT_LINES
  }, [lines, code])
  const rawText = raw ?? code ?? DEFAULT_RAW

  const [count, setCount] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const done = count >= tokenLines.length

  React.useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= tokenLines.length ? 0 : c + 1)),
      count === 0 ? 400 : done ? HOLD_MS : LINE_MS,
    )
    return () => clearTimeout(t)
  }, [count, done, tokenLines.length])

  const copy = React.useCallback(() => {
    navigator.clipboard
      .writeText(rawText)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {
        // The clipboard may be unavailable. The code stays selectable.
      })
  }, [rawText])

  return (
    <div
      className={cn(cardSlab, "w-full max-w-96 overflow-hidden rounded-xl p-2", className)}
      {...props}
    >
      <div className="flex h-9 items-center justify-between ps-2 pe-0.5">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-medium text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </span>
        <button
          aria-label="Copy code"
          type="button"
          onClick={copy}
          className={cn(
            focusRing,
            "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors duration-fast",
            "hover:bg-accent",
            copied ? "text-success-text" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon icon={copied ? "mingcute:check-line" : "mingcute:copy-2-line"} className="size-3.5" aria-hidden="true" />
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre
        className={cn(
          surfacePlate,
          "min-h-36 rounded-lg px-3 py-3 font-mono text-xs leading-relaxed text-foreground",
        )}
      >
        {tokenLines.slice(0, count).map((line, i) => (
          <div key={i} className="flex animate-in fade-in slide-in-from-bottom-1 duration-base">
            <span className="w-5 shrink-0 select-none text-right text-muted-foreground">{i + 1}</span>
            <span className="whitespace-pre pl-3">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TONE[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-xs bg-foreground"
                />
              )}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}

export { StreamingCode }
export type { CodeToken }
