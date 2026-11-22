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
import { copperRim, creamBevel, raisedBevel, wellInset } from "./_shared";

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Burnished ThinkingSteps: what an agent is doing, down a recessed rail.
 *
 * A finished step is a small cream bead in a copper rim, the same material
 * as the primary. The step in progress turns a glow arc in a well, and a
 * waiting step is an empty well. The rail below a finished step glows
 * faintly. The step in progress opens its detail under the title; the
 * pages it read sit in small graphite bevel chips.
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
      className={cn("relative flex flex-col tracking-[0.016em]", className)}
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

/** Burnished ThinkingStep: one bead on the rail with its title and detail. */
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
      transition={{ duration: 0.18, ease: "easeOut" }}
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
              "my-1 w-0.5 flex-1 rounded-full bg-border transition-colors duration-base",
              status === "complete" && "bg-glow/35",
            )}
          />
        )}
      </div>
      <div className={cn("flex min-w-0 flex-col gap-1", showConnector && "pb-4")}>
        <span
          className={cn(
            "text-sm leading-5",
            status === "pending" && "text-muted-foreground",
            status === "active" && "font-semibold text-foreground",
            status === "complete" && "text-foreground/80",
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
              transition={{ duration: 0.22, ease: "easeOut" }}
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

/** The bead for one step: cream when done, a turning arc when active, a well when waiting. */
function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span
        aria-hidden="true"
        className={cn(creamBevel, copperRim, "flex size-5 items-center justify-center rounded-full")}
      >
        <Icon icon="ph:check-bold" className="size-2.5" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span aria-hidden="true" className={cn(wellInset, "relative size-4.5 rounded-full")}>
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-glow motion-reduce:animate-none" />
      </span>
    );
  }

  return <span aria-hidden="true" className={cn(wellInset, "size-3 rounded-full")} />;
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The pages a step read, each in a small graphite bevel chip. */
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
          className={cn(
            raisedBevel,
            "inline-flex h-6.5 items-center gap-1.5 rounded-full px-2.5 font-mono text-xs tracking-normal text-muted-foreground",
          )}
        >
          <Icon icon="ph:file-text" className="size-3 text-primary-text" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
