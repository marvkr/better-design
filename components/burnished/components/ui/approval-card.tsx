"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import {
  cardSlab,
  copperRim,
  creamBevel,
  creamBevelHover,
  focusRing,
  pressScale,
  wellInset,
} from "./_shared"

// ApprovalCard: questions an agent asks before it acts, one at a time.
// Dots in the footer show progress; the cream arrow advances and sends on
// the last question. Radio questions advance on pick.
//
// Usage:
//   <ApprovalCard />
//   <ApprovalCard questions={[{ q: "Publish now?", type: "radio", options: ["Yes", "No"] }]} />

interface ApprovalQuestion {
  q: string
  type: "radio" | "check"
  options: string[]
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "Which version should the docs show by default?",
    type: "radio",
    options: ["v2 (latest)", "v1 (stable)", "Let readers choose"],
  },
  {
    q: "Which SDK examples should each page include?",
    type: "check",
    options: ["TypeScript", "Python", "cURL"],
  },
  {
    q: "Where should the changelog live?",
    type: "radio",
    options: ["Its own tab", "Under Resources", "In the footer"],
  },
]

/** The small round step buttons in the footer. */
const stepButton = cn(
  focusRing,
  "flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast",
  "enabled:[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent enabled:[@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground disabled:opacity-40",
)

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

/**
 * Burnished ApprovalCard: an umber slab of questions. Unchosen marks are
 * recessed wells; a chosen one turns cream inside a copper rim, the same
 * material as the primary. The footer is a well with progress dots and a
 * cream bevel arrow.
 */
function ApprovalCard({ questions = DEFAULT_QUESTIONS, onSubmit, className, ...props }: ApprovalCardProps) {
  const [qi, setQi] = React.useState(0)
  const [answers, setAnswers] = React.useState<{ [question: number]: number[] }>({})
  const [custom, setCustom] = React.useState<{ [question: number]: string }>({})
  const [sent, setSent] = React.useState(false)
  const question = questions[qi]
  const last = qi === questions.length - 1
  const selected = answers[qi] ?? []
  const hasAnswer = selected.length > 0 || Boolean(custom[qi]?.trim())

  const submit = React.useCallback(() => {
    setSent(true)
    onSubmit?.(
      Object.fromEntries(
        questions.map((qu, i) => [
          i,
          [
            ...(answers[i] ?? []).map((idx) => qu.options[idx]),
            ...(custom[i]?.trim() ? [custom[i].trim()] : []),
          ],
        ]),
      ),
    )
  }, [answers, custom, onSubmit, questions])

  const toggle = (index: number) => {
    setAnswers((current) => {
      const picked = current[qi] ?? []
      const next =
        question.type === "radio"
          ? [index]
          : picked.includes(index)
            ? picked.filter((item) => item !== index)
            : [...picked, index]
      return { ...current, [qi]: next }
    })
    if (question.type === "radio") {
      setCustom((current) => ({ ...current, [qi]: "" }))
      window.setTimeout(() => {
        if (qi === questions.length - 1) submit()
        else setQi((current) => Math.min(questions.length - 1, current + 1))
      }, 480)
    }
  }

  const reset = () => {
    setQi(0)
    setAnswers({})
    setCustom({})
    setSent(false)
  }

  return (
    <div className={cn("flex w-full max-w-[20rem] flex-col items-stretch", className)} {...props}>
      <div className={cn(cardSlab, "w-full self-start overflow-hidden rounded-2xl p-1.5")}>
        {sent ? (
          <div className="flex h-[9.75rem] flex-col items-center justify-center gap-2.5">
            <span
              className={cn(
                creamBevel,
                copperRim,
                "flex size-8 animate-in zoom-in-75 fade-in items-center justify-center rounded-full duration-slow",
              )}
            >
              <Icon icon="ph:check-bold" className="size-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className={cn(
                focusRing,
                "rounded-sm text-xs font-semibold text-primary-text underline decoration-current/30 underline-offset-4",
                "[@media(hover:hover)_and_(pointer:fine)]:hover:decoration-current",
              )}
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="animate-in fade-in px-3 pt-3 pb-2.5 duration-slow">
            <span className="text-sm font-semibold text-foreground">{question.q}</span>
            <div className="mt-2.5 flex flex-col gap-0.5">
              {question.options.map((option, i) => {
                const on = selected.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className={cn(
                      focusRing,
                      "-mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors duration-fast",
                      on ? "bg-accent/70" : "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-[1.125rem] shrink-0 items-center justify-center",
                        question.type === "radio" ? "rounded-full" : "rounded-[0.3125rem]",
                        on ? cn(creamBevel, copperRim) : cn(wellInset, "text-transparent"),
                      )}
                    >
                      {question.type === "radio" ? (
                        <span
                          className={cn(
                            "size-1.5 rounded-full bg-primary-foreground transition-transform duration-fast",
                            on ? "scale-100" : "scale-0",
                          )}
                        />
                      ) : (
                        <Icon icon="ph:check-bold" className="size-2.5" aria-hidden="true" />
                      )}
                    </span>
                    <span className={cn("text-sm", on ? "font-semibold text-foreground" : "text-muted-foreground")}>
                      {option}
                    </span>
                  </button>
                )
              })}
              <label
                className={cn(
                  "-mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors duration-fast",
                  "focus-within:bg-accent/60 focus-within:ring-3 focus-within:ring-ring [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/60",
                )}
              >
                <Icon icon="ph:pencil-simple" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }))
                    if (question.type === "radio") setAnswers((current) => ({ ...current, [qi]: [] }))
                  }}
                  placeholder="Write your own answer"
                  aria-label="Custom answer"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
        )}

        <div className={cn(wellInset, "flex items-center justify-between rounded-xl px-2 py-1.5")}>
          <span className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={stepButton}
            >
              <Icon icon="ph:caret-left" className="size-3.5" aria-hidden="true" />
            </button>
            <span className="flex items-center gap-1">
              {questions.map((_, i) => {
                const current = i === qi && !sent
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to question ${i + 1}`}
                    aria-current={current ? "step" : undefined}
                    disabled={sent}
                    onClick={() => setQi(i)}
                    className={cn(
                      focusRing,
                      "h-1.5 rounded-full transition-all duration-slow ease-(--ease-out) disabled:cursor-default",
                      current
                        ? "w-4 bg-glow shadow-[0_0_0.375rem_var(--glow)]"
                        : sent || i < qi
                          ? "w-1.5 bg-glow/45"
                          : "w-1.5 bg-input",
                    )}
                  />
                )
              })}
            </span>
            <button
              type="button"
              aria-label="Next"
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(questions.length - 1, current + 1))}
              className={stepButton}
            >
              <Icon icon="ph:caret-right" className="size-3.5" aria-hidden="true" />
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? "Send answers" : "Next question"}
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                focusRing,
                "flex size-8 items-center justify-center rounded-full",
                hasAnswer
                  ? cn(creamBevel, creamBevelHover, pressScale)
                  : "bg-muted text-muted-foreground opacity-60",
              )}
            >
              <Icon icon={last ? "ph:paper-plane-tilt" : "ph:arrow-right"} className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
