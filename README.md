# Better Design

Give your coding agent design systems, UI and UX guidance, icons, and code reviews through MCP.

Works with Codex, Claude Code, Cursor, VS Code, Devin, Antigravity, and other MCP clients.

[Website](https://better-design.com) · [Docs](https://better-design.com/docs) · [Design systems](https://better-design.com/design-systems) · [Installation guide](https://better-design.com/mcp/install)

## Install

Run these commands in your project:

```bash
npx skills add marvkr/better-design --skill better-design
npx better-design
```

The first installs the agent skill. The second connects Better Design to your coding tools and keeps your existing configuration. Restart your agent after setup.

If you have no account, setup creates a free key for you. If something does not work, run `npx better-design doctor`. It prints the command that fixes each problem.

## What it does

When your agent builds UI, Better Design gives it what it usually misses:

| Tool | What your agent gets |
|------|----------------------|
| `find-design-system` | A design system that fits the product you describe |
| `get-design-system-kit` | That system's tokens and component code, ready to install |
| `get-ui-principle` | Guidance on hierarchy, spacing, typography, depth, motion and more |
| `get-ux-principle` | Guidance on flows, forms, navigation, errors and onboarding |
| `find-icons` | Icons from one library, so the style stays consistent |
| `get-review-rules` | Accessibility and visual-design checks to fix its own work |

To check UI code yourself, run `npx better-design review` in your project.

## Try it

Ask your agent:

> Use Better Design to build a settings page with my project's design system, then review it for accessibility and consistency.

## Install a design system with shadcn

Every design system is also a shadcn registry. Browse them at [better-design.com/design-systems](https://better-design.com/design-systems), then install one component:

```bash
npx shadcn@latest add https://better-design.com/registry/<design-system>/<component>.json
```

For example, the Cashmere button:

```bash
npx shadcn@latest add https://better-design.com/registry/cashmere/button.json
```

Or the full Cashmere theme and components:

```bash
npx shadcn@latest add https://better-design.com/registry/cashmere/all.json
```

## This repository

This repository holds the agent skill in `skills/better-design`, and component and registry sources in `components/` and `registry/`.

The transition components come from one source, `scripts/transitions-src/`. After you edit it, run `node scripts/generate-transitions.mjs`, then run the tests:

```bash
cd tests && bun install && bun run test
```

## License

MIT
