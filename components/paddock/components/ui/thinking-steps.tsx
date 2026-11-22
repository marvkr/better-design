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
import { primaryFace, quietChip } from "./_shared";

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Paddock ThinkingSteps: what an agent is doing, as a column of
 * status rings joined by a thin rail.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Read the project brief" />
 *     <ThinkingStep status="active" title="Check the due dates" />
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

/** Paddock ThinkingStep: one ring on the rail, with its title and the detail it found. */
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
      transition={{ duration: 0.16, ease: "easeOut" }}
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
              "my-1 w-px flex-1 bg-border transition-colors duration-base",
              status === "complete" && "bg-input",
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
            status === "complete" && "text-secondary-foreground",
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
              className="overflow-hidden text-[0.8125rem] text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** The marker for one step: a solid check when done, a turning ring when active, an empty ring when waiting. */
function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className={cn(primaryFace, "flex size-4.5 items-center justify-center rounded-full")}
      >
        <Icon icon="mingcute:check-line" className="size-3" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <svg aria-hidden="true" viewBox="0 0 18 18" className="size-4.5 animate-spin motion-reduce:animate-none">
        <circle cx="9" cy="9" r="7" fill="none" strokeWidth="2" className="stroke-input" />
        <circle
          cx="9"
          cy="9"
          r="7"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="14 44"
          className="stroke-primary"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-4.5">
      <circle cx="9" cy="9" r="7" fill="none" strokeWidth="2" className="stroke-input" />
    </svg>
  );
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The files a step read, each in a small grey tag chip. */
function ThinkingStepSources({ children, className, ...props }: ThinkingStepSourcesProps) {
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
          className={cn(
            quietChip,
            "inline-flex h-6 items-center gap-1.5 rounded-sm px-2.5 text-xs font-medium",
          )}
        >
          <Icon icon="mingcute:file-line" className="size-3 text-muted-foreground" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
