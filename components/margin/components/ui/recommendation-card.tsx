"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"
import { Button } from "./button"

// RecommendationCard: an assistant suggestion with a confidence meter and
// actions. "Alternatives" opens the other options; picking one promotes it.
// The oxblood button confirms.
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

/** Inline code: a small grey chip in the monospace face. */
const codeChip = "rounded-sm bg-(--field) px-1 py-0.5 font-mono text-xs text-(--clause-keyword)"

const DEFAULT_OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Move the six <code className={codeChip}>Meeting notes</code> pages into a{" "}
        <code className={codeChip}>Meetings</code> notebook and link them from Home.
      </>
    ),
    short: "Group meeting pages in one notebook",
    signal: 3,
    label: "High confidence",
    cta: "Accept",
  },
  {
    key: "review",
    body: (
      <>
        Tag every page that mentions <code className={codeChip}>launch</code> with{" "}
        <code className={codeChip}>report</code>.
      </>
    ),
    short: "Tag launch pages as report",
    signal: 2,
    label: "Needs review",
    cta: "Review",
  },
  {
    key: "none",
    body: (
      <>
        Leave the pages where they are and add a <span className="font-medium text-foreground">table of contents</span> instead.
      </>
    ),
    short: "Add a table of contents only",
    signal: 0,
    label: "No signal",
    cta: "Add contents",
  },
]

/** Three rising bars: oxblood when sure, amber when unsure, grey when empty. */
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
 * Margin RecommendationCard: a white sheet with the suggestion on top and a
 * grey footer holding the confidence meter, a white Alternatives pill and
 * the oxblood confirm button.
 */
function RecommendationCard({
  question = "Want me to tidy up your meeting notes?",
  options = DEFAULT_OPTIONS,
  onAccept,
  className,
  ...props
}: RecommendationCardProps) {
  const [selected, setSelected] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [accepted, setAccepted] = React.useState(false)
  const altId = React.useId()

  const active = options[selected]
  const others = options.map((o, i) => ({ o, i })).filter(({ i }) => i !== selected)

  return (
    <div
      data-slot="recommendation-card"
      className={cn(
        "w-full max-w-md overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      <div className="px-4 pt-3.5 pb-4">
        <h3 className="text-sm font-semibold text-foreground">{question}</h3>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 animate-in fade-in text-sm leading-relaxed text-muted-foreground duration-base"
        >
          {active.body}
        </p>
      </div>

      <div
        id={altId}
        className={cn(
          "grid transition-all duration-slow ease-(--ease-out)",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-2 pt-2 pb-2">
            <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">Other options</p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setSelected(i)
                  setAccepted(false)
                  setOpen(false)
                }}
                className={cn(
                  focusRing,
                  "flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left transition-colors duration-fast hover:bg-(--field)",
                )}
              >
                <Meter signal={o.signal} />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">{o.short}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary py-2 ps-4 pe-2">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} />
          <span className="text-xs text-muted-foreground">{active.label}</span>
        </span>

        <span className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            aria-expanded={open}
            aria-controls={altId}
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
