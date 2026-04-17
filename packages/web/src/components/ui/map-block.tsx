"use client"

import { useMemo } from "react"
import type { CSSProperties } from "react"

// Continents as compound rectangles on a 200x100 (2:1 world) grid.
// Multiple rects per continent produce recognizable silhouettes.
type Rect = [number, number, number, number] // x, y, w, h
const CONTINENT_RECTS: Rect[] = [
  // North America: Alaska + Canada + USA + Mexico + Central America
  [14, 18, 12, 8],    // Alaska
  [20, 22, 42, 6],    // N Canada
  [22, 26, 40, 8],    // S Canada
  [28, 32, 32, 8],    // USA
  [32, 38, 24, 6],    // USA south
  [38, 42, 12, 8],    // Mexico
  [42, 48, 8, 6],     // Central America
  [46, 52, 4, 4],     // Panama

  // Greenland
  [64, 14, 10, 8],
  [66, 20, 8, 6],

  // South America
  [50, 56, 18, 8],
  [54, 60, 16, 10],
  [56, 68, 12, 10],
  [54, 76, 10, 10],
  [54, 84, 6, 6],

  // Europe
  [86, 20, 10, 4],    // UK/Scandinavia
  [90, 22, 22, 6],    // N Europe
  [88, 26, 26, 8],    // Central Europe
  [96, 32, 18, 4],    // Mediterranean coast

  // Africa
  [94, 36, 28, 8],    // N Africa / Sahara
  [96, 42, 26, 8],    // Sahel
  [100, 48, 20, 10],  // Central Africa
  [104, 56, 14, 8],   // Southern Africa
  [108, 62, 8, 6],    // Tip

  // Middle East
  [114, 32, 12, 6],
  [116, 36, 10, 6],

  // Asia
  [110, 18, 60, 6],   // Siberia N
  [112, 22, 58, 8],   // Siberia
  [114, 28, 52, 8],   // Central Asia
  [124, 34, 38, 6],   // Mid Asia
  [128, 38, 20, 6],   // China
  [148, 34, 12, 8],   // East Asia
  [158, 28, 8, 6],    // Far East

  // India
  [122, 40, 12, 10],

  // SE Asia / Indochina
  [138, 42, 14, 6],
  [140, 46, 12, 4],

  // Indonesia / Philippines
  [146, 52, 18, 4],
  [152, 48, 4, 4],

  // Japan
  [160, 30, 4, 8],

  // Australia
  [158, 64, 18, 10],
  [160, 72, 14, 4],

  // New Zealand
  [178, 74, 4, 6],
]

function buildDotGrid(): Array<{ x: number; y: number; opacity: number }> {
  const dots: Array<{ x: number; y: number; opacity: number }> = []
  const step = 2
  for (let y = 10; y <= 94; y += step) {
    for (let x = 4; x <= 196; x += step) {
      const inLand = CONTINENT_RECTS.some(
        ([cx, cy, cw, ch]) => x >= cx && x <= cx + cw && y >= cy && y <= cy + ch
      )
      if (!inLand) continue
      // Slight opacity variance for depth
      const variance = (Math.sin(x * 2.1 + y * 3.3) + 1) / 2
      dots.push({ x, y, opacity: 0.5 + variance * 0.25 })
    }
  }
  return dots
}

type Marker = { x: number; y: number; label: string; value: string }

// Marker coordinates in 200x100 space
const MARKERS: Marker[] = [
  { x: 36, y: 34, label: "San Francisco", value: "12.4k" },
  { x: 96, y: 28, label: "Berlin", value: "8.1k" },
  { x: 162, y: 32, label: "Tokyo", value: "9.6k" },
  { x: 60, y: 68, label: "São Paulo", value: "3.2k" },
  { x: 168, y: 68, label: "Sydney", value: "2.8k" },
]

const STATS: Array<{ label: string; value: string; delta: string }> = [
  { label: "Visitors", value: "36.1k", delta: "+12.4%" },
  { label: "Regions", value: "48", delta: "+3" },
  { label: "Avg. latency", value: "84ms", delta: "-6ms" },
]

interface MapBlockProps {
  className?: string
  style?: CSSProperties
}

export function MapBlock({ className, style }: MapBlockProps) {
  const dots = useMemo(buildDotGrid, [])

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 160px",
        gap: "16px",
        padding: "16px",
        borderRadius: "10px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--card)",
        color: "var(--foreground)",
        width: "100%",
        ...style,
      }}
    >
      {/* Map */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "color-mix(in srgb, var(--foreground) 4%, transparent)",
          border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
        }}
      >
        <svg
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          aria-hidden
        >
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={0.7}
              fill="currentColor"
              opacity={d.opacity}
            />
          ))}
          {MARKERS.map((m, i) => (
            <g key={m.label} transform={`translate(${m.x} ${m.y})`}>
              <circle
                r={2.2}
                fill="var(--primary)"
                opacity={0.3}
                style={{
                  transformOrigin: "center",
                  animation: `map-block-pulse 2.4s ease-out ${i * 0.4}s infinite`,
                }}
              />
              <circle r={1.1} fill="var(--primary)" stroke="var(--card)" strokeWidth={0.4} />
            </g>
          ))}
        </svg>

        {/* Legend chip */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            bottom: "10px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            borderRadius: "999px",
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--foreground)",
            backgroundColor: "color-mix(in srgb, var(--card) 85%, transparent)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
            }}
          />
          Live traffic
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "4px" }}>
            Analytics
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
            Global overview
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {STATS.map(s => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                backgroundColor: "color-mix(in srgb, var(--foreground) 3%, transparent)",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{s.label}</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{s.value}</div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 500 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingTop: "2px" }}>
          {MARKERS.slice(0, 3).map(m => (
            <div
              key={m.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                fontSize: "11px",
                color: "var(--muted-foreground)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--primary)", flexShrink: 0 }} />
                {m.label}
              </span>
              <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes map-block-pulse {
          0%   { transform: scale(1);   opacity: 0.45; }
          70%  { transform: scale(2.4); opacity: 0;    }
          100% { transform: scale(2.4); opacity: 0;    }
        }
      `}</style>
    </div>
  )
}
