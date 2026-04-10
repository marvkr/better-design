import type {
  DesignSystem,
  DesignSystemMetadata,
  DesignSystemComponent,
} from "./types.js";

const SEPARATOR = "----------------------------------------";

function extractField(content: string, pattern: RegExp): string {
  const match = content.match(pattern);
  return match?.[1]?.trim() || "";
}

function extractCSSVariable(css: string, varName: string): string | undefined {
  const pattern = new RegExp(`${varName}:\\s*([^;]+);`);
  const match = css.match(pattern);
  return match?.[1]?.trim();
}

function extractFontFamily(css: string): string | undefined {
  const match = css.match(/font-family:\s*["']?([^"',;]+)/);
  return match?.[1]?.trim();
}

function extractMetadata(content: string): DesignSystemMetadata {
  const id = extractField(content, /\*\*SYSTEM_NAME:\*\*\s*(.+)/);
  const title = extractField(content, /\*\*DISPLAY_NAME:\*\*\s*(.+)/);
  const description = extractField(content, /\*\*DESCRIPTION:\*\*\s*(.+)/);
  const industryRaw = extractField(content, /\*\*INDUSTRY:\*\*\s*(.+)/);
  const personalityRaw = extractField(content, /\*\*PERSONALITY:\*\*\s*(.+)/);

  return {
    id,
    title,
    description,
    industry: industryRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    personality: personalityRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    componentCount: 0,
  };
}

function parseComponent(section: string): DesignSystemComponent | null {
  const nameMatch = section.match(/\*\*COMPONENT:\*\*\s*(.+)/);
  if (!nameMatch) return null;

  const descMatch = section.match(/\*\*DESCRIPTION:\*\*\s*(.+)/);
  const useCasesMatch = section.match(/\*\*USE_CASES:\*\*\s*(.+)/);
  const langMatch = section.match(/\*\*LANGUAGE:\*\*\s*(.+)/);
  const destMatch = section.match(/\*\*DESTINATION:\*\*\s*(.+)/);

  // Extract code block - handle both ```language and just ```
  const codeMatch = section.match(/\*\*CODE:\*\*\s*```[\w]*\n([\s\S]*?)```/);

  return {
    name: nameMatch[1].trim().toLowerCase(),
    description: descMatch?.[1]?.trim() || "",
    useCases: useCasesMatch?.[1]
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    language: langMatch?.[1]?.trim() || "text",
    destination: destMatch?.[1]?.trim() || "",
    code: codeMatch?.[1]?.trim() || "",
  };
}

export function parseDesignSystemMarkdown(content: string): DesignSystem {
  const sections = content.split(SEPARATOR);

  // First section contains metadata
  const metadata = extractMetadata(sections[0] || "");

  // Remaining sections are components
  const components = sections
    .slice(1)
    .map(parseComponent)
    .filter((c): c is DesignSystemComponent => c !== null);

  // Extract key tokens from globals component
  const globals = components.find((c) => c.name === "globals");
  if (globals) {
    metadata.primaryColor = extractCSSVariable(globals.code, "--primary");
    metadata.borderRadius = extractCSSVariable(globals.code, "--radius");
    metadata.font = extractFontFamily(globals.code);
  }

  metadata.componentCount = components.length;

  return {
    metadata,
    components,
    rawContent: content,
  };
}
