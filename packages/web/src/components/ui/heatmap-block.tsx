"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import type { ExpressionSpecification } from "@maplibre/maplibre-gl-style-spec"

const STYLE_URLS = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/liberty",
} as const

const EARTHQUAKE_GEOJSON_URL =
  "https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"

const RAMP = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#d7301f"] as const

const HEATMAP_COLOR = [
  "interpolate",
  ["linear"],
  ["heatmap-density"],
  0,
  "rgba(59, 130, 246, 0)",
  0.15,
  RAMP[0],
  0.35,
  RAMP[1],
  0.55,
  RAMP[2],
  0.75,
  RAMP[3],
  1,
  RAMP[4],
] as unknown as ExpressionSpecification

interface HeatmapBlockProps {
  className?: string
  style?: CSSProperties
  theme?: "light" | "dark"
}

export function HeatmapBlock({ className, style, theme = "light" }: HeatmapBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false
    let mapInstance: { remove: () => void } | null = null

    import("maplibre-gl").then(({ Map, NavigationControl }) => {
      if (cancelled || !containerRef.current) return

      const map = new Map({
        container: containerRef.current,
        style: STYLE_URLS[theme],
        center: [-113, 43],
        zoom: 2.6,
        scrollZoom: false,
        attributionControl: { compact: true },
      })
      mapInstance = map
      map.addControl(new NavigationControl({ showCompass: false }), "top-right")

      map.on("load", () => {
        map.addSource("earthquakes", {
          type: "geojson",
          data: EARTHQUAKE_GEOJSON_URL,
        })

        map.addLayer({
          id: "earthquakes-heat",
          type: "heatmap",
          source: "earthquakes",
          maxzoom: 9,
          paint: {
            "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 0.6, 9, 3],
            "heatmap-color": HEATMAP_COLOR,
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 6, 9, 28],
            "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0.8, 9, 0.15],
          },
        })

        map.addLayer({
          id: "earthquakes-point",
          type: "circle",
          source: "earthquakes",
          minzoom: 7,
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["get", "mag"], 1, 3, 6, 10],
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "mag"],
              1,
              RAMP[1],
              2.5,
              RAMP[2],
              4,
              RAMP[3],
              6,
              RAMP[4],
            ],
            "circle-stroke-width": 1,
            "circle-stroke-color": "rgba(255,255,255,0.85)",
            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 9, 0.75],
          },
        })
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
              backgroundColor: RAMP[4],
            }}
          />
          Earthquake density
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "4px",
            }}
          >
            Heatmap
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
            Global earthquakes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: "color-mix(in srgb, var(--foreground) 3%, transparent)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
            {RAMP.map((color) => (
              <span
                key={color}
                style={{
                  height: "10px",
                  borderRadius: "999px",
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "var(--muted-foreground)",
            }}
          >
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div style={{ fontSize: "10px", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
          Data from MapLibre&apos;s sample earthquakes dataset. Zoom in to reveal individual
          magnitudes.
        </div>
      </div>
    </div>
  )
}
