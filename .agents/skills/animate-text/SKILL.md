---
name: animate-text
description: Curated text animation catalog with exact JSON specs for headings, labels, counters, and text swaps. Use when an agent needs to pick or translate named effects like soft blur in, typewriter, shared axis, line reveal, stagger, crossfade, or kinetic builds into WAAPI, Motion, Framer Motion, GSAP, CSS, Lottie, Rive, or similar stacks.
---

# Animate Text

Use this skill as a text animation catalog backed by generated JSON contracts.

Use `assets/specs/<id>.json` for a portable motion contract. Use `assets/effects/<id>.json` for exact animation reproduction, including content, renderer algorithm, playback, runtime, host requirements, rendering contract, and library adapters.

This skill ships 24 specs in total. The website currently showcases 20 of them.

## When To Use

Use this skill when the request involves:

- animating headings, labels, counters, editorial copy, or text swaps
- matching a named effect id such as `soft-blur-in`, `typewriter`, `shared-axis-y`, or `kinetic-center-build`
- choosing a motion pattern from a curated catalog and translating it into a target stack
- reproducing the current animation behavior in another stack without relying on example components
- implementing the same spec with WAAPI, Motion / motion.dev, GSAP, CSS, Lottie, Rive, or another renderer

## Workflow

1. Determine whether the user wants:
   - the exact site version of a visible effect
   - a portable translation of the motion contract
2. If the user names an effect id, read `assets/specs/<id>.json` or run `node scripts/get-spec.mjs <id>`.
3. Otherwise use `references/catalog.md` or optionally run:
   - `node scripts/list-specs.mjs`
   - `node scripts/find-spec.mjs "<query>"`
4. Use `assets/specs/<id>.json` when the user wants a portable translation of the motion intent.
5. Use `assets/effects/<id>.json` or `node scripts/get-effect.mjs <id>` when the user wants the exact generated animation behavior.
6. If the user names a target animation library, treat that as binding. Follow `showcase.library_selection` and use only the matching `showcase.library_adapters.<library>` block for that effect.
7. For exact reproduction, follow `showcase.renderer`, `showcase.playback`, `showcase.timing`, `showcase.runtime`, `showcase.stage`, `showcase.rendering_contract`, `showcase.library_selection`, and `showcase.library_adapters` over assumptions inferred from the portable spec alone.
8. Treat `showcase.stage` as animation host requirements only. Do not copy typography, color, padding, card chrome, or page layout from the source website unless the user explicitly asks for that UI.
9. When applying an effect to an existing section, preserve that section's text. Use `showcase.content` only as demo/fallback copy unless the user explicitly asks to reproduce the showcase copy.

## Bundled Resources

- `references/catalog.md`: compact summary of the bundled spec library
- `references/schema.md`: field-level schema for portable specs and exact showcase effect recipes
- `references/selection-guide.md`: heuristics for picking the right effect family
- `references/implementation-notes.md`: translation notes for common animation stacks
- `assets/specs/*.json`: portable motion contracts
- `assets/effects/*.json`: exact generated animation recipes
- `assets/catalog.json`: visible website catalog order and renderer overrides
- `assets/samples.json`: sample copy used by the generated examples
- `assets/runtime-presets.json`: runtime multipliers and loop timing presets
- `assets/stage-presets.json`: animation host requirements, not presentation styling
- `assets/renderer-recipes.json`: shared renderer algorithms
- `assets/library-adapters.json`: WAAPI, Motion, and GSAP implementation mapping guidance

## Optional Helper Scripts

The helper scripts are optional deterministic shortcuts. They require Node.js 20+.

- `node scripts/list-specs.mjs` prints bundled spec metadata as JSON
- `node scripts/get-spec.mjs <id>` prints one portable motion spec as JSON
- `node scripts/get-effect.mjs <id>` prints one exact generated animation recipe as JSON
- `node scripts/find-spec.mjs "<query>"` returns likely matches ranked by metadata

If Node is unavailable, the core skill still works through the Markdown references and JSON assets alone.

## Translation Rules

- Preserve `target` exactly: `whole`, `per-character`, `per-word`, or `per-line`.
- Map `enter` and `exit` durations, easing, and stagger directly into the target stack.
- Preserve transform, opacity, blur, scale, rotation, and spacing fields when the target stack supports them.
- For layout-aware effects such as `kinetic-center-build` or `short-slide-down`, use the exact effect recipe instead of flattening the effect into a generic stagger.
- For exact animation reproduction, preserve the `showcase.renderer`, `showcase.playback`, `showcase.timing`, `showcase.runtime`, `showcase.stage`, `showcase.rendering_contract`, and `showcase.library_adapters` fields from `assets/effects/<id>.json`.
- Do not substitute the requested animation library. If the user asks for GSAP, import and use GSAP; if the user asks for Motion, import and use Motion; if the user asks for WAAPI, use `Element.animate`.
- When targeting Motion or GSAP, use the matching `showcase.library_adapters.motion` or `showcase.library_adapters.gsap` block for imports, time-unit conversion, easing conversion, keyframe shape, completion, and renderer-specific notes.
- Read `showcase.engine_notes` and `showcase.reproduction_notes` carefully. They describe stack-specific details required for visual parity.
- For exact site behavior, implement the full `showcase.playback` loop. Do not stop at the first enter animation unless the user explicitly asks for a one-shot reveal.
- If a renderer recipe says to wait for a phase to complete, either await the animation/tween promise or sleep the computed phase total, not both.

## Notes

- The public website uses a curated subset of the bundled library. The skill can still use additional bundled specs that are not currently visible on the website.
- `assets/specs/*.json` are the authoritative portable motion contracts.
- `assets/effects/*.json` are the authoritative exact animation reproduction contracts.
- Hidden effects have `"showcase": null` in the exact effect recipe.
- If a prose note conflicts with a JSON field, prefer the JSON.
