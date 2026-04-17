"use client"

import type { CSSProperties, ReactNode } from "react"

import {
  LinearButton, AirbnbButton, SupabaseButton, CorporateFintechButton,
  DarkOrangeButton, VibrantDarkButton, MinimalLightButton, NeutralMonochromeButton,
  LightMarketplaceButton, PrecisionLightButton, CinematicDarkButton,
  LinearQualityButton, EditorialDarkButton,
  NotionButton, StripeButton, VercelButton, AppleButton, FigmaButton,
  MonoIndustrialButton, GlassmorphicDarkButton, MidnightGlassButton,
  TactileMinimalButton, LumenDarkButton, TvStyleButton,

  LinearCard, AirbnbCard, SupabaseCard, CorporateFintechCard,
  DarkOrangeCard, VibrantDarkCard, MinimalLightCard, NeutralMonochromeCard,
  LightMarketplaceCard, PrecisionLightCard, CinematicDarkCard,
  LinearQualityCard, EditorialDarkCard,
  NotionCard, StripeCard, VercelCard, AppleCard, FigmaCard,
  MonoIndustrialCard, GlassmorphicDarkCard, MidnightGlassCard,
  TactileMinimalCard, LumenDarkCard, TvStyleCard,

  LinearInput, AirbnbInput, SupabaseInput, CorporateFintechInput,
  DarkOrangeInput, VibrantDarkInput, MinimalLightInput, NeutralMonochromeInput,
  LightMarketplaceInput, PrecisionLightInput, CinematicDarkInput,
  LinearQualityInput, EditorialDarkInput,
  NotionInput, StripeInput, VercelInput, AppleInput, FigmaInput,
  MonoIndustrialInput, GlassmorphicDarkInput, MidnightGlassInput,
  TactileMinimalInput, LumenDarkInput, TvStyleInput,

} from "./[id]/ds-registry"

interface DesignSystemInfo {
  id: string
  name: string
  description: string
  theme: "light" | "dark"
  tokens: Record<string, string>
}

type AnyButton = React.ComponentType<{
  variant?: string
  size?: string
  className?: string
  children?: ReactNode
}>
type AnyCard = React.ComponentType<{ className?: string; children?: ReactNode; style?: CSSProperties }>
type AnyInput = React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>

const BUTTON_MAP: Record<string, AnyButton> = {
  linear: LinearButton as AnyButton,
  airbnb: AirbnbButton as AnyButton,
  supabase: SupabaseButton as AnyButton,
  "corporate-fintech": CorporateFintechButton as AnyButton,
  "dark-orange": DarkOrangeButton as AnyButton,
  "vibrant-dark": VibrantDarkButton as AnyButton,
  "minimal-light": MinimalLightButton as AnyButton,
  "neutral-monochrome": NeutralMonochromeButton as AnyButton,
  "light-marketplace": LightMarketplaceButton as AnyButton,
  "precision-light": PrecisionLightButton as AnyButton,
  "cinematic-dark": CinematicDarkButton as AnyButton,
  "linear-quality": LinearQualityButton as AnyButton,
  "editorial-dark": EditorialDarkButton as AnyButton,
  notion: NotionButton as AnyButton,
  stripe: StripeButton as AnyButton,
  vercel: VercelButton as AnyButton,
  apple: AppleButton as AnyButton,
  figma: FigmaButton as AnyButton,
  "monochrome-industrial": MonoIndustrialButton as AnyButton,
  "glassmorphic-dark": GlassmorphicDarkButton as AnyButton,
  "midnight-glass": MidnightGlassButton as AnyButton,
  "tactile-minimal": TactileMinimalButton as AnyButton,
  "lumen-dark": LumenDarkButton as AnyButton,
  "tv-style": TvStyleButton as AnyButton,
}

const CARD_MAP: Record<string, AnyCard> = {
  linear: LinearCard as AnyCard,
  airbnb: AirbnbCard as AnyCard,
  supabase: SupabaseCard as AnyCard,
  "corporate-fintech": CorporateFintechCard as AnyCard,
  "dark-orange": DarkOrangeCard as AnyCard,
  "vibrant-dark": VibrantDarkCard as AnyCard,
  "minimal-light": MinimalLightCard as AnyCard,
  "neutral-monochrome": NeutralMonochromeCard as AnyCard,
  "light-marketplace": LightMarketplaceCard as AnyCard,
  "precision-light": PrecisionLightCard as AnyCard,
  "cinematic-dark": CinematicDarkCard as AnyCard,
  "linear-quality": LinearQualityCard as AnyCard,
  "editorial-dark": EditorialDarkCard as AnyCard,
  notion: NotionCard as AnyCard,
  stripe: StripeCard as AnyCard,
  vercel: VercelCard as AnyCard,
  apple: AppleCard as AnyCard,
  figma: FigmaCard as AnyCard,
  "monochrome-industrial": MonoIndustrialCard as AnyCard,
  "glassmorphic-dark": GlassmorphicDarkCard as AnyCard,
  "midnight-glass": MidnightGlassCard as AnyCard,
  "tactile-minimal": TactileMinimalCard as AnyCard,
  "lumen-dark": LumenDarkCard as AnyCard,
  "tv-style": TvStyleCard as AnyCard,
}

