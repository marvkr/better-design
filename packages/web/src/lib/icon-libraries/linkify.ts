import { ICON_LIBRARY_URLS, getIconLibraryInfo } from "./urls";

/**
 * Converts icon library mentions in text to markdown links
 * Handles both human-readable names (e.g., "Tabler Icons") and IDs (e.g., "tabler")
 * e.g., "Using Tabler Icons" → "Using [Tabler Icons](https://tabler.io/icons)"
 */
export function linkifyIconLibraries(text: string): string {
  let result = text;

  // First pass: linkify by human-readable names from curated list
  for (const [, library] of Object.entries(ICON_LIBRARY_URLS)) {
    // Create a regex that matches the library name (case-insensitive, word boundary)
    // But not if it's already inside a markdown link
    const regex = new RegExp(
      `(?<!\\[)\\b(${escapeRegex(library.name)})\\b(?!\\])(?!\\()`,
      "gi"
    );

    result = result.replace(regex, `[$1](${library.url})`);
  }

  // Second pass: linkify by ID/prefix (e.g., "using tabler icons" or "the phosphor icon set")
  // This catches mentions like "tabler", "phosphor", "mdi" etc.
  for (const [id, library] of Object.entries(ICON_LIBRARY_URLS)) {
    // Match the ID followed by optional "icons" or "icon set" or "icon library"
    // Exclude matches inside URLs (after / or ://) or inside existing markdown link syntax
    const regex = new RegExp(
      `(?<![\\[/(])\\b(${escapeRegex(id)})\\s*(icons?|icon\\s*set|icon\\s*library)?\\b(?!\\])(?!\\()`,
      "gi"
    );

    result = result.replace(regex, (match, idMatch, suffix) => {
      // Don't double-linkify if the name was already linked
      if (result.includes(`[${library.name}]`)) {
        return match;
      }
      const displayText = suffix ? `${idMatch} ${suffix}` : idMatch;
      return `[${displayText}](${library.url})`;
    });
  }

  return result;
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Create a markdown link for an icon library by ID
 * Useful for programmatic link generation
 */
export function createIconLibraryLink(libraryId: string): string {
  const info = getIconLibraryInfo(libraryId);
  return `[${info.name}](${info.url})`;
}
