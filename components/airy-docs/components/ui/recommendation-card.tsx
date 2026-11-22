"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// RecommendationCard: an agent suggestion with a confidence meter and
// actions, in a hairline docs card. "Alternatives" opens a drawer of the
// other options; picking one promotes it. The green pill confirms.
//
// Usage:
//   <RecommendationCard />

interface RecommendationOption {
  key: string
  body: React.ReactNode
  short: string
  /** Confidence bars filled, 0 to 3. */
  signal: number
  label: string
  cta: string
}

const codeChip =
  "rounded-sm bg-(--code-inline) px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground"

const DEFAULT_OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Move the <code className={codeChip}>/v1/users</code> pages under a{" "}
        <code className={codeChip}>Legacy</code> group and point readers to v2.
      </>
    ),
    short: "Group v1 pages under Legacy",
    signal: 3,
    label: "High confidence",
    cta: "Accept",
  },
  {
    key: "review",
    body: (
      <>
        Rename <code className={codeChip}>page_token</code> to <code className={codeChip}>cursor</code> in every example.
      </>
    ),
    short: "Rename page_token to cursor",
    signal: 2,
    label: "Needs review",
    cta: "Review",
  },
  {
    key: "none",
    body: (
      <>
        Leave the reference as it is and add a <span className="font-medium text-foreground">migration guide</span> instead.
      </>
    ),
    short: "Add a migration guide only",
    signal: 0,
    label: "No signal",
    cta: "Write the guide",
  },
]

function Meter({ signal }: { signal: number }) {
  const fill = signal >= 3 ? "bg-primary" : signal >= 1 ? "bg-warning" : "bg-muted-foreground"
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-1 rounded-full transition-colors duration-slow",
            bar === 0 ? "h-1.5" : bar === 1 ? "h-2" : "h-2.5",
            bar < signal ? fill : "bg-(--line-strong)",
          )}
        />
      ))}
    </span>
  )
}

interface RecommendationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question?: string
  options?: RecommendationOption[]
  onAccept?: (option: RecommendationOption) => void
}

function RecommendationCard({
  question = "Want me to restructure the API reference?",
  options = DEFAULT_OPTIONS,
  onAccept,
  className,
  ...props
}: RecommendationCardProps) {
  const [selected, setSelected] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [accepted, setAccepted] = React.useState(false)

  const active = options[selected]
  const others = options.map((o, i) => ({ o, i })).filter(({ i }) => i !== selected)

  return (
    <div
      className={cn("w-full max-w-[23.75rem] overflow-hidden rounded-xl border border-border bg-card", className)}
      {...props}
    >
      <div className="p-4">
        <span className="text-sm font-semibold text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 animate-in fade-in text-sm leading-relaxed text-(--foreground-secondary) duration-base"
        >
          {active.body}
        </p>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-2 py-2">
            <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">Other options</p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                onClick={() => {
                  setSelected(i)
                  setAccepted(false)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary px-4 py-2.5">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs font-medium text-(--foreground-secondary)">{active.label}</span>
        </span>

        <span className="flex items-center gap-1.5">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "h-7 rounded-full border border-(--line-strong) px-3 text-xs font-medium text-foreground outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
              open ? "bg-muted" : "bg-background hover:bg-muted",
            )}
          >
            Alternatives
          </button>
          <button
            type="button"
            onClick={() => {
              setAccepted(true)
              onAccept?.(active)
            }}
            className={cn(
              "h-7 rounded-full px-3 text-xs font-medium outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
              accepted
                ? "bg-(--primary-wash) text-(--primary-text)"
                : "bg-primary text-primary-foreground hover:bg-(--primary-hover)",
            )}
          >
            {accepted ? "Accepted" : active.cta}
          </button>
        </span>
      </div>
    </div>
  )
}

export { RecommendationCard }
export type { RecommendationOption }
