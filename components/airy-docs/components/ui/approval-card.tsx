"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// ApprovalCard: questions an agent asks before it acts, one at a time, in a
// hairline docs card. Dots in the footer show progress; the green arrow
// advances and sends on the last question. Radio questions advance on pick.
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

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[]
  onSubmit?: (answers: Record<number, string[]>) => void
}

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
    <div className={cn("flex w-full max-w-[20rem] flex-col items-stretch", className)} {...props}>
      <div className="w-full self-start overflow-hidden rounded-xl border border-border bg-card">
        {sent ? (
          <div className="flex h-[9.25rem] flex-col items-center justify-center gap-2">
            <span className="flex size-7 animate-in zoom-in-75 fade-in items-center justify-center rounded-full bg-(--primary-wash) text-(--primary-text) duration-slow">
              <Icon icon="feather:check" className="size-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className="rounded-sm text-xs font-medium text-(--primary-text) outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring"
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="animate-in fade-in p-4 pb-3 duration-slow">
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
                      "-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
                      on ? "bg-(--primary-wash)" : "hover:bg-secondary",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center border transition-colors duration-fast",
                        question.type === "radio" ? "rounded-full" : "rounded-sm",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-(--control) bg-background text-transparent",
                      )}
                    >
                      {question.type === "radio" ? (
                        <span className={cn("size-1.5 rounded-full bg-primary-foreground transition-transform duration-fast", on ? "scale-100" : "scale-0")} />
                      ) : (
                        <Icon icon="feather:check" className="size-3" aria-hidden="true" />
                      )}
                    </span>
                    <span className={cn("text-sm", on ? "font-medium text-(--primary-text)" : "text-(--foreground-secondary)")}>
                      {option}
                    </span>
                  </button>
                )
              })}
              <label className="-mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-fast focus-within:bg-secondary focus-within:ring-2 focus-within:ring-ring hover:bg-secondary">
                <Icon icon="feather:edit-3" className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
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

        <div className="flex items-center justify-between border-t border-border bg-secondary px-3 py-2">
          <span className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className="flex size-6 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors duration-fast enabled:hover:bg-muted enabled:hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring disabled:opacity-40"
            >
              <Icon icon="feather:chevron-left" className="size-3.5" aria-hidden="true" />
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
                      "h-1.5 rounded-full outline-none transition-all duration-slow focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-default",
                      current ? "w-4 bg-primary" : sent || i < qi ? "w-1.5 bg-(--primary-line)" : "w-1.5 bg-(--line-strong)",
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
              className="flex size-6 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors duration-fast enabled:hover:bg-muted enabled:hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring disabled:opacity-40"
            >
              <Icon icon="feather:chevron-right" className="size-3.5" aria-hidden="true" />
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? "Send answers" : "Next question"}
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                "flex size-7 items-center justify-center rounded-full outline-none transition-colors duration-fast focus-visible:ring-3 focus-visible:ring-ring",
                hasAnswer
                  ? "bg-primary text-primary-foreground hover:bg-(--primary-hover)"
                  : "bg-muted text-(--foreground-disabled)",
              )}
            >
              <Icon icon={last ? "feather:send" : "feather:arrow-right"} className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
