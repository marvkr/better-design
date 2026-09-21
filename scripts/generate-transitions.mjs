#!/usr/bin/env node
/**
 * Distributes the 9 transition components (ported from transitions.dev) to
 * every design system and generates matching shadcn registry JSON files.
 *
 * Source of truth: scripts/transitions-src/<slug>.tsx
 * Output per DS:
 *   - components/<ds>/components/ui/<slug>.tsx       (generated copy)
 *   - registry/<ds>/<slug>.json                       (shadcn registry entry)
 *   - registry/<ds>/transitions.json                  (meta — installs all 9)
 *
 * These 9 are token-themed, so every design system gets the same bytes. That
 * is why each emitted file carries a generated banner: it looks exactly like
 * its hand-authored neighbours and would otherwise invite direct edits.
 *
 * Regenerates registry/registry.json at the end, so one run leaves the tree
 * consistent.
 *
 * Run: node scripts/generate-transitions.mjs
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
} from "node:fs"
import { mkdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
// The canonical sources live here, outside components/, because this script
// overwrites every design system. Keeping them in one of those systems made
// the template indistinguishable from its own output and silently clobbered.
const SRC_DIR = join(root, "scripts", "transitions-src")

// Order matches transitions.dev numbering (P1 … P9).
const TRANSITIONS = [
  { slug: "notification-badge", name: "Notification badge" },
  { slug: "menu-dropdown",      name: "Menu dropdown" },
  { slug: "panel-reveal",       name: "Panel reveal" },
  { slug: "card-resize",        name: "Card resize" },
  { slug: "icon-swap",          name: "Icon swap" },
  { slug: "text-swap",          name: "Text states swap" },
  { slug: "modal-transition",   name: "Modal open / close" },
  { slug: "page-slide",         name: "Page side-by-side" },
  { slug: "number-pop-in",      name: "Number pop-in" },
]

const componentsDir = join(root, "components")
const registryDir = join(root, "registry")

const dsList = readdirSync(componentsDir).filter((name) => {
  const stat = statSync(join(componentsDir, name))
  return stat.isDirectory()
})

const banner = (slug) =>
  `// GENERATED FILE - do not edit.\n` +
  `// Source: scripts/transitions-src/${slug}.tsx\n` +
  `// Re-generate: node scripts/generate-transitions.mjs\n`

const templates = TRANSITIONS.map((t) => ({
  ...t,
  content: banner(t.slug) + readFileSync(join(SRC_DIR, `${t.slug}.tsx`), "utf-8"),
}))

const SOURCE = {
  name: "transitions.dev",
  url: "https://github.com/Jakubantalik/transitions.dev",
  license: "MIT",
  author: "Jakub Antalík",
}

function registryEntry({ slug, content }) {
  return {
    name: slug,
    type: "registry:ui",
    files: [
      {
        path: `components/ui/${slug}.tsx`,
        content,
        type: "registry:ui",
      },
    ],
    registryDependencies: ["utils"],
    meta: { shared: true, source: SOURCE },
  }
}

// Intra-registry dependencies must be absolute production URLs. A bare slug
// resolves against the shadcn default registry, not this one, and 404s.
const REGISTRY_BASE = "https://www.better-design.com/registry"

function metaEntry(ds) {
  return {
    name: "transitions",
    type: "registry:ui",
    files: [],
    registryDependencies: TRANSITIONS.map(
      (t) => `${REGISTRY_BASE}/${ds}/${t.slug}.json`,
    ),
    meta: { shared: true, source: SOURCE },
  }
}

// Legacy single-file artifact we no longer ship.
const LEGACY = "transitions.tsx"

let dsCount = 0
for (const ds of dsList) {
  const uiDir = join(componentsDir, ds, "components/ui")
  const regDsDir = join(registryDir, ds)
  mkdirSync(uiDir, { recursive: true })
  mkdirSync(regDsDir, { recursive: true })

  for (const t of templates) {
    writeFileSync(join(uiDir, `${t.slug}.tsx`), t.content)
    writeFileSync(
      join(regDsDir, `${t.slug}.json`),
      JSON.stringify(registryEntry(t), null, 2) + "\n",
    )
  }

  writeFileSync(
    join(regDsDir, "transitions.json"),
    JSON.stringify(metaEntry(ds), null, 2) + "\n",
  )

  const legacyTsx = join(uiDir, LEGACY)
  if (existsSync(legacyTsx)) unlinkSync(legacyTsx)

  dsCount++
}

console.log(
  `Wrote ${TRANSITIONS.length} transition components + 1 meta entry to ${dsCount} design systems.`,
)

// The root discovery index is derived from the files just written, so refresh
// it here rather than relying on the next person remembering a second script.
execFileSync(process.execPath, [join(root, "scripts", "generate-registry-json.mjs")], {
  stdio: "inherit",
})
