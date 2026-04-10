import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env") });

import { generateEmbedding } from "./embeddings.js";
import { upsertIconLibrary, type IconLibrary } from "./db.js";

// Curated tags and descriptions for icon libraries
const ICON_LIBRARY_METADATA: Record<
  string,
  {
    tags: string[];
    description: string;
    variants?: string[];
    defaultVariant?: string;
  }
> = {
  // === UI 24px - Popular modern icon sets ===
  tabler: {
    tags: [
      "bold",
      "technical",
      "professional",
      "modern",
      "comprehensive",
      "dashboard",
      "enterprise",
    ],
    description:
      "Bold, professional icons for technical and business applications",
    variants: ["outline", "filled"],
    defaultVariant: "outline",
  },
  solar: {
    tags: [
      "sleek",
      "contemporary",
      "versatile",
      "modern",
      "polished",
      "elegant",
      "premium",
    ],
    description: "Modern icon set with multiple styles from linear to duotone",
    variants: [
      "linear",
      "outline",
      "bold",
      "bold-duotone",
      "line-duotone",
      "broken",
    ],
    defaultVariant: "linear",
  },
  mingcute: {
    tags: [
      "cute",
      "friendly",
      "rounded",
      "playful",
      "modern",
      "consumer",
      "app",
    ],
    description: "Cute, friendly icons with rounded corners for consumer apps",
    variants: ["line", "fill"],
    defaultVariant: "line",
  },
  ri: {
    tags: [
      "versatile",
      "comprehensive",
      "balanced",
      "modern",
      "neutral",
      "all-purpose",
    ],
    description: "Versatile icon set suitable for any project type",
    variants: ["line", "fill"],
    defaultVariant: "line",
  },
  ph: {
    tags: [
      "friendly",
      "rounded",
      "warm",
      "approachable",
      "versatile",
      "consumer",
      "flexible",
    ],
    description:
      "Flexible icon family with 6 weights, perfect for friendly consumer apps",
    variants: ["regular", "bold", "duotone", "fill", "light", "thin"],
    defaultVariant: "regular",
  },
  iconoir: {
    tags: [
      "elegant",
      "soft",
      "refined",
      "sophisticated",
      "minimal",
      "luxury",
      "premium",
    ],
    description: "Elegant, refined icons for sophisticated applications",
    variants: ["default"],
    defaultVariant: "default",
  },
  heroicons: {
    tags: [
      "tailwind",
      "modern",
      "clean",
      "utility",
      "web",
      "developer",
      "solid",
    ],
    description: "Modern icons designed for Tailwind CSS projects",
    variants: ["outline", "solid", "mini"],
    defaultVariant: "outline",
  },
  feather: {
    tags: ["lightweight", "simple", "clean", "minimal", "airy", "open"],
    description: "Lightweight, simple icons with an open, airy feel",
    variants: ["default"],
    defaultVariant: "default",
  },
  carbon: {
    tags: [
      "ibm",
      "enterprise",
      "corporate",
      "professional",
      "systematic",
      "business",
    ],
    description: "IBM's enterprise-grade design system icons",
    variants: ["default"],
    defaultVariant: "default",
  },
  bi: {
    tags: [
      "bootstrap",
      "web",
      "framework",
      "comprehensive",
      "standard",
      "classic",
    ],
    description: "Bootstrap's comprehensive web icon library",
    variants: ["default"],
    defaultVariant: "default",
  },
  // === Material Design ===
  "material-symbols": {
    tags: [
      "google",
      "material",
      "android",
      "systematic",
      "adaptive",
      "variable",
    ],
    description: "Google's Material Design variable icons with optical sizing",
    variants: ["outlined", "rounded", "sharp"],
    defaultVariant: "outlined",
  },
  mdi: {
    tags: [
      "material",
      "comprehensive",
      "android",
      "google",
      "extensive",
      "complete",
    ],
    description:
      "Community-driven Material Design icons with extensive coverage",
    variants: ["default"],
    defaultVariant: "default",
  },
  // === Specialty ===
  "simple-icons": {
    tags: ["brands", "logos", "companies", "tech", "social", "corporate"],
    description: "Brand and company logos for tech and social platforms",
    variants: ["default"],
    defaultVariant: "default",
  },
  devicon: {
    tags: [
      "developer",
      "programming",
      "languages",
      "frameworks",
      "tech",
      "code",
    ],
    description: "Icons for programming languages and developer tools",
    variants: ["plain", "original"],
    defaultVariant: "plain",
  },
  "game-icons": {
    tags: ["gaming", "fantasy", "rpg", "creative", "illustrative", "detailed"],
    description: "Detailed icons for games, RPGs, and creative projects",
    variants: ["default"],
    defaultVariant: "default",
  },
  // === Fluent ===
  fluent: {
    tags: [
      "microsoft",
      "windows",
      "modern",
      "adaptive",
      "enterprise",
      "office",
    ],
    description: "Microsoft's Fluent design system icons",
    variants: ["regular", "filled"],
    defaultVariant: "regular",
  },
  // === Ant Design ===
  "ant-design": {
    tags: [
      "alibaba",
      "enterprise",
      "chinese",
      "comprehensive",
      "business",
      "dashboard",
    ],
    description: "Ant Design system icons for enterprise applications",
    variants: ["outlined", "filled", "twotone"],
    defaultVariant: "outlined",
  },
  // === Others ===
  ion: {
    tags: ["ionic", "mobile", "app", "cross-platform", "hybrid", "native"],
    description: "Ionic framework icons for mobile and hybrid apps",
    variants: ["outline", "sharp", "solid"],
    defaultVariant: "outline",
  },
  octicon: {
    tags: ["github", "developer", "git", "code", "repository", "open-source"],
    description: "GitHub's Octicons for developer tools and code projects",
    variants: ["default"],
    defaultVariant: "default",
  },
  "radix-icons": {
    tags: [
      "radix",
      "minimal",
      "accessible",
      "primitive",
      "component",
      "headless",
    ],
    description: "Minimal icons designed for Radix UI components",
    variants: ["default"],
    defaultVariant: "default",
  },
  hugeicons: {
    tags: [
      "huge",
      "comprehensive",
      "modern",
      "versatile",
      "extensive",
      "complete",
    ],
    description: "Comprehensive modern icon set with extensive coverage",
    variants: ["stroke", "solid", "duotone", "twotone", "bulk"],
    defaultVariant: "stroke",
  },
  "lets-icons": {
    tags: ["modern", "clean", "versatile", "balanced", "professional", "fresh"],
    description: "Modern, clean icons for versatile use cases",
    variants: ["line", "fill", "duotone"],
    defaultVariant: "line",
  },
};

