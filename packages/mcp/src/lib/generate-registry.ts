#!/usr/bin/env npx tsx

import * as fs from "fs";
import * as path from "path";

const DESIGN_SYSTEMS_DIR = path.resolve(
  import.meta.dirname,
  "../../../../design-systems",
);
const REGISTRY_OUTPUT_DIR = path.resolve(
  import.meta.dirname,
  "../../../../packages/web/public/registry",
);

interface DesignSystemConfig {
  id: string;
  label: string;
  description: string;
  personality: string[];
  industry: string[];
}

const DESIGN_SYSTEM_METADATA: Record<string, DesignSystemConfig> = {
  linear: {
    id: "linear",
    label: "Linear Design System",
    description:
      "Clean, minimal design for developer tools with dark theme and purple accents",
    personality: ["minimal", "clean", "professional", "focused", "dark"],
    industry: ["developer-tools", "productivity", "saas"],
  },
  airbnb: {
    id: "airbnb",
    label: "Airbnb Design System",
    description:
      "Warm, inviting design for travel and hospitality with coral accents",
    personality: ["warm", "friendly", "inviting", "trustworthy", "accessible"],
    industry: ["travel", "hospitality", "marketplace", "consumer"],
  },
  supabase: {
    id: "supabase",
    label: "Supabase Design System",
    description: "Modern dark theme for developer platforms with green accents",
    personality: ["modern", "technical", "developer-friendly", "dark", "bold"],
    industry: ["developer-tools", "database", "backend", "saas"],
  },
  "corporate-fintech": {
    id: "corporate-fintech",
    label: "Column Design System",
    description:
      "Professional, trustworthy design for fintech with blue accents",
    personality: [
      "professional",
      "trustworthy",
      "clean",
      "reliable",
      "minimal",
    ],
    industry: ["fintech", "banking", "financial-services", "enterprise"],
  },
};

interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:style";
}

interface RegistryComponent {
  name: string;
  type: "registry:ui" | "registry:style";
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  cssVars?: {
    light: Record<string, string>;
    dark?: Record<string, string>;
  };
}

interface RegistryStyle {
  name: string;
  label: string;
}

interface RegistryManifest {
  name: string;
  baseUrl: string;
  styles: RegistryStyle[];
}

function extractCSSVariablesFromBlock(
  cssBlock: string,
): Record<string, string> {
  const vars: Record<string, string> = {};
  const varPattern = /--([\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = varPattern.exec(cssBlock)) !== null) {
    vars[`--${match[1]}`] = match[2].trim();
  }
  return vars;
}

function extractCSSVariables(cssCode: string): {
  light: Record<string, string>;
  dark?: Record<string, string>;
} {
  const rootMatch = cssCode.match(/:root\s*\{([^}]+)\}/s);
  const darkMatch = cssCode.match(/\.dark\s*\{([^}]+)\}/s);

  const light = rootMatch ? extractCSSVariablesFromBlock(rootMatch[1]) : {};
  const dark = darkMatch
    ? extractCSSVariablesFromBlock(darkMatch[1])
    : undefined;

  return { light, dark };
}

function extractDependencies(code: string): string[] {
  const deps: string[] = [];
  const importPattern = /from\s+["'](@?[^"'.][^"']*?)["']/g;
  let match;

  while ((match = importPattern.exec(code)) !== null) {
    const raw = match[1];
    // Normalize sub-path imports (e.g. "motion/react" → "motion")
    const pkg = raw.startsWith("motion/") ? "motion" : raw;
    if (
      pkg.startsWith("@radix-ui/") ||
      pkg === "class-variance-authority" ||
      pkg === "clsx" ||
      pkg === "tailwind-merge" ||
      pkg === "lucide-react" ||
      pkg === "date-fns" ||
      pkg === "react-day-picker" ||
      pkg === "cmdk" ||
      pkg === "embla-carousel-react" ||
      pkg === "react-resizable-panels" ||
      pkg === "recharts" ||
      pkg === "vaul" ||
      pkg === "sonner" ||
      pkg === "next-themes" ||
      pkg === "input-otp" ||
      pkg === "motion"
    ) {
      deps.push(pkg);
    }
  }

  return [...new Set(deps)];
}

function extractRegistryDependencies(code: string): string[] {
  const deps: string[] = [];

  // Check for imports from @/components/ui/
  const uiImportPattern = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
  let match;

  while ((match = uiImportPattern.exec(code)) !== null) {
    deps.push(match[1]);
  }

  // Check for imports from @/lib/utils
  if (code.includes("@/lib/utils")) {
    deps.push("utils");
  }

  return [...new Set(deps)];
}

