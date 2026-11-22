"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// StreamingCode: code an agent is writing arrives line by line on a white
// sheet, with a faint line-number gutter, the editor's clause inks and a
// copy pill in the bar above.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="report.py" language="Python" lines={...} raw="..." />

const LINE_MS = 220
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "# summarise a week of page visits", c: "dim" }],
  [{ t: "" }],
  [{ t: "def ", c: "kw" }, { t: "weekly_summary", c: "fn" }, { t: "(visits):" }],
  [{ t: "    total = " }, { t: "sum", c: "fn" }, { t: "(visits)" }],
  [{ t: "    average = " }, { t: "round", c: "fn" }, { t: "(total / " }, { t: "7", c: "num" }, { t: ", " }, { t: "1", c: "num" }, { t: ")" }],
  [{ t: "    ", }, { t: "return ", c: "kw" }, { t: "{" }, { t: "\"total\"", c: "str" }, { t: ": total, " }, { t: "\"average\"", c: "str" }, { t: ": average}" }],
]

const DEFAULT_RAW = `# summarise a week of page visits

def weekly_summary(visits):
    total = sum(visits)
    average = round(total / 7, 1)
    return {"total": total, "average": average}`

/** The class each token kind takes from Margin's editor palette. */
const TONE: { [tone in NonNullable<CodeToken["c"]>]: string } = {
  kw: "text-(--clause-keyword)",
  str: "text-(--clause-string)",
  num: "text-(--clause-number)",
  fn: "text-(--clause-fn)",
  dim: "text-(--clause-comment)",
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
 * Margin StreamingCode: lines appear one at a time on a white code sheet
 * behind a thin oxblood caret, hold once the block is complete, then replay.
 */
function StreamingCode({
  filename = "summary.py",
  language = "Python",
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

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  const copy = React.useCallback(() => {
    navigator.clipboard
      .writeText(rawText)
      .then(() => setCopied(true))
      .catch(() => {
        // The clipboard may be unavailable. The code stays selectable.
      })
  }, [rawText])

  return (
    <div
      data-slot="streaming-code"
      className={cn("flex w-full max-w-md flex-col gap-2", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-7 min-w-0 items-center gap-2 rounded-lg bg-card px-2.5 text-sm shadow-sm">
          <span className="truncate text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </span>
        <button
          aria-label={copied ? "Copied" : "Copy code"}
          type="button"
          onClick={copy}
          className={cn(
            focusRing,
            "grid size-7 place-items-center rounded-lg bg-card shadow-sm transition-colors duration-fast hover:bg-accent",
            copied ? "text-(--primary-text)" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon
            icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"}
            className="size-4"
            aria-hidden="true"
          />
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied" : ""}
        </span>
      </div>

      <pre
        aria-busy={!done}
        className="m-0 min-h-40 overflow-x-auto rounded-xl border border-border bg-card py-3.5 pe-4 font-mono text-xs leading-6 text-foreground"
      >
        {tokenLines.slice(0, count).map((line, i) => (
          <div key={i} className="flex animate-in fade-in slide-in-from-bottom-1 duration-base">
            <span
              aria-hidden="true"
              className="w-9 shrink-0 select-none pe-4 text-right tabular-nums text-(--clause-gutter)"
            >
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TONE[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span
                  aria-hidden="true"
                  className="ms-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
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
