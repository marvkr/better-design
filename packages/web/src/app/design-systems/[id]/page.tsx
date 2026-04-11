import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { notFound } from "next/navigation"
import { ComponentShowcase } from "./component-showcase"
import { BackButton } from "./back-button"

const DS_META: Record<string, { name: string; description: string; theme: "light" | "dark"; iconPrefix?: string; iconLibraryName?: string }> = {
  "light-marketplace":   { name: "Light Marketplace",   description: "Light marketplace — charcoal buttons, #f0f0f0 cards, no shadows", theme: "light", iconPrefix: "ph", iconLibraryName: "Phosphor" },
  "dark-orange":         { name: "Dark Orange",          description: "Dark with brand orange (#F05023), 10px radius, layered shadows", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "precision-light":     { name: "Precision Light",      description: "Light — charcoal primary, precision layered shadows, blue focus ring, 10px radius", theme: "light", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "vibrant-dark":        { name: "Vibrant Dark",          description: "Dark with vibrant blue primary and two-layer upward color-bloom shadows", theme: "dark", iconPrefix: "solar", iconLibraryName: "Solar" },
  "minimal-light":       { name: "Minimal Light",         description: "Light minimal — black primary, no shadows, border-only cards, GeistSans, 12px radius", theme: "light", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "neutral-monochrome":  { name: "Neutral Monochrome",    description: "Neutral monochromatic dark — white primary on near-black, 8px radius", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  linear:                { name: "Linear",               description: "Dark developer tools with purple accents", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  airbnb:                { name: "Airbnb",               description: "Warm inviting with coral primary accents", theme: "light", iconPrefix: "ph", iconLibraryName: "Phosphor" },
  supabase:              { name: "Supabase",             description: "Dark developer platform with green accents", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "corporate-fintech":   { name: "Corporate Fintech",    description: "Professional fintech with blue accents, data-dense layouts", theme: "light", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "cinematic-dark":      { name: "Cinematic Dark",        description: "Ultra-dark media streaming — white CTAs, minimal shadows, cinematic content-first design", theme: "dark", iconPrefix: "solar", iconLibraryName: "Solar" },
  "linear-quality":      { name: "Linear Quality",      description: "Precision-crafted dark UI — purple accents, multi-layer shadows, engineering aesthetic", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "editorial-dark":      { name: "Editorial Dark",        description: "Editorial dark — serif display, flat no-shadow, generous 1rem radius, content-first", theme: "dark", iconPrefix: "ph", iconLibraryName: "Phosphor" },
  notion:                { name: "Notion",               description: "Light minimal — system-ui, 3px radius, flat #2383e2 blue, rgba shadow", theme: "light", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  stripe:                { name: "Stripe",               description: "Light fintech — Sohne font, indigo #635BFF, characteristic navy-purple shadows", theme: "light", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  vercel:                { name: "Vercel",               description: "Pure black developer — Geist font, white primary, 6px radius, minimal", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  apple:                 { name: "Apple",                description: "Light premium — SF Pro, pill buttons, #0071e3 blue, #f5f5f7 background", theme: "light", iconPrefix: "solar", iconLibraryName: "Solar" },
  figma:                 { name: "Figma",                description: "Light design tool — Electric Violet #a259ff, purple glow, 8px radius", theme: "light", iconPrefix: "ph", iconLibraryName: "Phosphor" },
  "monochrome-industrial": { name: "Monochrome Industrial", description: "Monochrome industrial — OLED black, Doto + Geist Mono, signal-light red accent, sharp corners, dot-matrix motif", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
  "glassmorphic-dark":   { name: "Glassmorphic Dark",   description: "Transparent glass panels with blur, frosted surfaces on dark backgrounds", theme: "dark", iconPrefix: "tabler", iconLibraryName: "Tabler" },
}

function parseTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {}
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/)
  const block = rootMatch?.[1] ?? ""
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null
  while ((match = varRegex.exec(block)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim()
  }
  return tokens
}

function normalizeValue(value: string): string {
  if (/^(oklch|hsl|rgb|oklab|lab|color)\(/.test(value)) return value
  if (/^\d[\d.]*\s+\d[\d.]*%\s+\d[\d.]*%$/.test(value.trim())) {
    return `hsl(${value})`
  }
  return value
}

export default async function DesignSystemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params
  const id = slug
  const meta = DS_META[id]
  if (!meta) notFound()

  const dsBase = join(process.cwd(), "..", "..", "design-systems")
  const cssPath = join(dsBase, id, "globals.css")

  let tokens: Record<string, string> = {}
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, "utf-8")
    const raw = parseTokens(css)
    tokens = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, normalizeValue(v)]))
  }

  const t = tokens
  const radius = t["--radius"] ?? "0.5rem"
  const btnRadius = id === "vibrant-dark" ? "0.75rem" : id === "minimal-light" ? "0.75rem" : id === "light-marketplace" ? "0.875rem" : id === "precision-light" ? "0.625rem" : id === "apple" ? "980px" : `calc(${radius} - 2px)`

  return (
    <div className="min-h-screen bg-background">
      {/* Per-DS font loading. Next 15 hoists <link> in JSX into <head>. */}
      {id === "monochrome-industrial" && (
        <>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;700&display=swap"
          />
          <style>{`
            [data-ds="monochrome-industrial"] *,
            [data-ds="monochrome-industrial"] *::before,
            [data-ds="monochrome-industrial"] *::after {
              border-radius: 0 !important;
            }
            [data-ds="monochrome-industrial"] {
              --font-mono: var(--font-geist-mono), ui-monospace, monospace;
              --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
            }
            [data-ds="monochrome-industrial"] [data-slot="switch"] {
              width: calc(2rem + 2px) !important;
              padding-left: 2px !important;
            }
            [data-ds="monochrome-industrial"] [data-slot="avatar"] + [data-slot="avatar"] {
              margin-left: 4px !important;
            }
            [data-ds="monochrome-industrial"] {
              background-image: radial-gradient(circle, var(--mono-border-visible) 1px, transparent 1px) !important;
              background-size: 16px 16px !important;
            }
            [data-ds="monochrome-industrial"] h1 {
              font-family: "Doto", "Geist Mono", ui-monospace, monospace !important;
              font-weight: 500 !important;
              font-size: 44px !important;
              letter-spacing: -0.02em !important;
            }
          `}</style>
        </>
      )}
      {/* Top nav */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-8 py-4 flex items-center gap-3">
        <BackButton fallbackHref="/" />
        <span className="text-border select-none">/</span>
        <span className="text-sm font-medium text-foreground">{meta.name}</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
            {meta.theme}
          </span>
        </div>
      </div>

      <ComponentShowcase
        id={id}
        tokens={t}
        radius={radius}
        btnRadius={btnRadius}
        name={meta.name}
        description={meta.description}
        theme={meta.theme}
        iconPrefix={meta.iconPrefix}
        iconLibraryName={meta.iconLibraryName}
      />
    </div>
  )
}
