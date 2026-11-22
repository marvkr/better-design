"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, pressScale, primaryFinish, selectedOption, optionTrack } from "./_shared";

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done";

/** One tool reply: a tool name, its source and its run time, then the answer. */
function ReplySection({
  label,
  sub,
  time,
  body,
  resolving,
}: {
  label: string;
  sub: string;
  time: string;
  body: string;
  resolving?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-1 transition-opacity duration-slow ease-(--ease-out)",
        "animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none",
        resolving ? "opacity-60" : "opacity-100",
      )}
    >
      <div className="flex items-center gap-1.5 text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{sub}</span>
        <time className="text-muted-foreground tabular-nums">{time}</time>
      </div>
      <p className="text-sm leading-normal text-foreground">{body}</p>
    </div>
  );
}

const headerActions = [
  { icon: "iconoir:plus", label: "New chat" },
  { icon: "iconoir:clock", label: "History" },
  { icon: "iconoir:more-horiz", label: "More" },
];

/** The round send key: solid violet when there is text, a quiet lilac tag fill when there is not. */
function SendKey({ enabled, type = "button", onClick }: { enabled: boolean; type?: "button" | "submit"; onClick?: () => void }) {
  return (
    <button
      type={type}
      aria-label="Send"
      disabled={!enabled}
      onClick={onClick}
      className={cn(
        focusRing,
        "flex size-8 shrink-0 items-center justify-center rounded-full",
        enabled ? cn(primaryFinish, pressScale) : "bg-(--tag) text-muted-foreground",
      )}
    >
      <Icon icon="iconoir:arrow-up" className="size-4" aria-hidden="true" />
    </button>
  );
}

interface AgentChatProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: string[];
  placeholder?: string;
}

/**
 * Mallow AgentChat: a chat card with tabs in a lilac track, labelled tool replies
 * and a composer on a lilac track inside the card; replies start only after a send.
 */
function AgentChat({
  tabs = ["Notes", "Sources"],
  placeholder = "Ask or tag a source with @",
  className,
  ...props
}: AgentChatProps) {
  const [phase, setPhase] = React.useState<Phase>("done");
  const [draft, setDraft] = React.useState("");
  const [submitted, setSubmitted] = React.useState("Compare this quarter to the last one");
  const [tab, setTab] = React.useState(tabs[0] ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "sent") t = setTimeout(() => setPhase("reply1"), 500);
    else if (phase === "reply1") t = setTimeout(() => setPhase("reply2"), 1400);
    else if (phase === "reply2") t = setTimeout(() => setPhase("done"), 1200);
    else return;
    return () => clearTimeout(t);
  }, [phase]);

  const sent = phase !== "idle";
  const canSend = draft.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    setSubmitted(draft.trim());
    setDraft("");
    setPhase("sent");
  };

  return (
    <div
      className={cn(cardSlab, "flex h-80 w-full max-w-96 flex-col self-start overflow-hidden rounded-3xl p-2", className)}
      {...props}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 px-1 pb-2">
        <div className={cn(optionTrack, "flex items-center gap-1 rounded-full p-1")} role="group" aria-label="Views">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={cn(
                focusRing,
                "h-7 rounded-full px-3 text-sm transition-colors duration-fast",
                tab === item ? cn(selectedOption, "font-medium") : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {headerActions.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className={cn(
                focusRing,
                "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon icon={action.icon} className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-1 pb-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring" aria-live="polite">
        <div className="flex justify-end ps-12">
          <div
            className={cn(
              selectedOption,
              "rounded-xl px-3 py-1.5 text-sm leading-snug transition-[opacity,translate] duration-slow ease-(--ease-out)",
              "motion-reduce:transition-none",
              sent ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {submitted}
          </div>
        </div>

        {phase === "reply1" || phase === "reply2" || phase === "done" ? (
          <ReplySection label="Reports" sub="Quarterly data" time="4s" body="Pulled the last three quarters for comparison." />
        ) : null}
        {phase === "reply2" || phase === "done" ? (
          <ReplySection
            label="Comparison"
            sub="Trend check"
            time="2s"
            body="This quarter is up 12%, with most of the gain in the final month."
            resolving={phase === "reply2"}
          />
        ) : null}
      </div>

      <div
        role="presentation"
        onClick={() => inputRef.current?.focus()}
        className={cn(
          optionTrack,
          "mt-auto flex shrink-0 cursor-text items-center gap-2 rounded-2xl py-2 ps-4 pe-2",
          "focus-within:ring-2 focus-within:ring-ring",
        )}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") send();
          }}
          placeholder={placeholder}
          aria-label="Chat prompt"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <SendKey enabled={canSend} onClick={send} />
      </div>
    </div>
  );
}

/** One step a reply ran through, such as a tool name and its source. */
interface AgentChatStep {
  label: string;
  meta?: string;
}

interface AgentChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "user" | "assistant";
  steps?: AgentChatStep[];
}

/** A single chat message: the user's in the chosen-option tint, the agent's as plain text under its steps. */
function AgentChatMessage({ role = "assistant", steps, className, children, ...props }: AgentChatMessageProps) {
  if (role === "user") {
    return (
      <div className={cn("flex justify-end", className)} {...props}>
        <div className={cn(selectedOption, "max-w-4/5 rounded-xl px-3 py-1.5 text-sm")}>{children}</div>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {steps && steps.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
          {steps.map((step, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="font-medium text-foreground">{step.label}</span>
              {step.meta && <span className="text-muted-foreground tabular-nums">{step.meta}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="text-sm leading-normal text-foreground">{children}</div>
    </div>
  );
}

interface AgentChatComposerProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

/** A standalone composer: a lilac track with a text field and the round send key. */
function AgentChatComposer({ placeholder = "Ask a follow-up", onSubmit, className, ...props }: AgentChatComposerProps) {
  const [value, setValue] = React.useState("");
  const canSend = value.trim().length > 0;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        onSubmit?.(value.trim());
        setValue("");
      }}
      className={cn(
        optionTrack,
        "flex items-center gap-2 rounded-2xl py-1.5 ps-4 pe-1.5 focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
      {...props}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <SendKey enabled={canSend} type="submit" />
    </form>
  );
}

export { AgentChat, AgentChatMessage, AgentChatComposer };
export type { AgentChatStep };
