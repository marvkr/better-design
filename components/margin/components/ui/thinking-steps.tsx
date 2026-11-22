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
 * Margin ThinkingSteps: what an assistant is doing, down a hairline rail.
 *
 * A finished step is a filled oxblood disc with a white tick. The step in
 * progress is a white disc with a turning oxblood arc, and a waiting step is a
 * hollow grey ring. The rail below a finished step turns a soft oxblood. Only
 * the step in progress and the finished ones show their detail, and the
 * pages a step read sit in small paper tabs.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Search your notes" />
 *     <ThinkingStep status="active" title="Read the meeting pages" />
 *     <ThinkingStep status="pending" title="Write the summary" />
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
} satisfies { [status in StepStatus]: string };

/** Margin ThinkingStep: one marker on the rail with its title and detail. */
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
      initial={reduceMotion ? false : { opacity: 0, y: "0.25rem" }}
      animate={{ opacity: 1, y: "0rem" }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className={cn("relative flex gap-2.5", className)}
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
              "my-1 w-px flex-1 bg-border transition-colors duration-base",
              status === "complete" && "bg-primary/40",
            )}
          />
        )}
      </div>
      <div className={cn("flex min-w-0 flex-col gap-0.5", showConnector && "pb-3.5")}>
        <span
          className={cn(
            "text-sm leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "font-medium text-foreground",
            status === "complete" && "text-foreground",
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

/** The marker for one step: an oxblood disc when done, a turning arc when active, a ring when waiting. */
function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className="flex size-4.5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs"
      >
        <Icon icon="solar:check-read-linear" className="size-3" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span
        aria-hidden="true"
        className="relative size-4.5 rounded-full border-2 border-primary/20 bg-card"
      >
        <span className="absolute -inset-0.5 animate-spin rounded-full border-2 border-transparent border-t-primary motion-reduce:animate-none" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="size-3 rounded-full border-2 border-input bg-card" />
  );
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The pages a step read, each in a small paper tab with a document icon. */
function ThinkingStepSources({
  children,
  className,
  ...props
}: ThinkingStepSourcesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      data-slot="thinking-step-sources"
      className={cn("flex flex-wrap gap-1.5 pt-1.5", className)}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <motion.span
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.04, ease: "easeOut" }}
          className="inline-flex h-6 items-center gap-1.5 rounded-md bg-card px-2 text-xs text-foreground shadow-sm"
        >
          <Icon icon="solar:document-text-linear" className="size-3.5 text-(--primary-text)" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
