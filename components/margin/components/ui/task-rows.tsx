"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

const TICKS = [600, 900, 2400, 1400, 2400, 600];

/** Advances a tick once per interval, then rests on the last one. */
function useTick(intervals: number[]) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (tick >= intervals.length - 1) return;
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick]);
    return () => clearTimeout(t);
  }, [tick, intervals]);
  return tick;
}

/** A numbered step on the paper field; while active, an oxblood arc turns around it. */
function StepNumber({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  return (
    <span className="relative inline-flex size-5.5 shrink-0 items-center justify-center rounded-full bg-(--field)">
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary motion-reduce:animate-none"
        />
      )}
      <span className="relative text-xs font-medium tabular-nums text-muted-foreground">{children}</span>
    </span>
  );
}

/** Done is a solid oxblood dot with a tick; failed is a solid red dot with a cross. */
function StatusDot({ tone, children }: { tone: "fail" | "ok"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-5.5 shrink-0 animate-in zoom-in-75 fade-in items-center justify-center rounded-full duration-slow",
        tone === "fail" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground",
      )}
    >
      {children}
    </span>
  );
}

const XIcon = <Icon icon="solar:close-circle-bold" className="size-3.5" aria-hidden="true" />;
const CheckIcon = <Icon icon="solar:check-read-linear" className="size-3.5" aria-hidden="true" />;

/** A small status chip in its own hue. */
function StatusPill({ tone, spin, children }: { tone: "ok" | "fail"; spin?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 animate-in fade-in items-center gap-1 rounded-sm px-1.5 text-xs font-medium duration-base",
        tone === "ok" ? "bg-(--mark) text-(--mark-foreground)" : "bg-destructive/12 text-destructive-text",
      )}
    >
      {children}
      {spin && (
        <Icon icon="solar:refresh-linear" className="size-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      )}
    </span>
  );
}

interface TaskRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "Capsules" (default) renders separate rows; "List" renders one card. */
  variant?: "Capsules" | "List";
}

/**
 * Margin TaskRows: an agent's tasks as rows on white sheets. A running task
 * turns an oxblood arc round its number, one fails and retries, and each row
 * opens to show its detail lines.
 */
function TaskRows({ variant = "Capsules", className, ...props }: TaskRowsProps) {
  const tick = useTick(TICKS);
  const [manualOpen, setManualOpen] = React.useState<{ [key: string]: boolean }>({});
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done";

  const rows = [
    {
      key: "read",
      badge: <StatusDot tone="ok">{CheckIcon}</StatusDot>,
      label: "Read the meeting notes",
      amount: "6 notes",
      pill: <StatusPill tone="ok">Done</StatusPill>,
      details: [
        { label: "Collected action items", meta: "14" },
        { label: "Notes without an owner", meta: "2" },
      ],
    },
    {
      key: "group",
      badge: <StepNumber active>2</StepNumber>,
      label: "Group items by project",
      amount: "4 projects",
      pill: null,
      details: [
        { label: "Matching tags", meta: "9 tags" },
        { label: "Sorting by due date", meta: "62%" },
      ],
    },
    {
      key: "share",
      badge:
        row2 === "pending" ? (
          <StepNumber>3</StepNumber>
        ) : row2 === "failed" ? (
          <StatusDot tone="fail">{XIcon}</StatusDot>
        ) : (
          <StatusDot tone="ok">{CheckIcon}</StatusDot>
        ),
      label: "Share the summary",
      amount: "2 notebooks",
      pill:
        row2 === "failed" ? (
          <StatusPill tone="fail" spin>
            Retrying
          </StatusPill>
        ) : row2 === "done" ? (
          <StatusPill tone="ok">Done</StatusPill>
        ) : null,
      details: [
        { label: "Team notebook", meta: "draft" },
        { label: "Weekly digest", meta: "draft" },
      ],
    },
  ];

  const list = variant === "List";
  return (
    <div
      className={cn(
        "flex w-full max-w-md flex-col",
        list
          ? "gap-0 self-start overflow-hidden rounded-xl border border-border bg-card"
          : "min-h-48 gap-2",
        className,
      )}
      {...props}
    >
      {rows.map((row, i) => {
        const open = manualOpen[row.key] ?? (row.key === "group" && tick === 2);
        return (
          <div
            key={row.key}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-1 fill-mode-both self-stretch overflow-hidden duration-slow",
              list ? "border-b border-border last:border-0" : "rounded-xl border border-border bg-card",
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className={cn(
                "flex h-11 w-full items-center gap-2.5 px-3 text-left outline-none transition-colors duration-fast",
                "focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring",
                "pointer-fine:hover:bg-accent/60",
              )}
            >
              <span className="flex size-5.5 shrink-0 items-center justify-center">{row.badge}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{row.label}</span>
              <span className="text-xs tabular-nums text-muted-foreground">{row.amount}</span>
              {row.pill}
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-base", open && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-slow ease-(--ease-out)",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="mb-3 grid grid-cols-[1.375rem_1fr] gap-2.5 px-3">
                  <span aria-hidden="true" className="mx-auto h-full w-px bg-border" />
                  <div className="flex flex-col gap-1">
                    {row.details.map((d) => (
                      <div key={d.label} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{d.label}</span>
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">{d.meta}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TaskRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  index?: number;
  meta?: string;
  status?: "pending" | "running" | "completed" | "failed";
}

/** The badge for a standalone row's status. */
function StatusBadge({ status, index }: { status: TaskRowProps["status"]; index?: number }) {
  if (status === "running") return <StepNumber active>{index}</StepNumber>;
  if (status === "completed") return <StatusDot tone="ok">{CheckIcon}</StatusDot>;
  if (status === "failed") return <StatusDot tone="fail">{XIcon}</StatusDot>;
  return <StepNumber>{index}</StepNumber>;
}

/** Margin TaskRow: one task on its own white sheet. */
function TaskRow({ title, index, meta, status = "pending", className, children, ...props }: TaskRowProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5", className)}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <StatusBadge status={status} index={index} />
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{title}</span>
        {meta && <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{meta}</span>}
        {status === "completed" && <StatusPill tone="ok">Done</StatusPill>}
        {status === "failed" && <StatusPill tone="fail">Failed</StatusPill>}
      </div>
      {children && <div className="flex flex-col gap-1 ps-8">{children}</div>}
    </div>
  );
}

interface TaskSubRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  meta?: string;
}

/** Margin TaskSubRow: one muted detail line under a task. */
function TaskSubRow({ title, meta, className, ...props }: TaskSubRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2 text-xs text-muted-foreground", className)} {...props}>
      <span className="min-w-0 flex-1 truncate">{title}</span>
      {meta && <span className="shrink-0 font-mono tabular-nums">{meta}</span>}
    </div>
  );
}

export { TaskRows, TaskRow, TaskSubRow };
