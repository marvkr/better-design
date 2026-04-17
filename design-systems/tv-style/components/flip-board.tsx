"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * TV Style FlipBoard — a split-flap airport terminal display.
 *
 * Each tile scrambles through random characters (with cycling scramble-palette
 * background colours) before settling on the target character, mirroring the
 * mechanical flip animation on a real split-flap board. Only tiles whose
 * content actually changes animate — just like the real thing.
 *
 * Faithful port of magnum6actual/flipoff `Tile.js` and `Board.js`:
 *   - CHARSET, SCRAMBLE_COLORS, FLIP_DURATION, stagger delay
 *   - 10–14 scramble ticks per tile at ~70ms, then a brief transform settle
 */

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,-!?'/: "
const SCRAMBLE_COLORS = [
  "#00AAFF", // cyan
  "#00FFCC", // teal
  "#AA00FF", // magenta
  "#FF2D00", // red
  "#FFCC00", // amber
  "#FFFFFF", // white
]
const DARK_ON_COLOR = new Set(["#FFFFFF", "#FFCC00", "#00FFCC"])

const SCRAMBLE_TICK_MS = 70
const FLIP_MS = 300
const STAGGER_MS = 25

interface FlipTileProps {
  target: string
  delay: number
  size: number
}

const pickScramble = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]

function FlipTile({ target, delay, size }: FlipTileProps) {
  const [display, setDisplay] = React.useState(target)
  const [bg, setBg] = React.useState<string>("")
  const [flashing, setFlashing] = React.useState(false)
  const prevTarget = React.useRef(target)

  React.useEffect(() => {
    if (prevTarget.current === target) return
    const from = prevTarget.current
    prevTarget.current = target

    let cancelled = false
    let scrambleTimer: ReturnType<typeof setInterval> | null = null
    let settleTimer: ReturnType<typeof setTimeout> | null = null
    let resetTimer: ReturnType<typeof setTimeout> | null = null

    const startAt = setTimeout(() => {
      if (cancelled) return
      let count = 0
      const max = 10 + Math.floor(Math.random() * 4)

      scrambleTimer = setInterval(() => {
        if (cancelled) return
        count += 1
        setDisplay(pickScramble())
        setBg(SCRAMBLE_COLORS[count % SCRAMBLE_COLORS.length])
        if (count >= max) {
          if (scrambleTimer) clearInterval(scrambleTimer)
          setBg("")
          setDisplay(target)
          setFlashing(true)
          settleTimer = setTimeout(() => {
            if (cancelled) return
            setFlashing(false)
          }, FLIP_MS)
        }
      }, SCRAMBLE_TICK_MS)
    }, delay)

    // Immediate hop when going from empty space → non-empty or vice versa
    // feels sluggish under scramble; keep only the scramble path for visual
    // consistency. from is captured for future tuning.
    void from

    return () => {
      cancelled = true
      clearTimeout(startAt)
      if (scrambleTimer) clearInterval(scrambleTimer)
      if (settleTimer) clearTimeout(settleTimer)
      if (resetTimer) clearTimeout(resetTimer)
    }
  }, [target])

  const isBlank = display === " " || display === ""
  const textColor = bg && DARK_ON_COLOR.has(bg) ? "#111" : "#FFFFFF"

  return (
    <span
      className="relative inline-flex items-center justify-center font-bold uppercase overflow-hidden select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.56,
        lineHeight: 1,
        letterSpacing: "0.03em",
        borderRadius: 3,
        background: bg || "#222",
        color: textColor,
        transition: "background-color 60ms linear, color 60ms linear, transform 150ms ease-out",
        transform: flashing ? "perspective(400px) rotateX(-8deg)" : "none",
        boxShadow:
          "inset 0 1px 2px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.03)",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {!isBlank && display}
      {/* Mechanical seam — 1px line across the centre */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />
    </span>
  )
}

export interface FlipBoardProps {
  /** Each row is a string; shorter strings are padded with spaces. */
  rows: string[]
  /** Tile side length in pixels. Defaults to 36. */
  tileSize?: number
  /** Horizontal gap between tiles in pixels. Defaults to 3. */
  gap?: number
  /** Fixed number of columns; falls back to longest row length. */
  columns?: number
  className?: string
}

const FlipBoard = React.forwardRef<HTMLDivElement, FlipBoardProps>(
  ({ rows, tileSize = 36, gap = 3, columns, className }, ref) => {
    const cols = columns ?? Math.max(...rows.map((r) => r.length), 1)
    const padded = rows.map((r) => r.toUpperCase().padEnd(cols, " ").slice(0, cols))

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-block rounded-[8px] p-4",
          className
        )}
        style={{
          background: "#1A1A1A",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
            gap,
          }}
        >
          {padded.flatMap((row, rIdx) =>
            row.split("").map((ch, cIdx) => (
              <FlipTile
                key={`${rIdx}-${cIdx}`}
                target={ch}
                delay={(rIdx * cols + cIdx) * STAGGER_MS}
                size={tileSize}
              />
            )),
          )}
        </div>
      </div>
    )
  },
)
FlipBoard.displayName = "FlipBoard"

export { FlipBoard }
