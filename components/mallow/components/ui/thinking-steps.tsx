"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { primaryFinish, optionTrack } from "./_shared";

/** Where a step stands: finished, in progress, or waiting. */
type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Mallow ThinkingSteps: what an agent is doing, as a list down a thin rail
 * where finished steps carry a light bead and the current step a turning arc.
 */
function ThinkingSteps({ children, className, ...props }: ThinkingStepsProps) {
  return (
    <div role="list" data-slot="thinking-steps" className={cn("relative flex flex-col", className)} {...props}>
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

/** Mallow ThinkingStep: one bead on the rail with its title and, once started, its detail. */
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
              "my-1 w-0.5 flex-1 rounded-full transition-colors duration-base",
              status === "complete" ? "bg-primary/40" : "bg-border",
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
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              className="overflow-hidden text-sm leading-5 text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/** The bead for one step: the violet finish when done, a turning arc when active, a lilac dot when waiting. */
function StepMarker({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span aria-hidden="true" className={cn(primaryFinish, "flex size-5 items-center justify-center rounded-full")}>
        <Icon icon="iconoir:check" className="size-3.5" />
      </span>
    );
  }

  if (status === "active") {
    return (
      <span aria-hidden="true" className={cn(optionTrack, "relative size-4.5 rounded-full")}>
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground motion-reduce:animate-none" />
      </span>
    );
  }

  return <span aria-hidden="true" className={cn(optionTrack, "size-3 rounded-full")} />;
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** The pages a step read, each in a quiet round chip. */
function ThinkingStepSources({ children, className, ...props }: ThinkingStepSourcesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div data-slot="thinking-step-sources" className={cn("flex flex-wrap gap-1.5 pt-1.5", className)} {...props}>
      {React.Children.map(children, (child, i) => (
        <motion.span
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: i * 0.04, ease: "easeOut" }}
          className="inline-flex h-7 items-center gap-1.5 rounded-full bg-(--tag) px-2.5 font-mono text-xs text-muted-foreground"
        >
          <Icon icon="iconoir:page" className="size-3.5" aria-hidden="true" />
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
