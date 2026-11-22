"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ApprovalCard: human-in-the-loop questions the agent asks before acting.
// One question at a time; ring-dot pager shows progress; the arrow button
// advances and sends on the last question. Radio questions auto-advance.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
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
      <div className="w-full self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {sent ? (
          <div className="flex h-[9.25rem] flex-col items-center justify-center gap-2">
            <span
              className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
              style={{ animation: "bui-pop-in 300ms cubic-bezier(0.23,1,0.32,1) both" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <span className="text-[0.8125rem] font-medium text-foreground" style={{ animation: "bui-fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both" }}>
              Answers sent
            </span>
            <button type="button" onClick={reset} className="text-[0.75rem] font-medium text-primary hover:underline">
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="p-3.5 pb-2.5" style={{ animation: "bui-fade-up 350ms cubic-bezier(0.23,1,0.32,1) both" }}>
            <span className="text-[0.8125rem] font-medium text-foreground">{question.q}</span>
            <div className="mt-2 flex flex-col gap-0.5">
              {question.options.map((option, i) => {
                const on = selected.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className="-mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center transition-colors duration-base",
                        question.type === "radio" ? "rounded-full" : "rounded-[0.3125rem]",
                        on
                          ? "bg-primary text-primary-foreground"
                          : "text-transparent shadow-[inset_0_0_0_0.0938rem_var(--border)]",
                      )}
                    >
                      {question.type === "radio" ? (
                        <span
                          className="size-1.5 rounded-full bg-primary-foreground transition-transform duration-base"
                          style={{ transform: on ? "scale(1)" : "scale(0)" }}
                        />
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                      )}
                    </span>
                    <span className={cn("text-[0.8125rem] transition-colors duration-base", on ? "text-foreground" : "text-foreground/70")}>
                      {option}
                    </span>
                  </button>
                )
              })}
              <label className="-mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-fast focus-within:bg-accent hover:bg-accent">
                <span aria-hidden="true" className="size-4 shrink-0" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }))
                    if (question.type === "radio") setAnswers((current) => ({ ...current, [qi]: [] }))
                  }}
                  placeholder="Type something"
                  aria-label="Custom answer"
                  className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
        )}

        {/* footer: ring-dot pager + send arrow */}
        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-3.5 py-2">
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className="flex size-6 items-center justify-center rounded-[0.3125rem] text-muted-foreground transition-colors duration-fast enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-35"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="flex items-center gap-1">
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to question ${i + 1}`}
                  aria-current={i === qi && !sent ? "step" : undefined}
                  disabled={sent}
                  onClick={() => setQi(i)}
                  className="rounded-full transition-all duration-slow disabled:cursor-default"
                  style={
                    i === qi && !sent
                      ? { width: 9, height: 9, border: "2.5px solid var(--foreground)" }
                      : sent || i < qi
                        ? { width: 7, height: 7, background: "var(--muted-foreground)" }
                        : { width: 7, height: 7, border: "1.5px solid var(--muted-foreground)" }
                  }
                />
              ))}
            </span>
            <button
              type="button"
              aria-label="Next"
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(questions.length - 1, current + 1))}
              className="flex size-6 items-center justify-center rounded-[0.3125rem] text-muted-foreground transition-colors duration-fast enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-35"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? "Send answers" : "Next question"}
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                "flex size-7 items-center justify-center rounded-[0.5rem] transition-[background-color,color,transform] duration-base enabled:active:scale-[0.96]",
                hasAnswer
                  ? "bg-primary text-primary-foreground shadow-[inset_0_0.0625rem_0_oklch(1_0_0/0.14)]"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes bui-pop-in { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

export { ApprovalCard }
export type { ApprovalQuestion }
