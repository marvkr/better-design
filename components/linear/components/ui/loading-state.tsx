"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// LoadingState: pixel-grid loader for long-running work, with a shimmering
// label and a live elapsed timer in mono tabular figures.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Variants:
//   Drive - square cells, chevron wavefront driving right
//   Dots  - same wavefront, circular cells
//   Orbit - a comet lapping the grid perimeter
//
// Reduced motion freezes the grid to its dim state; the timer still ticks.
//
// Usage:
//   <LoadingState label="Churning" />
//   <LoadingState label="Reading files" variant="Orbit" />

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3)
  const c = i % 3
  return (c + Math.abs(r - 1)) * 90
})

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3]
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i)
  return k === -1 ? null : k * 110
})

const PATTERNS: Record<string, { delays: (number | null)[]; dur: number; round: boolean }> = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true },
  Orbit: { delays: orbit, dur: 950, round: false },
}

function useElapsed() {
  const [ds, setDs] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setDs((d) => d + 1), 100)
    return () => clearInterval(t)
  }, [])
  const total = ds / 10
  if (total < 60) return `${total.toFixed(1)}s`
  return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`
}

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  variant?: "Drive" | "Dots" | "Orbit"
  /** When false, hides the elapsed counter. Default true. */
  showElapsed?: boolean
}

function LoadingState({
  label = "Churning",
  variant = "Drive",
  showElapsed = true,
  className,
  ...props
}: LoadingStateProps) {
  const elapsed = useElapsed()
  const { delays, dur, round } = PATTERNS[variant] ?? PATTERNS.Drive

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex w-fit items-center gap-2.5", className)}
      {...props}
    >
      <span aria-hidden="true" className="grid grid-cols-[repeat(3,0.25rem)] gap-[0.0938rem]">
        {delays.map((d, i) => (
          <span
            key={i}
            className={cn("bui-pixel size-[0.25rem] bg-foreground", round ? "rounded-full" : "rounded-[0.0625rem]")}
            style={{
              opacity: d === null ? 0.07 : 0.15,
              animation: d === null ? "none" : `bui-pixel-on ${dur}ms ease-in-out ${d}ms infinite`,
            }}
          />
        ))}
      </span>
      <span
        className="bg-clip-text text-[0.8125rem] font-medium text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
          backgroundSize: "200% 100%",
          animation: "bui-shimmer-text 1.4s linear infinite",
        }}
      >
        {label}
      </span>
      {showElapsed && (
        <span className="font-mono text-[0.75rem] text-muted-foreground tabular-nums">{elapsed}</span>
      )}
      <style>{`
        @keyframes bui-pixel-on { 0%, 100% { opacity: 0.15; } 40% { opacity: 1; } }
        @keyframes bui-shimmer-text { to { background-position: -200% 0; } }
        @media (prefers-reduced-motion: reduce) {
          .bui-pixel { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

export { LoadingState }
