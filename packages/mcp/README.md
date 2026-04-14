# better-design-mcp

MCP server for [Better Design](https://better-design.com) — design systems, UI principles, icons, and code review for AI coding agents.

## Setup

```bash
claude mcp add better-design -- npx -y better-design-mcp
```

Then set your API key:

```bash
export BETTER_DESIGN_API_KEY=bd_live_...
```

Get your API key at [better-design.com/settings](https://better-design.com/settings).

## Tools

| Tool | Description |
|------|-------------|
| `resolve-design-system` | Search for design systems by industry, personality, or style |
| `get-design-system-docs` | Get design tokens, CSS variables, and component code |
| `get-ui-principle` | Load UI design principles (spacing, color, hierarchy, etc.) |
| `get-review-rules` | Load WCAG 2.1 accessibility and visual design review checklists |
| `resolve-icon-library` | Find an icon library matching a visual style |
| `search-icons` | Search for specific icons within a library |

## How it works

When you ask your AI agent to build UI, Better Design loads design principles, design system tokens, and review rules into context so the agent writes production-quality code — not generic AI slop.

**Design Intelligence** (automatic): Loads relevant UI principles before writing code, then self-reviews against WCAG 2.1 and visual design rules.

**Scaffold** (on-demand): Say "use better-design" to discover and adopt a complete design system with matching icons.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BETTER_DESIGN_API_KEY` | Yes | API key from [better-design.com/settings](https://better-design.com/settings) |
