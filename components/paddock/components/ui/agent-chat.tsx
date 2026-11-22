"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { cardSlab, primaryFace, primaryFaceHover, focusRing, pressScale, wellInset } from "./_shared"

// AgentChat: a chat panel with tabs, labelled tool replies and a composer.
// The reply sequence begins only after the user sends.
//
// Usage:
//   <AgentChat />
//   <AgentChat tabs={["Schedule", "Team"]} />

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done"

/** One labelled tool reply: the tool name, what it read, how long it took, then the finding. */
function ReplySection({
  label,
  sub,
  time,
  body,
  resolving,
}: {
  label: string
  sub: string
  time: string
  body: string
  resolving?: boolean
}) {
  return (
    <div
      className={cn(
        "flex w-full origin-top-left animate-in fade-in slide-in-from-bottom-1 flex-col gap-1 transition-[opacity,transform] duration-slow ease-out",
        resolving ? "scale-99 opacity-60" : "scale-100 opacity-100",
      )}
    >
      <div className="flex items-center gap-1.5 text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="rounded-sm bg-secondary px-1.5 py-px text-secondary-foreground">{sub}</span>
        <span className="text-muted-foreground">{time}</span>
      </div>
      <p className="text-[0.8125rem] text-foreground">{body}</p>
    </div>
  )
}

const HEADER_ACTIONS: { label: string; icon: string }[] = [
  { label: "New chat", icon: "mingcute:add-line" },
  { label: "History", icon: "mingcute:time-line" },
  { label: "More options", icon: "mingcute:more-2-line" },
]

interface AgentChatProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[]
  placeholder?: string
}

/**
 * Paddock AgentChat: a white bordered card with a tab switch, tool replies
 * that arrive one at a time and a grey composer well with the teal send button.
 */
function AgentChat({
  tabs = ["Schedule", "Team"],
  placeholder = "Ask about a project or tag one with @",
  className,
  ...props
}: AgentChatProps) {
  const [phase, setPhase] = React.useState<Phase>("done")
  const [draft, setDraft] = React.useState("")
  const [submitted, setSubmitted] = React.useState("Which cards will miss their date?")
  const [tab, setTab] = React.useState(tabs[0] ?? "")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === "sent") t = setTimeout(() => setPhase("reply1"), 500)
    else if (phase === "reply1") t = setTimeout(() => setPhase("reply2"), 1400)
    else if (phase === "reply2") t = setTimeout(() => setPhase("done"), 1200)
    else return
    return () => clearTimeout(t)
  }, [phase])

  const sent = phase !== "idle"
  const canSend = draft.trim().length > 0

  const send = () => {
    if (!canSend) return
    setSubmitted(draft.trim())
    setDraft("")
    setPhase("sent")
  }

  return (
    <div
      className={cn(cardSlab, "flex h-72 w-full max-w-96 flex-col self-start overflow-hidden rounded-xl", className)}
      {...props}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-border px-2 py-1.5">
        <div className={cn(wellInset, "flex items-center gap-0.5 rounded-md p-0.5")}>
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={cn(
                focusRing,
                "h-6 rounded-sm px-2.5 text-xs transition-[background-color,color,box-shadow] duration-fast",
                tab === item
                  ? "bg-card font-medium text-foreground shadow-(--segment-lift)"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {HEADER_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className={cn(
                focusRing,
                "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon={action.icon} className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3.5 pt-3 pb-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring" aria-live="polite">
        <div className="flex justify-end pl-14">
          <div
            className={cn(
              "rounded-lg bg-secondary px-3 py-1.5 text-[0.8125rem] text-foreground transition-[opacity,transform] duration-slow ease-out",
              sent ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {submitted}
          </div>
        </div>

        {phase === "reply1" || phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Due dates"
            sub="Schedule"
            time="3s"
            body="Read the due date and task count on all twelve cards."
          />
        ) : null}
        {phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Pace check"
            sub="Task log"
            time="2s"
            body="Two cards in review are likely to slip by about four days."
            resolving={phase === "reply2"}
          />
        ) : null}
      </div>

      <div className="mt-auto shrink-0 p-2">
        <div
          role="presentation"
          onClick={() => inputRef.current?.focus()}
          className="flex cursor-text items-center gap-2 rounded-md bg-card py-1 pr-1 pl-3.5 shadow-(--card-ring) transition-shadow duration-fast focus-within:ring-2 focus-within:ring-ring hover:shadow-(--card-lift)"
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send()
            }}
            placeholder={placeholder}
            aria-label="Chat prompt"
            className="min-w-0 flex-1 bg-transparent text-[0.8125rem] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Send"
            disabled={!canSend}
            onClick={send}
            className={cn(
              focusRing,
              "flex size-7 shrink-0 items-center justify-center rounded-md",
              canSend ? cn(primaryFace, primaryFaceHover, pressScale) : "bg-secondary text-muted-foreground",
            )}
          >
            <Icon icon="mingcute:arrow-up-line" className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface AgentChatStep {
  label: string
  meta?: string
}

interface AgentChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "user" | "assistant"
  steps?: AgentChatStep[]
}

/** Paddock AgentChatMessage: a grey bubble for the person, plain text with tool labels for the agent. */
function AgentChatMessage({ role = "assistant", steps, className, children, ...props }: AgentChatMessageProps) {
  if (role === "user") {
    return (
      <div className={cn("flex justify-end pl-12", className)} {...props}>
        <div className="rounded-lg bg-secondary px-3 py-1.5 text-[0.8125rem] text-foreground">{children}</div>
      </div>
    )
  }
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {steps && steps.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {steps.map((step, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="font-medium text-foreground">{step.label}</span>
              {step.meta && <span className="text-muted-foreground">{step.meta}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="text-[0.8125rem] text-foreground">{children}</div>
    </div>
  )
}

interface AgentChatComposerProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string
  onSubmit?: (value: string) => void
}

/** Paddock AgentChatComposer: the white bordered search field with a teal send button. */
function AgentChatComposer({ placeholder = "Ask a follow-up", onSubmit, className, ...props }: AgentChatComposerProps) {
  const [value, setValue] = React.useState("")
  const canSend = value.trim().length > 0
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!canSend) return
        onSubmit?.(value.trim())
        setValue("")
      }}
      className={cn(
        "flex items-center gap-2 rounded-md bg-card py-1 pr-1 pl-3.5 shadow-(--card-ring) transition-shadow duration-fast focus-within:ring-2 focus-within:ring-ring hover:shadow-(--card-lift)",
        className,
      )}
      {...props}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Send"
        disabled={!canSend}
        className={cn(
          focusRing,
          "flex size-7 shrink-0 items-center justify-center rounded-md",
          canSend ? cn(primaryFace, primaryFaceHover, pressScale) : "bg-secondary text-muted-foreground",
        )}
      >
        <Icon icon="mingcute:arrow-up-line" className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}

export { AgentChat, AgentChatMessage, AgentChatComposer }
export type { AgentChatStep }
