import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", "..", ".env") });

import { generateEmbedding } from "./embeddings.js";
import { upsertFoundationalDoc } from "./db.js";

interface PrincipleSection {
  id: string;
  title: string;
  content: string;
}

const SECTION_MAPPING: Record<string, { id: string; title: string }> = {
  "## 1. Starting from Scratch": {
    id: "principle-starting",
    title: "Starting from Scratch",
  },
  "## 2. Hierarchy is Everything": {
    id: "principle-hierarchy",
    title: "Visual Hierarchy",
  },
  "## 3. Layout and Spacing": {
    id: "principle-spacing",
    title: "Layout & Spacing",
  },
  "## 4. Designing Text": {
    id: "principle-typography",
    title: "Typography",
  },
  "## 5. Working with Color": {
    id: "principle-color",
    title: "Working with Color",
  },
  "## 6. Creating Depth": {
    id: "principle-depth",
    title: "Creating Depth",
  },
  "## 7. Working with Images": {
    id: "principle-images",
    title: "Working with Images",
  },
  "## 8. Finishing Touches": {
    id: "principle-polish",
    title: "Finishing Touches",
  },
  "## Implementation Checklist for AI Agents": {
    id: "principle-checklist",
    title: "Implementation Checklist",
  },
  "## Quick Reference: Common Mistakes to Avoid": {
    id: "principle-mistakes",
    title: "Common Mistakes to Avoid",
  },
  "## Design Tokens Reference": {
    id: "principle-tokens",
    title: "Design Tokens Reference",
  },
  "## Leveling Up: Continuous Improvement": {
    id: "principle-leveling",
    title: "Leveling Up",
  },
  "## When to Break These Rules": {
    id: "principle-breaking",
    title: "When to Break These Rules",
  },
};

