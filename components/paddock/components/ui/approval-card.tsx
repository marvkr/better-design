"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import {
  cardSlab,
  primaryEdge,
  primaryFace,
  primaryFaceHover,
  focusRing,
  pressScale,
} from "./_shared"

// ApprovalCard: questions an agent asks before it acts, one at a time.
// Dots in the footer show progress; the teal arrow advances and sends on
// the last question. Radio questions advance on pick.
//
// Usage:
//   <ApprovalCard />
//   <ApprovalCard questions={[{ q: "Archive the done column?", type: "radio", options: ["Yes", "No"] }]} />

interface ApprovalQuestion {
  q: string
  type: "radio" | "check"
  options: string[]
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "Which stage should new projects start in?",
    type: "radio",
    options: ["To do", "In progress", "Ask me each time"],
  },
  {
    q: "Who should hear about a late card?",
    type: "check",
    options: ["The owner", "The whole team", "The workspace admin"],
  },
  {
    q: "When should done projects leave the list?",
    type: "radio",
    options: ["After a week", "At the end of the quarter", "Never"],
  },
]

/** The small round step buttons in the footer. */
const stepButton = cn(
  focusRing,
  "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast",
  "enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-40",
)

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

/**
 * Paddock ApprovalCard: a white card of questions with empty grey rings that
 * fill with teal when chosen, and a bordered footer with progress dots and the teal arrow.
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
    <div className={cn("flex w-full max-w-80 flex-col items-stretch", className)} {...props}>
      <div className={cn(cardSlab, "w-full self-start overflow-hidden rounded-xl")}>
        {sent ? (
          <div className="flex h-40 flex-col items-center justify-center gap-2.5">
            <span
              className={cn(
                primaryFace,
                "flex size-8 animate-in zoom-in-75 fade-in items-center justify-center rounded-full duration-slow",
              )}
            >
              <Icon icon="mingcute:check-line" className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className={cn(
                focusRing,
                "rounded-sm text-xs font-medium text-muted-foreground underline decoration-current/30 underline-offset-4 hover:text-foreground hover:decoration-current",
              )}
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="animate-in fade-in px-4 pt-4 pb-3 duration-slow">
            <span className="text-[0.9375rem] font-semibold text-foreground">{question.q}</span>
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
                      on ? "bg-accent" : "hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4.5 shrink-0 items-center justify-center",
                        question.type === "radio" ? "rounded-full" : "rounded-xs",
                        on
                          ? cn(primaryFace, primaryEdge)
                          : "border-2 border-input bg-card text-transparent",
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
                        <Icon icon="mingcute:check-line" className="size-3" aria-hidden="true" />
                      )}
                    </span>
                    <span className={cn("text-sm", on ? "font-medium text-foreground" : "text-secondary-foreground")}>
                      {option}
                    </span>
                  </button>
                )
              })}
              <label
                className={cn(
                  "-mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 transition-colors duration-fast",
                  "hover:bg-accent focus-within:bg-accent focus-within:ring-2 focus-within:ring-ring",
                )}
              >
                <Icon icon="mingcute:edit-2-line" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
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

        <div className="flex items-center justify-between border-t border-border px-2.5 py-2">
          <span className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={stepButton}
            >
              <Icon icon="mingcute:left-line" className="size-4" aria-hidden="true" />
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
                      "h-1.5 rounded-xs transition-all duration-slow ease-out disabled:cursor-default",
                      current
                        ? "w-4 bg-primary"
                        : sent || i < qi
                          ? "w-1.5 bg-foreground"
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
              <Icon icon="mingcute:right-line" className="size-4" aria-hidden="true" />
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
                "flex size-8 items-center justify-center rounded-md",
                hasAnswer
                  ? cn(primaryFace, primaryFaceHover, pressScale)
                  : "bg-secondary text-muted-foreground",
              )}
            >
              <Icon icon={last ? "mingcute:send-plane-line" : "mingcute:arrow-right-line"} className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
