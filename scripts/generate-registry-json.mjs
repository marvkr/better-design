#!/usr/bin/env node
// Generates the root shadcn registry index at registry/registry.json.
//
// This is the file the shadcn registry directory (registries.json) points at
// via the @better-design namespace. Users install with:
//
//   npx shadcn@latest add @better-design/<design-system>/<component>
//
// which the CLI resolves against the directory `url` template
//   https://www.better-design.com/registry/{name}.json
// where {name} == "<design-system>/<component>" — i.e. the existing
// registry/<ds>/<component>.json files, untouched.
//
// Directory requirements honored here:
//   - flat top-level registry.json at the registry root
//   - items[].files lists { path, type } ONLY — never `content`
//
// Usage: node scripts/generate-registry-json.mjs   (idempotent — overwrites)

import { readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const registryRoot = join(repoRoot, "registry")

const HOMEPAGE = "https://www.better-design.com"
const SCHEMA = "https://ui.shadcn.com/schema/registry.json"

// "alert-dialog" -> "Alert Dialog", "input-otp" -> "Input Otp"
const titleCase = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

const isDir = (entry) => entry.isDirectory()

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"))
}

// Normalize a registryDependency to a clean intra-registry slug.
// Source files are inconsistent: bare ("button"), absolute prod
// ("https://www.better-design.com/registry/airbnb/button.json"), and
// absolute localhost ("http://localhost:3000/registry/airbnb/button.json").
// In the discovery index every intra-registry dep becomes "<ds>/<component>"
// (matching an item name); externals like "utils" pass through untouched.
function normalizeDep(dep, ds, componentsInDs) {
  const urlMatch = dep.match(/\/registry\/([^/]+)\/([^/]+)\.json$/)
  if (urlMatch) return `${urlMatch[1]}/${urlMatch[2]}`
  if (componentsInDs.has(dep)) return `${ds}/${dep}`
  return dep
}

async function main() {
  const entries = await readdir(registryRoot, { withFileTypes: true })
  const designSystems = entries.filter(isDir).map((e) => e.name).sort()

  const items = []

  for (const ds of designSystems) {
    const dsDir = join(registryRoot, ds)

    // DS-level label/description from the per-DS manifest, when present.
    let dsLabel = titleCase(ds)
    try {
      const manifest = await readJson(join(dsDir, "index.json"))
      if (manifest.label) dsLabel = manifest.label
    } catch {
      // no index.json — fall back to title-cased slug
    }

    const files = (await readdir(dsDir))
      .filter((f) => f.endsWith(".json") && f !== "index.json")
      .sort()
    const componentsInDs = new Set(files.map((f) => f.replace(/\.json$/, "")))

    for (const file of files) {
      const component = file.replace(/\.json$/, "")
      const src = await readJson(join(dsDir, file))

      const isStyle = src.type === "registry:style"
      const componentTitle = titleCase(component)

      const item = {
        name: `${ds}/${component}`,
        type: src.type,
        title: `${dsLabel} — ${componentTitle}`,
        description: isStyle
          ? `${dsLabel} theme — CSS variables, tokens, and global styles.`
          : `${componentTitle} component themed for ${dsLabel}.`,
        // path + type ONLY — directory rule forbids `content` in registry.json
        files: (src.files || []).map((f) => ({ path: f.path, type: f.type })),
      }

      if (Array.isArray(src.registryDependencies) && src.registryDependencies.length) {
        item.registryDependencies = src.registryDependencies.map((dep) =>
          normalizeDep(dep, ds, componentsInDs)
        )
      }

      items.push(item)
    }
  }

  const registry = {
    $schema: SCHEMA,
    name: "better-design",
    homepage: HOMEPAGE,
    items,
  }

  const out = join(registryRoot, "registry.json")
  await writeFile(out, JSON.stringify(registry, null, 2) + "\n", "utf8")

  console.log(
    `Wrote ${out}\n  ${designSystems.length} design systems, ${items.length} items`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
