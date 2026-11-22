"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

// Ported from fluid-functionalism (mickadesign): https://github.com/mickadesign/fluid-functionalism

// Talentboard ThinkingSteps: agent progress feed; complete markers wear the
// scaled-down orange material, the active marker pulses.

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ThinkingSteps({ className, children, ...props }: ThinkingStepsProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
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
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
            status === "complete" &&
              "bg-[image:var(--tb-primary-gradient)] text-primary-foreground shadow-[var(--tb-shadow-primary-sm)]",
            status === "active" &&
              "border border-ring/60 bg-secondary shadow-[var(--tb-shadow-raise)]",
            status === "pending" && "border border-border/70 bg-input/60"
          )}
        >
          {status === "complete" && <Check className="h-3 w-3" strokeWidth={3} />}
          {status === "active" && (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
        {showConnector && <span className="my-1 w-px flex-1 bg-border/70" />}
      </div>
      <div className={cn("min-w-0 flex-1", showConnector && "pb-5")}>
        <div
          className={cn(
            "text-sm font-medium",
            status === "pending" ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {title}
        </div>
        {description && <div className="mt-1 text-xs text-muted-foreground">{description}</div>}
      </div>
    </motion.div>
  );
}

interface ThinkingStepSourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ThinkingStepSources({ className, children, ...props }: ThinkingStepSourcesProps) {
  return (
    <div className={cn("mt-1.5 flex flex-wrap gap-1.5", className)} {...props}>
      {React.Children.map(children, (child) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-secondary px-1.5 py-0.5 text-[0.625rem] font-medium text-muted-foreground">
          {child}
        </span>
      ))}
    </div>
  );
}

export { ThinkingSteps, ThinkingStep, ThinkingStepSources };
export type { ThinkingStepsProps, ThinkingStepProps, StepStatus };
