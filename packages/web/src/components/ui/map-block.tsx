"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

const STYLE_URLS = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/liberty",
} as const

type Marker = { lng: number; lat: number; label: string; value: string }

const MARKERS: Marker[] = [
  { lng: -122.41, lat: 37.77, label: "San Francisco", value: "12.4k" },
  { lng: 13.40, lat: 52.52, label: "Berlin", value: "8.1k" },
  { lng: 139.69, lat: 35.68, label: "Tokyo", value: "9.6k" },
  { lng: -46.63, lat: -23.55, label: "São Paulo", value: "3.2k" },
  { lng: 151.21, lat: -33.86, label: "Sydney", value: "2.8k" },
]

const STATS: Array<{ label: string; value: string; delta: string }> = [
  { label: "Visitors", value: "36.1k", delta: "+12.4%" },
  { label: "Regions", value: "48", delta: "+3" },
  { label: "Avg. latency", value: "84ms", delta: "-6ms" },
]

interface MapBlockProps {
  className?: string
  style?: CSSProperties
  theme?: "light" | "dark"
}

export function MapBlock({ className, style, theme = "light" }: MapBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false
    let mapInstance: { remove: () => void } | null = null

    import("maplibre-gl").then(({ Map, Marker, NavigationControl }) => {
      if (cancelled || !containerRef.current) return

      const map = new Map({
        container: containerRef.current,
        style: STYLE_URLS[theme],
        center: [10, 25],
        zoom: 0.8,
        scrollZoom: false,
        attributionControl: { compact: true },
      })
      mapInstance = map

      map.addControl(
        new NavigationControl({ showCompass: false, visualizePitch: false }),
        "top-right",
      )

      map.on("load", () => {
        for (const m of MARKERS) {
          const el = document.createElement("div")
          el.style.cssText = [
            "width:12px",
            "height:12px",
            "border-radius:50%",
            "background-color:var(--primary)",
            "box-shadow:0 0 0 2px var(--card), 0 0 0 3px var(--primary)",
          ].join(";")

          const pulse = document.createElement("span")
          pulse.style.cssText = [
            "position:absolute",
            "inset:-4px",
            "border-radius:50%",
            "background-color:var(--primary)",
            "opacity:0.35",
            "animation:map-block-pulse 2.4s ease-out infinite",
          ].join(";")
          el.style.position = "relative"
          el.appendChild(pulse)

          new Marker({ element: el }).setLngLat([m.lng, m.lat]).addTo(map)
        }
      })
    })

    return () => {
      cancelled = true
      if (mapInstance) mapInstance.remove()
    }
  }, [theme])

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
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

        {/* Legend chip */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "10px",
            zIndex: 1,
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
