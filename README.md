# Better Design: Open source Claude Design

> **Turn your AI coding IDE into a design engineer.** Better Design works with MCP-compatible agents and editors like Claude Code, Cursor, VS Code/GitHub Copilot, Claude Desktop, and claude.ai. It is a design MCP server, AI design-system registry, and UI review layer for generating polished product interfaces from prompts.

[Website](https://better-design.com) · [Design systems](#available-design-systems) · [Setup](#setup) · [Contributing](#contributing)

![MCP server](https://img.shields.io/badge/MCP-design%20server-8b5cf6?style=flat)
![Claude Code](https://img.shields.io/badge/Claude%20Code-supported-111827?style=flat)
![Cursor](https://img.shields.io/badge/Cursor-supported-111827?style=flat)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-MCP%20compatible-111827?style=flat)
![AI design systems](https://img.shields.io/badge/AI-design%20systems-111827?style=flat)
![WCAG](https://img.shields.io/badge/WCAG-review%20rules-111827?style=flat)

## What is Better Design?

Better Design gives AI coding agents the design context they usually miss: design tokens, component code, UI principles, icon direction, accessibility checks, and visual-design review rules.

Think of it as a **Claude Design-style workflow for your own codebase**:

1. Pick the product direction: Linear, Supabase, Vercel, Airbnb, Stripe, Apple, Notion, Figma, or another curated design system.
2. Feed your AI agent the right `globals.css`, semantic tokens, component overrides, icon set, spacing, typography, shadows, radius, and motion language.
3. Ask Claude Code, Cursor, VS Code/GitHub Copilot, Claude Desktop, claude.ai, or another MCP-compatible coding agent to build the interface.
4. Have the MCP review the output against accessibility and design principles before you ship it.

Instead of "AI-looking UI," you get interfaces that look like they were built from a real product design system.

## Why Better Design?

- **Claude Design-style workflow, open MCP.** Bring the artifact-first design loop people expect from Claude Design into Claude Code, Cursor, VS Code/GitHub Copilot, Claude Desktop, claude.ai, and any MCP-compatible client.
- **Design systems, not vague vibes.** Each system includes semantic CSS tokens plus production component code, so generated UI uses real implementation details instead of guessed colors.
- **AI UI generation with guardrails.** The MCP can load principles for hierarchy, spacing, typography, depth, motion, forms, and accessibility exactly when the agent needs them.
- **Self-review before handoff.** `get-review-rules` gives your agent a WCAG and visual-design checklist so it can catch missing focus states, weak hierarchy, bad contrast, and inconsistent spacing.

## How it works

Better Design has two layers: an always-on **Design Intelligence** layer and an on-demand **Scaffold** layer.

**Design Intelligence — always active for UI work**

When your agent builds UI, Better Design loads the relevant product-design principles and review rules automatically:

```
You: "Add a settings page with a form"

AI: calls get-ui-principle("spacing") + get-ui-principle("hierarchy")
 → writes the page
 → calls get-review-rules("accessibility") + get-review-rules("visual-design")
 → fixes contrast, labels, focus states, spacing, and hierarchy
```

**Scaffold — design-system matching for new UI**

When starting a product, page, or component set, say "use better-design" and the MCP finds a matching design system:

```
You: "Build a fintech dashboard in the style of Stripe. use better-design"

AI: calls resolve-design-system("fintech dashboard, Stripe")
 → loads design-system docs, CSS tokens, and component code
 → resolves a matching icon library
 → builds with semantic tokens instead of raw colors
```

## What the MCP gives your agent

| Tool | What it does | Why it matters |
|------|-------------|----------------|
| `resolve-design-system` | Semantically matches the right design system for a prompt | Stops agents from guessing a visual direction |
| `get-design-system-docs` | Loads tokens, components, usage notes, and install context | Gives the agent implementation-ready design context |
| `get-ui-principle` | Fetches focused guidance for hierarchy, spacing, typography, depth, motion, forms, and more | Makes UI decisions principled instead of random |
| `get-review-rules` | Returns accessibility and visual-design review checklists | Helps the agent critique and fix its own output |
| `resolve-icon-library` | Picks an icon family that matches the design personality | Keeps icon style consistent with the UI |
| `search-icons` | Finds specific icons through Iconify | Speeds up implementation without mixing icon styles |

## Available Design Systems

31 open-source design systems for shadcn/ui. Browse and preview them all at [better-design.com](https://better-design.com/design-systems).

| System | Theme | Vibe | Best For |
|--------|-------|------|----------|
| [**Linear**](https://better-design.com/design-systems/linear) | Dark | Minimal, professional, purple accents | Developer tools, productivity apps |
| [**Linear Quality**](https://better-design.com/design-systems/linear-quality) | Dark | Precision-crafted, multi-layer shadows | High-polish developer tools |
| [**Supabase**](https://better-design.com/design-systems/supabase) | Dark | Technical, modern, green accents | Backend dashboards, dev portals |
| [**Vercel**](https://better-design.com/design-systems/vercel) | Dark | Pure black, Geist font, minimal | Deployment, developer platforms |
| [**Airbnb**](https://better-design.com/design-systems/airbnb) | Light | Warm, friendly, coral primary | Marketplaces, consumer apps |
| [**Notion**](https://better-design.com/design-systems/notion) | Light | Minimal, flat blue, rgba shadow | Productivity, note-taking apps |
| [**Stripe**](https://better-design.com/design-systems/stripe) | Light | Fintech, indigo accents, premium shadows | Payments, financial products |
| [**Apple**](https://better-design.com/design-systems/apple) | Light | Premium, SF Pro, pill buttons | Consumer apps, marketing sites |
| [**Figma**](https://better-design.com/design-systems/figma) | Light | Design tool, electric violet, purple glow | Design/creative tooling |
| [**Light Marketplace**](https://better-design.com/design-systems/light-marketplace) | Light | Charcoal buttons, flat cards, no shadows | E-commerce, listings |
| [**Precision Light**](https://better-design.com/design-systems/precision-light) | Light | Charcoal primary, precision layered shadows | B2B SaaS, enterprise |
| [**Minimal Light**](https://better-design.com/design-systems/minimal-light) | Light | Black primary, no shadows, border-only cards | Clean utilities, productivity |
| [**Dark Orange**](https://better-design.com/design-systems/dark-orange) | Dark | Brand orange, 10px radius, layered shadows | Modern SaaS, dashboards |
| [**Vibrant Dark**](https://better-design.com/design-systems/vibrant-dark) | Dark | Vibrant blue, color-bloom shadows | Consumer apps, social |
| [**Neutral Monochrome**](https://better-design.com/design-systems/neutral-monochrome) | Dark | White on near-black, no color | Understated, data-heavy tools |
| [**Cinematic Dark**](https://better-design.com/design-systems/cinematic-dark) | Dark | Ultra-dark, content-first media | Streaming, media platforms |
| [**Editorial Dark**](https://better-design.com/design-systems/editorial-dark) | Dark | Serif display, flat, content-first | Publishing, editorial |
| [**Corporate Fintech**](https://better-design.com/design-systems/corporate-fintech) | Light | Blue accents, data-dense layouts | Banking, enterprise, fintech |
| [**Beam Custom**](https://better-design.com/design-systems/beam-custom) | Dark | Custom beam aesthetic | Custom applications |
| [**Beam Lib**](https://better-design.com/design-systems/beam-lib) | Dark | Library-style beam theme | Component libraries |
| [**Glassmorphic Dark**](https://better-design.com/design-systems/glassmorphic-dark) | Dark | Glass layers, blur, frosted UI | Modern dashboards, SaaS |
| [**Inset Dark**](https://better-design.com/design-systems/inset-dark) | Dark | Inset shadows, recessed elements | Data-dense, analytical tools |
| [**Lumen Dark**](https://better-design.com/design-systems/lumen-dark) | Dark | Glow accents, luminous depth | Creative tools, media apps |
| [**Metal FX Gold**](https://better-design.com/design-systems/metal-fx-gold) | Dark | Gold metallic surfaces | Premium, luxury products |
| [**Metal FX Silver**](https://better-design.com/design-systems/metal-fx-silver) | Dark | Silver metallic surfaces | Tech, hardware products |
| [**Metal FX Chromatic**](https://better-design.com/design-systems/metal-fx-chromatic) | Dark | Chromatic shift, iridescent | Cutting-edge, bold brands |
| [**Midnight Glass**](https://better-design.com/design-systems/midnight-glass) | Dark | Deep midnight, glass panels | Dashboards, analytics |
| [**Monochrome Industrial**](https://better-design.com/design-systems/monochrome-industrial) | Dark | Industrial grays, utilitarian | Developer tools, CLIs |
| [**Pillow Light**](https://better-design.com/design-systems/pillow-light) | Light | Soft shadows, rounded comfort | Consumer, lifestyle apps |
| [**Tactile Minimal**](https://better-design.com/design-systems/tactile-minimal) | Light | Tactile depth, minimal color | Productivity, focus tools |
| [**TV Style**](https://better-design.com/design-systems/tv-style) | Dark | Cinematic, large-format TV UI | Media, streaming, TV apps |

Each design system includes a full `globals.css` token layer plus component overrides. Install any component into your shadcn/ui project:

```bash
npx shadcn@latest add https://www.better-design.com/registry/<design-system>/<component>.json
```

Example — install Linear's button:

```bash
npx shadcn@latest add https://www.better-design.com/registry/linear/button.json
```

## Usage examples

Once connected to your MCP client, ask your agent for design help directly:

```
"Use better-design. Build a Linear-style project settings page with billing, team members, and API keys."

"Find a design system for a developer tools startup, then build the dashboard with matching components."

"Review this form with Better Design's accessibility and visual-design rules, then fix the issues."
```

## Setup

Install the Better Design agent skill, then connect its MCP tools:

```bash
npx skills add marvkr/better-design --skill better-design
npx better-design
```

Run each command once, then restart your coding agent. The skill tells supported agents when to use Better Design. The installer detects your coding tools and connects the MCP without replacing their existing configuration. No account is required.

### Connect via Remote MCP manually

Connect any MCP-compatible client to the hosted endpoint — no local setup needed.

1. Go to [better-design.com/settings](https://better-design.com/settings) to get an API key.
2. Add the remote MCP to your client config:

```json
{
  "mcpServers": {
    "better-design": {
      "url": "https://better-design.com/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

### Connect via Claude Desktop (remote MCP)

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "better-design": {
      "url": "https://better-design.com/api/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

Restart Claude Desktop. You can now ask Claude to use Better Design while building UI.

## Project Structure

```
better-design/
├── components/          # Per-theme shadcn/ui component overrides
│   ├── linear/
│   ├── apple/
│   ├── stripe/
│   └── ...              # 31 systems total
├── registry/            # shadcn registry JSON for each design system
│   ├── linear/
│   ├── apple/
│   └── ...
├── scripts/             # Build and seed scripts
├── skills/              # Installable Better Design agent skill
├── .agents/             # Other installed agent skills
└── README.md
```

## Contributing

To add a new design system:

1. Create a folder in `components/<your-system>/` with component TSX overrides.
2. Create the corresponding registry entries in `registry/<your-system>/`.
3. Run the seed script to index the new system.

Design nuances live in the components, not just CSS variables — shadow layers, focus states, border thickness, hover transitions, and radius variations by context all need to be captured in component code.

## License

MIT
