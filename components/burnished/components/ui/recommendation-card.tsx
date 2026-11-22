"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing, wellInset } from "./_shared"
import { Button } from "./button"

// RecommendationCard: an agent suggestion with a confidence meter and
// actions. "Alternatives" opens a drawer of the other options; picking one
// promotes it. The cream primary confirms.
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

/** Inline code: a tiny recessed well in Geist Mono. */
const codeChip = cn(
  wellInset,
  "rounded-sm px-1.5 py-0.5 font-mono text-[0.8125rem] tracking-normal text-foreground",
)

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
        Leave the reference as it is and add a <span className="font-semibold text-foreground">migration guide</span> instead.
      </>
    ),
    short: "Add a migration guide only",
    signal: 0,
    label: "No signal",
    cta: "Write the guide",
  },
]

/** Three rising bars: glow when sure, flame when unsure, empty bars sunk. */
function Meter({ signal }: { signal: number }) {
  const fill = signal >= 3 ? "bg-glow" : signal >= 1 ? "bg-flame" : "bg-muted-foreground"
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-1 rounded-full transition-colors duration-slow",
            bar === 0 ? "h-1.5" : bar === 1 ? "h-2" : "h-2.5",
            bar < signal ? fill : "bg-input",
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

/**
 * Burnished RecommendationCard: an umber slab with the suggestion on top
 * and a recessed well footer holding the meter, a graphite Alternatives
 * pill and the cream ringed primary.
 */
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
      className={cn(cardSlab, "w-full max-w-[23.75rem] rounded-2xl p-1.5", className)}
      {...props}
    >
      <div className="px-3.5 pt-3.5 pb-4">
        <span className="text-[0.9375rem] font-semibold text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 animate-in fade-in text-sm leading-relaxed text-muted-foreground duration-base"
        >
          {active.body}
        </p>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-slow ease-(--ease-out)",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-1.5 pb-2">
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
                className={cn(
                  focusRing,
                  "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors duration-fast",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent",
                )}
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(wellInset, "flex items-center justify-between gap-3 rounded-xl py-2 ps-3.5 pe-2")}>
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs font-medium text-muted-foreground">{active.label}</span>
        </span>

        <span className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="h-8 px-3.5 text-xs"
          >
            Alternatives
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setAccepted(true)
              onAccept?.(active)
            }}
            className="h-8 px-3.5 text-xs"
          >
            {accepted ? "Accepted" : active.cta}
          </Button>
        </span>
      </div>
    </div>
  )
}

export { RecommendationCard }
export type { RecommendationOption }
