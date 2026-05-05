"use client"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

/**
 * Monochrome Industrial Spinner.
 *
 * A classic stroke-dashoffset progress spinner — but rectilinear. A short
 * segment traces the perimeter of a sharp square continuously, mirroring
 * the look of a circular SVG spinner adapted to the industrial,
 * sharp-cornered aesthetic.
 *
 * Built with stroke-dasharray + animated stroke-dashoffset on an SVG
 * <rect>. Perimeter math (viewBox 32, rect inset 2 → 28×28):
 *   perimeter = 4 × 28 = 112
 *   visible   = 28 (one side worth)
 *   gap       = 84 (three sides worth)
 * Animating dashoffset from 0 → -112 walks the visible segment around
 * the full square exactly once per cycle.
 */
function Spinner({ size = "md", className }: SpinnerProps) {
  const px = size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 32

  return (
    <>
      <style>{`
        @keyframes mono-spinner-trace {
          to { stroke-dashoffset: -112; }
        }
      `}</style>
      <span
        role="status"
        aria-label="Loading"
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: px,
          height: px,
          color: "var(--mono-text-primary, currentColor)",
        }}
      >
        <svg
          width={px}
          height={px}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          {/* Faint full-perimeter square — the rectilinear equivalent of
              the dim background ring on a classic SVG circle spinner. */}
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          {/* Animated traveling segment. */}
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="28 84"
            style={{ animation: "mono-spinner-trace 1.4s linear infinite" }}
          />
        </svg>
      </span>
    </>
  )
}

export { Spinner }
export type { SpinnerProps }
