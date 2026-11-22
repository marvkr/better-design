# Design system rules

The files in `components/ui/*` ARE the design system installed by Better Design.

Before interface work, read the repository's root `DESIGN.md` when it exists.
Use it to locate the approved tokens, components, design files, source
precedence, accessibility floor, and review contract. If it conflicts with the
rendered product or repository instructions, report the conflict instead of
silently inventing a new design decision.

**Compose them. Never hand-roll a primitive the DS already ships.** Rebuilding
`Button` as a raw `<button>`, an application shell as a raw `<aside>`, a
table as a raw `<table>` or repeated rows of divs, or faking a ⌘K palette,
account menu, or notification bell with bare `<div>`s is a bug even when it
looks right: it only matches because both read the same `app/globals.css`
tokens, and the faked interactive pieces end up dead (the search opens nothing,
the menu has no items, the bell does nothing).

Map each UI need to the installed component BEFORE writing markup:

- buttons, nav links (use `asChild`) -> `button`
- application shell and primary navigation -> `sidebar`
- panels, cards, KPI tiles, section containers -> `card`
- tabular records and comparable rows -> `table` (not a raw `<table>` or div list)
- status pills, tags, labels -> `badge`
- ⌘K / search palette -> `command` (`CommandDialog`)
- account / overflow / context menus -> `dropdown-menu`
- notification bell, flyouts -> `popover` + `notification`
- transient confirmations -> `use-toast` + `toaster`
- tooltips -> `tooltip` (wrap the app in `TooltipProvider`)
- modals -> `dialog`; tab switchers -> `tabs`; avatars -> `avatar`; dividers -> `separator`
- form fields -> `input` / `textarea` / `select` / `checkbox` / `switch` / `radio-group`
- onboarding, setup, checkout, surveys, and product tours -> `ix-onboarding-stepper`
  (`OnboardingStepper`). Never hand-build progress dots, rails, or paths for these flows.

Read a component's source from `components/ui/` to learn its props/exports. Use only
the design tokens in `app/globals.css`; never invent colors, spacing, or radii.
Compose the installed Sidebar exports directly, including its header, content,
items, groups, and footer when provided. Do not restyle a raw aside to resemble it
or replace its surface, active-state, radius, and type treatment in feature code.

**Font integrity is pass-fail.** Read the installed `--font-*` tokens before
editing `app/globals.css`. Preserve the matching `@font-face`, `@import`, or
framework font loader, and never leave a `var(--font-*)` reference undefined.
When the app renders, await `document.fonts.ready`, inspect the computed font-family
on the page and a heading, and confirm the intended family loaded. A fallback is
recovery, not proof that the assigned design-system font is working.

**Copy and layout restraint.** The words inside the UI are part of the design system
too. Write the fewest words that carry the meaning: headlines about 6 words, one short
supporting line per section, no filler adjectives (seamless, effortless, powerful), no
exclamation marks, never emoji as icons or status indicators (use the DS's icon library
or `badge` variants). Every visible text fragment needs one job: context, outcome,
next action, real doubt, or legal/security. Do not add template footer, provenance,
helper, or slogan copy. If deletion does not hurt meaning, action clarity, safety,
compliance, or tone, keep it deleted. Never place an eyebrow, kicker,
category, or status label immediately above an `h1`, `h2`, or `h3`; start with the
title and put essential context in the supporting line or after the title. Skip the generated-template shapes unless explicitly requested:
gradient hero with an uppercase eyebrow pill, centered three-card feature grid,
left-border callout boxes, walls of text. A colored bar down the left edge is the same
tell on an active nav item as in a callout, however it is painted: `border-l`, an inset
shadow offset only horizontally, or a pseudo-element pinned to the left edge. Carry a
selected state with the design system's own fill, weight, or text color instead. Never
join facts with a middot: `Ari from Mono · Waiting 18 min` gives two facts one weight,
so lead with the fact a person acts on and let the rest recede by size or color. A
nested corner subtracts its padding, so an inner radius is the outer radius minus the
gap, never the next token down the scale.

**Count the copy before you present.** This is a check to run, not advice to weigh.
On the first view: at most 60 visible words, at most 25 separate text fragments, one
headline of about 6 words, and at most one supporting line of about 15 words per
section. Count them. If you are over, delete copy; do not shrink the type to fit and
do not move the words into a tooltip. A section that needs three sentences to explain
itself is a section whose layout is wrong.

