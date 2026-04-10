"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { DotMatrix } from "./agent-state-indicator";
import type { AgentState } from "./agent-state-indicator";

const PHASES = [
  { key: "sandbox", label: "Getting your canvas ready", dotState: "thinking" as AgentState },
  { key: "design", label: "Picking the right look & feel", dotState: "thinking" as AgentState },
  { key: "agent", label: "Bringing your idea to life", dotState: "executing" as AgentState },
  { key: "finalizing", label: "Putting on the finishing touches", dotState: "executing" as AgentState },
] as const;

type PhaseKey = (typeof PHASES)[number]["key"];

function getActivePhase(currentStep: string | null | undefined): PhaseKey {
  if (!currentStep) return "sandbox";
  const prefix = currentStep.split(":")[0] as PhaseKey;
  if (PHASES.some((p) => p.key === prefix)) return prefix;
  return "sandbox";
}


interface Props {
  currentStep?: string | null;
  files?: Map<string, string>;
  onAnswer?: (answer: string) => void;
}

export const MessageLoading = ({ currentStep, files, onAnswer }: Props) => {
  const [elapsed, setElapsed] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const isQuestion = currentStep?.startsWith("question:");
  const question = isQuestion ? currentStep!.slice("question:".length) : null;

  useEffect(() => {
    if (isQuestion) inputRef.current?.focus();
  }, [isQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = answer.trim();
    if (!trimmed || !onAnswer) return;
    onAnswer(trimmed);
    setAnswer("");
  };

  const formatElapsed = (s: number) => {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  // ── Question state ──────────────────────────────────────────────────────────
  if (isQuestion && question) {
    return (
      <div className="flex flex-col group px-2 pb-4">
        <div className="flex items-center gap-2 pl-2 mb-3">
          <Logo size={18} className="shrink-0" />
          <span className="text-sm font-medium">Better Design</span>
        </div>
        <div className="flex items-start gap-3 pl-2">
          <div className="shrink-0 mt-0.5">
            <DotMatrix state="question" />
          </div>
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <p className="text-sm text-foreground">{question}</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="flex-1 min-w-0 text-sm bg-muted rounded-lg px-3 py-2 border border-border outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!answer.trim()}
                className="shrink-0 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition-opacity hover:opacity-90"
              >
                <Icon icon="tabler:arrow-up" className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Progress state ──────────────────────────────────────────────────────────
  const activePhase = getActivePhase(currentStep);
  const activeIndex = PHASES.findIndex((p) => p.key === activePhase);
  const fileList = files ? Array.from(files.keys()) : [];

  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-3">
        <Logo size={18} className="shrink-0" />
        <span className="text-sm font-medium">Better Design</span>
        <span className="text-xs text-muted-foreground/50 ml-auto pr-1 tabular-nums">
          {formatElapsed(elapsed)}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 pl-2">
        {PHASES.map((phase, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          const isPending = index > activeIndex;

          return (
            <div
              key={phase.key}
              className={cn(
                "flex flex-col gap-1 transition-opacity duration-500",
                isPending && "opacity-25",
              )}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <div className="shrink-0">
                    <DotMatrix state="success" />
                  </div>
                ) : isActive ? (
                  <div className="shrink-0">
                    <DotMatrix state={phase.dotState} />
                  </div>
                ) : (
                  <div className="shrink-0">
                    <DotMatrix state="idle" />
                  </div>
                )}
                <span
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDone && "text-muted-foreground",
                    isActive && "text-foreground font-medium",
                    isPending && "text-muted-foreground",
                  )}
                >
                  {phase.label}
                </span>
              </div>
            </div>
          );
        })}

        {fileList.length > 0 && (
          <div className="flex flex-col gap-1 mt-1 pl-[22px]">
            {fileList.slice(-6).map((path) => (
              <div key={path} className="flex items-center gap-1.5">
                <Icon icon="tabler:file-code" className="size-3 text-muted-foreground/50 shrink-0" />
                <span className="text-xs text-muted-foreground/60 font-mono truncate">{path}</span>
              </div>
            ))}
            {fileList.length > 6 && (
              <span className="text-xs text-muted-foreground/40 pl-4">+{fileList.length - 6} more</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
