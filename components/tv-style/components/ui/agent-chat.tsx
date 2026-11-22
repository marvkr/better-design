"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// AgentChat: interactive chat panel with tabs, labeled tool replies, and a
// composer. The reply sequence begins only after the user sends.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <AgentChat />
//   <AgentChat tabs={["Flavors", "Suppliers"]} />

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done"

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
      className="flex w-full flex-col gap-1.5 transition-[opacity,filter,transform] duration-slow"
      style={{
        opacity: resolving ? 0.55 : 1,
        filter: resolving ? "blur(0.5px)" : "blur(0)",
        transform: resolving ? "scale(0.985)" : "scale(1)",
        transformOrigin: "top left",
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        animation: "bui-fade-up 400ms cubic-bezier(0.23,1,0.32,1) both",
      }}
    >
      <div className="flex items-center gap-1 text-[0.75rem] leading-[1.3]">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-foreground/70">{sub}</span>
        <span className="text-foreground">for {time}</span>
      </div>
      <p className="text-[0.8125rem] leading-normal text-foreground">{body}</p>
    </div>
  )
}

interface AgentChatProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[]
  placeholder?: string
}

function AgentChat({
  tabs = ["Flavors", "Suppliers"],
  placeholder = "Prompt or tag a flavor with @",
  className,
  ...props
}: AgentChatProps) {
  const [phase, setPhase] = React.useState<Phase>("done")
  const [draft, setDraft] = React.useState("")
  const [submitted, setSubmitted] = React.useState("Compare mint chip to last summer")
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
      className={cn(
        "flex h-[18rem] w-full max-w-[23.75rem] flex-col self-start overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
      {...props}
    >
      {/* header: tabs + actions */}
      <div className="flex shrink-0 items-center justify-between border-b border-border p-1.5">
        <div className="flex items-center">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={cn(
                "rounded-[0.375rem] px-2 py-[0.1875rem] text-[0.8125rem] text-foreground transition-[background-color,opacity] duration-fast",
                tab === item ? "bg-muted" : "opacity-50 hover:opacity-75",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[
            <path key="p" d="M12 5v14M5 12h14" />,
            <g key="h"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
            <g key="e" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></g>,
          ].map((icon, i) => (
            <button
              key={i}
              type="button"
              aria-label="Action"
              className="flex size-6 items-center justify-center rounded-[0.375rem] text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icon}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* conversation: fixed region so the card never changes shape */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
        <div className="flex justify-end pl-14">
          <div
            className="rounded-xl bg-muted px-3 py-1.5 text-[0.8125rem] leading-[1.4] text-foreground transition-[opacity,transform] duration-slow"
            style={{
              opacity: sent ? 1 : 0,
              transform: sent ? "translateY(0)" : "translateY(10px)",
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {submitted}
          </div>
        </div>

        {phase === "reply1" || phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Sales History"
            sub="Flavor Data"
            time="4s"
            body="Pulled 3 summers of mint chip sales for comparison."
          />
        ) : null}
        {phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Comparison"
            sub="Trend Detection"
            time="2s"
            body="Mint chip is up 12% with stronger weekend peaks."
            resolving={phase === "reply2"}
          />
        ) : null}
      </div>

      {/* composer */}
      <div className="mt-auto shrink-0 p-1.5">
        <div
          role="presentation"
          onClick={() => inputRef.current?.focus()}
          className="flex cursor-text flex-col gap-2 rounded-md border border-border bg-muted/50 p-2.5 transition-[border-color] duration-fast focus-within:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring"
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
            className="min-h-[1.125rem] bg-transparent text-[0.8125rem] leading-[1.4] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={send}
              className={cn(
                "flex size-7 items-center justify-center rounded-[0.5rem] transition-[background-color,color,transform] duration-base enabled:active:scale-[0.96]",
                canSend ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground",
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bui-fade-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>
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

function AgentChatMessage({ role = "assistant", steps, className, children, ...props }: AgentChatMessageProps) {
  if (role === "user") {
    return (
      <div className={cn("flex justify-end", className)} {...props}>
        <div className="max-w-[85%] rounded-xl bg-muted px-3 py-1.5 text-[0.8125rem] text-foreground">{children}</div>
      </div>
    )
  }
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {steps && steps.length > 0 && (
        <div className="flex items-center gap-1 text-[0.75rem]">
          {steps.map((step, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="font-medium text-foreground">{step.label}</span>
              {step.meta && <span className="text-foreground/70">{step.meta}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="text-[0.8125rem] leading-normal text-foreground">{children}</div>
    </div>
  )
}

interface AgentChatComposerProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string
  onSubmit?: (value: string) => void
}

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
        "flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 focus-within:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring",
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
          "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
          canSend ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground",
        )}
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
          <path d="M8 12.5v-9M4.5 7 8 3.5 11.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}

export { AgentChat, AgentChatMessage, AgentChatComposer }
export type { AgentChatStep }
