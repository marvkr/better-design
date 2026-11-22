"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"

// ApprovalCard: questions the agent asks before it acts, one at a time on an
// oat card. A row of dots under the question shows progress; the terracotta
// arrow advances and sends on the last question. Single-choice questions move
// on by themselves once answered.
//
// Usage:
//   <ApprovalCard />
//   <ApprovalCard questions={[{ q: "Ship it?", type: "radio", options: ["Yes", "No"] }]} />

interface ApprovalQuestion {
  q: string
  type: "radio" | "check"
  options: string[]
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "How many flavors should we launch?",
    type: "radio",
    options: ["Three (core line)", "Five (full case)", "Just one hero"],
  },
  {
    q: "Which mix-ins should we stock?",
    type: "check",
    options: ["Chocolate chips", "Waffle bits", "Sprinkles"],
  },
  {
    q: "Which market do we enter first?",
    type: "radio",
    options: ["Food trucks", "Grocery freezers", "Scoop shops"],
  },
]

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

const pagerButton =
  "flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-fast enabled:hover:bg-secondary enabled:hover:text-foreground disabled:text-(--foreground-disabled) outline-none focus-visible:ring-3 focus-visible:ring-ring"

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
      <div className="w-full self-start overflow-hidden rounded-xl border border-border bg-card">
        {sent ? (
          <div className="flex h-37 flex-col items-center justify-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-90 duration-slow motion-reduce:animate-none">
              <Icon icon="ph:check" aria-hidden="true" className="size-3.5" />
            </span>
            <span className="font-serif text-base font-medium text-foreground animate-in fade-in-0 slide-in-from-bottom-1 duration-slow motion-reduce:animate-none">
              Answers sent
            </span>
            <button
              type="button"
              onClick={reset}
              className="rounded-sm text-xs font-medium text-(--primary-text) underline-offset-4 hover:underline outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              Start over
            </button>
          </div>
        ) : (
          <div
            key={qi}
            className="p-4 pb-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-slow motion-reduce:animate-none"
          >
            <span className="font-serif text-base font-medium leading-snug text-foreground">{question.q}</span>
            <div className="mt-2.5 flex flex-col gap-0.5">
              {question.options.map((option, i) => {
                const on = selected.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors duration-fast hover:bg-secondary outline-none focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center border transition-colors duration-fast",
                        question.type === "radio" ? "rounded-full" : "rounded-sm",
                        on
                          ? question.type === "radio"
                            ? "border-primary bg-(--field)"
                            : "border-primary bg-primary text-primary-foreground"
                          : "border-(--control) bg-(--field) text-transparent",
                      )}
                    >
                      {question.type === "radio" ? (
                        <span
                          className={cn(
                            "size-2 rounded-full bg-primary transition-transform duration-fast",
                            on ? "scale-100" : "scale-0",
                          )}
                        />
                      ) : (
                        <Icon icon="ph:check" aria-hidden="true" className="size-3" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "text-sm transition-colors duration-fast",
                        on ? "text-foreground" : "text-(--foreground-secondary)",
                      )}
                    >
                      {option}
                    </span>
                  </button>
                )
              })}
              <label className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-fast focus-within:bg-secondary focus-within:ring-2 focus-within:ring-ring hover:bg-secondary">
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

        {/* Footer: the question pager on the left, the send arrow on the right. */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
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
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to question ${i + 1}`}
                  aria-current={i === qi && !sent ? "step" : undefined}
                  disabled={sent}
                  onClick={() => setQi(i)}
                  className={cn(
                    "rounded-full transition-all duration-slow disabled:cursor-default outline-none focus-visible:ring-3 focus-visible:ring-ring",
                    i === qi && !sent
                      ? "size-2.5 border-2 border-foreground"
                      : sent || i < qi
                        ? "size-2 bg-muted-foreground"
                        : "size-2 border border-muted-foreground",
                  )}
                />
              ))}
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
                "flex size-8 items-center justify-center rounded-md transition-colors duration-fast outline-none focus-visible:ring-3 focus-visible:ring-ring",
                hasAnswer
                  ? "bg-primary text-primary-foreground hover:bg-(--primary-hover) active:bg-(--primary-active)"
                  : "bg-muted text-(--foreground-disabled)",
              )}
            >
              <Icon icon={last ? "ph:paper-plane-right" : "ph:arrow-right"} aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
