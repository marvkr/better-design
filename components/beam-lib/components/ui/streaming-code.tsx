"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// StreamingCode: agent-written code streams line by line with token-level
// syntax color, line numbers, and a live copy action.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="app.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "export async function ", c: "kw" }, { t: "churnBatch", c: "fn" }, { t: "() {", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "flavor = " }, { t: "await ", c: "kw" }, { t: "getFlavor", c: "fn" }, { t: "(", c: "dim" }, { t: "\"pistachio\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "base = " }, { t: "await ", c: "kw" }, { t: "dairy." }, { t: "fetch", c: "fn" }, { t: "({ flavor });", c: "dim" }],
  [{ t: "  await ", c: "kw" }, { t: "freezer." }, { t: "store", c: "fn" }, { t: "(base, { temp: ", c: "dim" }, { t: "\"-14C\"", c: "str" }, { t: " });", c: "dim" }],
  [{ t: "  return ", c: "kw" }, { t: "base.gallons;" }],
  [{ t: "}", c: "dim" }],
]

const DEFAULT_RAW = `export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`

const COLORS: Record<string, string> = {
  kw: "var(--primary)",
  str: "var(--chart-2)",
  num: "var(--chart-4)",
  fn: "var(--foreground)",
  dim: "var(--muted-foreground)",
}

interface StreamingCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  filename?: string
  language?: string
  lines?: CodeToken[][]
  /** Plain-text form used by the copy button. */
  raw?: string
  /** Alternative to lines/raw: plain code split on newlines, no token colors. */
  code?: string
}

function StreamingCode({
  filename = "churn.ts",
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
        // Clipboard may be unavailable. The code remains selectable.
      })
  }, [rawText])

  return (
    <div className={cn("w-full max-w-[23.75rem] overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)} {...props}>
      {/* header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-[0.75rem] font-medium text-foreground">{filename}</span>
          <span className="text-[0.7188rem] text-muted-foreground">{language}</span>
        </span>
        <button
          aria-label="Copy code"
          type="button"
          onClick={copy}
          className={cn(
            "flex h-6 items-center gap-1 rounded-[0.375rem] px-1.5 text-[0.7188rem] font-medium transition-colors duration-fast hover:bg-accent",
            copied ? "text-[color:var(--chart-2)]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* code */}
      <pre className="min-h-[8.5625rem] bg-muted/40 px-3 py-2.5 font-mono text-[0.7188rem] leading-[1.7]">
        {tokenLines.slice(0, count).map((line, i) => (
          <div key={i} className="flex" style={{ animation: "bui-fade-up 250ms cubic-bezier(0.23,1,0.32,1) both" }}>
            <span className="w-5 shrink-0 text-right text-[0.6563rem] leading-[1.86] text-muted-foreground/60 select-none">
              {i + 1}
            </span>
            <span className="pl-2.5 whitespace-pre">
              {line.map((tok, j) => (
                <span key={j} style={{ color: tok.c ? COLORS[tok.c] : "var(--foreground)" }}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span className="ml-0.5 inline-block h-3 w-[0.1875rem] translate-y-0.5 rounded-full bg-primary" />
              )}
            </span>
          </div>
        ))}
      </pre>
      <style>{`
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  )
}

export { StreamingCode }
export type { CodeToken }
