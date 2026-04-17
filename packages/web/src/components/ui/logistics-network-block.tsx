"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

const STYLE_URLS = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/liberty",
} as const

type Hub = { id: string; lng: number; lat: number; label: string; volume: string }

const HUBS: Hub[] = [
  { id: "lax", lng: -118.24, lat: 34.05, label: "Los Angeles", volume: "24.1k" },
  { id: "ord", lng: -87.63, lat: 41.88, label: "Chicago", volume: "18.7k" },
  { id: "jfk", lng: -73.96, lat: 40.78, label: "New York", volume: "22.3k" },
  { id: "dfw", lng: -96.80, lat: 32.78, label: "Dallas", volume: "14.5k" },
  { id: "sea", lng: -122.33, lat: 47.60, label: "Seattle", volume: "9.2k" },
]

const ROUTES: Array<[string, string]> = [
  ["lax", "ord"],
  ["lax", "dfw"],
  ["ord", "jfk"],
  ["sea", "ord"],
  ["dfw", "jfk"],
]

function arcPoints(
  [fx, fy]: [number, number],
  [tx, ty]: [number, number],
  segments = 24,
  curvature = 0.22,
): [number, number][] {
  const midX = (fx + tx) / 2
  const midY = (fy + ty) / 2
  const dx = tx - fx
  const dy = ty - fy
  const ctrlX = midX + -dy * curvature
  const ctrlY = midY + dx * curvature
  const pts: [number, number][] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const u = 1 - t
    const x = u * u * fx + 2 * u * t * ctrlX + t * t * tx
    const y = u * u * fy + 2 * u * t * ctrlY + t * t * ty
    pts.push([x, y])
  }
  return pts
}

function readVar(el: HTMLElement, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim()
  return v || fallback
}

interface LogisticsNetworkBlockProps {
  className?: string
  style?: CSSProperties
  theme?: "light" | "dark"
}

export function LogisticsNetworkBlock({
  className,
  style,
  theme = "light",
}: LogisticsNetworkBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !rootRef.current) return
    const root = rootRef.current
    let cancelled = false
    let mapInstance: { remove: () => void } | null = null

    import("maplibre-gl").then(({ Map, Marker, NavigationControl }) => {
      if (cancelled || !containerRef.current) return

      const map = new Map({
        container: containerRef.current,
        style: STYLE_URLS[theme],
        center: [-96, 39],
        zoom: 2.4,
        scrollZoom: false,
        attributionControl: { compact: true },
      })
      mapInstance = map
      map.addControl(new NavigationControl({ showCompass: false }), "top-right")

      const primary = readVar(root, "--primary", "#4f46e5")

      map.on("load", () => {
        map.addSource("logistics-routes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: ROUTES.map(([a, b]) => {
              const ha = HUBS.find((h) => h.id === a)!
              const hb = HUBS.find((h) => h.id === b)!
              return {
                type: "Feature" as const,
                properties: {},
                geometry: {
                  type: "LineString" as const,
                  coordinates: arcPoints([ha.lng, ha.lat], [hb.lng, hb.lat]),
                },
              }
            }),
          },
        })

        map.addLayer({
          id: "logistics-routes-glow",
          type: "line",
          source: "logistics-routes",
          paint: {
            "line-color": primary,
            "line-width": 4,
            "line-opacity": 0.18,
            "line-blur": 4,
          },
          layout: { "line-cap": "round", "line-join": "round" },
        })

        map.addLayer({
          id: "logistics-routes-line",
          type: "line",
          source: "logistics-routes",
          paint: {
            "line-color": primary,
            "line-width": 1.4,
            "line-opacity": 0.8,
            "line-dasharray": [2, 2],
          },
          layout: { "line-cap": "round", "line-join": "round" },
        })

        for (const h of HUBS) {
          const el = document.createElement("div")
          el.style.cssText = [
            "position:relative",
            "width:10px",
            "height:10px",
            "border-radius:50%",
            `background-color:${primary}`,
            "box-shadow:0 0 0 2px var(--card), 0 0 0 3px " + primary,
          ].join(";")
          new Marker({ element: el }).setLngLat([h.lng, h.lat]).addTo(map)
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
      ref={rootRef}
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
              backgroundColor: "var(--primary)",
            }}
          />
          Domestic network
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
            Logistics
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
            Hub volume
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {HUBS.map((h) => (
            <div
              key={h.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                backgroundColor: "color-mix(in srgb, var(--foreground) 3%, transparent)",
                fontSize: "11px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--muted-foreground)",
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    flexShrink: 0,
                  }}
                />
                {h.label}
              </span>
              <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{h.volume}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
