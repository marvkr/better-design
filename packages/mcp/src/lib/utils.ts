import type {
  SearchResult,
  DesignSystem,
  DesignSystemComponent,
} from "./types.js";
import type { IconLibrary, IconLibrarySearchResult } from "./db.js";

const REGISTRY_BASE_URL = "https://design-systems.dev/registry";

export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "No design systems found matching your query.";
  }

  return results.map(formatSearchResult).join("\n\n----------\n\n");
}

function formatSearchResult(result: SearchResult): string {
  const registryUrl = `${REGISTRY_BASE_URL}/${result.id}`;
  return [
    `**ID:** ${result.id}`,
    `**Title:** ${result.title}`,
    `**Description:** ${result.description}`,
    `**Personality:** ${result.personality.join(", ")}`,
    `**Industry:** ${result.industry.join(", ")}`,
    `**Components:** ${result.componentCount}`,
    `**Registry:** ${registryUrl}`,
  ].join("\n");
}

export function formatDesignSystemDocs(system: DesignSystem): string {
  const parts: string[] = [];
  const registryUrl = `${REGISTRY_BASE_URL}/${system.metadata.id}`;

  // Header with metadata
  parts.push(`# ${system.metadata.title}\n`);
  parts.push(`**Description:** ${system.metadata.description}`);
  parts.push(`**Personality:** ${system.metadata.personality.join(", ")}`);
  parts.push(`**Industry:** ${system.metadata.industry.join(", ")}`);

  if (system.metadata.primaryColor) {
    parts.push(`**Primary Color:** ${system.metadata.primaryColor}`);
  }
  if (system.metadata.borderRadius) {
    parts.push(`**Border Radius:** ${system.metadata.borderRadius}`);
  }
  if (system.metadata.font) {
    parts.push(`**Font:** ${system.metadata.font}`);
  }

  // Installation instructions
  parts.push("\n## Installation\n");
  parts.push("Install components using the shadcn CLI:");
  parts.push("```bash");
  parts.push(`npx shadcn@latest add <component> --registry ${registryUrl}`);
  parts.push("```");

  parts.push("\n---\n");

  // Format all components (filtering already done at DB level)
  for (const component of system.components) {
    parts.push(formatComponent(component));
  }

  return parts.join("\n");
}

function formatComponent(component: DesignSystemComponent): string {
  const lines: string[] = [];

  const capitalizedName =
    component.name.charAt(0).toUpperCase() + component.name.slice(1);
  lines.push(`## ${capitalizedName}`);
  lines.push(`**Description:** ${component.description}`);

  if (component.useCases?.length) {
    lines.push(`**Use Cases:** ${component.useCases.join(", ")}`);
  }

  lines.push(`**File:** ${component.destination}`);
  lines.push("");
  lines.push("```" + component.language);
  lines.push(component.code);
  lines.push("```");
  lines.push("");

  return lines.join("\n");
}

// Icon library formatting

export function formatIconLibrarySearchResults(
  results: IconLibrarySearchResult[],
): string {
  if (results.length === 0) {
    return "No icon libraries found matching your query.";
  }

  return results.map(formatIconLibraryResult).join("\n\n----------\n\n");
}

function formatIconLibraryResult(result: IconLibrarySearchResult): string {
  const lines = [
    `**ID:** ${result.id}`,
    `**Name:** ${result.name}`,
    `**Prefix:** ${result.prefix}`,
    `**Style:** ${result.tags.join(", ")}`,
  ];

  if (result.description) {
    lines.push(`**Description:** ${result.description}`);
  }

  if (result.variants && result.variants.length > 0) {
    lines.push(`**Variants:** ${result.variants.join(", ")}`);
    lines.push(`**Default Variant:** ${result.defaultVariant || result.variants[0]}`);
  }

  if (result.iconCount) {
    lines.push(`**Icon Count:** ${result.iconCount.toLocaleString()}`);
  }

  lines.push(`**Match Score:** ${result.matchScore.toFixed(0)}%`);

  return lines.join("\n");
}

export function formatIconSearchResults(
  icons: string[],
  library: IconLibrary,
  variant?: string,
): string {
  const actualVariant = variant || library.defaultVariant || "default";

  if (icons.length === 0) {
    return `No icons found in ${library.name}.`;
  }

  const lines = [
    `# Icons from ${library.name} (${actualVariant} style)`,
    "",
    "Use with Iconify React:",
    "```tsx",
    'import { Icon } from "@iconify/react";',
    "```",
    "",
    "Found icons:",
    "",
    ...icons.map((icon) => `- \`<Icon icon="${icon}" />\``),
  ];

  return lines.join("\n");
}

export function formatIconWithVariant(
  iconName: string,
  library: IconLibrary,
  variant?: string,
): string {
  const actualVariant = variant || library.defaultVariant;

  // If no variant or default variant, return as-is
  if (!actualVariant || actualVariant === "default" || actualVariant === "regular") {
    return iconName;
  }

  // Check if icon already has variant suffix
  if (library.variants?.some((v) => iconName.endsWith(`-${v}`))) {
    return iconName;
  }

  // Apply variant suffix
  return `${iconName}-${actualVariant}`;
}
