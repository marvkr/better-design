import "dotenv/config";
import { db, iconLibraries } from "../src/db";
import { generateQueryEmbedding } from "../src/lib/design-systems/embeddings";

// Curated tags and descriptions for icon libraries
// Tags describe the visual style, mood, and use cases
const ICON_LIBRARY_METADATA: Record<string, {
  tags: string[];
  description: string;
  variants?: string[];
  defaultVariant?: string;
}> = {
  // === UI 24px - Popular modern icon sets ===
  "tabler": {
    tags: ["bold", "technical", "professional", "modern", "comprehensive", "dashboard", "enterprise"],
    description: "Bold, professional icons for technical and business applications",
    variants: ["outline", "filled"],
    defaultVariant: "outline",
  },
  "solar": {
    tags: ["sleek", "contemporary", "versatile", "modern", "polished", "elegant", "premium"],
    description: "Modern icon set with multiple styles from linear to duotone",
    variants: ["linear", "outline", "bold", "bold-duotone", "line-duotone", "broken"],
    defaultVariant: "linear",
  },
  "mingcute": {
    tags: ["cute", "friendly", "rounded", "playful", "modern", "consumer", "app"],
    description: "Cute, friendly icons with rounded corners for consumer apps",
    variants: ["line", "fill"],
    defaultVariant: "line",
  },
  "remix": {
    tags: ["versatile", "comprehensive", "balanced", "modern", "neutral", "all-purpose"],
    description: "Versatile icon set suitable for any project type",
    variants: ["line", "fill"],
    defaultVariant: "line",
  },
  "iconoir": {
    tags: ["elegant", "soft", "refined", "sophisticated", "minimal", "luxury", "premium"],
    description: "Elegant, refined icons with a sophisticated feel",
    variants: ["default"],
    defaultVariant: "default",
  },
  "feather": {
    tags: ["lightweight", "simple", "clean", "minimal", "airy", "open"],
    description: "Lightweight, simple icons with an airy feel",
    variants: ["default"],
    defaultVariant: "default",
  },
  "heroicons": {
    tags: ["bold", "solid", "ios", "apple", "tailwind", "modern", "professional"],
    description: "Bold, solid icons designed for Tailwind CSS projects",
    variants: ["outline", "solid", "mini"],
    defaultVariant: "outline",
  },
  "flowbite": {
    tags: ["tailwind", "modern", "clean", "ui-kit", "dashboard", "web-app"],
    description: "Modern icons designed for Flowbite UI kit and Tailwind",
    variants: ["outline", "solid"],
    defaultVariant: "outline",
  },

  // === UI Other / Mixed Grid ===
  "phosphor": {
    tags: ["friendly", "rounded", "warm", "approachable", "versatile", "consumer", "playful"],
    description: "Flexible icon family with 6 weights, perfect for friendly consumer apps",
    variants: ["regular", "bold", "duotone", "fill", "light", "thin"],
    defaultVariant: "regular",
  },
  "fluent": {
    tags: ["microsoft", "modern", "clean", "professional", "enterprise", "office", "windows"],
    description: "Microsoft's modern icon system for enterprise and productivity apps",
    variants: ["regular", "filled"],
    defaultVariant: "regular",
  },
  "radix-icons": {
    tags: ["minimal", "consistent", "design-system", "radix", "headless", "developer"],
    description: "Minimal, consistent icons for Radix UI design systems",
    variants: ["default"],
    defaultVariant: "default",
  },
  "octicons": {
    tags: ["github", "developer", "code", "technical", "open-source", "git"],
    description: "GitHub's icon set for developer tools and code-related UIs",
    variants: ["default"],
    defaultVariant: "default",
  },
  "clarity": {
    tags: ["enterprise", "vmware", "professional", "clean", "business", "dashboard"],
    description: "VMware's enterprise icon set for business applications",
    variants: ["line", "solid"],
    defaultVariant: "line",
  },

  // === Material Design ===
  "mdi": {
    tags: ["material", "google", "android", "comprehensive", "colorful", "versatile"],
    description: "Material Design icons - comprehensive set for Android and Google-style apps",
    variants: ["default", "outline"],
    defaultVariant: "default",
  },
  "material-symbols": {
    tags: ["material", "google", "modern", "variable", "android", "clean"],
    description: "Google's modern Material Symbols with variable weight and fill",
    variants: ["outlined", "rounded", "sharp"],
    defaultVariant: "outlined",
  },

  // === Carbon / IBM ===
  "carbon": {
    tags: ["ibm", "enterprise", "professional", "clean", "business", "serious", "corporate"],
    description: "IBM Carbon Design System icons for enterprise applications",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Bootstrap ===
  "bi": {
    tags: ["bootstrap", "web", "classic", "reliable", "standard", "traditional"],
    description: "Bootstrap's official icon library for traditional web projects",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Ant Design ===
  "ant-design": {
    tags: ["ant", "alibaba", "enterprise", "chinese", "comprehensive", "business"],
    description: "Ant Design icons for enterprise React applications",
    variants: ["outlined", "filled", "twotone"],
    defaultVariant: "outlined",
  },

  // === Ion Icons ===
  "ion": {
    tags: ["ionic", "mobile", "ios", "android", "app", "native", "hybrid"],
    description: "Ionic framework icons for mobile and hybrid applications",
    variants: ["outline", "sharp", "default"],
    defaultVariant: "default",
  },

  // === Font Awesome ===
  "fa6-solid": {
    tags: ["classic", "popular", "comprehensive", "web", "traditional", "bold"],
    description: "Font Awesome 6 solid icons - classic, widely-used icon set",
    variants: ["default"],
    defaultVariant: "default",
  },
  "fa6-regular": {
    tags: ["classic", "popular", "outline", "web", "traditional", "light"],
    description: "Font Awesome 6 regular (outline) icons",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Pepicons ===
  "pepicons-pop": {
    tags: ["playful", "fun", "rounded", "friendly", "casual", "cheerful", "bubbly"],
    description: "Playful, fun icons with a casual, cheerful vibe",
    variants: ["default"],
    defaultVariant: "default",
  },
  "pepicons-pencil": {
    tags: ["hand-drawn", "sketch", "casual", "creative", "artistic", "informal"],
    description: "Hand-drawn style icons for creative, informal projects",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Emoji ===
  "twemoji": {
    tags: ["emoji", "twitter", "colorful", "expressive", "fun", "social"],
    description: "Twitter's emoji set for social and expressive interfaces",
    variants: ["default"],
    defaultVariant: "default",
  },
  "noto-emoji": {
    tags: ["emoji", "google", "colorful", "universal", "inclusive", "global"],
    description: "Google's Noto emoji for universal, inclusive designs",
    variants: ["default"],
    defaultVariant: "default",
  },
  "openmoji": {
    tags: ["emoji", "open-source", "colorful", "expressive", "community"],
    description: "Open-source emoji set with community-driven designs",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Logos ===
  "simple-icons": {
    tags: ["logos", "brands", "company", "social", "tech", "monochrome"],
    description: "Brand and company logos in monochrome style",
    variants: ["default"],
    defaultVariant: "default",
  },
  "logos": {
    tags: ["logos", "brands", "colorful", "tech", "company", "product"],
    description: "Colorful brand and technology logos",
    variants: ["default"],
    defaultVariant: "default",
  },
  "devicon": {
    tags: ["developer", "programming", "languages", "frameworks", "tech", "code"],
    description: "Programming language and framework logos for developer portfolios",
    variants: ["plain", "original"],
    defaultVariant: "plain",
  },

  // === Specialized ===
  "game-icons": {
    tags: ["gaming", "fantasy", "rpg", "medieval", "fun", "creative", "unique"],
    description: "Creative icons for gaming, RPG, and fantasy themes",
    variants: ["default"],
    defaultVariant: "default",
  },
  "medical-icon": {
    tags: ["medical", "health", "healthcare", "hospital", "clinical", "professional"],
    description: "Medical and healthcare icons for health-related applications",
    variants: ["default"],
    defaultVariant: "default",
  },
  "circle-flags": {
    tags: ["flags", "countries", "international", "global", "circular"],
    description: "Circular country flags for international applications",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === VSCode / Dev ===
  "vscode-icons": {
    tags: ["vscode", "files", "folders", "developer", "ide", "code", "programming"],
    description: "VS Code file and folder icons for developer tools",
    variants: ["default"],
    defaultVariant: "default",
  },
  "codicon": {
    tags: ["vscode", "editor", "developer", "ide", "microsoft", "code"],
    description: "VS Code UI icons for editor and developer tool interfaces",
    variants: ["default"],
    defaultVariant: "default",
  },

  // === Animated ===
  "lucide-animated": {
    tags: ["animated", "motion", "framer-motion", "interactive", "transitions", "loading", "feedback", "hover", "state-change"],
    description: "Beautifully crafted animated icons built on Motion for loading states, success feedback, and interactive UI elements",
    variants: ["default"],
    defaultVariant: "default",
  },
};

// Default tags based on category
const CATEGORY_DEFAULT_TAGS: Record<string, string[]> = {
  "Material": ["material", "google", "android", "modern"],
  "UI 24px": ["ui", "modern", "clean", "interface"],
  "UI 16px / 32px": ["ui", "compact", "dense", "interface"],
  "UI Other / Mixed Grid": ["ui", "versatile", "mixed", "interface"],
  "UI Multicolor": ["colorful", "vibrant", "multicolor", "expressive"],
  "Programming": ["developer", "code", "programming", "technical"],
  "Logos": ["logos", "brands", "company", "identity"],
  "Emoji": ["emoji", "expressive", "colorful", "fun"],
  "Flags / Maps": ["flags", "maps", "geography", "international"],
  "Thematic": ["thematic", "specialized", "niche", "unique"],
  "Archive / Unmaintained": ["legacy", "archive", "classic"],
};

interface IconifyCollection {
  name: string;
  total: number;
  author?: { name: string };
  license?: { title: string; spdx?: string };
  category?: string;
  palette?: boolean;
  height?: number | number[];
  samples?: string[];
}

async function fetchIconifyCollections(): Promise<Record<string, IconifyCollection>> {
  console.log("Fetching Iconify collections...");
  const response = await fetch("https://api.iconify.design/collections");
  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.status}`);
  }
  return response.json();
}

function getLibraryMetadata(id: string, collection: IconifyCollection) {
  // Use curated metadata if available
  const curated = ICON_LIBRARY_METADATA[id];

  if (curated) {
    return {
      tags: curated.tags,
      description: curated.description,
      variants: curated.variants || ["default"],
      defaultVariant: curated.defaultVariant || "default",
    };
  }

  // Generate default metadata based on category and name
  const categoryTags = CATEGORY_DEFAULT_TAGS[collection.category || ""] || ["icon", "ui"];
  const nameTags = collection.name.toLowerCase().split(/\s+/).filter(word => word.length > 2);

  return {
    tags: [...new Set([...categoryTags, ...nameTags])],
    description: `${collection.name} icon set`,
    variants: ["default"],
    defaultVariant: "default",
  };
}

async function seedIconLibraries() {
  console.log("Starting icon library seed...\n");

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
      const embedding = await generateQueryEmbedding(embeddingText);

      // Upsert into database
      await db
        .insert(iconLibraries)
        .values({
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
          embedding,
        })
        .onConflictDoUpdate({
          target: iconLibraries.id,
          set: {
            name: collection.name,
            iconCount: collection.total,
            license: collection.license?.title || collection.license?.spdx || null,
            category: collection.category || null,
            tags: metadata.tags,
            description: metadata.description,
            variants: metadata.variants,
            defaultVariant: metadata.defaultVariant,
            embedding,
          },
        });

      successCount++;
      console.log(`✓ ${id} (${collection.name}) - ${collection.total} icons`);
    } catch (error) {
      errorCount++;
      console.error(`✗ ${id}: ${error}`);
    }
  }

  // Seed custom libraries not in Iconify
  console.log("\nSeeding custom libraries...");

  const customLibraries = [
    {
      id: "lucide-animated",
      name: "Lucide Animated",
      iconCount: 350,
      license: "MIT",
      category: "Animated",
    },
  ];

  for (const lib of customLibraries) {
    try {
      const metadata = ICON_LIBRARY_METADATA[lib.id];
      if (!metadata) {
        console.log(`  Skipping ${lib.id} - no metadata defined`);
        continue;
      }

      const embeddingText = `${metadata.tags.join(" ")} ${metadata.description}`;
      const embedding = await generateQueryEmbedding(embeddingText);

      await db
        .insert(iconLibraries)
        .values({
          id: lib.id,
          name: lib.name,
          prefix: lib.id,
          iconCount: lib.iconCount,
          license: lib.license,
          category: lib.category,
          tags: metadata.tags,
          description: metadata.description,
          variants: metadata.variants,
          defaultVariant: metadata.defaultVariant,
          embedding,
        })
        .onConflictDoUpdate({
          target: iconLibraries.id,
          set: {
            name: lib.name,
            iconCount: lib.iconCount,
            license: lib.license,
            category: lib.category,
            tags: metadata.tags,
            description: metadata.description,
            variants: metadata.variants,
            defaultVariant: metadata.defaultVariant,
            embedding,
          },
        });

      successCount++;
      console.log(`✓ ${lib.id} (${lib.name}) - ${lib.iconCount} icons`);
    } catch (error) {
      errorCount++;
      console.error(`✗ ${lib.id}: ${error}`);
    }
  }

  console.log(`\nSeed complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);

  process.exit(errorCount > 0 ? 1 : 0);
}

seedIconLibraries().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
