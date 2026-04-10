/**
 * Parses a globals.css string and extracts CSS custom property declarations.
 * Returns light (:root) vars merged with dark (.dark) vars when isDark=true.
 */
export function parseCSSVariables(css: string, isDark = false): Record<string, string> {
  if (!css) return {};

  function extractVars(block: string): Record<string, string> {
    const vars: Record<string, string> = {};
    for (const match of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      vars[match[1]] = match[2].trim();
    }
    return vars;
  }

  const rootMatch = css.match(/:root\s*\{([\s\S]+?)\}/);
  const lightVars = extractVars(rootMatch?.[1] ?? "");

  if (!isDark) return lightVars;

  // Also extract .dark {} vars and merge on top
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)\}/);
  const darkVars = extractVars(darkMatch?.[1] ?? "");

  return { ...lightVars, ...darkVars };
}