// Category-based default tags for libraries without manual curation
const CATEGORY_TAGS: Record<string, string[]> = {
  "General": ["general", "utility", "versatile"],
  "Brands / Social": ["brands", "social", "logos", "companies"],
  "Emoji": ["emoji", "expressive", "fun", "colorful"],
  "Thematic": ["thematic", "specialized", "niche"],
  "Maps / Flags": ["maps", "flags", "geography", "location"],
  "Archive / Unmaintained": ["archive", "legacy", "classic"],
};

interface IconifyCollection {
  name: string;
  total: number;
  author?: { name: string };
  license?: { title?: string; spdx?: string };
  category?: string;
  palette?: boolean;
}

async function fetchIconifyCollections(): Promise<
  Record<string, IconifyCollection>
> {
  const response = await fetch("https://api.iconify.design/collections");
  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.status}`);
  }
  return response.json();
}

function getLibraryMetadata(
  id: string,
  collection: IconifyCollection,
): {
  tags: string[];
  description: string;
  variants: string[];
  defaultVariant: string;
} {
  const manual = ICON_LIBRARY_METADATA[id];

  if (manual) {
    return {
      tags: manual.tags,
      description: manual.description,
      variants: manual.variants || ["default"],
      defaultVariant: manual.defaultVariant || "default",
    };
  }

  // Generate tags based on category
  const categoryTags = collection.category
    ? CATEGORY_TAGS[collection.category] || ["ui", "icons"]
    : ["ui", "icons"];

  const tags = [
    ...categoryTags,
    collection.palette ? "colorful" : "monochrome",
    collection.total > 1000 ? "comprehensive" : "focused",
  ];

  const description = `${collection.name} icon set with ${collection.total} icons`;

  return {
    tags,
    description,
    variants: ["default"],
    defaultVariant: "default",
  };
}

async function seedIconLibraries() {
  console.log("Starting icon library seed for MCP...\n");

  const collections = await fetchIconifyCollections();
  const entries = Object.entries(collections);

  console.log(`Found ${entries.length} icon libraries\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const [id, collection] of entries) {
    // Skip Lucide libraries
    if (id.startsWith("lucide")) {
      continue;
    }

    try {
      const metadata = getLibraryMetadata(id, collection);

      // Generate embedding from tags and description
      const embeddingText = `${metadata.tags.join(" ")} ${metadata.description}`;
      const embedding = await generateEmbedding(embeddingText);

      const library: IconLibrary = {
        id,
        name: collection.name,
        prefix: id,
        iconCount: collection.total,
        license: collection.license?.title || collection.license?.spdx || null,
        category: collection.category || null,
        tags: metadata.tags,
        description: metadata.description,
        variants: metadata.variants,
        defaultVariant: metadata.defaultVariant,
      };

      await upsertIconLibrary(library, embedding);

      console.log(`✓ ${id} (${collection.name}) - ${collection.total} icons`);
      successCount++;
    } catch (error) {
      console.error(
        `✗ ${id}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      errorCount++;
    }
  }

  // Seed non-Iconify libraries manually
  console.log(`\nSeeding non-Iconify libraries...\n`);

  const lucideAnimated: IconLibrary = {
    id: "lucide-animated",
    name: "Lucide Animated",
    prefix: "lucide-animated",
    iconCount: 350,
    license: "ISC",
    category: "General",
    tags: [
      "animated",
      "motion",
      "interactive",
      "loading",
      "spinner",
      "state-transition",
      "hover",
      "microinteraction",
      "framer-motion",
      "react",
    ],
    description:
      "Animated icon components built on Motion (Framer Motion). Copy-paste React components with loading spinners, success checkmarks, hover effects, and state transitions. Perfect for interactive UIs.",
    variants: ["default"],
    defaultVariant: "default",
  };

  try {
    const embeddingText =
      "animated icons motion framer-motion react loading spinner success checkmark hover effects state transitions microinteractions interactive ui feedback copy-paste components";
    const embedding = await generateEmbedding(embeddingText);
    await upsertIconLibrary(lucideAnimated, embedding);
    console.log(`✓ lucide-animated (Lucide Animated) - 350+ animated icons`);
    successCount++;
  } catch (error) {
    console.error(
      `✗ lucide-animated: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    errorCount++;
  }

  console.log(`\nSeed complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
}

seedIconLibraries()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Failed to seed icon libraries:", err);
    process.exit(1);
  });
