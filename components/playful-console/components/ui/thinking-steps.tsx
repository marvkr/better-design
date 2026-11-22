"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

/** Where a step stands: finished, running now, or not started. */
type StepStatus = "complete" | "active" | "pending";

/** Props for ThinkingSteps: the ThinkingStep rows it stacks. */
interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Playful console ThinkingSteps: a run log of what an agent is doing.
 *
 * Steps stack down a dashed olive rail. A finished step shows a small green
 * square with a bold tick, the step in progress spins an orange ring, and
 * steps still waiting are hollow squares in muted text. The step in
 * progress opens its detail under the title; sources sit in little file
 * chips with the hairline edge.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Read the brief" />
 *     <ThinkingStep status="active" title="Draft the screen" />
 *     <ThinkingStep status="pending" title="Check the result" />
 *   </ThinkingSteps>
 */
function ThinkingSteps({ children, className, ...props }: ThinkingStepsProps) {
  return (
    <div
      role="list"
      data-slot="thinking-steps"
      className={cn("relative flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Props for ThinkingStep: its status, title and optional detail. */
interface ThinkingStepProps extends HTMLMotionProps<"div"> {
  status?: StepStatus;
  title: string;
  description?: React.ReactNode;
  /** When false, hides the vertical connector below this step. */
  showConnector?: boolean;
}

const statusSpoken = {
  complete: "Done",
  active: "In progress",
  pending: "Waiting",
} satisfies Record<StepStatus, string>;

/** One row of the run log: a status marker on the rail and the step's title. */
function ThinkingStep({
  status = "pending",
  title,
  description,
  showConnector = true,
  className,
  ...props
}: ThinkingStepProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="listitem"
      data-slot="thinking-step"
      data-status={status}
      aria-current={status === "active" ? "step" : undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn("relative flex gap-3", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span className="flex size-5 shrink-0 items-center justify-center">
          <StepMarker status={status} />
        </span>
        {showConnector && (
          <span
            aria-hidden="true"
            className={cn(
              "my-1 w-0 flex-1 border-l-[0.09375rem] border-dashed border-(--line-strong) transition-colors duration-fast",
              status === "complete" && "border-solid border-(--success-text)",
            )}
          />
        )}
      </div>
      <div className={cn("flex min-w-0 flex-col gap-1", showConnector && "pb-4")}>
        <span
          className={cn(
            "text-sm leading-5",
            status === "pending" && "font-medium text-muted-foreground",
            status === "active" && "font-bold text-foreground",
            status === "complete" && "font-semibold text-(--foreground-secondary)",
          )}
        >
          <span className="sr-only">{statusSpoken[status]}: </span>
          {title}
        </span>
        <AnimatePresence initial={false}>
          {description && status !== "pending" && (
            <motion.div
              key="description"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden text-xs leading-5 text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** The 16-unit spinner: a faint full ring with a quarter arc turning on it. */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 animate-spin", className)}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.25"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The marker for one status: a green tick square, an orange spinner, or a hollow square. */
function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className="flex size-4 items-center justify-center rounded-md bg-success text-success-foreground"
      >
        <Icon icon="ph:check-bold" className="size-3" aria-hidden="true" />
      </span>
    );
  }

  if (status === "active") {
    return <Spinner className="text-primary" />;
  }

  return (
    <span
      aria-hidden="true"
      className="size-2.5 rounded-[0.125rem] border-[0.09375rem] border-(--line-strong) bg-(--field)"
    />
  );
}

/** Props for ThinkingStepSources: the source names to show as chips. */
interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The files or pages a step read, each in a small file chip with the hairline edge. */
function ThinkingStepSources({
  children,
  className,
  ...props
}: ThinkingStepSourcesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-slot="thinking-step-sources"
      className={cn("flex flex-wrap gap-1.5 pt-1", className)}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: i * 0.04, ease: "easeOut" }}
          className="inline-flex h-6 items-center gap-1 rounded-md border border-border bg-card px-2 font-mono text-xs font-medium text-(--foreground-secondary)"
        >
          <Icon icon="ph:file-text-duotone" className="size-3.5" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