async function generateRegistry(): Promise<void> {
  console.log("🎨 Generating shadcn registry from project folders...\n");

  // Clean output directory
  if (fs.existsSync(REGISTRY_OUTPUT_DIR)) {
    fs.rmSync(REGISTRY_OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(REGISTRY_OUTPUT_DIR, { recursive: true });

  const entries = fs.readdirSync(DESIGN_SYSTEMS_DIR, { withFileTypes: true });
  const projectDirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name);

  const styles: RegistryStyle[] = [];

  for (const dirName of projectDirs) {
    const config = DESIGN_SYSTEM_METADATA[dirName] ?? {
      id: dirName,
      label: dirName
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
      description: `${dirName} design system`,
      personality: [],
      industry: [],
    };

    const projectPath = path.join(DESIGN_SYSTEMS_DIR, dirName);
    const componentsDir = path.join(projectPath, "components");
    const globalsPath = path.join(projectPath, "globals.css");

    if (!fs.existsSync(componentsDir)) {
      console.log(`⚠️  Skipping ${dirName}: No components/ui directory`);
      continue;
    }

    console.log(`📦 Processing: ${config.label} (${config.id})`);

    const systemDir = path.join(REGISTRY_OUTPUT_DIR, config.id);
    fs.mkdirSync(systemDir, { recursive: true });

    styles.push({
      name: config.id,
      label: config.label,
    });

    // Read and parse globals.css
    let cssVars: {
      light: Record<string, string>;
      dark?: Record<string, string>;
    } = { light: {} };
    if (fs.existsSync(globalsPath)) {
      const globalsContent = fs.readFileSync(globalsPath, "utf-8");
      cssVars = extractCSSVariables(globalsContent);

      // Create globals registry entry
      const globalsRegistry: RegistryComponent = {
        name: "globals",
        type: "registry:style",
        description: `Global CSS styles and design tokens for ${config.label}`,
        files: [
          {
            path: "globals.css",
            content: globalsContent,
            type: "registry:style",
          },
        ],
        cssVars,
      };
      fs.writeFileSync(
        path.join(systemDir, "globals.json"),
        JSON.stringify(globalsRegistry, null, 2),
      );
      console.log(`   ✓ globals`);
    }

    // Process all component files
    const componentFiles = fs
      .readdirSync(componentsDir)
      .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    const componentIndex: Array<{
      name: string;
      registryDependencies?: string[];
    }> = [];

    for (const file of componentFiles) {
      const componentName = file.replace(/\.(tsx|ts)$/, "");
      const filePath = path.join(componentsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      const dependencies = extractDependencies(content);
      const registryDependencies = extractRegistryDependencies(content);

      const registryComponent: RegistryComponent = {
        name: componentName,
        type: "registry:ui",
        files: [
          {
            path: `components/ui/${file}`,
            content,
            type: "registry:ui",
          },
        ],
      };

      if (dependencies.length > 0) {
        registryComponent.dependencies = dependencies;
      }

      if (registryDependencies.length > 0) {
        registryComponent.registryDependencies = registryDependencies;
      }

      // Add CSS vars to button component for easy theming
      if (componentName === "button") {
        registryComponent.cssVars = cssVars;
      }

      fs.writeFileSync(
        path.join(systemDir, `${componentName}.json`),
        JSON.stringify(registryComponent, null, 2),
      );

      componentIndex.push({
        name: componentName,
        ...(registryDependencies.length > 0 && { registryDependencies }),
      });

      console.log(`   ✓ ${componentName}`);
    }

    // Create style index
    const styleIndex = {
      name: config.id,
      label: config.label,
      description: config.description,
      personality: config.personality,
      industry: config.industry,
      componentCount: componentIndex.length + 1, // +1 for globals
      components: componentIndex,
    };
    fs.writeFileSync(
      path.join(systemDir, "index.json"),
      JSON.stringify(styleIndex, null, 2),
    );
  }

  // Create main manifest
  const manifest: RegistryManifest = {
    name: "design-systems",
    baseUrl: "https://www.better-design.com/registry",
    styles,
  };

  fs.writeFileSync(
    path.join(REGISTRY_OUTPUT_DIR, "index.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(`\n✅ Registry generated at: ${REGISTRY_OUTPUT_DIR}`);
  console.log(`   ${styles.length} design systems`);
  console.log(`   Components available for installation via:`);
  console.log(
    `   npx shadcn@latest add https://www.better-design.com/registry/linear/button.json`,
  );
}

generateRegistry().catch(console.error);
