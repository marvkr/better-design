# CLAUDE.md

Guidance for Claude Code (and other coding agents) working in this repository.
This is the fuller companion to `AGENTS.md` — the two files encode the **same
rules** and must be kept in sync. If you change a rule in one, change it in the
other.

## What this repo is

Better Design is a **solo-maintained** open-source shadcn/ui design-system
registry and design MCP server. It turns an AI coding agent into a design
engineer by giving it design tokens, component code, UI principles, icon
direction, and review rules.

Because it is solo-maintained, the main failure mode for agents here is not
production breakage — it is **housekeeping mess**: duplicate tickets, and
finished work left stale (or unfinished work marked Done). The rules below exist
to prevent exactly that.

### Structure

```
better-design/
├── components/          # Per-theme shadcn/ui component overrides (TSX)
│   ├── linear/
│   ├── stripe/
│   └── ...              # one folder per design system
├── registry/            # shadcn registry JSON for each design system
├── scripts/             # Build and seed scripts
├── .agents/skills/      # Packaged agent skills
├── AGENTS.md            # Concise agent guardrails (keep in sync with this file)
└── CLAUDE.md            # This file
```

Note: "Linear" in the README refers to the **Linear design system**, not the
Linear ticket tool. Don't confuse the two.

## Ticket hygiene

These rules apply to every task tied to a Better Design ticket. They are the
core reason this file exists.

### 1. Search before you create

Before opening a new ticket, **search existing Better Design tickets across both
active and completed states** — Todo, In Progress, In Review, Done, and Canceled.
Duplicate tickets are the single most common mess agents create here. If any
existing ticket already covers the work, use it. Only create a new ticket when a
genuine search turns up nothing that fits.

### 2. Pick an existing ticket at task start

At the **start** of a task:

- Show the relevant ticket inventory you found from the search above.
- Explicitly pick the **existing** ticket you will work under, and say which one.
- Do not silently spin up a fresh ticket when a matching one already exists.

### 3. Reconcile against merged PRs and commits before reporting work complete

Before you report a task done or claim a ticket is finished:

- Reconcile the ticket against the repo's actual **merged PRs and commits**.
- Cite concrete evidence — a PR link, a commit SHA, or the specific files that
  changed — that shows the work landed.
- If you cannot find that evidence, the work is not done. Say so plainly instead
  of reporting success.

### 4. Never mark a stale ticket Done without repo/PR evidence

A ticket does not become Done because it looks old, abandoned, or "probably
finished." It moves to Done **only** when repo/PR evidence proves the
implementation actually landed. When there is no such evidence:

- Leave the ticket's state unchanged.
- Report what you checked (branches, PRs, commits, files) and what was missing.

### First application: audit BD-215

The first test of these rules is **BD-215**. Treat it exactly as rule 4
prescribes:

1. Search the repo history, all branches, and merged PRs for evidence that
   BD-215's work landed.
2. Flip BD-215 to **Done only if** that implementation evidence exists.
3. Otherwise, **leave its state unchanged** and report the inventory you checked
   and what evidence was missing — do not mark it Done on assumption.

## General working conventions

- **Match surrounding style.** Follow the existing naming, structure, and
  comment density in nearby files.
- **Design lives in components.** Shadow layers, focus states, border thickness,
  hover transitions, and radius-by-context belong in component code, not only in
  CSS variables.
- **Adding a design system.** Create `components/<system>/` with the component
  TSX overrides, add the matching `registry/<system>/` entries, then run the seed
  script to index it.
- **Installing a component** into a shadcn/ui project:
  ```bash
  npx shadcn@latest add https://www.better-design.com/registry/<system>/<component>.json
  ```