function parsePrinciples(markdown: string): PrincipleSection[] {
  const sections: PrincipleSection[] = [];
  const lines = markdown.split("\n");

  let currentSection: PrincipleSection | null = null;
  let contentLines: string[] = [];

  for (const line of lines) {
    // Check if this line is a section header we care about
    const matchingHeader = Object.keys(SECTION_MAPPING).find(
      (header) => line.startsWith(header.split(" ").slice(0, 3).join(" ")) || line === header
    );

    if (matchingHeader || line.startsWith("## ")) {
      // Save previous section if exists
      if (currentSection && contentLines.length > 0) {
        currentSection.content = contentLines.join("\n").trim();
        sections.push(currentSection);
      }

      // Check if this is a mapped section
      const mapping = Object.entries(SECTION_MAPPING).find(([header]) =>
        line.includes(header.replace("## ", "").split(".").pop()?.trim() || "")
      );

      if (mapping) {
        currentSection = {
          id: mapping[1].id,
          title: mapping[1].title,
          content: "",
        };
        contentLines = [line];
      } else {
        currentSection = null;
        contentLines = [];
      }
    } else if (currentSection) {
      contentLines.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection && contentLines.length > 0) {
    currentSection.content = contentLines.join("\n").trim();
    sections.push(currentSection);
  }

  return sections;
}

function parseByExactHeaders(markdown: string): PrincipleSection[] {
  const sections: PrincipleSection[] = [];

  // Split by ## headers
  const parts = markdown.split(/(?=^## )/m);

  for (const part of parts) {
    if (!part.trim()) continue;

    // Get the first line as the header
    const firstLineEnd = part.indexOf("\n");
    const header = part.substring(0, firstLineEnd > 0 ? firstLineEnd : part.length).trim();
    const content = firstLineEnd > 0 ? part.substring(firstLineEnd + 1).trim() : "";

    // Find matching section
    const mapping = Object.entries(SECTION_MAPPING).find(([key]) => {
      const keyWords = key.replace("## ", "").toLowerCase();
      const headerWords = header.replace("## ", "").toLowerCase();
      return headerWords.includes(keyWords.split(".").pop()?.trim() || "") ||
             keyWords.includes(headerWords);
    });

    if (mapping) {
      sections.push({
        id: mapping[1].id,
        title: mapping[1].title,
        content: `${header}\n\n${content}`,
      });
    }
  }

  return sections;
}

// Parse pattern docs (animation-patterns.md, sound-design.md) by ## headers
function parsePatternDoc(markdown: string, prefix: string): PrincipleSection[] {
  const sections: PrincipleSection[] = [];

  // Remove XML-style opening tags if present
  const cleanedMarkdown = markdown.replace(/<[^>]+>/g, '');

  // Split by ## headers
  const parts = cleanedMarkdown.split(/(?=^## )/m);

  for (const part of parts) {
    if (!part.trim()) continue;

    // Skip if this is just whitespace or opening tags
    if (part.trim().startsWith('You are an expert')) continue;

    // Get the first line as the header
    const firstLineEnd = part.indexOf("\n");
    const header = part.substring(0, firstLineEnd > 0 ? firstLineEnd : part.length).trim();

    if (!header.startsWith("## ")) continue;

    const content = firstLineEnd > 0 ? part.substring(firstLineEnd + 1).trim() : "";
    const title = header.replace("## ", "").trim();

    // Create ID from title (e.g., "Animating Icons" -> "animation-animating-icons")
    const id = `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    sections.push({
      id,
      title,
      content: `${header}\n\n${content}`,
    });
  }

  return sections;
}

async function seedPrinciples() {
  console.log("Loading ui-principles.md...");

  const principlesPath = join(__dirname, "..", "..", "..", "..", "docs", "ui-principles.md");
  const markdown = readFileSync(principlesPath, "utf-8");

  console.log("Parsing sections...");
  const sections = parseByExactHeaders(markdown);

  console.log(`Found ${sections.length} sections to seed:`);
  sections.forEach((s) => console.log(`  - ${s.id}: ${s.title}`));

  for (const section of sections) {
    console.log(`\nProcessing: ${section.id} (${section.title})`);
    console.log(`  Content length: ${section.content.length} chars`);

    // Generate embedding from title + first 1000 chars of content
    const embeddingText = `${section.title}\n\n${section.content.substring(0, 2000)}`;
    console.log("  Generating embedding...");
    const embedding = await generateEmbedding(embeddingText);

    console.log("  Upserting to database...");
    await upsertFoundationalDoc(section.id, section.title, section.content, embedding);

    console.log(`  ✓ Done`);
  }

  // Load pattern docs (animation-patterns.md, sound-design.md, review-rules.md)
  const patternDocs = [
    { filename: "animation-patterns.md", prefix: "animation" },
    { filename: "sound-design.md", prefix: "sound" },
    { filename: "review-rules.md", prefix: "review" },
  ];

  for (const { filename, prefix } of patternDocs) {
    console.log(`\n\nLoading ${filename}...`);

    const patternPath = join(__dirname, "..", "..", "..", "..", "docs", filename);
    const patternMarkdown = readFileSync(patternPath, "utf-8");

    console.log(`Parsing ${prefix} sections...`);
    const patternSections = parsePatternDoc(patternMarkdown, prefix);

    console.log(`Found ${patternSections.length} ${prefix} sections to seed:`);
    patternSections.forEach((s) => console.log(`  - ${s.id}: ${s.title}`));

    for (const section of patternSections) {
      console.log(`\nProcessing: ${section.id} (${section.title})`);
      console.log(`  Content length: ${section.content.length} chars`);

      // Generate embedding from title + first 2000 chars of content
      const embeddingText = `${section.title}\n\n${section.content.substring(0, 2000)}`;
      console.log("  Generating embedding...");
      const embedding = await generateEmbedding(embeddingText);

      console.log("  Upserting to database...");
      await upsertFoundationalDoc(section.id, section.title, section.content, embedding);

      console.log(`  ✓ Done`);
    }
  }

  console.log("\n✓ All principles seeded successfully!");
}

seedPrinciples().catch((error) => {
  console.error("Error seeding principles:", error);
  process.exit(1);
});
