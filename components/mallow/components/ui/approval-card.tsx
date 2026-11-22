"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, pressScale, primaryFinish, primaryFinishHover, selectedOption, optionTrack } from "./_shared";

/** One question an agent asks before it acts: a single pick or several. */
interface ApprovalQuestion {
  q: string;
  type: "radio" | "check";
  options: string[];
}

const DEFAULT_QUESTIONS: ApprovalQuestion[] = [
  {
    q: "When should the report go out?",
    type: "radio",
    options: ["Today at 5 pm", "Monday morning", "Hold it for review"],
  },
  {
    q: "Which sections should it include?",
    type: "check",
    options: ["Summary", "Cost breakdown", "Open issues"],
  },
  {
    q: "Who should receive it?",
    type: "radio",
    options: ["The whole team", "Leads only", "Just me"],
  },
];

/** The small round step buttons in the footer. */
const stepButton = cn(
  focusRing,
  "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast",
  "enabled:hover:bg-accent enabled:hover:text-foreground disabled:opacity-40",
);

interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  questions?: ApprovalQuestion[];
  onSubmit?: (answers: Record<number, string[]>) => void;
}

/**
 * Mallow ApprovalCard: an agent's questions one at a time, the options in a
 * lilac track with the chosen one in a violet-ringed tint, and a violet send pill.
 */
function ApprovalCard({ questions = DEFAULT_QUESTIONS, onSubmit, className, ...props }: ApprovalCardProps) {
  const [qi, setQi] = React.useState(0);
  const [answers, setAnswers] = React.useState<{ [question: number]: number[] }>({});
  const [custom, setCustom] = React.useState<{ [question: number]: string }>({});
  const [sent, setSent] = React.useState(false);
  const question = questions[qi];
  const last = qi === questions.length - 1;
  const selected = answers[qi] ?? [];
  const hasAnswer = selected.length > 0 || Boolean(custom[qi]?.trim());

  const submit = React.useCallback(() => {
    setSent(true);
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
    );
  }, [answers, custom, onSubmit, questions]);

  const toggle = (index: number) => {
    setAnswers((current) => {
      const picked = current[qi] ?? [];
      const next =
        question.type === "radio"
          ? [index]
          : picked.includes(index)
            ? picked.filter((item) => item !== index)
            : [...picked, index];
      return { ...current, [qi]: next };
    });
    if (question.type === "radio") {
      setCustom((current) => ({ ...current, [qi]: "" }));
      window.setTimeout(() => {
        if (qi === questions.length - 1) submit();
        else setQi((current) => Math.min(questions.length - 1, current + 1));
      }, 480);
    }
  };

  const reset = () => {
    setQi(0);
    setAnswers({});
    setCustom({});
    setSent(false);
  };

  return (
    <div className={cn("flex w-full max-w-sm flex-col items-stretch", className)} {...props}>
      <div className={cn(cardSlab, "flex w-full flex-col gap-2 self-start overflow-hidden rounded-3xl p-2")}>
        {sent ? (
          <div className="flex h-56 flex-col items-center justify-center gap-3" role="status">
            <span
              className={cn(
                primaryFinish,
                "flex size-10 items-center justify-center rounded-full",
                "animate-in zoom-in-75 fade-in duration-slow motion-reduce:animate-none",
              )}
            >
              <Icon icon="iconoir:check" className="size-5" aria-hidden="true" />
            </span>
            <span className="text-base font-medium text-foreground">Answers sent</span>
            <button
              type="button"
              onClick={reset}
              className={cn(
                focusRing,
                "rounded-sm text-sm text-muted-foreground underline decoration-current/30 underline-offset-4 hover:text-foreground hover:decoration-current",
              )}
            >
              Start over
            </button>
          </div>
        ) : (
          <div key={qi} className="flex flex-col gap-3 animate-in fade-in duration-slow motion-reduce:animate-none">
            <p className="px-3 pt-3 text-base font-medium text-foreground" id={`approval-q-${qi}`}>
              {question.q}
            </p>
            <div
              role="group"
              aria-labelledby={`approval-q-${qi}`}
              className={cn(optionTrack, "flex flex-col gap-0.5 rounded-2xl p-1")}
            >
              {question.options.map((option, i) => {
                const on = selected.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    className={cn(
                      focusRing,
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-[background-color,box-shadow] duration-fast",
                      on ? selectedOption : "hover:bg-accent/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center",
                        question.type === "radio" ? "rounded-full" : "rounded-sm",
                        on ? primaryFinish : "border-2 border-foreground/50 text-transparent",
                      )}
                    >
                      {question.type === "radio" ? (
                        <span
                          className={cn(
                            "size-1.75 rounded-full bg-primary-foreground transition-transform duration-fast motion-reduce:transition-none",
                            on ? "scale-100" : "scale-0",
                          )}
                        />
                      ) : (
                        <Icon icon="iconoir:check" className="size-3.5" aria-hidden="true" />
                      )}
                    </span>
                    <span className={cn("text-sm", on ? "font-medium text-foreground" : "text-muted-foreground")}>
                      {option}
                    </span>
                  </button>
                );
              })}
              <label
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-fast",
                  "hover:bg-accent/60 focus-within:ring-2 focus-within:ring-ring",
                )}
              >
                <Icon icon="iconoir:edit-pencil" className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }));
                    if (question.type === "radio") setAnswers((current) => ({ ...current, [qi]: [] }));
                  }}
                  placeholder="Write your own answer"
                  aria-label="Custom answer"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </label>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-1 pb-1">
          <span className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous"
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className={stepButton}
            >
              <Icon icon="iconoir:nav-arrow-left" className="size-4" aria-hidden="true" />
            </button>
            <span className="flex items-center gap-1">
              {questions.map((_, i) => {
                const current = i === qi && !sent;
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
                      "h-1.5 rounded-full transition-[width,background-color] duration-slow ease-(--ease-out) disabled:cursor-default",
                      "motion-reduce:transition-none",
                      current ? "w-4 bg-foreground" : sent || i < qi ? "w-1.5 bg-foreground/45" : "w-1.5 bg-input",
                    )}
                  />
                );
              })}
            </span>
            <button
              type="button"
              aria-label="Next"
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(questions.length - 1, current + 1))}
              className={stepButton}
            >
              <Icon icon="iconoir:nav-arrow-right" className="size-4" aria-hidden="true" />
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              disabled={!hasAnswer}
              onClick={() => (last ? submit() : setQi((current) => current + 1))}
              className={cn(
                focusRing,
                "flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium",
                hasAnswer ? cn(primaryFinish, primaryFinishHover, pressScale) : "bg-(--tag) text-muted-foreground",
              )}
            >
              {last ? "Send" : "Next"}
              <Icon icon={last ? "iconoir:send" : "iconoir:arrow-right"} className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { ApprovalCard };
export type { ApprovalQuestion };