const INPUT_MAP: Record<string, AnyInput> = {
  linear: LinearInput as AnyInput,
  airbnb: AirbnbInput as AnyInput,
  supabase: SupabaseInput as AnyInput,
  "corporate-fintech": CorporateFintechInput as AnyInput,
  "dark-orange": DarkOrangeInput as AnyInput,
  "vibrant-dark": VibrantDarkInput as AnyInput,
  "minimal-light": MinimalLightInput as AnyInput,
  "neutral-monochrome": NeutralMonochromeInput as AnyInput,
  "light-marketplace": LightMarketplaceInput as AnyInput,
  "precision-light": PrecisionLightInput as AnyInput,
  "cinematic-dark": CinematicDarkInput as AnyInput,
  "linear-quality": LinearQualityInput as AnyInput,
  "editorial-dark": EditorialDarkInput as AnyInput,
  notion: NotionInput as AnyInput,
  stripe: StripeInput as AnyInput,
  vercel: VercelInput as AnyInput,
  apple: AppleInput as AnyInput,
  figma: FigmaInput as AnyInput,
  "monochrome-industrial": MonoIndustrialInput as AnyInput,
  "glassmorphic-dark": GlassmorphicDarkInput as AnyInput,
  "midnight-glass": MidnightGlassInput as AnyInput,
  "tactile-minimal": TactileMinimalInput as AnyInput,
  "lumen-dark": LumenDarkInput as AnyInput,
  "tv-style": TvStyleInput as AnyInput,
}

export function DesignSystemPreviewCard({ system }: { system: DesignSystemInfo }) {
  const id = system.id
  const dark = system.theme === "dark"

  const Button = BUTTON_MAP[id] ?? BUTTON_MAP.linear
  const Card = CARD_MAP[id] ?? CARD_MAP.linear
  const Input = INPUT_MAP[id] ?? INPUT_MAP.linear

  // Per-DS CSS vars propagate to real components via var(--background), var(--primary), etc.
  const cssVars = system.tokens as CSSProperties

  // Skeleton line color — theme-aware, used for text placeholders in the mini-UI
  const line = (op: number) => (dark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})`)

  return (
    <div
      className={`
        rounded-2xl overflow-hidden border border-border/60 bg-card transition-all duration-200
        group-hover:-translate-y-1 group-hover:border-border
        ${dark ? "group-hover:shadow-2xl group-hover:shadow-black/20" : "group-hover:shadow-lg group-hover:shadow-black/6"}
      `}
    >
      {/* Mini UI preview — rendered with real DS components, scaled via `zoom` */}
      <div
        data-ds={id}
        style={{ ...cssVars, backgroundColor: "var(--background)" }}
        className={`relative overflow-hidden ${
          id === "monochrome-industrial"
            ? "bg-[image:radial-gradient(circle,var(--mono-border-visible)_1px,transparent_1px)] [background-size:12px_12px]"
            : ""
        }`}
      >
        <div style={{ zoom: 0.55 }} className="p-5 space-y-3 text-foreground">
          {/* Nav bar */}
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-md shrink-0"
              style={{ background: "var(--primary)" }}
            />
            <div className="h-1 w-10 rounded" style={{ background: line(0.14) }} />
            <div className="h-1 w-8 rounded" style={{ background: line(0.14) }} />
            <div className="h-1 w-9 rounded" style={{ background: line(0.14) }} />
            <div className="flex-1" />
            <Button size="sm" className="h-7 px-3 text-xs">Sign in</Button>
          </div>

          {/* Stat cards row — real Card components */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "4,291", label: "Users" },
              { val: "+12%", label: "Growth" },
              { val: "98.2%", label: "Uptime" },
            ].map(({ val, label }) => (
              <Card key={label} className="p-3">
                <div className="text-sm font-semibold text-foreground leading-tight">{val}</div>
                <div className="mt-1 h-1 w-[60%] rounded" style={{ background: line(0.18) }} />
                <div className="mt-1 text-[10px] text-muted-foreground">{label}</div>
              </Card>
            ))}
          </div>

          {/* Content row — main card + sidebar with inputs */}
          <div className="flex gap-2">
            {/* Main card */}
            <Card className="flex-1 p-4">
              <div className="h-1.5 w-[55%] rounded" style={{ background: line(0.55) }} />
              <div className="mt-2 h-1 w-[80%] rounded" style={{ background: line(0.14) }} />
              <div className="mt-1.5 h-1 w-[65%] rounded" style={{ background: line(0.14) }} />
              <div className="mt-1.5 h-1 w-[50%] rounded" style={{ background: line(0.14) }} />
              <div className="mt-3 flex gap-1.5">
                <Button size="sm" className="h-7 px-3 text-xs">Continue</Button>
                <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">Skip</Button>
              </div>
            </Card>

            {/* Sidebar */}
            <div className="flex flex-col gap-1.5 w-[120px]">
              <Card className="p-2.5">
                <div className="h-1 w-[70%] rounded" style={{ background: line(0.5) }} />
                <div className="mt-1 h-1 w-[90%] rounded" style={{ background: line(0.13) }} />
              </Card>
              <Input className="h-8 text-xs" placeholder="Search" />
              <Input className="h-8 text-xs" placeholder="Email" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer — uses Better Design's own card styling (outside [data-ds] scope) */}
      <div className="border-t border-border px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm text-foreground truncate">{system.name}</h2>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{
                background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
              }}
            >
              {system.theme}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 leading-relaxed">
            {system.description}
          </p>
        </div>
      </div>
    </div>
  )
}
