import { readFileSync, existsSync } from "fs"
import { join } from "path"
import Link from "next/link"
import { DesignSystemPreviewCard } from "./preview-card"

interface DesignSystemInfo {
  id: string
  slug: string
  name: string
  description: string
  theme: "light" | "dark"
  tokens: Record<string, string>
}

const DS_META = [
  { id: "light-marketplace",  slug: "light-marketplace",  name: "Light Marketplace",   description: "Light marketplace — charcoal buttons, #f0f0f0 cards, no shadows", theme: "light" as const },
  { id: "dark-orange",        slug: "dark-orange",         name: "Dark Orange",         description: "Dark with brand orange (#F05023), 10px radius, layered shadows", theme: "dark" as const },
  { id: "precision-light",    slug: "precision-light",     name: "Precision Light",     description: "Light — charcoal primary, precision layered shadows, blue focus ring, 10px radius", theme: "light" as const },
  { id: "vibrant-dark",       slug: "vibrant-dark",        name: "Vibrant Dark",        description: "Dark with vibrant blue primary and two-layer upward color-bloom shadows", theme: "dark" as const },
  { id: "minimal-light",      slug: "minimal-light",       name: "Minimal Light",       description: "Light minimal — black primary, no shadows, border-only cards, GeistSans, 12px radius", theme: "light" as const },
  { id: "neutral-monochrome", slug: "neutral-monochrome",  name: "Neutral Monochrome",  description: "Neutral monochromatic dark — white primary on near-black, 8px radius", theme: "dark" as const },
  { id: "linear",             slug: "linear",              name: "Linear",              description: "Dark developer tools with purple accents", theme: "dark" as const },
  { id: "airbnb",             slug: "airbnb",              name: "Airbnb",              description: "Warm inviting with coral primary accents", theme: "light" as const },
  { id: "supabase",           slug: "supabase",            name: "Supabase",            description: "Dark developer platform with green accents", theme: "dark" as const },
  { id: "corporate-fintech",  slug: "corporate-fintech",   name: "Corporate Fintech",   description: "Professional fintech with blue accents, data-dense layouts", theme: "light" as const },
  { id: "cinematic-dark",     slug: "cinematic-dark",      name: "Cinematic Dark",      description: "Ultra-dark media streaming — white CTAs, minimal shadows, cinematic content-first design", theme: "dark" as const },
  { id: "linear-quality",     slug: "linear-quality",      name: "Linear Quality",      description: "Precision-crafted dark UI — purple accents, multi-layer shadows, engineering aesthetic", theme: "dark" as const },
  { id: "editorial-dark",     slug: "editorial-dark",      name: "Editorial Dark",      description: "Editorial dark — serif display, flat no-shadow, generous 1rem radius, content-first", theme: "dark" as const },
  { id: "notion",             slug: "notion",              name: "Notion",              description: "Light minimal — system-ui, 3px radius, flat #2383e2 blue, rgba shadow", theme: "light" as const },
  { id: "stripe",             slug: "stripe",              name: "Stripe",              description: "Light fintech — Sohne font, indigo #635BFF, characteristic navy-purple shadows", theme: "light" as const },
  { id: "vercel",             slug: "vercel",              name: "Vercel",              description: "Pure black developer — Geist font, white primary, 6px radius, minimal", theme: "dark" as const },
  { id: "apple",              slug: "apple",               name: "Apple",               description: "Light premium — SF Pro, pill buttons, #0071e3 blue, #f5f5f7 background", theme: "light" as const },
  { id: "figma",              slug: "figma",               name: "Figma",               description: "Light design tool — Electric Violet #a259ff, purple glow, 8px radius", theme: "light" as const },
  { id: "monochrome-industrial", slug: "monochrome-industrial", name: "Monochrome Industrial", description: "Monochrome industrial — OLED black, dot-matrix Doto, signal-light red accent, sharp corners", theme: "dark" as const },
  { id: "glassmorphic-dark",  slug: "glassmorphic-dark",   name: "Glassmorphic Dark",   description: "Transparent glass panels with blur, frosted surfaces on dark backgrounds", theme: "dark" as const },
  { id: "midnight-glass",     slug: "midnight-glass",      name: "Midnight Glass",      description: "Midnight blue glass — prismatic gradient borders, dual indigo-teal accents, frosted pills", theme: "dark" as const },
  { id: "tactile-minimal",   slug: "tactile-minimal",     name: "Tactile Minimal",     description: "Clean neutral with synthesized haptic sounds, ASCII cursor trail, staggered blur animations", theme: "light" as const },
  { id: "lumen-dark",        slug: "lumen-dark",          name: "Lumen Dark",          description: "Dark theme built on depth & surfaces principle — three-tier layered shadows, inset highlights, warm amber accent", theme: "dark" as const },
  { id: "sonic-punchy",      slug: "sonic-punchy",        name: "Sonic Punchy",        description: "Mechanical dark — zero-attack lime click via @web-kits/audio, monospace, sharp 4px corners", theme: "dark" as const },
  { id: "sonic-glassy",      slug: "sonic-glassy",        name: "Sonic Glassy",        description: "Frosted midnight — bell-like FM clicks with reverb, soft cyan, generous 12px radius", theme: "dark" as const },
  { id: "sonic-warm",        slug: "sonic-warm",          name: "Sonic Warm",          description: "Cream serif — lowpass-warmed clicks with light reverb, amber primary, 8px radius", theme: "light" as const },
  { id: "sonic-lofi",        slug: "sonic-lofi",          name: "Sonic Lo-fi",         description: "Sepia tape — bitcrushed clicks through narrow lowpass, monospace, vintage warmth", theme: "light" as const },
  { id: "sonic-airy",        slug: "sonic-airy",          name: "Sonic Airy",          description: "Pristine white — noise-bursts through bandpass, sky-blue primary, expansive 14px radius", theme: "light" as const },
  { id: "sonic-metallic",    slug: "sonic-metallic",      name: "Sonic Metallic",      description: "Brutalist chrome — inharmonic FM 2.76 ratio, near-zero radius, machined surface feel", theme: "dark" as const },
  { id: "sonic-bright",      slug: "sonic-bright",        name: "Sonic Bright",        description: "Crisp white — sparkly FM clicks with no lowpass, electric blue primary, 8px radius", theme: "light" as const },
  { id: "sonic-organic",     slug: "sonic-organic",       name: "Sonic Organic",       description: "Sage beige — detuned triangle waves with light reverb, soft attack onset, natural feel", theme: "light" as const },
  { id: "sonic-retro",       slug: "sonic-retro",         name: "Sonic Retro",         description: "80s synthwave — bitcrushed square waves through lowpass, hot pink on dark purple", theme: "dark" as const },
  { id: "tv-style",          slug: "tv-style",            name: "TV Style",            description: "Split-flap terminal board — flat dark tiles, Helvetica uppercase, amber primary, mechanical seam motif", theme: "dark" as const },
]

