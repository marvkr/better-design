import { shadcnCatalog } from "./catalogs/shadcn-catalog";

export interface ValidationResult {
  isValid: boolean;
  missing: string[];
  generated: string[];
  custom: string[];
  total: number;
  hasDocSite: boolean;
  docSiteMissing: string[];
}

/**
 * Convert component name to kebab-case for URL paths
 * Example: "ButtonGroup" -> "button-group", "AlertDialog" -> "alert-dialog"
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Validate that all required documentation site files were generated
 *
 * @param files - Generated files from the code agent
 * @returns Validation result with missing files and components
 */
export function validateDesignSystem(
  files: Record<string, string>
): ValidationResult {
  // Required documentation site structure
  const requiredDocFiles = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/sidebar.tsx",
    "app/code-block.tsx",
    "app/custom/icons/page.tsx", // Icons page is required
  ];

  // Check for required doc site files
  const docSiteMissing = requiredDocFiles.filter(path => !(path in files));
  const hasDocSite = docSiteMissing.length === 0;

  // Extract primitive component pages from generated files
  const primitivePages = Object.keys(files)
    .filter(f => f.startsWith("app/primitives/") && f.endsWith("/page.tsx"))
    .map(f => {
      // Extract component name from path: app/primitives/button/page.tsx -> button
      const match = f.match(/app\/primitives\/(.+)\/page\.tsx/);
      return match ? match[1] : "";
    })
    .filter(Boolean);

  // Convert primitive page names back to PascalCase to match shadcn catalog
  const generated = primitivePages.map(kebabName => {
    // Find matching component in catalog (case-insensitive)
    const catalogEntry = Object.keys(shadcnCatalog).find(
      name => toKebabCase(name) === kebabName
    );
    return catalogEntry || kebabName;
  });

  // Get required shadcn components
  const required = Object.keys(shadcnCatalog);

  // Find missing components
  const missing = required.filter(name => !generated.includes(name));

  // Extract custom component pages
  const customPages = Object.keys(files)
    .filter(f => f.startsWith("app/custom/") && f.endsWith("/page.tsx"))
    .map(f => {
      const match = f.match(/app\/custom\/(.+)\/page\.tsx/);
      return match ? match[1] : "";
    })
    .filter(Boolean);

  return {
    isValid: missing.length === 0 && hasDocSite,
    missing,
    generated,
    custom: customPages,
    total: generated.length + customPages.length,
    hasDocSite,
    docSiteMissing,
  };
}

/**
 * Format validation result for logging
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  // Doc site structure validation
  if (!result.hasDocSite) {
    lines.push("⚠️  Documentation site structure incomplete:");
    result.docSiteMissing.forEach(path => {
      lines.push(`  - Missing: ${path}`);
    });
    lines.push("");
  } else {
    lines.push("✓ Documentation site structure complete");
  }

  // Component validation
  lines.push(`Generated ${result.total} component pages:`);
  lines.push(`- ${result.generated.length} primitive components`);
  lines.push(`- ${result.custom.length} custom components`);

  if (result.missing.length > 0) {
    lines.push(`\n⚠️  Missing ${result.missing.length} required primitive pages:`);
    result.missing.forEach(name => {
      const def = shadcnCatalog[name];
      const kebabName = toKebabCase(name);
      lines.push(`  - ${name} → app/primitives/${kebabName}/page.tsx (${def?.category})`);
    });
  } else {
    lines.push("\n✓ All required primitive component pages generated");
  }

  if (result.custom.length > 0) {
    lines.push(`\n✓ Custom component pages:`);
    result.custom.forEach(name => {
      lines.push(`  - ${name} → app/custom/${name}/page.tsx`);
    });
  }

  return lines.join("\n");
}

/**
 * Check if Foundations pages exist
 */
export function validateFoundations(
  files: Record<string, string>
): {
  hasFoundations: boolean;
  missing: string[];
} {
  const requiredFoundations = [
    "app/foundations/colors/page.tsx",
    "app/foundations/surfaces/page.tsx",
    "app/foundations/typography/page.tsx",
  ];

  const missing = requiredFoundations.filter(path => !(path in files));

  return {
    hasFoundations: missing.length === 0,
    missing,
  };
}
