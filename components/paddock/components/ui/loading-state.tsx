"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// LoadingState: a small loader for long-running work, with a label and a
// live elapsed timer in tabular figures.
//
// Variants:
//   Drive - a teal arc turning on a cool grey track
//   Dots  - three slate dots rising in turn
//   Orbit - a teal dot lapping the grey track
//
// Reduced motion stops the loader; the timer still ticks.
//
// Usage:
//   <LoadingState label="Syncing the schedule" />
//   <LoadingState label="Importing tasks" variant="Dots" />

/** Formats the time since mount as seconds, then minutes and seconds. */
function useElapsed() {
  const [ds, setDs] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);
  const total = ds / 10;
  if (total < 60) return `${total.toFixed(1)}s`;
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
}

const R = 6;
const C = 2 * Math.PI * R;

/** The loader graphic for one variant. */
function Mark({ variant }: { variant: "Drive" | "Dots" | "Orbit" }) {
  if (variant === "Dots") {
    return (
      <span aria-hidden="true" className="flex h-4 items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-pd-load="" className="size-1.5 rounded-full bg-foreground"
            style={{ animation: `pd-load-rise 900ms ease-in-out ${i * 140}ms infinite` }}
          />
        ))}
      </span>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0">
      <circle cx="8" cy="8" r={R} fill="none" stroke="var(--track)" strokeWidth="2" />
      {variant === "Drive" ? (
        <circle
          data-pd-load=""
          cx="8"
          cy="8"
          r={R}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${C * 0.3} ${C}`}
          style={{ transformBox: "view-box", transformOrigin: "50% 50%", animation: "pd-load-spin 900ms linear infinite" }}
        />
      ) : (
        <circle
          data-pd-load=""
          cx="8"
          cy="2"
          r="2"
          fill="var(--primary)"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%", animation: "pd-load-spin 1200ms linear infinite" }}
        />
      )}
    </svg>
  );
}

/** Props for the loader, its label and the elapsed counter. */
interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: "Drive" | "Dots" | "Orbit";
  /** When false, hides the elapsed counter. Default true. */
  showElapsed?: boolean;
}

/** Paddock LoadingState: a teal ring turning beside a label and an elapsed timer. */
function LoadingState({
  label = "Working",
  variant = "Drive",
  showElapsed = true,
  className,
  ...props
}: LoadingStateProps) {
  const elapsed = useElapsed();

  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="loading-state"
      className={cn("flex w-fit items-center gap-2", className)}
      {...props}
    >
      <Mark variant={variant} />
      <span className="text-[0.8125rem] font-medium text-foreground">{label}</span>
      {showElapsed && (
        <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
          {elapsed}
        </span>
      )}
      <style>{`
        @keyframes pd-load-spin { to { transform: rotate(360deg); } }
        @keyframes pd-load-rise { 0%, 100% { opacity: 0.25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-0.125rem); } }
        @media (prefers-reduced-motion: reduce) {
          [data-pd-load] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export { LoadingState };
