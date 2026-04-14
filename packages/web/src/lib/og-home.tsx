import { ImageResponse } from "next/og";

// Shared home OG/Twitter image — mirrors the header + hero of the home page
// so social cards always reflect the real brand (Linear dark theme,
// #6095FF brand blue, current H1/subtitle) instead of a stale static image.

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Better Design — Design systems for the AI era.";

// Linear dark theme (matches --background in .dark: oklch(0.18 0.02 275))
const BG = "#17171e";
const BRAND_BLUE = "#6095FF";

const SWATCHES: Array<{ bg: string; dot: string; label: string; fg: string }> = [
  { bg: "#1a1a24", dot: "#8b5cf6", label: "Linear", fg: "rgba(255,255,255,0.82)" },
  { bg: "#101418", dot: "#3ecf8e", label: "Supabase", fg: "rgba(255,255,255,0.82)" },
  { bg: "#ffffff", dot: "#ff5a5f", label: "Airbnb", fg: "#111" },
  { bg: "#ffffff", dot: "#2383e2", label: "Notion", fg: "#111" },
  { bg: "#ffffff", dot: "#635bff", label: "Stripe", fg: "#111" },
  { bg: "#000000", dot: "#ffffff", label: "Vercel", fg: "rgba(255,255,255,0.82)" },
];

export function renderHomeOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header row — matches navbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: BRAND_BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            BD
          </div>
          <div
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Better Design
          </div>
        </div>

        {/* Hero — matches home page H1 + subtitle */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              maxWidth: 1040,
              display: "flex",
            }}
          >
            Design systems for the AI era.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              maxWidth: 960,
              display: "flex",
            }}
          >
            Define your brand. Get 80+ components as building blocks. Push
            something beautiful into the world.
          </div>
        </div>

        {/* Design system pills — hints at the carousel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {SWATCHES.map((sys) => (
            <div
              key={sys.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: sys.bg,
                border: "1px solid rgba(255,255,255,0.08)",
                color: sys.fg,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: sys.dot,
                }}
              />
              {sys.label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
