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

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Ink mail ThinkingSteps: a quiet checklist of what an agent is doing.
 *
 * Steps stack down a hairline. A finished step shows a green check, the step
 * in progress turns a small off-white spinner, and steps still waiting are
 * hollow grey dots in caption ink. The step in progress opens its detail
 * under the title; the files it read sit in small mono chips.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Read the bounce log" />
 *     <ThinkingStep status="active" title="Group by domain" />
 *     <ThinkingStep status="pending" title="Draft the summary" />
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
} as const satisfies Record<StepStatus, string>;

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
              "my-1 w-0.25 flex-1 transition-colors duration-fast",
              status === "complete" ? "bg-(--line-strong)" : "bg-border",
            )}
          />
        )}
      </div>
      <div className={cn("flex min-w-0 flex-col gap-1", showConnector && "pb-4")}>
        <span
          className={cn(
            "text-sm font-medium leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "text-foreground",
            status === "complete" && "text-(--foreground-secondary)",
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
              transition={{ duration: 0.15, ease: "easeOut" }}
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

/** A faint full ring with a quarter arc turning on it. */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4 motion-safe:animate-spin", className)}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <Icon
        icon="ph:check-circle"
        className="size-4 text-(--success-text)"
        aria-hidden="true"
      />
    );
  }

  if (status === "active") {
    return <Spinner className="text-foreground" />;
  }

  return (
    <span
      aria-hidden="true"
      className="size-2 rounded-full border border-(--control) bg-background"
    />
  );
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The files or pages a step read, each in a small mono chip. */
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
          className="inline-flex h-6 items-center gap-1 rounded-sm border border-border bg-secondary px-2 font-mono text-xs text-(--foreground-secondary)"
        >
          <Icon icon="ph:file-text" className="size-3" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