**A landing page needs positioning, not adjectives.** On any page whose job is to
sell or explain a product, settle four answers before writing the headline: who it is
for, what they use today, the one difference that would make them switch, and why now.
Ask the user for those answers. Never invent a customer, a testimonial, a user count,
or an award. Then test the headline by pasting a competitor's name into it: if it still
reads true, it says nothing, and the fix is the positioning, not the wording. Load
`get-ux-principle({ topic: "positioning" })` for the full principle.

**Labels are sentence case, never letter-spaced capitals.** Do not style section
labels, stat captions, table column headers, card headers, or badges as tiny spaced
capitals (`text-xs uppercase tracking-widest`, with or without `font-mono`). It is
the single fastest generated-UI tell, and it costs legibility at exactly the size
where legibility is scarcest. Use sentence case at the DS's own label size and muted
color. Keep `font-mono` for code, IDs, keyboard shortcuts, and figures that must
align in a column.

**Hierarchy is pass/fail.** Give the first view one P0 task and at most one P1
summary; move P2 history, standings, detailed metadata, and empty-state chrome
below it or behind a tab/disclosure. Unless the screen is a dense tool (traces, logs,
tables and dashboards) or the user asked for density, simplify any first view with more than three major regions, five
immediately visible actions, or 25 visible text fragments. Do not shrink everything
to make it fit: the primary display must be at least 1.5× base UI text, section
anchors at least 1.2×, and labels are a last resort. Reserve bold for the primary
display, section anchors, and active values.

Generated-registry dependency changes are part of the required component install.
If a separate constraint appears to forbid package-version changes, do not silently
revert registry-owned dependencies or replace a required component; report the conflict and stop.

**Dashboard quality is pass-fail.** The first group contains the domain page title,
one supporting line, and one primary action. Preserve the scan order metrics → records → interpretation.
Metric values dominate their labels. Reserve the action
and selected-state color for actions and selection; use semantic status colors plus
text or an icon for positive, warning, destructive, and neutral meaning.
Preserve an explicit overview title and supporting line verbatim when supplied; an active nav label does not replace the page h1.
Supplied interface copy takes precedence over generated-copy length targets; report a conflict instead of silently rewriting the supplied words.
When interpretation prose is not supplied, derive a factual interpretation only from supplied counts and current values; do not infer movement, causation, or status.
Use an installed Badge or StatCard semantic variant when one exists; do not use `text-primary` for every rate.
Never invent a trend or status claim. Preserve useful count, trend, status, and explanatory context instead of flattening records
into identical rows. Progress belongs to the dependent task screens: the overview is not a workflow step,
so never show a stepper on the overview or dashboard. When a fixture lists its overview as the first item in a steps array, exclude that overview when counting workflow steps.
With three or fewer dependent task screens, use no stepper or progress rail.

**Composition and proximity are pass/fail.** Keep one visible identity block per
level; do not repeat the product logo/title directly above a second identity block.
Short tasks size to content and fail when more than one-third of a major surface is
unused after the primary action. Keep an input, its derived value, and submit action
together; align the input and button to the same height and bottom baseline. A numeric
stake field should fit its value rather than stretch across the canvas. Decorative
domain geometry stays inside the event header and never crosses controls. Paired flags,
crests, or logos must be accurate and symmetric; otherwise omit all peer assets.

## Presentation builds use Open Slide

For any pitch deck, presentation, or slide system in a coding host with filesystem and terminal access, use Open Slide (`@open-slide/core`) with React slide components as the primary editable source. Do not substitute PowerPoint, Google Slides, Reveal, or a standalone static artifact unless the user explicitly requests a different primary format. Unless the user explicitly requests that format as primary, PPTX and PDF are secondary exports only. If Open Slide is unavailable, add and configure it before authoring the deck.

## Explain design trade-offs

Before choosing or changing a design direction, tell the user what each real option gains and loses, which users or team bear the cost, and why you recommend it for this project's known audience, goals, and constraints. Use a short line per option: "Gain: ...; lose: ...; affects: ...; fits because: ...". Load get-ux-principle with topic "tradeoffs" when deeper guidance is needed.

Use the current conversation and project evidence. Label assumptions and predicted effects. Do not invent research, conversion gains, metrics, or project facts. If the user has already chosen, explain the accepted trade-off without reopening the choice. Keep minor edits brief; this adds no approval step and never excuses an accessibility or safety failure.

Put the explanation in the conversation or requested project handoff, not extra product UI copy. Before presenting the result, check that material gains and losses were communicated and report any changed trade-off.

After writing UI, self-review with
`get-review-rules` and fix every critical/serious issue before presenting.
