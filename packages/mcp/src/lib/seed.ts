import { config } from "dotenv";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateEmbedding } from "./embeddings.js";
import { upsertDesignSystem, upsertFoundationalDoc } from "./db.js";
import type {
  DesignSystem,
  DesignSystemMetadata,
  DesignSystemComponent,
} from "./types.js";

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env") });

const CONTENT_BASE_PATH = join(__dirname, "..", "..", "..", "..");

interface DesignSystemConfig {
  id: string;
  title: string;
  description: string;
  personality: string[];
  industry: string[];
}

const DESIGN_SYSTEM_METADATA: Record<string, DesignSystemConfig> = {
  linear: {
    id: "linear",
    title: "Linear Design System",
    description:
      "Clean, minimal design for developer tools with dark theme and purple accents",
    personality: ["minimal", "clean", "professional", "focused", "dark"],
    industry: ["developer-tools", "productivity", "saas"],
  },
  "linear-quality": {
    id: "linear",
    title: "Linear Design System",
    description:
      "Clean, minimal design for developer tools with dark theme and purple accents",
    personality: ["minimal", "clean", "professional", "focused", "dark"],
    industry: ["developer-tools", "productivity", "saas"],
  },
  airbnb: {
    id: "airbnb",
    title: "Airbnb Design System",
    description:
      "Warm, inviting design for travel and hospitality with coral accents",
    personality: ["warm", "friendly", "inviting", "trustworthy", "accessible"],
    industry: ["travel", "hospitality", "marketplace", "consumer"],
  },
  supabase: {
    id: "supabase",
    title: "Supabase Design System",
    description: "Modern dark theme for developer platforms with green accents",
    personality: ["modern", "technical", "developer-friendly", "dark", "bold"],
    industry: ["developer-tools", "database", "backend", "saas"],
  },
  "corporate-fintech": {
    id: "corporate-fintech",
    title: "Column Design System",
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
  "dark-orange": {
    id: "dark-orange",
    title: "Sharp Dark",
    description:
      "Dark landing-page style with orange (#F05023) accents, 10px radius, and precise layered shadows",
    personality: ["bold", "dark", "precise", "modern", "professional"],
    industry: ["saas", "developer-tools", "productivity", "enterprise"],
  },
  "precision-light": {
    id: "precision-light",
    title: "Sharp Light",
    description:
      "Light theme with charcoal near-black primary, precision multi-layer shadows with 1px outer ring, blue #335cff focus rings, Inter font, 10px radius",
    personality: ["clean", "precise", "light", "modern", "refined"],
    industry: ["saas", "developer-tools", "productivity", "enterprise"],
  },
  "vibrant-dark": {
    id: "vibrant-dark",
    title: "Dynamic",
    description:
      "Modern dark-theme with pill-shaped components and vibrant blue primary",
    personality: ["bold", "modern", "dark", "vibrant", "dynamic"],
    industry: ["saas", "consumer", "developer-tools", "startup"],
  },
  "minimal-light": {
    id: "minimal-light",
    title: "Luxe",
    description:
      "Light minimal design with black primary, no shadows, border-only cards, Geist Sans font, and 12px radius — clean luxury aesthetic",
    personality: ["luxury", "minimal", "premium", "clean", "sophisticated"],
    industry: ["fashion", "luxury", "creative", "portfolio", "lifestyle"],
  },
  "neutral-monochrome": {
    id: "neutral-monochrome",
    title: "Earthy",
    description:
      "Warm earthy dark theme with terracotta accents and cream typography for refined SaaS",
    personality: ["warm", "earthy", "refined", "dark", "artisan"],
    industry: ["saas", "creative", "design-tools", "content", "startup"],
  },
  "light-marketplace": {
    id: "light-marketplace",
    title: "Energetic",
    description:
      "High-contrast light theme with charcoal buttons and bold rounded corners for marketplaces",
    personality: ["bold", "high-contrast", "clean", "energetic", "modern"],
    industry: ["marketplace", "ecommerce", "consumer", "startup", "creative"],
  },
  apple: {
    id: "apple",
    title: "Apple Design System",
    description:
      "Clean light theme with pill-shaped buttons, blue primary, SF Pro typography, and precise whitespace",
    personality: ["clean", "minimal", "premium", "light", "refined"],
    industry: ["consumer", "lifestyle", "technology", "creative", "startup"],
  },
  vercel: {
    id: "vercel",
    title: "Vercel Design System",
    description:
      "Stark dark theme with black background, white primary, and minimal monochrome aesthetic",
    personality: ["minimal", "dark", "sharp", "monochrome", "developer-focused"],
    industry: ["developer-tools", "infrastructure", "saas", "startup"],
  },
  "editorial-dark": {
    id: "editorial-dark",
    title: "Editorial Dark",
    description:
      "Dark editorial theme with serif display type, flat no-shadow cards, generous radius, and content-first layout",
    personality: ["dark", "editorial", "refined", "serif", "content-first"],
    industry: ["publishing", "media", "education", "creative", "lifestyle"],
  },
  "cinematic-dark": {
    id: "cinematic-dark",
    title: "Cinema Design System",
    description:
      "Cinematic dark theme with deep navy background, high contrast white text, and dramatic visual weight",
    personality: ["dark", "dramatic", "immersive", "bold", "cinematic"],
    industry: ["entertainment", "media", "streaming", "creative", "consumer"],
  },
  notion: {
    id: "notion",
    title: "Notion Design System",
    description:
      "Clean light theme with warm off-white background, near-black text, and understated minimal styling",
    personality: ["clean", "minimal", "light", "warm", "productivity"],
    industry: ["productivity", "saas", "tools", "education", "enterprise"],
  },
  figma: {
    id: "figma",
    title: "Figma Design System",
    description:
      "Light theme with vibrant purple primary, clean white backgrounds, and design-tool precision",
    personality: ["vibrant", "light", "clean", "creative", "precise"],
    industry: ["design-tools", "creative", "developer-tools", "saas"],
  },
  stripe: {
    id: "stripe",
    title: "Stripe Design System",
    description:
      "Light professional theme with deep navy text, indigo-purple primary, and financial-grade polish",
    personality: ["professional", "trustworthy", "clean", "light", "polished"],
    industry: ["fintech", "payments", "saas", "enterprise", "developer-tools"],
  },
};

function extractCSSVariable(css: string, varName: string): string | undefined {
  const pattern = new RegExp(`${varName}:\\s*([^;]+);`);
  const match = css.match(pattern);
  return match?.[1]?.trim();
}

function createEmbeddingText(config: DesignSystemConfig): string {
  return [
    config.title,
    config.description,
    `Personality: ${config.personality.join(", ")}`,
    `Industry: ${config.industry.join(", ")}`,
  ].join(". ");
}

function parseProjectFolder(
  projectPath: string,
  config: DesignSystemConfig,
): DesignSystem {
  const componentsDir = join(projectPath, "components");
  const globalsPath = join(projectPath, "globals.css");

  const metadata: DesignSystemMetadata = {
    id: config.id,
    title: config.title,
    description: config.description,
    personality: config.personality,
    industry: config.industry,
    componentCount: 0,
  };

  // Parse globals.css for design tokens
  if (existsSync(globalsPath)) {
    const globalsContent = readFileSync(globalsPath, "utf-8");
    metadata.primaryColor = extractCSSVariable(globalsContent, "--primary");
    metadata.borderRadius = extractCSSVariable(globalsContent, "--radius");
  }

  // Read components
  const components: DesignSystemComponent[] = [];

  if (existsSync(componentsDir)) {
    const files = readdirSync(componentsDir).filter(
      (f) => f.endsWith(".tsx") || f.endsWith(".ts"),
    );

    for (const file of files) {
      const name = file.replace(/\.(tsx|ts)$/, "");
      const content = readFileSync(join(componentsDir, file), "utf-8");

      components.push({
        name,
        description: "",
        language: file.endsWith(".tsx") ? "tsx" : "ts",
        destination: `components/ui/${file}`,
        code: content,
      });
    }
  }

  // Add globals as a component
  if (existsSync(globalsPath)) {
    const globalsContent = readFileSync(globalsPath, "utf-8");
    components.unshift({
      name: "globals",
      description: `Global CSS styles and design tokens for ${config.title}`,
      language: "css",
      destination: "globals.css",
      code: globalsContent,
    });
  }

  // Add per-DS utils.ts as lib/utils.ts (holds the cn() helper)
  const utilsPath = join(projectPath, "utils.ts");
  if (existsSync(utilsPath)) {
    components.push({
      name: "lib-utils",
      description: `Tailwind cn() helper for ${config.title}`,
      language: "ts",
      destination: "lib/utils.ts",
      code: readFileSync(utilsPath, "utf-8"),
    });
  }

  metadata.componentCount = components.length;

  // Build raw content for search
  const rawContent = [
    `# ${config.title}`,
    config.description,
    `Personality: ${config.personality.join(", ")}`,
    `Industry: ${config.industry.join(", ")}`,
    `Components: ${components.map((c) => c.name).join(", ")}`,
  ].join("\n\n");

  return { metadata, components, rawContent };
}

async function seedDesignSystems() {
  const designSystemsPath = join(CONTENT_BASE_PATH, "design-systems");

  if (!existsSync(designSystemsPath)) {
    console.error(`Design systems directory not found: ${designSystemsPath}`);
    return;
  }

  const entries = readdirSync(designSystemsPath, { withFileTypes: true });
  const projectDirs = entries
    .filter((e) => e.isDirectory() && DESIGN_SYSTEM_METADATA[e.name])
    .map((e) => e.name);

  console.log(`Found ${projectDirs.length} design system projects`);

  for (const dirName of projectDirs) {
    const config = DESIGN_SYSTEM_METADATA[dirName];
    if (!config) {
      console.log(`  ⚠ Skipping ${dirName}: no metadata configured`);
      continue;
    }

    console.log(`\nProcessing: ${dirName}`);
    try {
      const projectPath = join(designSystemsPath, dirName);
      const designSystem = parseProjectFolder(projectPath, config);

      // Generate embedding
      const embeddingText = createEmbeddingText(config);
      console.log(`  Generating embedding for: ${config.id}`);
      const embedding = await generateEmbedding(embeddingText);

      // Upsert to database
      console.log(`  Upserting to database...`);
      await upsertDesignSystem(designSystem, embedding);

      console.log(
        `  ✓ ${config.id}: ${designSystem.metadata.componentCount} components`,
      );
    } catch (err) {
      console.error(`  ✗ Failed:`, err);
    }
  }
}

async function seedFoundationalDocs() {
  const foundationalFiles = [
    { file: "hierarchy.md", id: "hierarchy", title: "Visual Hierarchy" },
    { file: "layout-spacing.md", id: "layout-spacing", title: "Spacing & Layout" },
    { file: "typography.md", id: "typography", title: "Typography" },
    { file: "colors.md", id: "colors", title: "Color System" },
    { file: "depth.md", id: "depth", title: "Shadows & Depth" },
    { file: "images.md", id: "images", title: "Image Guidelines" },
    { file: "finishing-touches.md", id: "finishing-touches", title: "UI Polish" },
    { file: "borders.md", id: "borders", title: "Shadows vs Borders" },
    { file: "animation.md", id: "animation", title: "Animation Guidelines" },
    { file: "animation-patterns.md", id: "animation-patterns", title: "Animation Patterns" },
    { file: "design-process.md", id: "design-process", title: "Design Process" },
    { file: "forms.md", id: "forms", title: "Form Behavior & Patterns" },
    { file: "interactions.md", id: "interactions", title: "Interactions & Accessibility" },
    { file: "scroll-link-effect.md", id: "scroll-link-effect", title: "Scroll-Linked Effects" },
    { file: "shadcn-components.md", id: "shadcn-components", title: "Shadcn/UI Components" },
  ];

  console.log(`\nProcessing ${foundationalFiles.length} foundational docs`);

  for (const { file, id, title } of foundationalFiles) {
    const filePath = join(CONTENT_BASE_PATH, "docs", file);

    if (!existsSync(filePath)) {
      console.log(`  ⚠ Skipping ${file}: not found`);
      continue;
    }

    try {
      console.log(`\nProcessing: ${file}`);
      const content = readFileSync(filePath, "utf-8");

      // Generate embedding from first 2000 chars (summary)
      const embeddingText = content.slice(0, 2000);
      console.log(`  Generating embedding...`);
      const embedding = await generateEmbedding(embeddingText);

      // Upsert to database
      console.log(`  Upserting to database...`);
      await upsertFoundationalDoc(id, title, content, embedding);

      console.log(`  ✓ ${id}`);
    } catch (err) {
      console.error(`  ✗ Failed:`, err);
    }
  }
}

async function main() {
  console.log("=== Design Systems Database Seeder ===\n");
  console.log(`Content path: ${CONTENT_BASE_PATH}`);

  await seedDesignSystems();
  await seedFoundationalDocs();

  console.log("\n=== Seeding complete ===");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
