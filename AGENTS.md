# Agent guardrails

Instructions for AI coding agents working in this repo. Keep this file and
`CLAUDE.md` in sync — they encode the same rules; `CLAUDE.md` just carries more
detail.

## About this repo

Better Design is a solo-maintained shadcn/ui design-system registry and design
MCP server. Layout:

- `components/<system>/` — per-theme shadcn/ui component overrides (TSX)
- `registry/<system>/` — shadcn registry JSON for each design system
- `scripts/` — build and seed scripts
- `.agents/skills/` — packaged agent skills

## Ticket hygiene (Better Design / Linear)

Duplicate tickets and stale "Done" tickets are the main way agents create mess
here. Follow these rules for every task tied to a ticket.

1. **Search before you create.** Before opening a new ticket, search existing
   Better Design tickets across **both active and completed states** (Todo,
   In Progress, Done, Canceled). If a matching ticket exists, use it — do not
   open a duplicate.
2. **Pick an existing ticket at task start.** At the start of a task, list the
   relevant ticket inventory you found and explicitly pick the existing ticket
   you are working under. Only create a new one if the search genuinely turns up
   nothing that covers the work.
3. **Reconcile before reporting done.** Before marking work complete or claiming
   a ticket is finished, reconcile the ticket against the repo's merged PRs and
   commits. Point to the concrete evidence (PR, commit SHA, or the files it
   changed).
4. **Never mark a stale ticket Done without evidence.** Do not flip a ticket to
   Done just because it looks old or abandoned. It moves to Done only when
   repo/PR evidence proves the work actually landed. If no evidence exists, leave
   its state alone and say so.

### First application: BD-215

The first test of these rules is BD-215. Audit it against the repo history and
merged PRs. Flip it to Done **only** if implementation evidence proves the work
landed; otherwise leave its state unchanged and report what you found.

## General

- Match the surrounding code's style, naming, and structure.
- Design nuances (shadow layers, focus states, border thickness, hover
  transitions, radius by context) live in component code, not just CSS vars.
- When adding a design system, mirror the existing `components/` + `registry/`
  pair and run the seed script.
