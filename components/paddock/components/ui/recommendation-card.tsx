"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cardSlab, focusRing } from "./_shared"
import { Button } from "./button"

// RecommendationCard: an agent suggestion with a confidence meter and
// actions. "Alternatives" opens a list of the other options; picking one
// promotes it. The teal primary confirms.
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

/** Inline code: a small grey chip in the mono face. */
const codeChip = "rounded-xs bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground"

const DEFAULT_OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Move the three late cards from <code className={codeChip}>In review</code> back to{" "}
        <code className={codeChip}>In progress</code> and push their dates by a week.
      </>
    ),
    short: "Move late cards back a stage",
    signal: 3,
    label: "High confidence",
    cta: "Accept",
  },
  {
    key: "review",
    body: (
      <>
        Split <code className={codeChip}>Mobile app</code> into two projects so design and build have their own dates.
      </>
    ),
    short: "Split the mobile project in two",
    signal: 2,
    label: "Needs review",
    cta: "Review",
  },
  {
    key: "none",
    body: (
      <>
        Keep the schedule as it is and add a <span className="font-medium text-foreground">weekly check-in</span> with the owners instead.
      </>
    ),
    short: "Add a weekly check-in only",
    signal: 0,
    label: "No signal",
    cta: "Schedule it",
  },
]

/** Three rising bars: dark slate when sure, coral when unsure, grey when there is nothing to go on. */
function Meter({ signal }: { signal: number }) {
  const fill = signal >= 3 ? "bg-foreground" : signal >= 1 ? "bg-(--status-late)" : "bg-muted-foreground"
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-1 rounded-xs transition-colors duration-slow",
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
 * Paddock RecommendationCard: a white bordered card with the suggestion on top
 * and a divided footer holding the meter, a white Alternatives button and the teal primary.
 */
function RecommendationCard({
  question = "Want me to rebalance the review column?",
  options = DEFAULT_OPTIONS,
  onAccept,
  className,
  ...props
}: RecommendationCardProps) {
  const [selected, setSelected] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [accepted, setAccepted] = React.useState(false)
  const listId = React.useId()

  const active = options[selected]
  const others = options.map((o, i) => ({ o, i })).filter(({ i }) => i !== selected)

  return (
    <div className={cn(cardSlab, "w-full max-w-96 overflow-hidden rounded-xl", className)} {...props}>
      <div className="px-4 pt-4 pb-3">
        <span className="text-[0.9375rem] font-semibold text-foreground">{question}</span>
        <p
          key={active.key}
          className="mt-1 min-h-12 animate-in fade-in text-[0.8125rem] text-muted-foreground duration-base"
        >
          {active.body}
        </p>
      </div>

      {open && (
        <div id={listId} className="animate-in fade-in slide-in-from-top-1 px-2 pb-2 duration-base">
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
                "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors duration-fast hover:bg-accent",
              )}
            >
              <Meter signal={o.signal} />
              <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-foreground">{o.short}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border py-2.5 ps-4 pe-2.5">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs font-medium text-muted-foreground">{active.label}</span>
        </span>

        <span className="ms-auto flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            onClick={() => setOpen((current) => !current)}
          >
            Alternatives
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setAccepted(true)
              onAccept?.(active)
            }}
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
