#!/usr/bin/env node
/**
 * Distributes the transitions.tsx component (ported from transitions.dev)
 * to all design systems and generates matching shadcn registry JSON files.
 *
 * Source of truth: components/airbnb/components/ui/transitions.tsx
 * Output per DS:
 *   - components/<ds>/components/ui/transitions.tsx  (identical copy)
 *   - registry/<ds>/transitions.json                  (shadcn registry entry)
 *
 * Run: node scripts/generate-transitions.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const TEMPLATE_PATH = join(root, "components/airbnb/components/ui/transitions.tsx")
const TEMPLATE = readFileSync(TEMPLATE_PATH, "utf-8")

const componentsDir = join(root, "components")
const registryDir = join(root, "registry")

const dsList = readdirSync(componentsDir).filter((name) => {
  const stat = statSync(join(componentsDir, name))
  return stat.isDirectory()
})

const REGISTRY_TEMPLATE = {
  name: "transitions",
  type: "registry:ui",
  files: [
    {
      path: "components/ui/transitions.tsx",
      content: TEMPLATE,
      type: "registry:ui",
    },
  ],
  dependencies: ["@iconify/react"],
  registryDependencies: ["utils"],
}

let written = 0
for (const ds of dsList) {
  const tsxPath = join(componentsDir, ds, "components/ui/transitions.tsx")
  writeFileSync(tsxPath, TEMPLATE)
  const jsonPath = join(registryDir, ds, "transitions.json")
  writeFileSync(jsonPath, JSON.stringify(REGISTRY_TEMPLATE, null, 2) + "\n")
  written++
}

console.log(`Wrote transitions.tsx + transitions.json to ${written} design systems.`)
