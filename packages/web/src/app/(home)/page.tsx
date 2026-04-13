import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { Icon } from "@iconify/react";

import { ClineIcon, OpenCodeIcon } from "@/components/tool-icons";
// import { McpChatBubble } from "@/components/mcp-chat-bubble";
import { BuiltWithBadge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/waitlist-form";
import { DesignSystemsCarousel } from "@/modules/home/ui/components/design-systems-carousel";
import { MobileMusicFooter } from "@/modules/home/ui/components/mobile-music-footer";
import { FeatureSections } from "@/modules/home/ui/components/feature-sections";

const DS_META = [
  {
    id: "linear",
    slug: "linear",
    name: "Linear",
    description: "Dark developer tools with purple accents",
    theme: "dark" as const,
  },
  {
    id: "supabase",
    slug: "supabase",
    name: "Supabase",
    description: "Dark developer platform with green accents",
    theme: "dark" as const,
  },
  {
    id: "airbnb",
    slug: "airbnb",
    name: "Airbnb",
    description: "Warm inviting with coral primary accents",
    theme: "light" as const,
  },
  {
    id: "notion",
    slug: "notion",
    name: "Notion",
    description: "Light minimal — flat blue, rgba shadow",
    theme: "light" as const,
  },
  {
    id: "stripe",
    slug: "stripe",
    name: "Stripe",
    description: "Light fintech — indigo accents, premium shadows",
    theme: "light" as const,
  },
  {
    id: "vercel",
    slug: "vercel",
    name: "Vercel",
    description: "Pure black developer — Geist font, minimal",
    theme: "dark" as const,
  },
  {
    id: "apple",
    slug: "apple",
    name: "Apple",
    description: "Light premium — SF Pro, pill buttons",
    theme: "light" as const,
  },
  {
    id: "figma",
    slug: "figma",
    name: "Figma",
    description: "Light design tool — electric violet, purple glow",
    theme: "light" as const,
  },
  {
    id: "light-marketplace",
    slug: "light-marketplace",
    name: "Light Marketplace",
    description: "Light marketplace — charcoal buttons, flat cards, no shadows",
    theme: "light" as const,
  },
  {
    id: "dark-orange",
    slug: "dark-orange",
    name: "Dark Orange",
    description: "Dark with brand orange, 10px radius, layered shadows",
    theme: "dark" as const,
  },
  {
    id: "precision-light",
    slug: "precision-light",
    name: "Precision Light",
    description: "Light — charcoal primary, precision layered shadows",
    theme: "light" as const,
  },
  {
    id: "vibrant-dark",
    slug: "vibrant-dark",
    name: "Vibrant Dark",
    description: "Dark with vibrant blue, color-bloom shadows",
    theme: "dark" as const,
  },
  {
    id: "minimal-light",
    slug: "minimal-light",
    name: "Minimal Light",
    description: "Light minimal — black primary, no shadows, border-only cards",
    theme: "light" as const,
  },
  {
    id: "neutral-monochrome",
    slug: "neutral-monochrome",
    name: "Neutral Monochrome",
    description: "Neutral dark — white primary on near-black",
    theme: "dark" as const,
  },
  {
    id: "cinematic-dark",
    slug: "cinematic-dark",
    name: "Cinematic Dark",
    description: "Ultra-dark media streaming — cinematic content-first",
    theme: "dark" as const,
  },
  {
    id: "editorial-dark",
    slug: "editorial-dark",
    name: "Editorial Dark",
    description: "Editorial dark — serif display, flat, content-first",
    theme: "dark" as const,
  },
  {
    id: "corporate-fintech",
    slug: "corporate-fintech",
    name: "Corporate Fintech",
    description: "Professional fintech with blue accents, data-dense layouts",
    theme: "light" as const,
  },
  {
    id: "linear-quality",
    slug: "linear-quality",
    name: "Linear Quality",
    description:
      "Precision-crafted dark UI — purple accents, multi-layer shadows",
    theme: "dark" as const,
  },
  {
    id: "monochrome-industrial",
    slug: "monochrome-industrial",
    name: "Monochrome Industrial",
    description:
      "Monochrome industrial — OLED black, dot-matrix, Geist Mono, signal-light red",
    theme: "dark" as const,
  },
  {
    id: "glassmorphic-dark",
    slug: "glassmorphic-dark",
    name: "Glassmorphic Dark",
    description:
      "Transparent glass panels with blur, frosted surfaces on dark backgrounds",
    theme: "dark" as const,
  },
];

function parseTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  const block = rootMatch?.[1] ?? "";
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(block)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim();
  }
  return tokens;
}

function normalizeValue(value: string): string {
  if (/^(oklch|hsl|rgb|oklab|lab|color)\(/.test(value)) return value;
  if (/^\d[\d.]*\s+\d[\d.]*%\s+\d[\d.]*%$/.test(value.trim())) {
    return `hsl(${value})`;
  }
  return value;
}

const Page = async () => {
  const dsBase = join(process.cwd(), "..", "..", "design-systems");

  const systems = DS_META.map((meta) => {
    const cssPath = join(dsBase, meta.id, "globals.css");
    let tokens: Record<string, string> = {};
    if (existsSync(cssPath)) {
      const css = readFileSync(cssPath, "utf-8");
      const raw = parseTokens(css);
      tokens = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, normalizeValue(v)]),
      );
    }
    return { ...meta, tokens };
  });

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Main content - centered with max-width */}
      <section className="relative flex flex-col items-center justify-center space-y-4 max-w-5xl mx-auto w-full pt-40 md:pt-52 pb-8">
        <h1 className="text-2xl md:text-5xl font-bold leading-[1.15] text-center">
          Design systems for the AI era.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
          Define your brand. Get 80+ components as building blocks. Push
          something beautiful into the world.
        </p>
        <div className="max-w-md mx-auto w-full">
          <WaitlistForm />
        </div>

        {/* MCP Tools */}
        <div className="text-center space-y-4 pt-6">
          <p className="text-sm text-muted-foreground">
            Works with your favorite AI tools
          </p>

          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <Icon
              icon="simple-icons:visualstudiocode"
              className="w-6 h-6"
              aria-label="VS Code"
            />
            <Icon
              icon="simple-icons:cursor"
              className="w-6 h-6"
              aria-label="Cursor"
            />
            <Icon
              icon="simple-icons:claude"
              className="w-6 h-6"
              aria-label="Claude"
            />
            <Icon
              icon="simple-icons:windsurf"
              className="w-6 h-6"
              aria-label="Windsurf"
            />
            <OpenCodeIcon className="w-6 h-6" />
            <ClineIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Built with Tailwind CSS & shadcn/ui */}
        <div className="flex justify-center pt-2">
          <BuiltWithBadge />
        </div>
      </section>

      {/* Design systems carousel — flush with bottom of hero */}
      <div className="w-full pb-8">
        <DesignSystemsCarousel systems={systems} />
      </div>

      {/* Feature sections */}
      <FeatureSections />

      <MobileMusicFooter />
    </div>
  );
};

export default Page;
