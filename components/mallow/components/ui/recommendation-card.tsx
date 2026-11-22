"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { cardSlab, focusRing, softPanel, optionTrack } from "./_shared"
import { Button } from "./button"

interface RecommendationOption {
  key: string
  body: React.ReactNode
  short: string
  /** Confidence bars filled, 0 to 3. */
  signal: number
  label: string
  cta: string
}

/** Inline code: a lilac chip in Geist Mono. */
const codeChip = "rounded-sm bg-(--tag) px-1.5 py-0.5 font-mono text-sm text-foreground"

const DEFAULT_OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Move the <code className={codeChip}>reports/</code> folder under <code className={codeChip}>archive/</code>{" "}
        and keep only this year in the main view.
      </>
    ),
    short: "Archive last year's reports",
    signal: 3,
    label: "High confidence",
    cta: "Accept",
  },
  {
    key: "review",
    body: (
      <>
        Rename <code className={codeChip}>due_on</code> to <code className={codeChip}>deadline</code> across every form.
      </>
    ),
    short: "Rename due_on to deadline",
    signal: 2,
    label: "Needs review",
    cta: "Review",
  },
  {
    key: "none",
    body: (
      <>
        Keep the folders as they are and add a <span className="font-medium text-foreground">short index page</span>{" "}
        instead.
      </>
    ),
    short: "Add an index page only",
    signal: 0,
    label: "No signal",
    cta: "Write the index",
  },
]

/** Three rising bars: ink when sure, coral when it needs a look, empty bars faint. */
function Meter({ signal }: { signal: number }) {
  const fill = signal >= 3 ? "bg-primary" : "bg-(--fee)"
  return (
    <span className="flex items-end gap-0.5" aria-hidden="true">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn(
            "w-1 rounded-full transition-colors duration-slow motion-reduce:transition-none",
            bar === 0 ? "h-1.5" : bar === 1 ? "h-2" : "h-2.5",
            bar < signal ? fill : "bg-foreground/15",
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
 * Mallow RecommendationCard: an agent's suggestion on the card, with its
 * confidence, the alternatives and the violet primary button on a tinted strip below.
 */
function RecommendationCard({
  question = "Should I tidy the shared folders?",
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
    <div
      data-slot="recommendation-card"
      className={cn(cardSlab, "w-full max-w-sm rounded-3xl p-2", className)}
      {...props}
    >
      <div className="px-4 pt-4 pb-5">
        <span className="text-base font-medium text-foreground">{question}</span>
        <p
          key={active.key}
          aria-live="polite"
          className="mt-1.5 min-h-12 text-sm leading-relaxed text-muted-foreground animate-in fade-in duration-base motion-reduce:animate-none"
        >
          {active.body}
        </p>
      </div>

      {open && (
        <div id={listId} className="px-1 pb-2 animate-in fade-in duration-base motion-reduce:animate-none">
          <p className="px-3 pb-1.5 text-xs text-muted-foreground">Other options</p>
          <div className={cn(optionTrack, "flex flex-col gap-0.5 rounded-2xl p-1")}>
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
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors duration-fast",
                  "pointer-fine:hover:bg-card",
                )}
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={cn(softPanel, "flex items-center justify-between gap-3 rounded-2xl py-2 ps-4 pe-2")}>
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs text-muted-foreground">{active.label}</span>
        </span>

        <span className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={open}
            aria-controls={listId}
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
            {accepted && <Icon icon="iconoir:check" aria-hidden="true" />}
            {accepted ? "Accepted" : active.cta}
          </Button>
        </span>
      </div>
    </div>
  )
}

export { RecommendationCard }
export type { RecommendationOption }
