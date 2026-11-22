"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { primaryFill } from "./_shared"

// RecommendationCard: agent suggestion with a confidence meter and actions.
// The card holds its shape. Pressing "Alternatives" opens a drawer listing
// the other options; picking one promotes it to the recommendation. The
// primary action confirms.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
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
        Reorder waffle cones from <code className={codeChip}>cone_king</code> with lead time{" "}
        <code className={codeChip}>7_days</code>.
      </>
    ),
    short: "Reorder from cone_king, 7-day lead",
    signal: 3,
    label: "High confidence",
    cta: "Accept",
  },
  {
    key: "review",
    body: (
      <>
        Switch vanilla to <code className={codeChip}>vanilla_madagascar</code> for peak season.
      </>
    ),
    short: "Switch to vanilla_madagascar",
    signal: 2,
    label: "Needs review",
    cta: "Configure",
  },
  {
    key: "none",
    body: (
      <>
        Fall back to a <span className="font-medium text-foreground">full restock</span> across every SKU.
      </>
    ),
    short: "Full restock across every SKU",
    signal: 0,
    label: "No signal",
    cta: "Accept full restock",
  },
]

const SIGNAL_TONES = ["var(--muted-foreground)", "var(--warning)", "var(--success)"]

function Meter({ signal }: { signal: number }) {
  const tone = signal >= 3 ? SIGNAL_TONES[2] : signal >= 1 ? SIGNAL_TONES[1] : SIGNAL_TONES[0]
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="w-1 rounded-full transition-colors duration-slow"
          style={{ height: "0.625rem", background: bar < signal ? tone : "var(--line-strong)" }}
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
  question = "Want me to place this restock order?",
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
      className={cn("w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card", className)}
      {...props}
    >
      <div className="px-5 pt-5 pb-4">
        <span className="font-serif text-lg font-medium leading-snug text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-2 min-h-12 text-sm leading-relaxed text-(--foreground-secondary) motion-reduce:animate-none"
          style={{ animation: "ce-fade-in 180ms ease-out both" }}
        >
          {active.body}
        </p>
      </div>

      {/* alternatives drawer */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-slow motion-reduce:transition-none"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-background px-2 py-2">
            <p className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">Other options</p>
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
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left outline-none transition-colors duration-fast hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring"
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-[0.8125rem] font-medium text-(--foreground-secondary)">{active.label}</span>
        </span>

        <span className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "h-8 rounded-md border border-(--line-strong) px-3 text-[0.8125rem] font-medium outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
              open ? "bg-muted text-foreground" : "bg-background text-foreground hover:bg-secondary",
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
              "h-8 rounded-md px-3 text-[0.8125rem] font-medium outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
              accepted ? "bg-(--success-tint) text-(--success-text)" : primaryFill,
            )}
          >
            {accepted ? "Accepted" : active.cta}
          </button>
        </span>
      </div>
      <style>{`
        @keyframes ce-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}

export { RecommendationCard }
export type { RecommendationOption }
