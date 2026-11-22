"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"
import { Button } from "./button"

// ApprovalCard: questions an assistant asks before it acts, one at a time.
// Dots in the footer show progress, and the oxblood button advances or sends
// on the last question. A single-choice question advances when you pick.
//
// Usage:
//   <ApprovalCard />
//   <ApprovalCard questions={[{ q: "Share the page now?", type: "radio", options: ["Yes", "No"] }]} />

interface ApprovalQuestion {
  q: string
  type: "radio" | "check"
  options: string[]
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "Who should see the meeting summary?",
    type: "radio",
    options: ["Only me", "Everyone in the space", "People I mention"],
  },
  {
    q: "What should the summary include?",
    type: "check",
    options: ["Decisions", "Open tasks", "Links to pages"],
  },
  {
    q: "Where should it go?",
    type: "radio",
    options: ["A new note", "The top of this note", "The team notebook"],
  },
]

/** The small square step buttons in the footer. */
const stepButton = cn(
  focusRing,
  "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors duration-fast",
  "enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-40",
)

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

/**
 * Margin ApprovalCard: a white sheet of questions. An unchosen mark is a
 * hollow grey ring; a chosen one fills oxblood, like a checked control. A grey
 * footer holds the progress dots and the oxblood button.
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
  const titleId = React.useId()

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
    <div className={cn("flex w-full max-w-sm flex-col items-stretch", className)} {...props}>
      <div
        role="group"
        aria-labelledby={sent ? undefined : titleId}
        aria-label={sent ? "Answers sent" : undefined}
        className="w-full self-start overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
      >
        {sent ? (
          <div role="status" className="flex h-40 flex-col items-center justify-center gap-2">
            <span className="flex size-8 animate-in items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs zoom-in-75 fade-in duration-slow">
              <Icon icon="solar:check-read-linear" className="size-4.5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className={cn(
                focusRing,
                "rounded-sm text-sm text-(--primary-text) underline decoration-current/30 underline-offset-4 hover:decoration-current",
              )}
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="animate-in fade-in px-4 pt-3.5 pb-3 duration-slow">
            <div className="flex items-baseline justify-between gap-3">
              <h3 id={titleId} className="text-sm font-semibold text-foreground">
                {question.q}
              </h3>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {qi + 1} of {questions.length}
              </span>
            </div>
            <div
              role={question.type === "radio" ? "radiogroup" : "group"}
              aria-labelledby={titleId}
              className="mt-2.5 flex flex-col gap-0.5"
            >
              {question.options.map((option, i) => {
                const on = selected.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    role={question.type === "radio" ? "radio" : "checkbox"}
                    aria-checked={on}
                    onClick={() => toggle(i)}
                    className={cn(
                      focusRing,
                      "-mx-2 flex h-8 items-center gap-2.5 rounded-md px-2 text-left transition-colors duration-fast",
                      on ? "bg-(--field)" : "hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center transition-colors duration-fast",
                        question.type === "radio" ? "rounded-full" : "rounded-sm",
                        on
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "border border-input bg-card text-transparent",
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
                        <Icon icon="solar:check-read-linear" className="size-3" aria-hidden="true" />
                      )}
                    </span>
                    <span className={cn("text-sm", on ? "font-medium text-foreground" : "text-foreground/85")}>
                      {option}
                    </span>
                  </button>
                )
              })}
              <label
                className={cn(
                  "-mx-2 flex h-8 items-center gap-2.5 rounded-md px-2 transition-colors duration-fast",
                  "hover:bg-accent focus-within:bg-(--field) focus-within:ring-3 focus-within:ring-ring",
                )}
              >
                <Icon icon="solar:pen-linear" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
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

        <div className="flex items-center justify-between border-t border-border bg-secondary px-2 py-1.5">
          <span className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous question"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={stepButton}
            >
              <Icon icon="solar:alt-arrow-left-linear" className="size-4" aria-hidden="true" />
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
                      current ? "w-4 bg-primary" : sent || i < qi ? "w-1.5 bg-primary/40" : "w-1.5 bg-input",
                    )}
                  />
                )
              })}
            </span>
            <button
              type="button"
              aria-label="Next question"
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(questions.length - 1, current + 1))}
              className={stepButton}
            >
              <Icon icon="solar:alt-arrow-right-linear" className="size-4" aria-hidden="true" />
            </button>
          </span>
          {!sent && (
            <Button
              size="sm"
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
            >
              {last ? "Send" : "Next"}
              <Icon
                icon={last ? "solar:plain-2-linear" : "solar:arrow-right-linear"}
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
