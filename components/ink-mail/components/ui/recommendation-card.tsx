"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// RecommendationCard: an agent suggestion with a confidence meter and actions.
// The card holds its shape. Pressing "Alternatives" opens a drawer listing
// the other options; picking one promotes it to the recommendation. The
// primary action confirms.
//
// Ink mail: a card one luminance step above the black page, inline code in
// the faint white chip, and a three-bar meter whose colour is the only
// status signal: green when confident, yellow when it needs review.
//
// Usage:
//   <RecommendationCard />

interface RecommendationOption {
  key: string
  body: React.ReactNode
  short: string
  /** Confidence bars lit, 0 to 3. */
  signal: number
  label: string
  cta: string
}

const codeChip =
  "rounded-sm bg-(--code-inline) px-1.5 py-0.5 font-mono text-xs text-foreground"

const DEFAULT_OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Retry the 42 soft bounces through <code className={codeChip}>smtp_backup</code> after a{" "}
        <code className={codeChip}>15_min</code> delay.
      </>
    ),
    short: "Retry soft bounces via smtp_backup",
    signal: 3,
    label: "High confidence",
    cta: "Retry",
  },
  {
    key: "review",
    body: (
      <>
        Move the sending domain to <code className={codeChip}>send.example.dev</code> to warm a fresh IP.
      </>
    ),
    short: "Move to send.example.dev",
    signal: 2,
    label: "Needs review",
    cta: "Configure",
  },
  {
    key: "none",
    body: (
      <>
        Suppress <span className="font-medium text-foreground">every bounced address</span> and skip the retry.
      </>
    ),
    short: "Suppress every bounced address",
    signal: 0,
    label: "No signal",
    cta: "Suppress all",
  },
]

function meterTone(signal: number) {
  if (signal >= 3) return "bg-success"
  if (signal >= 1) return "bg-warning"
  return "bg-muted-foreground"
}

function Meter({ signal }: { signal: number }) {
  const tone = meterTone(signal)
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn(
            "h-2.5 w-1 rounded-full transition-colors duration-slow",
            bar < signal ? tone : "bg-border",
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
  question = "Want me to retry the bounced sends?",
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
      className={cn("w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div className="p-4">
        <span className="text-sm font-medium text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 text-sm leading-relaxed text-(--foreground-secondary) animate-in fade-in-0 duration-base"
        >
          {active.body}
        </p>
      </div>

      {/* alternatives drawer */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-background/40 p-2">
            <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">Other options</p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                tabIndex={open ? undefined : -1}
                onClick={() => {
                  setSelected(i)
                  setAccepted(false)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-start transition-colors duration-fast hover:bg-accent outline-none focus-visible:ring-3 focus-visible:ring-ring"
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs font-medium text-(--foreground-secondary)">{active.label}</span>
        </span>

        <span className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "h-8 rounded-lg border border-(--line-strong) px-3 text-xs font-semibold transition-colors duration-fast outline-none focus-visible:ring-3 focus-visible:ring-ring",
              open ? "bg-(--wash) text-foreground" : "bg-secondary text-foreground hover:bg-muted",
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
              "h-8 rounded-lg px-3 text-xs font-semibold transition-colors duration-fast outline-none focus-visible:ring-3 focus-visible:ring-ring",
              accepted
                ? "bg-success text-success-foreground"
                : "bg-primary text-primary-foreground hover:bg-(--primary-hover) active:bg-(--primary-active)",
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
