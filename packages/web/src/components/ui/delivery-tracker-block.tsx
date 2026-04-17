"use client"

import "maplibre-gl/dist/maplibre-gl.css"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

const STYLE_URLS = {
  light: "https://tiles.openfreemap.org/styles/bright",
  dark: "https://tiles.openfreemap.org/styles/liberty",
} as const

// Hand-picked route approximating a drive across San Francisco.
const ROUTE: [number, number][] = [
  [-122.466, 37.716],
  [-122.461, 37.719],
  [-122.455, 37.72],
  [-122.449, 37.718],
  [-122.443, 37.715],
  [-122.437, 37.711],
  [-122.43, 37.706],
  [-122.423, 37.701],
  [-122.416, 37.697],
  [-122.41, 37.693],
  [-122.405, 37.689],
  [-122.399, 37.683],
]

const PROGRESS = 0.62
const progressCount = Math.max(2, Math.floor(ROUTE.length * PROGRESS))
const PROGRESS_ROUTE = ROUTE.slice(0, progressCount)
const COURIER: [number, number] = PROGRESS_ROUTE[PROGRESS_ROUTE.length - 1]
const PICKUP: [number, number] = ROUTE[0]
const DROPOFF: [number, number] = ROUTE[ROUTE.length - 1]

const ORDER_ITEMS = [
  { name: "Spicy Tofu Grain Bowl", qty: 1, price: "$44" },
  { name: "Herb Chicken Rice Box", qty: 2, price: "$58" },
  { name: "Roasted Veggie Wrap", qty: 1, price: "$29" },
]

function readVar(el: HTMLElement, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim()
  return v || fallback
}

interface DeliveryTrackerBlockProps {
  className?: string
  style?: CSSProperties
  theme?: "light" | "dark"
}

export function DeliveryTrackerBlock({
  className,
  style,
  theme = "light",
}: DeliveryTrackerBlockProps) {
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
        center: [-122.432, 37.7],
        zoom: 12,
        scrollZoom: false,
        attributionControl: { compact: true },
      })
      mapInstance = map
      map.addControl(new NavigationControl({ showCompass: false }), "top-right")

      const primary = readVar(root, "--primary", "#3b82f6")
      const muted = readVar(root, "--muted-foreground", "#6b7280")

      map.on("load", () => {
        map.addSource("delivery-full", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: ROUTE },
          },
        })
        map.addLayer({
          id: "delivery-full-line",
          type: "line",
          source: "delivery-full",
          paint: { "line-color": muted, "line-width": 5, "line-opacity": 0.3 },
          layout: { "line-cap": "round", "line-join": "round" },
        })

        map.addSource("delivery-progress", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: PROGRESS_ROUTE },
          },
        })
        map.addLayer({
          id: "delivery-progress-line",
          type: "line",
          source: "delivery-progress",
          paint: { "line-color": primary, "line-width": 5, "line-opacity": 0.95 },
          layout: { "line-cap": "round", "line-join": "round" },
        })

        const pickupEl = document.createElement("div")
        pickupEl.style.cssText = [
          "width:14px",
          "height:14px",
          "border-radius:50%",
          "background-color:#10b981",
          "border:2px solid #ffffff",
          "box-shadow:0 0 0 1px rgba(0,0,0,0.1)",
        ].join(";")
        new Marker({ element: pickupEl }).setLngLat(PICKUP).addTo(map)

        const dropoffEl = document.createElement("div")
        dropoffEl.style.cssText = [
          "width:14px",
          "height:14px",
          "border-radius:50%",
          "background-color:#f43f5e",
          "border:2px solid #ffffff",
          "box-shadow:0 0 0 1px rgba(0,0,0,0.1)",
        ].join(";")
        new Marker({ element: dropoffEl }).setLngLat(DROPOFF).addTo(map)

        const courierEl = document.createElement("div")
        courierEl.style.cssText = [
          "display:grid",
          "place-items:center",
          "width:28px",
          "height:28px",
          "border-radius:50%",
          `background-color:${primary}`,
          "box-shadow:0 0 0 3px var(--card), 0 2px 6px rgba(0,0,0,0.2)",
          "color:#ffffff",
          "font-size:14px",
          "line-height:1",
        ].join(";")
        courierEl.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h6l-2-4h-4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>'
        new Marker({ element: courierEl }).setLngLat(COURIER).addTo(map)
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
        gridTemplateColumns: "minmax(0, 1fr) 180px",
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
          En route · 12 min away
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
            Delivery
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
            Order #A-2048
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {ORDER_ITEMS.map((item) => (
            <div
              key={item.name}
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
              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <div
                  style={{
                    color: "var(--foreground)",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </div>
                <div style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>
                  {item.price}
                </div>
              </div>
              <span
                style={{
                  flexShrink: 0,
                  padding: "2px 6px",
                  borderRadius: "999px",
                  fontSize: "10px",
                  fontWeight: 500,
                  backgroundColor: "color-mix(in srgb, var(--foreground) 8%, transparent)",
                  color: "var(--foreground)",
                }}
              >
                ×{item.qty}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "6px",
            fontSize: "11px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "var(--muted-foreground)" }}>Total</span>
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>$189</span>
        </div>
      </div>
    </div>
  )
}
