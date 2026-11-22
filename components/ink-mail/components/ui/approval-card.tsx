"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ApprovalCard: questions an agent asks before it acts, one at a time, on a
// card-step panel behind a hairline. A dot pager shows progress; the off-white
// arrow advances and sends on the last question. Radio questions advance on
// their own after a pick.
//
// Usage:
//   <ApprovalCard />
//   <ApprovalCard questions={[{ q: "Send the batch?", type: "radio", options: ["Yes", "No"] }]} />

interface ApprovalQuestion {
  q: string
  type: "radio" | "check"
  options: string[]
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "Which domain should send this campaign?",
    type: "radio",
    options: ["mail.example.dev", "updates.example.dev", "notify.example.dev"],
  },
  {
    q: "Which events should trigger a webhook?",
    type: "check",
    options: ["email.delivered", "email.bounced", "email.opened"],
  },
  {
    q: "When should the batch go out?",
    type: "radio",
    options: ["Now", "In one hour", "Tomorrow at 09:00"],
  },
]

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

const pagerButton =
  "flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-fast ease-out enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-35 outline-none focus-visible:ring-3 focus-visible:ring-ring"

function ApprovalCard({ questions = DEFAULT_QUESTIONS, onSubmit, className, ...props }: ApprovalCardProps) {
  const [qi, setQi] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, number[]>>({})
  const [custom, setCustom] = React.useState<Record<number, string>>({})
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
      <div className="w-full self-start overflow-hidden rounded-lg border border-border bg-card">
        {sent ? (
          <div className="flex h-37 flex-col items-center justify-center gap-2 animate-in fade-in-0 zoom-in-95 duration-fast">
            <span className="flex size-6 items-center justify-center rounded-full bg-(--success-tint) text-(--success-text)">
              <Icon icon="ph:check" aria-hidden="true" className="size-3.5" />
            </span>
            <span className="text-sm font-medium text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className="rounded-sm text-xs font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="p-4 pb-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-fast">
            <span className="text-sm font-medium text-foreground">{question.q}</span>
            <div className="mt-2.5 flex flex-col gap-0.5">
              {question.options.map((option, i) => {
                const on = selected.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left outline-none transition-colors duration-fast ease-out hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center border transition-colors duration-fast",
                        question.type === "radio" ? "rounded-full" : "rounded-sm",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-(--control) bg-transparent text-transparent",
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
                        <Icon icon="ph:check" aria-hidden="true" className="size-3" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.8125rem] transition-colors duration-fast",
                        on ? "text-foreground" : "text-(--foreground-secondary)",
                      )}
                    >
                      {option}
                    </span>
                  </button>
                )
              })}
              <label className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-fast focus-within:bg-accent focus-within:ring-2 focus-within:ring-ring hover:bg-accent">
                <span aria-hidden="true" className="size-4 shrink-0" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }))
                    if (question.type === "radio") setAnswers((current) => ({ ...current, [qi]: [] }))
                  }}
                  placeholder="Type something"
                  aria-label="Custom answer"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
        )}

        {/* Footer: previous and next, the dot pager, and the send arrow */}
        <div className="flex items-center justify-between border-t border-border bg-secondary px-4 py-2">
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={pagerButton}
            >
              <Icon icon="ph:caret-left" aria-hidden="true" className="size-3.5" />
            </button>
            <span className="flex items-center gap-1.5">
              {questions.map((_, i) => {
                const current = i === qi && !sent
                const done = sent || i < qi
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to question ${i + 1}`}
                    aria-current={current ? "step" : undefined}
                    disabled={sent}
                    onClick={() => setQi(i)}
                    className={cn(
                      "rounded-full outline-none transition-all duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-default",
                      current
                        ? "h-1.5 w-4 bg-foreground"
                        : done
                          ? "size-1.5 bg-muted-foreground"
                          : "size-1.5 bg-(--control)",
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
              className={pagerButton}
            >
              <Icon icon="ph:caret-right" aria-hidden="true" className="size-3.5" />
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? "Send answers" : "Next question"}
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                "flex size-7 items-center justify-center rounded-md outline-none transition-colors duration-fast ease-out focus-visible:ring-3 focus-visible:ring-ring",
                hasAnswer
                  ? "bg-primary text-primary-foreground hover:bg-(--primary-hover) active:bg-(--primary-active)"
                  : "bg-muted text-(--foreground-disabled)",
              )}
            >
              <Icon icon={last ? "ph:paper-plane-tilt" : "ph:arrow-right"} aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
