"use client"

import type { CSSProperties } from "react"

interface DesignSystemInfo {
  id: string
  name: string
  description: string
  theme: "light" | "dark"
  tokens: Record<string, string>
}

const DS_STYLE: Record<string, {
  primaryBackground?: string
  primaryBorder?: string
  primaryShadow?: string
  primaryFilter?: string
  cardShadow?: string
  cardBorder?: string
  inputShadow?: string
}> = {
  linear: {
    primaryShadow: "0 0 0 1px hsl(235 100% 60% / 0.5), 0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
    cardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.04)",
    inputShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
  },
  supabase: {
    primaryBackground: "hsl(153 60% 53% / 0.7)",
    primaryBorder: "1px solid hsl(153 60% 53%)",
    cardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
    inputShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
  },
  "dark-orange": {
    primaryShadow: "0 0 0 1px hsl(13 87% 45% / 0.6), 0 1px 3px rgba(240,80,35,0.3), 0 4px 8px rgba(240,80,35,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
    cardShadow: "0 1px 1px 0.5px rgba(41,41,41,0.04), 0 3px 3px -1.5px rgba(41,41,41,0.02), 0 6px 6px -3px rgba(41,41,41,0.04), 0 0 0 1px rgba(41,41,41,0.04)",
  },
  "vibrant-dark": {
    primaryShadow: "0 10px 15px -3px hsl(212 100% 47% / 0.4), 0 4px 6px -4px hsl(212 100% 47% / 0.4)",
    cardShadow: "0 0 15px rgba(0,0,0,0.06), 0 2px 30px rgba(0,0,0,0.22), inset 0 0 1px rgba(255,255,255,0.15)",
  },
  "precision-light": {
    primaryShadow: "rgba(31,31,31,0.01) 0px 16px 8px, rgba(31,31,31,0.04) 0px 12px 6px, rgba(31,31,31,0.07) 0px 4px 4px, rgba(31,31,31,0.08) 0px 1.5px 3px, rgb(15,15,15) 0px 0px 0px 1px, rgba(255,255,255,0.12) 0px 1px 2px inset",
    cardShadow: "rgba(51,51,51,0.04) 0px 1px 1px 0.5px, rgba(51,51,51,0.02) 0px 3px 3px -1.5px, rgba(51,51,51,0.04) 0px 6px 6px -3px, rgba(51,51,51,0.1) 0px 0px 0px 1px, rgba(51,51,51,0.06) 0px -1px 1px -0.5px inset",
    inputShadow: "rgba(51,51,51,0.1) 0px 0px 0px 1px",
  },
  "minimal-light": { cardShadow: "none" },
  "neutral-monochrome": {
    primaryShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.85)",
    cardShadow: "0 1px 3px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
    inputShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
  },
  "light-marketplace": {
    primaryShadow: "0 1px 3px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
    cardShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
  },
  airbnb: {
    primaryBackground: "linear-gradient(to right, #D33753, #D13660, #C72D65)",
    cardShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
    inputShadow: "0 1px 2px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)",
  },
  "corporate-fintech": {
    primaryShadow: "inset 0 -2px 0 #284c87",
    primaryBorder: "1px solid rgba(255,255,255,0.3)",
    primaryFilter: "drop-shadow(0 10px 8px rgba(0,0,0,0.04)) drop-shadow(0 4px 3px rgba(0,0,0,0.1))",
    cardShadow: "0 1px 3px rgba(0,59,153,0.06), 0 4px 12px rgba(0,59,153,0.08), 0 0 0 1px rgba(0,59,153,0.03)",
    inputShadow: "inset 0 2px 4px rgba(0,0,0,0.075)",
  },
  "cinematic-dark": {
    primaryShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 1px 2px rgba(0,0,0,0.4)",
    cardShadow: "0 1px 2px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.02)",
    inputShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
  },
  "linear-quality": {
    primaryShadow: "0 0 0 1px hsl(238 65% 55% / 0.5), 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
    cardShadow: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.03)",
    inputShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
  },
  "editorial-dark": {
    cardShadow: "none",
  },
  notion: {
    cardShadow: "none",
    cardBorder: "none",
  },
  stripe: {
    primaryShadow: "0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0,0,0,0.08)",
    cardShadow: "0 0px 0px 0.5px rgba(50,50,93,0.1), 0 2px 5px -1px rgba(50,50,93,0.25), 0 1px 3px -1px rgba(0,0,0,0.3)",
    inputShadow: "0px 1px 1px rgba(0,0,0,0.03), 0px 3px 6px rgba(18,42,66,0.02)",
  },
  vercel: {
    cardShadow: "0 0 0 1px rgba(255,255,255,0.05)",
  },
  apple: {
    cardShadow: "2px 4px 12px rgba(0,0,0,0.08)",
  },
  figma: {
    primaryShadow: "0 4px 16px rgba(162,89,255,0.3)",
    cardShadow: "0 2px 8px rgba(162,89,255,0.08), 0 0 0 1px rgba(162,89,255,0.05)",
  },
  "monochrome-industrial": {
    cardShadow: "none",
    cardBorder: "1px solid #222222",
    inputShadow: "none",
  },
}

function t(tokens: Record<string, string>, key: string) {
  return tokens[key] ?? null
}

