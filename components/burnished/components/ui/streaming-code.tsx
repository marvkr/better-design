"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, wellInset } from "./_shared"

// StreamingCode: agent-written code streams in line by line, with toned
// tokens, line numbers and a copy action, in a well cut into an umber slab.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="app.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "import ", c: "kw" }, { t: "{ Forge } " }, { t: "from ", c: "kw" }, { t: "\"@acme/forge\"", c: "str" }, { t: ";", c: "dim" }],
  [{ t: "" }],
  [{ t: "const ", c: "kw" }, { t: "forge = " }, { t: "new ", c: "kw" }, { t: "Forge", c: "fn" }, { t: "({ apiKey });", c: "dim" }],
  [{ t: "const ", c: "kw" }, { t: "job = " }, { t: "await ", c: "kw" }, { t: "forge.jobs." }, { t: "start", c: "fn" }, { t: "(", c: "dim" }, { t: "\"anneal\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "console." }, { t: "log", c: "fn" }, { t: "(job.id, job.retries ?? ", c: "dim" }, { t: "3", c: "num" }, { t: ");", c: "dim" }],
]

const DEFAULT_RAW = `import { Forge } from "@acme/forge";

const forge = new Forge({ apiKey });
const job = await forge.jobs.start("anneal");
console.log(job.id, job.retries ?? 3);`

/** The warm-light tones Burnished uses in place of a syntax palette. */
const TONE: { [tone in NonNullable<CodeToken["c"]>]: string } = {
  kw: "text-primary-text",
  str: "text-glow/75",
  num: "text-glow",
  fn: "font-medium text-foreground",
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
 * Burnished StreamingCode: an umber slab with a recessed well. Lines rise
 * into the well one at a time behind a glowing caret, then hold and loop.
 */
function StreamingCode({
  filename = "anneal.ts",
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
      className={cn(
        cardSlab,
        "w-full max-w-[23.75rem] overflow-hidden rounded-2xl p-1.5",
        className,
      )}
      {...props}
    >
      <div className="flex h-9 items-center justify-between ps-2.5 pe-1">
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
            "flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors duration-fast",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
            copied
              ? "text-primary-text"
              : "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
          )}
        >
          <Icon icon={copied ? "ph:check" : "ph:copy"} className="size-3.5" aria-hidden="true" />
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre
        className={cn(
          wellInset,
          "min-h-[8.75rem] rounded-xl px-3 py-3 font-mono text-xs leading-[1.7] tracking-normal text-foreground/85",
        )}
      >
        {tokenLines.slice(0, count).map((line, i) => (
          <div key={i} className="flex animate-in fade-in slide-in-from-bottom-1 duration-base">
            <span className="w-5 shrink-0 select-none text-right text-muted-foreground/60">
              {i + 1}
            </span>
            <span className="whitespace-pre pl-3">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TONE[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-glow shadow-[0_0_0.375rem_var(--glow)]"
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
