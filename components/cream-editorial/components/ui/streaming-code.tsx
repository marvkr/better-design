"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// StreamingCode: code an agent is writing arrives line by line on the dark
// warm code panel, with token colours, line numbers and a copy action.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="app.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "export async function ", c: "kw" }, { t: "draftReply", c: "fn" }, { t: "(thread) {", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "notes = " }, { t: "await ", c: "kw" }, { t: "readNotes", c: "fn" }, { t: "(", c: "dim" }, { t: "\"chapter-3\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "outline = " }, { t: "await ", c: "kw" }, { t: "writer." }, { t: "plan", c: "fn" }, { t: "({ notes });", c: "dim" }],
  [{ t: "  await ", c: "kw" }, { t: "thread." }, { t: "append", c: "fn" }, { t: "(outline, { tone: ", c: "dim" }, { t: "\"warm\"", c: "str" }, { t: " });", c: "dim" }],
  [{ t: "  return ", c: "kw" }, { t: "outline.words;" }],
  [{ t: "}", c: "dim" }],
]

const DEFAULT_RAW = `export async function draftReply(thread) {
  const notes = await readNotes("chapter-3");
  const outline = await writer.plan({ notes });
  await thread.append(outline, { tone: "warm" });
  return outline.words;
}`

/** Syntax colours on the dark code panel, one class per token kind. */
const TOKEN_CLASS = {
  kw: "text-(--syntax-keyword)",
  str: "text-(--syntax-string)",
  num: "text-(--syntax-keyword)",
  fn: "text-(--syntax-fn)",
  dim: "text-(--syntax-comment)",
} as const satisfies Record<NonNullable<CodeToken["c"]>, string>

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
  filename = "reply.ts",
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
    <div
      data-slot="streaming-code"
      className={cn(
        "w-full max-w-[26rem] overflow-hidden rounded-xl bg-(--code) text-(--code-foreground)",
        className,
      )}
      {...props}
    >
      {/* header: file name, language and copy */}
      <div className="flex items-center justify-between gap-3 bg-(--code-header) px-4 py-2 text-xs text-(--code-muted)">
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="truncate font-mono text-(--code-foreground)">{filename}</span>
          <span>{language}</span>
        </span>
        <button
          aria-label="Copy code"
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex h-6 items-center gap-1 rounded-sm px-1.5 text-xs font-medium",
            "transition-colors duration-fast ease-out",
            "outline-none focus-visible:ring-3 focus-visible:ring-ring",
            copied
              ? "text-(--syntax-string)"
              : "text-(--code-muted) hover:bg-(--code-foreground)/10 hover:text-(--code-foreground)",
          )}
        >
          <Icon icon={copied ? "ph:check" : "ph:copy"} className="size-3.5" aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* body */}
      <pre className="min-h-[9.5rem] overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
        {tokenLines.slice(0, count).map((line, i) => (
          <div
            key={i}
            className="flex animate-in fade-in slide-in-from-bottom-1 duration-base ease-out motion-reduce:animate-none"
          >
            <span className="w-6 shrink-0 select-none text-right text-(--code-muted)/60 tabular-nums">
              {i + 1}
            </span>
            <span className="whitespace-pre pl-3">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TOKEN_CLASS[tok.c] : "text-(--code-foreground)"}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 bg-primary motion-safe:animate-pulse"
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