export function DesignSystemPreviewCard({ system }: { system: DesignSystemInfo }) {
  const tokens = system.tokens
  const radius = tokens["--radius"] ?? "0.5rem"
  const id = system.id
  const btnRadius = id === "vibrant-dark" || id === "minimal-light" ? "0.75rem"
    : id === "light-marketplace" ? "0.875rem"
    : id === "precision-light" ? "0.625rem"
    : id === "apple" ? "980px"
    : `calc(${radius} - 2px)`
  const ds = DS_STYLE[id] ?? {}

  const bg = t(tokens, "--background")
  const fg = t(tokens, "--foreground")
  const primary = t(tokens, "--primary")
  const secondary = t(tokens, "--secondary")
  const card = t(tokens, "--card")
  const cardFg = t(tokens, "--card-foreground")
  const border = t(tokens, "--border")
  const input = t(tokens, "--input") ?? bg

  // Skeleton line colors based on theme
  const dark = system.theme === "dark"
  const line = (op: number) => dark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})`

  const btnStyle: CSSProperties = {
    background: ds.primaryBackground ?? primary ?? undefined,
    border: ds.primaryBorder ?? "none",
    boxShadow: ds.primaryShadow,
    filter: ds.primaryFilter,
    borderRadius: btnRadius,
    flexShrink: 0,
  }

  const cardStyle: CSSProperties = {
    backgroundColor: card ?? undefined,
    border: ds.cardBorder !== undefined ? ds.cardBorder : (border ? `1px solid ${border}` : undefined),
    borderRadius: radius,
    boxShadow: ds.cardShadow,
  }

  const inputStyle: CSSProperties = {
    backgroundColor: input ?? undefined,
    border: border ? `1px solid ${border}` : "1px solid rgba(128,128,128,0.25)",
    borderRadius: btnRadius,
    boxShadow: ds.inputShadow && ds.inputShadow !== "none" ? ds.inputShadow : undefined,
  }

  return (
    <div className={`rounded-2xl overflow-hidden border border-border/60 bg-card transition-all duration-200 group-hover:-translate-y-1 group-hover:border-border ${dark ? "group-hover:shadow-2xl group-hover:shadow-black/20" : "group-hover:shadow-lg group-hover:shadow-black/6"}`}>

      {/* ── Mini UI preview ── */}
      <div
        style={{ ...Object.fromEntries(Object.entries(tokens)), padding: "18px 18px 16px" } as CSSProperties}
        className={`bg-[var(--background)] ${id === "monochrome-industrial" ? "bg-[image:radial-gradient(circle,var(--mono-border-visible)_1px,transparent_1px)] [background-size:12px_12px]" : ""}`}
      >

        {/* Nav bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "5px", backgroundColor: primary ?? undefined, flexShrink: 0 }} />
          {[38, 28, 32].map((w, i) => (
            <div key={i} style={{ height: "3px", width: w, borderRadius: "2px", backgroundColor: line(0.14) }} />
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ ...btnStyle, height: "20px", width: "48px" }} />
        </div>

        {/* Stat cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "8px" }}>
          {[
            { val: "4,291", label: "Users" },
            { val: "+12%", label: "Growth" },
            { val: "98.2%", label: "Uptime" },
          ].map(({ val, label }) => (
            <div key={label} style={{ ...cardStyle, padding: "7px 8px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: cardFg ?? fg ?? undefined, lineHeight: 1.1, marginBottom: "2px" }}>{val}</div>
              <div style={{ height: "3px", width: "60%", borderRadius: "2px", backgroundColor: line(0.15) }} />
            </div>
          ))}
        </div>

        {/* Content row */}
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Main card */}
          <div style={{ ...cardStyle, flex: 1, padding: "10px 10px 8px" }}>
            <div style={{ height: "4px", width: "55%", borderRadius: "2px", backgroundColor: line(0.55), marginBottom: "6px" }} />
            {[80, 65, 50].map((w, i) => (
              <div key={i} style={{ height: "3px", width: `${w}%`, borderRadius: "2px", backgroundColor: line(0.14), marginBottom: "4px" }} />
            ))}
            <div style={{ display: "flex", gap: "5px", marginTop: "8px" }}>
              <div style={{ ...btnStyle, height: "17px", width: "42px" }} />
              <div style={{
                height: "17px", width: "42px", borderRadius: btnRadius, flexShrink: 0,
                backgroundColor: secondary ?? undefined,
                border: secondary ? "none" : (border ? `1px solid ${border}` : "1px solid rgba(128,128,128,0.2)"),
              }} />
            </div>
          </div>

          {/* Side column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "72px" }}>
            <div style={{ ...cardStyle, padding: "7px 7px" }}>
              <div style={{ height: "3px", width: "70%", borderRadius: "2px", backgroundColor: line(0.5), marginBottom: "4px" }} />
              <div style={{ height: "3px", width: "90%", borderRadius: "2px", backgroundColor: line(0.13) }} />
            </div>
            <div style={{ ...inputStyle, height: "22px" }} />
            <div style={{ ...inputStyle, height: "22px" }} />
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ borderTop: "1px solid var(--border)" }} className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm text-foreground">{system.name}</h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{
              background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
            }}>
              {system.theme}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 leading-relaxed">{system.description}</p>
        </div>

      </div>
    </div>
  )
}