/** Parse CSS custom properties from a :root { } block */
function parseTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {}
  // Handle both `@layer base { :root { } }` and bare `:root { }`
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/)
  const block = rootMatch?.[1] ?? ""
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null
  while ((match = varRegex.exec(block)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim()
  }
  return tokens
}

/** Convert HSL channel shorthand "H S% L%" to full "hsl(H S% L%)" */
function normalizeValue(value: string): string {
  if (/^(oklch|hsl|rgb|oklab|lab|color)\(/.test(value)) return value
  if (/^\d[\d.]*\s+\d[\d.]*%\s+\d[\d.]*%$/.test(value.trim())) {
    return `hsl(${value})`
  }
  return value
}

export default function DesignSystemsPage() {
  const dsBase = join(process.cwd(), "..", "..", "design-systems")

  const systems: DesignSystemInfo[] = DS_META.map((meta) => {
    const cssPath = join(dsBase, meta.id, "globals.css")
    let tokens: Record<string, string> = {}

    if (existsSync(cssPath)) {
      const css = readFileSync(cssPath, "utf-8")
      const raw = parseTokens(css)
      tokens = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, normalizeValue(v)])
      )
    }

    return { ...meta, tokens }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Component Libraries</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-none">Design Systems</h1>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system) => (
            <Link key={system.id} href={`/design-systems/${system.slug}`} className="block group">
              <DesignSystemPreviewCard system={system} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
