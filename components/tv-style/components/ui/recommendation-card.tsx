"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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
  /** Confidence bars lit, 0 to 3. */
  signal: number
  label: string
  cta: string
}

const codeChip =
  "rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[0.75rem] text-primary"

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

const SIGNAL_TONES = ["var(--muted-foreground)", "var(--chart-4)", "var(--chart-2)"]

function Meter({ signal }: { signal: number }) {
  const tone = signal >= 3 ? SIGNAL_TONES[2] : signal >= 1 ? SIGNAL_TONES[1] : SIGNAL_TONES[0]
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className="w-1 rounded-full transition-colors duration-slow"
          style={{ height: 10, background: bar < signal ? tone : "var(--border)" }}
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
      className={cn("w-full max-w-[23.75rem] overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}
      {...props}
    >
      <div className="p-3.5">
        <span className="text-[0.8125rem] font-semibold text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 text-[0.8125rem] leading-relaxed text-foreground/70"
          style={{ animation: "bui-fade-in 180ms ease-out both" }}
        >
          {active.body}
        </p>
      </div>

      {/* alternatives drawer */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-slow"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-muted/40 px-2 py-2">
            <p className="px-1.5 pb-1 text-[0.6875rem] font-medium text-muted-foreground">Other options</p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                onClick={() => {
                  setSelected(i)
                  setAccepted(false)
                  setOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-[0.7813rem] text-foreground">{o.short}</span>
                <span className="shrink-0 text-[0.6875rem] text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/40 px-3.5 py-2.5">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-[0.7813rem] font-medium text-foreground/70">{active.label}</span>
        </span>

        <span className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "h-7 rounded-md border border-border px-2.5 text-[0.7813rem] font-medium shadow-sm transition-[background-color,transform] duration-fast active:scale-[0.96]",
              open ? "bg-accent text-foreground" : "bg-card text-foreground hover:bg-accent",
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
              "h-7 rounded-md px-3 text-[0.7813rem] font-medium shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.14)] transition-[background-color,transform,opacity] duration-fast active:scale-[0.96]",
              accepted
                ? "bg-[color:var(--chart-2)] text-background"
                : "bg-primary text-primary-foreground hover:opacity-90",
            )}
          >
            {accepted ? "Accepted" : active.cta}
          </button>
        </span>
      </div>
      <style>{`
        @keyframes bui-fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}

export { RecommendationCard }
export type { RecommendationOption }
