"use client";

import * as React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Interior ThinkingSteps — a chain-of-thought trace in the three materials.
 *
 * A completed marker is a 5px-radius ink cell with the primary Button's thumb
 * shadow; the active one is a spinner arc in the accent (work in progress is
 * live state, and the arc is the only allowed loop — no pulsing halo); a
 * pending one is a recessed well. Steps slide in when they arrive: motion on
 * events, never at idle. Sources are small well chips.
 *
 * Usage:
 *   <ThinkingSteps>
 *     <ThinkingStep status="complete" title="Reading project spec" />
 *     <ThinkingStep status="active" title="Generating component" />
 *     <ThinkingStep status="pending" title="Saving result" />
 *   </ThinkingSteps>
 */

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ThinkingSteps({ children, className, ...props }: ThinkingStepsProps) {
  return (
    <div className={cn("relative flex flex-col gap-3", className)} {...props}>
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

function ThinkingStep({
  status = "pending",
  title,
  description,
  showConnector = true,
  className,
  ...props
}: ThinkingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative flex gap-3", className)}
      data-status={status}
      {...props}
    >
      <div className="relative flex flex-col items-center">
        <StatusMark status={status} />
        {showConnector ? (
          <span
            aria-hidden
            className={cn(
              "mt-1 w-0.5 flex-1 rounded-[0.125rem] bg-border",
              status === "complete" && "bg-primary/30",
            )}
          />
        ) : null}
      </div>
      <div className="-mt-0.5 flex flex-col gap-1 pb-3">
        <span
          className={cn(
            "text-[0.8125rem] font-medium leading-5",
            status === "pending" ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {title}
        </span>
        <AnimatePresence initial={false}>
          {description && status !== "pending" ? (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden text-[0.7813rem] leading-5 text-muted-foreground"
            >
              {description}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StatusMark({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <span className="flex size-4 items-center justify-center rounded-[0.3125rem] bg-primary text-primary-foreground shadow-[var(--shadow-thumb)]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M2.5 6.5 L5 9 L9.5 3.5" />
        </svg>
      </span>
    );
  }

  if (status === "active") {
    return (
      <span className="flex size-4 items-center justify-center">
        <Loader2
          aria-hidden
          strokeWidth={1.5}
          className="size-3.5 animate-spin text-ring"
        />
      </span>
    );
  }

  return (
    <span className="flex size-4 items-center justify-center">
      <span className="size-2.5 rounded-[0.1875rem] bg-secondary shadow-[var(--shadow-well)]" />
    </span>
  );
}

interface ThinkingStepSourcesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ThinkingStepSources({
  children,
  className,
  ...props
}: ThinkingStepSourcesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5 pt-1", className)} {...props}>
      {React.Children.map(children, (child, index) => (
        <motion.span
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.16,
            delay: index * 0.04,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="inline-flex items-center rounded-[0.3125rem] bg-secondary px-2 py-0.5 text-[0.7188rem] text-muted-foreground shadow-[var(--shadow-well)]"
        >
          {child}
        </motion.span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
