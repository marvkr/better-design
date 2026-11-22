"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// AgentChat: an assistant panel beside your notes, with a segmented tab
// track, labelled tool replies and a composer. The replies start only after
// the person sends a prompt.
//
// Usage:
//   <AgentChat />
//   <AgentChat tabs={["Notes", "Tasks"]} />

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done"

/** One labelled reply from a tool: what ran, how long it took, what it found. */
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
        "flex w-full animate-in flex-col gap-1 fade-in slide-in-from-bottom-1 duration-slow",
        "origin-top-left transition duration-slow ease-(--ease-out)",
        resolving ? "scale-99 opacity-55" : "opacity-100",
      )}
    >
      <div className="flex items-center gap-1.5 text-xs">
        <Icon icon="solar:check-circle-bold" aria-hidden="true" className="size-3.5 text-(--primary-text)" />
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{sub}</span>
        <span className="ms-auto tabular-nums text-muted-foreground">{time}</span>
      </div>
      <p className="text-sm leading-normal text-foreground">{body}</p>
    </div>
  )
}

interface AgentChatProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[]
  placeholder?: string
}

/**
 * Margin AgentChat: a white panel with a hairline edge. Tabs sit in a grey
 * track with the active one on a paper tab, the person's message is a grey
 * bubble, and the composer is the paper field with an oxblood send button.
 */
function AgentChat({
  tabs = ["Notes", "Tasks"],
  placeholder = "Ask about your notes, or tag a page with @",
  className,
  ...props
}: AgentChatProps) {
  const [phase, setPhase] = React.useState<Phase>("done")
  const [draft, setDraft] = React.useState("")
  const [submitted, setSubmitted] = React.useState("What did we decide about the launch date?")
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
      data-slot="agent-chat"
      className={cn(
        "flex h-80 w-full max-w-md flex-col self-start overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-2 py-1.5">
        <div className="flex items-center gap-0.5 rounded-lg bg-(--field) p-0.5">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={cn(
                focusRing,
                "h-6 rounded-md px-2.5 text-sm transition duration-fast ease-(--ease-out)",
                tab === item
                  ? "bg-card font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {[
            { label: "New chat", icon: "solar:add-circle-linear" },
            { label: "History", icon: "solar:history-linear" },
            { label: "More options", icon: "solar:menu-dots-bold" },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className={cn(
                focusRing,
                "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon={action.icon} className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3.5 pt-3 pb-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <div className="flex justify-end ps-14">
          <div
            className={cn(
              "rounded-xl bg-(--field) px-3 py-1.5 text-sm leading-snug text-foreground transition duration-slow ease-(--ease-out)",
              sent ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
            )}
          >
            {submitted}
          </div>
        </div>

        {phase === "reply1" || phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Searched notes"
            sub="6 pages"
            time="3s"
            body="Found the launch plan and two weekly sync pages that mention the date."
          />
        ) : null}
        {phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Summary"
            sub="Latest decision"
            time="2s"
            body="The launch moved from the 7th to the 14th, agreed in Tuesday's sync."
            resolving={phase === "reply2"}
          />
        ) : null}
      </div>

      <div className="mt-auto shrink-0 p-2">
        <div
          role="presentation"
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "flex cursor-text flex-col gap-2 rounded-lg border border-transparent bg-(--field) p-2.5",
            "transition duration-fast ease-(--ease-out) focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
          )}
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
            className="min-h-5 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Attach a page"
              className={cn(
                focusRing,
                "grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon="solar:paperclip-linear" className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={send}
              className={cn(
                focusRing,
                "grid size-7 place-items-center rounded-lg transition duration-base enabled:active:scale-96",
                canSend
                  ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                  : "bg-input text-muted-foreground",
              )}
            >
              <Icon icon="solar:arrow-up-linear" className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Standalone parts kept for the showcase bundle contract.
interface AgentChatStep {
  label: string
  meta?: string
}

interface AgentChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "user" | "assistant"
  steps?: AgentChatStep[]
}

/** Margin AgentChatMessage: a grey bubble for the person, plain text with tool steps for the assistant. */
function AgentChatMessage({ role = "assistant", steps, className, children, ...props }: AgentChatMessageProps) {
  if (role === "user") {
    return (
      <div className={cn("flex justify-end", className)} {...props}>
        <div className="max-w-[85%] rounded-xl bg-(--field) px-3 py-1.5 text-sm text-foreground">{children}</div>
      </div>
    )
  }
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {steps && steps.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {steps.map((step, i) => (
            <span
              key={i}
              className="inline-flex h-5.5 items-center gap-1 rounded-md bg-(--field) px-1.5"
            >
              <span className="font-medium text-foreground">{step.label}</span>
              {step.meta && <span className="text-muted-foreground">{step.meta}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="text-sm leading-normal text-foreground">{children}</div>
    </div>
  )
}

interface AgentChatComposerProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string
  onSubmit?: (value: string) => void
}

/** Margin AgentChatComposer: the paper field with a small oxblood send button at its end. */
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
        "flex h-9 items-center gap-2 rounded-lg border border-transparent bg-(--field) ps-2.5 pe-1",
        "transition duration-fast ease-(--ease-out) focus-within:border-primary/45 focus-within:bg-card focus-within:ring-3 focus-within:ring-ring",
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
          "grid size-7 shrink-0 place-items-center rounded-md transition-colors",
          canSend ? "bg-primary text-primary-foreground" : "bg-input text-muted-foreground",
        )}
      >
        <Icon icon="solar:arrow-up-linear" className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}

export { AgentChat, AgentChatMessage, AgentChatComposer }
export type { AgentChatStep }
