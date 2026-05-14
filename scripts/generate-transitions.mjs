#!/usr/bin/env node
/**
 * Distributes the 9 transition components (ported from transitions.dev) to
 * every design system and generates matching shadcn registry JSON files.
 *
 * Source of truth: components/airbnb/components/ui/<slug>.tsx
 * Output per DS:
 *   - components/<ds>/components/ui/<slug>.tsx       (identical copy)
 *   - registry/<ds>/<slug>.json                       (shadcn registry entry)
 *   - registry/<ds>/transitions.json                  (meta — installs all 9)
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
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const TEMPLATE_DS = "airbnb"

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

const templates = TRANSITIONS.map((t) => ({
  ...t,
  content: readFileSync(
    join(componentsDir, TEMPLATE_DS, "components/ui", `${t.slug}.tsx`),
    "utf-8",
  ),
}))

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
  }
}

function metaEntry() {
  return {
    name: "transitions",
    type: "registry:ui",
    files: [],
    registryDependencies: TRANSITIONS.map((t) => t.slug),
  }
}

// Legacy single-file artifact we no longer ship.
const LEGACY = "transitions.tsx"

let dsCount = 0
for (const ds of dsList) {
  const uiDir = join(componentsDir, ds, "components/ui")
  const regDsDir = join(registryDir, ds)

  for (const t of templates) {
    writeFileSync(join(uiDir, `${t.slug}.tsx`), t.content)
    writeFileSync(
      join(regDsDir, `${t.slug}.json`),
      JSON.stringify(registryEntry(t), null, 2) + "\n",
    )
  }

  writeFileSync(
    join(regDsDir, "transitions.json"),
    JSON.stringify(metaEntry(), null, 2) + "\n",
  )

  const legacyTsx = join(uiDir, LEGACY)
  if (existsSync(legacyTsx)) unlinkSync(legacyTsx)

  dsCount++
}

console.log(
  `Wrote ${TRANSITIONS.length} transition components + 1 meta entry to ${dsCount} design systems.`,
)
