"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// StreamingCode: agent-written code streams in line by line, with token
// colours, line numbers and a copy action, framed as an Airy docs sample.
//
// Usage:
//   <StreamingCode />
//   <StreamingCode filename="app.ts" language="TypeScript" lines={...} raw="..." />

const LINE_MS = 240
const HOLD_MS = 3200

type CodeToken = { t: string; c?: "kw" | "str" | "num" | "fn" | "dim" }

const DEFAULT_LINES: CodeToken[][] = [
  [{ t: "import ", c: "kw" }, { t: "{ Client } " }, { t: "from ", c: "kw" }, { t: "\"@acme/sdk\"", c: "str" }, { t: ";", c: "dim" }],
  [{ t: "" }],
  [{ t: "const ", c: "kw" }, { t: "client = " }, { t: "new ", c: "kw" }, { t: "Client", c: "fn" }, { t: "({ apiKey });", c: "dim" }],
  [{ t: "const ", c: "kw" }, { t: "page = " }, { t: "await ", c: "kw" }, { t: "client.pages." }, { t: "get", c: "fn" }, { t: "(", c: "dim" }, { t: "\"quickstart\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "console." }, { t: "log", c: "fn" }, { t: "(page.title, page.version ?? ", c: "dim" }, { t: "2", c: "num" }, { t: ");", c: "dim" }],
]

const DEFAULT_RAW = `import { Client } from "@acme/sdk";

const client = new Client({ apiKey });
const page = await client.pages.get("quickstart");
console.log(page.title, page.version ?? 2);`

const TONE: Record<NonNullable<CodeToken["c"]>, string> = {
  kw: "text-(--syntax-keyword)",
  str: "text-(--syntax-string)",
  num: "text-(--syntax-fn)",
  fn: "text-(--syntax-fn)",
  dim: "text-(--syntax-comment)",
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

function StreamingCode({
  filename = "quickstart.ts",
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
        "w-full max-w-[23.75rem] overflow-hidden rounded-xl border border-border bg-secondary p-0.5",
        className,
      )}
      {...props}
    >
      <div className="flex h-8 items-center justify-between ps-2.5 pe-1">
        <span className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-medium text-foreground">{filename}</span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </span>
        <button
          aria-label="Copy code"
          type="button"
          onClick={copy}
          className={cn(
            "flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium outline-none transition-colors duration-fast hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring",
            copied ? "text-(--primary-text)" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon icon={copied ? "feather:check" : "feather:copy"} className="size-3" aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="min-h-[8.5rem] rounded-lg bg-(--code) px-3 py-2.5 font-mono text-xs leading-[1.7] text-(--code-foreground)">
        {tokenLines.slice(0, count).map((line, i) => (
          <div key={i} className="flex animate-in fade-in slide-in-from-bottom-1 duration-base">
            <span className="w-5 shrink-0 select-none text-right text-muted-foreground/70">
              {i + 1}
            </span>
            <span className="whitespace-pre pl-3">
              {line.map((tok, j) => (
                <span key={j} className={tok.c ? TONE[tok.c] : undefined}>
                  {tok.t}
                </span>
              ))}
              {i === count - 1 && !done && (
                <span className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 bg-primary" />
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
