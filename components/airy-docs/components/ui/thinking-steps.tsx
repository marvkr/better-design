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
 * Airy docs ThinkingSteps: what a docs assistant is doing, as a numbered
 * guide would show it.
 *
 * Steps stack down a hairline rail. A finished step shows a small green
 * check in a green-washed circle, the step in progress a green spinner
 * arc, and a waiting step a hollow grey ring. The step in progress opens
 * its detail under the title; the pages it read sit in small mono chips.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Search the docs" />
 *     <ThinkingStep status="active" title="Read the API reference" />
 *     <ThinkingStep status="pending" title="Write the answer" />
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
} satisfies Record<StepStatus, string>;

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
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
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
              "my-1 w-px flex-1 bg-border transition-colors duration-fast",
              status === "complete" && "bg-(--primary-line)",
            )}
          />
        )}
      </div>
      <div className={cn("flex min-w-0 flex-col gap-1", showConnector && "pb-4")}>
        <span
          className={cn(
            "text-sm leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "font-medium text-foreground",
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

function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className="flex size-4.5 items-center justify-center rounded-full bg-(--primary-wash) text-(--primary-text)"
      >
        <Icon icon="feather:check" className="size-3" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-2.5 rounded-full border-2 border-(--line-strong) bg-background"
    />
  );
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The pages a step read, each in a small mono chip on the tray. */
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
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.04, ease: "easeOut" }}
          className="inline-flex h-6 items-center gap-1 rounded-sm border border-border bg-secondary px-2 font-mono text-xs text-(--foreground-secondary)"
        >
          <Icon icon="feather:file-text" className="size-3" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
