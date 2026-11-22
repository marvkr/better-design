"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Margin LoadingState: a small oxblood mark for long-running work, a muted
 * label and a live elapsed timer in tabular figures.
 *
 * Variants:
 *   Drive: three short bars that fill left to right
 *   Dots: three dots that rise in turn
 *   Orbit: a hairline ring with an oxblood arc running round it
 *
 * Reduced motion stills the mark; the timer keeps counting.
 */

function useElapsed() {
  const [tenths, setTenths] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTenths((d) => d + 1), 100);
    return () => clearInterval(t);
  }, []);
  const total = tenths / 10;
  if (total < 60) return `${total.toFixed(1)}s`;
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
}

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  variant?: "Drive" | "Dots" | "Orbit";
  /** When false, hides the elapsed counter. Default true. */
  showElapsed?: boolean;
}

const STEPS = [0, 1, 2];

function Mark({ variant }: { variant: NonNullable<LoadingStateProps["variant"]> }) {
  if (variant === "Orbit") {
    return (
      <span
        aria-hidden="true"
        className="animate-[margin-orbit_800ms_linear_infinite] motion-reduce:animate-none motion-reduce:opacity-100 size-3.5 shrink-0 rounded-full border-2 border-input border-t-primary"
      />
    );
  }
  if (variant === "Dots") {
    return (
      <span aria-hidden="true" className="flex h-3.5 items-center gap-0.5">
        {STEPS.map((i) => (
          <span
            key={i}
            className="animate-[margin-rise_900ms_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-100 size-1.5 rounded-full bg-primary"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="flex h-3.5 items-center gap-0.5">
      {STEPS.map((i) => (
        <span
          key={i}
          className="animate-[margin-fill_900ms_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-100 h-2.5 w-1 rounded-full bg-primary"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  );
}

/** A status line for work in progress: a small animated mark, a label and the time elapsed. */
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
      className={cn("flex w-fit items-center gap-2 text-sm", className)}
      {...props}
    >
      <Mark variant={variant} />
      <span className="font-medium text-muted-foreground">{label}</span>
      {showElapsed && (
        <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
          {elapsed}
        </span>
      )}
      <style>{`
        @keyframes margin-orbit { to { rotate: 360deg; } }
        @keyframes margin-rise { 0%, 60%, 100% { translate: 0 0; opacity: 0.35; } 30% { translate: 0 -0.1875rem; opacity: 1; } }
        @keyframes margin-fill { 0%, 100% { opacity: 0.2; } 45% { opacity: 1; } }
      `}</style>
    </div>
  );
}

export { LoadingState };
