"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// Ink mail StreamingCode: agent-written code streams into the code window
// line by line, with token colours, line numbers and a copy action.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="send.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "export async function ", c: "kw" }, { t: "sendReceipt", c: "fn" }, { t: "(to) {", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "client = " }, { t: "new ", c: "kw" }, { t: "Mailer", c: "fn" }, { t: "(env.", c: "dim" }, { t: "API_KEY" }, { t: ");", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "{ id } = " }, { t: "await ", c: "kw" }, { t: "client.emails." }, { t: "send", c: "fn" }, { t: "({", c: "dim" }],
  [{ t: "    from: " }, { t: "\"receipts@acme.dev\"", c: "str" }, { t: ", to,", c: "dim" }],
  [{ t: "    subject: " }, { t: "\"Your receipt\"", c: "str" }, { t: ", retries: " }, { t: "3", c: "num" }],
  [{ t: "  });", c: "dim" }],
  [{ t: "  return ", c: "kw" }, { t: "id;" }],
  [{ t: "}", c: "dim" }],
]

const DEFAULT_RAW = `export async function sendReceipt(to) {
  const client = new Mailer(env.API_KEY);
  const { id } = await client.emails.send({
    from: "receipts@acme.dev", to,
    subject: "Your receipt", retries: 3
  });
  return id;
}`

/** Each token kind mapped to its syntax colour token. */
const TOKEN_CLASS = {
  kw: "text-(--syntax-keyword)",
  str: "text-(--syntax-string)",
  num: "text-(--syntax-number)",
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
  filename = "send.ts",
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
        "w-full max-w-[26rem] overflow-hidden rounded-lg border border-(--line-strong) bg-(--code)",
        className,
      )}
      {...props}
    >
      {/* The window bar: traffic-light dots, the filename, then copy. */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-(--dot-red)" />
          <span className="size-2.5 rounded-full bg-(--dot-yellow)" />
          <span className="size-2.5 rounded-full bg-(--dot-green)" />
        </span>
        <span className="flex min-w-0 flex-1 items-baseline gap-2">
          <span className="truncate font-mono text-xs text-muted-foreground">{filename}</span>
          <span className="text-xs text-(--foreground-disabled)">{language}</span>
        </span>
        <button
          aria-label={copied ? "Copied" : "Copy code"}
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-fast ease-out",
            "outline-none hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring",
            copied ? "text-(--success-text)" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon icon={copied ? "ph:check" : "ph:copy"} className="size-4" aria-hidden="true" />
        </button>
      </div>

      <pre className="min-h-[11rem] overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-(--code-foreground)">
        {tokenLines.slice(0, count).map((line, i) => (
          <div
            key={i}
            className="flex"
            style={{ animation: "ink-line-in 200ms ease-out both" }}
          >
            <span className="w-5 shrink-0 select-none text-right text-(--foreground-disabled) tabular-nums">
              {i + 1}
            </span>
            <span className="whitespace-pre pl-4">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TOKEN_CLASS[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-foreground motion-safe:animate-pulse"
                />
              )}
            </span>
          </div>
        ))}
      </pre>
      <style>{`
        @keyframes ink-line-in { from { opacity: 0; transform: translateY(0.25rem); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { [data-slot="streaming-code"] pre > div { animation: none !important; } }
      `}</style>
    </div>
  )
}

export { StreamingCode }
export type { CodeToken }
