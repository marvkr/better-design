import type { DesignConfig } from "@/db";

const COLOR_KEY_TO_VAR: Record<string, string> = {
  primary: "--primary", secondary: "--secondary", accent: "--accent",
  muted: "--muted", destructive: "--destructive", background: "--background",
  foreground: "--foreground", card: "--card", cardForeground: "--card-foreground",
  border: "--border", input: "--input", ring: "--ring",
};

function buildConfigOverrides(config: DesignConfig): string {
  const overrides: string[] = [];
  if (config.colors) {
    for (const [key, cssVar] of Object.entries(COLOR_KEY_TO_VAR)) {
      const value = config.colors[key as keyof typeof config.colors];
      if (value) overrides.push(`  ${cssVar}: ${value};`);
    }
  }
  if (config.radius) overrides.push(`  --radius: ${config.radius};`);
  return overrides.join("\n");
}

const SECTIONS = [
  { id: "typography",   label: "Typography" },
  { id: "buttons",      label: "Buttons" },
  { id: "inputs",       label: "Inputs" },
  { id: "selection",    label: "Selection Controls" },
  { id: "feedback",     label: "Feedback" },
  { id: "data-display", label: "Data Display" },
  { id: "overlay",      label: "Overlays" },
  { id: "navigation",   label: "Navigation" },
  { id: "layout",       label: "Layout & Cards" },
  { id: "tokens",       label: "Color Tokens" },
];

const COLOR_TOKENS = [
  ["--background",          "Background"],
  ["--foreground",          "Foreground"],
  ["--card",                "Card"],
  ["--primary",             "Primary"],
  ["--primary-foreground",  "Primary FG"],
  ["--secondary",           "Secondary"],
  ["--secondary-foreground","Secondary FG"],
  ["--muted",               "Muted"],
  ["--muted-foreground",    "Muted FG"],
  ["--accent",              "Accent"],
  ["--border",              "Border"],
  ["--input",               "Input"],
  ["--ring",                "Ring"],
  ["--destructive",         "Destructive"],
];

/**
 * Generates a self-contained HTML preview from fragment files.
 * Three-column layout: sticky left sidebar (TOC) + scrollable main content + sticky right sidebar (color tokens).
 * Pure HTML+CSS — no Better Design components.
 */
export function buildPreviewHTML(files: Record<string, string>, config?: DesignConfig | null): string {
  const css = files["app/globals.css"] ?? "";

  const rootMatch = css.match(/:root\s*\{([\s\S]+?)\}/);
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)\}/);
  const rootBlock = rootMatch?.[1] ?? "";
  const darkBlock = darkMatch?.[1] ?? "";

  const bgValue = rootBlock.match(/--background\s*:\s*([^;]+)/)?.[1]?.trim() ?? "";
  const isDarkSystem =
    /hsl\(\d+\s+\d+%\s+[0-9](\.\d+)?%\)/.test(bgValue) ||
    bgValue.includes("3%") || bgValue.includes("4%") || bgValue.includes("5%") || bgValue.includes("6%") ||
    bgValue.includes("oklch(0.1") || bgValue.includes("oklch(0.2");

  const configOverrides = config ? buildConfigOverrides(config) : "";
  const fontFamily = config?.font?.sans
    ? `"${config.font.sans}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    : `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif`;
  const monoFontFamily = config?.font?.mono
    ? `"${config.font.mono}", ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace`
    : `ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace`;

  // Build Google Fonts link tags for selected fonts
  const SYSTEM_FONTS = new Set(["Georgia", "Geist", "Geist Mono", "SF Pro", "SF Mono", "system-ui"]);
  const googleFontLinks: string[] = [];
  for (const fontName of [config?.font?.sans, config?.font?.mono].filter(Boolean) as string[]) {
    if (SYSTEM_FONTS.has(fontName)) continue;
    const encoded = fontName.replace(/\s+/g, "+");
    googleFontLinks.push(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap" />`);
  }

  const tocLinks = SECTIONS.map(s =>
    `<a href="#${s.id}" class="toc-link" data-section="${s.id}">${s.label}</a>`
  ).join("\n");

  const colorSwatches = COLOR_TOKENS.map(([v, l]) => `
    <div class="token-row">
      <div class="token-swatch" style="background:var(${v})"></div>
      <div class="token-info">
        <span class="token-label">${l}</span>
        <span class="token-var">${v}</span>
      </div>
    </div>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${googleFontLinks.join("\n  ")}
  <style>
    :root {
      ${rootBlock.trim()}
${configOverrides ? `      /* config overrides */\n${configOverrides}` : ""}
    }
    ${darkBlock ? `.dark { ${darkBlock.trim()} }` : ""}

    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 14px; scroll-behavior: smooth; }

    body {
      font-family: ${fontFamily};
      background: var(--background);
      color: var(--foreground);
      line-height: 1.5;
      display: flex;
      min-height: 100vh;
    }
    code, kbd, pre, samp, .font-mono { font-family: ${monoFontFamily}; }

    /* ── Left sidebar ── */
    .sidebar {
      width: 180px;
      min-width: 180px;
      height: 100vh;
      position: sticky;
      top: 0;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* ── Right sidebar (color tokens) ── */
    .sidebar-right {
      width: 200px;
      min-width: 200px;
      height: 100vh;
      position: sticky;
      top: 0;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sidebar-card {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--card);
      overflow: clip;
    }

    .sidebar-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted-foreground);
      opacity: 0.6;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
    }

    .toc-nav { display: flex; flex-direction: column; gap: 1px; padding: 6px 6px 8px; }
    .toc-link {
      display: flex; align-items: center; gap: 8px; padding: 5px 8px;
      border-radius: 5px;
      font-size: 12px; font-weight: 500;
      color: var(--muted-foreground);
      text-decoration: none;
      transition: background 0.12s, color 0.12s;
    }
    .toc-link::before {
      content: '';
      width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
      background: var(--border);
      transition: background 0.15s;
    }
    .toc-link:hover { background: var(--muted); color: var(--foreground); }
    .toc-link.active { background: var(--muted); color: var(--foreground); font-weight: 500; }
    .toc-link.active::before { background: var(--primary); }

    /* ── Color tokens in sidebar ── */
    .token-list { display: flex; flex-direction: column; gap: 6px; }
    .token-row { display: flex; align-items: center; gap: 8px; }
    .token-swatch {
      width: 20px; height: 20px; flex-shrink: 0;
      border-radius: calc(var(--radius) - 4px);
      border: 1px solid var(--border);
    }
    .token-info { display: flex; flex-direction: column; gap: 1px; }
    .token-label { font-size: 11px; font-weight: 500; color: var(--foreground); }
    .token-var { font-size: 9px; color: var(--muted-foreground); font-family: monospace; }

    /* ── Main content ── */
    .main {
      flex: 1;
      overflow-y: auto;
      padding: 40px 48px;
      max-width: 900px;
    }

    .page-title { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .page-desc { font-size: 13px; color: var(--muted-foreground); margin-bottom: 48px; }

    /* ── Sections ── */
    .section { margin-bottom: 56px; scroll-margin-top: 24px; }
    .section-heading {
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--muted-foreground);
      margin-bottom: 16px; padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }
    .grid { display: grid; gap: 12px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 700px) { .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; } }

    /* ── Demo card ── */
    .demo {
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) + 2px);
      overflow: hidden; font-size: 13px;
    }
    .demo-body {
      min-height: 90px; display: flex; align-items: center;
      justify-content: center; padding: 20px 16px;
      background: var(--background); flex-wrap: wrap; gap: 8px;
    }
    .demo-body.col { flex-direction: column; align-items: stretch; }
    .demo-body.start { justify-content: flex-start; }
    .demo-footer {
      font-size: 10px; font-weight: 500; color: var(--muted-foreground);
      padding: 5px 10px 6px; border-top: 1px solid var(--border);
      background: var(--card);
    }

    /* ── Typography ── */
    .type-h1 { font-size: 30px; font-weight: 700; }
    .type-h2 { font-size: 22px; font-weight: 600; }
    .type-h3 { font-size: 16px; font-weight: 600; }
    .type-body { font-size: 14px; line-height: 1.6; }
    .type-small { font-size: 12px; color: var(--muted-foreground); }
    .type-mono { font-family: monospace; font-size: 12px; background: var(--muted); padding: 2px 6px; border-radius: 4px; }
    .type-lead { font-size: 17px; font-weight: 400; color: var(--muted-foreground); }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      padding: 7px 14px; border-radius: var(--radius);
      font-size: 13px; font-weight: 500; cursor: pointer;
      border: 1px solid transparent; transition: opacity 0.15s, background 0.15s;
      white-space: nowrap; text-decoration: none; font-family: inherit;
    }
    .btn:hover { opacity: 0.85; }
    .btn-sm  { padding: 4px 10px; font-size: 12px; }
    .btn-lg  { padding: 10px 20px; font-size: 15px; }
    .btn-icon { width: 32px; height: 32px; padding: 0; }
    .btn-primary   { background: var(--primary); color: var(--primary-foreground); }
    .btn-secondary { background: var(--secondary); color: var(--secondary-foreground); border-color: var(--border); }
    .btn-outline   { background: transparent; color: var(--foreground); border-color: var(--border); }
    .btn-ghost     { background: transparent; color: var(--foreground); }
    .btn-ghost:hover { background: var(--accent); }
    .btn-destructive { background: var(--destructive); color: var(--destructive-foreground); }
    .btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }

    /* ── Inputs ── */
    .input, .textarea {
      display: block; width: 100%; padding: 7px 12px; border-radius: var(--radius);
      border: 1px solid var(--input); background: var(--background);
      color: var(--foreground); font-size: 13px; font-family: inherit;
      outline: none; transition: border-color 0.15s, box-shadow 0.15s;
    }
    .input:focus, .textarea:focus {
      border-color: var(--ring);
      box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 25%, transparent);
    }
    .input::placeholder, .textarea::placeholder { color: var(--muted-foreground); }
    .textarea { min-height: 80px; resize: vertical; }
    .input:disabled { opacity: 0.5; cursor: not-allowed; background: var(--muted); }
    .label { font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px; }
    .field { display: flex; flex-direction: column; gap: 4px; width: 100%; }
    .hint { font-size: 11px; color: var(--muted-foreground); }
    .input-group-h { display: flex; gap: 6px; }

    .select {
      display: block; width: 100%; padding: 7px 32px 7px 12px;
      border-radius: var(--radius); border: 1px solid var(--input);
      background: var(--background); color: var(--foreground);
      font-size: 13px; font-family: inherit; outline: none; cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 10px center;
    }

    /* ── Selection controls ── */
    .checkbox {
      width: 16px; height: 16px; border-radius: calc(var(--radius) - 4px);
      border: 1.5px solid var(--border); background: var(--background);
      cursor: pointer; flex-shrink: 0;
      display: inline-flex; align-items: center; justify-content: center;
      transition: background 0.12s, border-color 0.12s;
    }
    .checkbox.checked { background: var(--primary); border-color: var(--primary); }
    .checkbox.checked::after {
      content: ""; width: 8px; height: 5px;
      border-left: 1.5px solid var(--primary-foreground);
      border-bottom: 1.5px solid var(--primary-foreground);
      transform: rotate(-45deg) translateY(-1px);
    }
    .radio {
      width: 16px; height: 16px; border-radius: 50%;
      border: 1.5px solid var(--border); background: var(--background);
      cursor: pointer; flex-shrink: 0;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .radio.checked { border-color: var(--primary); }
    .radio.checked::after {
      content: ""; width: 8px; height: 8px; border-radius: 50%;
      background: var(--primary);
    }
    .ctrl-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
    .switch-track {
      width: 36px; height: 20px; border-radius: 10px;
      background: var(--muted); cursor: pointer; position: relative;
      transition: background 0.18s; border: none; flex-shrink: 0;
    }
    .switch-track.on { background: var(--primary); }
    .switch-thumb {
      width: 14px; height: 14px; border-radius: 50%; background: white;
      position: absolute; top: 3px; left: 3px;
      transition: transform 0.18s; pointer-events: none;
    }
    .switch-track.on .switch-thumb { transform: translateX(16px); }
    .slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 6px; border-radius: 3px;
      background: var(--muted); outline: none;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 16px; height: 16px; border-radius: 50%;
      background: var(--primary); cursor: pointer;
    }

    /* ── Feedback ── */
    .progress-track { height: 8px; border-radius: 4px; background: var(--muted); width: 100%; overflow: hidden; }
    .progress-fill  { height: 100%; background: var(--primary); border-radius: 4px; }
    .badge {
      display: inline-flex; align-items: center; padding: 2px 8px;
      border-radius: calc(var(--radius) - 2px); font-size: 11px; font-weight: 500;
    }
    .badge-primary     { background: var(--primary); color: var(--primary-foreground); }
    .badge-secondary   { background: var(--secondary); color: var(--secondary-foreground); }
    .badge-outline     { background: transparent; color: var(--foreground); border: 1px solid var(--border); }
    .badge-destructive { background: var(--destructive); color: var(--destructive-foreground); }
    .badge-muted       { background: var(--muted); color: var(--muted-foreground); }

    .alert {
      padding: 12px 14px; border-radius: var(--radius);
      border: 1px solid var(--border); background: var(--card);
      font-size: 12px; display: flex; gap: 10px; align-items: flex-start;
    }
    .alert-icon { flex-shrink: 0; margin-top: 1px; }
    .alert-title { font-weight: 600; font-size: 13px; margin-bottom: 2px; }
    .alert-destructive { border-color: var(--destructive); background: color-mix(in oklch, var(--destructive) 10%, var(--card)); }
    .alert-success { border-color: color-mix(in oklch, var(--primary) 60%, transparent); background: color-mix(in oklch, var(--primary) 8%, var(--card)); }

    .skeleton { background: var(--muted); border-radius: var(--radius); animation: pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

    .spinner {
      width: 20px; height: 20px; border: 2px solid var(--border);
      border-top-color: var(--primary); border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Data display ── */
    .table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .table th { padding: 8px 12px; text-align: left; font-weight: 600; color: var(--muted-foreground); border-bottom: 1px solid var(--border); }
    .table td { padding: 8px 12px; border-bottom: 1px solid var(--border); }
    .table tr:last-child td { border-bottom: none; }
    .table tbody tr:hover { background: var(--accent); }

    .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--primary); color: var(--primary-foreground);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 600; flex-shrink: 0;
    }
    .avatar-sm { width: 28px; height: 28px; font-size: 10px; }
    .avatar-lg { width: 48px; height: 48px; font-size: 16px; }
    .avatar-group { display: flex; }
    .avatar-group .avatar { border: 2px solid var(--background); margin-left: -8px; }
    .avatar-group .avatar:first-child { margin-left: 0; }

    .tabs-list {
      display: flex; gap: 2px; background: var(--muted);
      padding: 3px; border-radius: var(--radius); width: fit-content;
    }
    .tab-btn {
      padding: 5px 14px; border-radius: calc(var(--radius) - 2px);
      font-size: 12px; font-weight: 500; cursor: pointer; border: none;
      background: transparent; color: var(--muted-foreground);
      transition: all 0.12s; font-family: inherit;
    }
    .tab-btn.active { background: var(--background); color: var(--foreground); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

    .accordion-item { border-bottom: 1px solid var(--border); }
    .accordion-trigger {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0; font-size: 13px; font-weight: 500; background: none; border: none;
      cursor: pointer; color: var(--foreground); font-family: inherit; text-align: left;
    }
    .accordion-trigger:hover { color: var(--foreground); opacity: 0.8; }
    .accordion-content { padding: 0 0 12px; font-size: 12px; color: var(--muted-foreground); }

    /* ── Overlays ── */
    .dialog-mock {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px; width: 100%;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    .dialog-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
    .dialog-desc  { font-size: 12px; color: var(--muted-foreground); margin-bottom: 16px; }
    .dialog-footer { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }

    .popover-mock {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 12px 14px;
      font-size: 12px; width: fit-content;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }

    .dropdown-mock {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 4px; min-width: 160px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .dropdown-item {
      padding: 7px 10px; border-radius: calc(var(--radius) - 2px);
      font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;
    }
    .dropdown-item:hover { background: var(--accent); }
    .dropdown-sep { height: 1px; background: var(--border); margin: 4px 0; }
    .dropdown-label { padding: 5px 10px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-foreground); }

    .tooltip-mock {
      background: var(--foreground); color: var(--background);
      padding: 4px 8px; border-radius: 4px; font-size: 11px; width: fit-content;
    }

    /* ── Navigation ── */
    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12px; }
    .bc-item { color: var(--muted-foreground); }
    .bc-item.current { color: var(--foreground); font-weight: 500; }
    .bc-sep { color: var(--muted-foreground); opacity: 0.5; }

    .pagination { display: flex; align-items: center; gap: 4px; }
    .page-btn {
      width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
      border-radius: calc(var(--radius) - 2px); font-size: 12px; font-weight: 500;
      border: 1px solid transparent; cursor: pointer; background: none; color: var(--muted-foreground);
      font-family: inherit;
    }
    .page-btn.active { background: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
    .page-btn:hover:not(.active) { background: var(--accent); color: var(--foreground); }

    .steps { display: flex; align-items: center; gap: 0; width: 100%; }
    .step { display: flex; align-items: center; gap: 8px; flex: 1; }
    .step:last-child { flex: 0; }
    .step-circle {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 600;
    }
    .step-circle.done { background: var(--primary); color: var(--primary-foreground); }
    .step-circle.active { background: var(--primary); color: var(--primary-foreground); box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 30%, transparent); }
    .step-circle.pending { background: var(--muted); color: var(--muted-foreground); }
    .step-line { flex: 1; height: 2px; background: var(--border); }
    .step-line.done { background: var(--primary); }
    .step-label { font-size: 11px; color: var(--muted-foreground); }

    /* ── Layout & Cards ── */
    .card {
      background: var(--card); color: var(--card-foreground);
      border: 1px solid var(--border); border-radius: var(--radius); padding: 16px;
    }
    .card-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .card-desc  { font-size: 12px; color: var(--muted-foreground); }
    .card-footer { margin-top: 14px; display: flex; gap: 8px; }

    .stat-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 16px;
    }
    .stat-label { font-size: 11px; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.06em; }
    .stat-value { font-size: 26px; font-weight: 700; margin: 4px 0; }
    .stat-change { font-size: 11px; display: flex; align-items: center; gap: 3px; }
    .stat-change.up   { color: color-mix(in oklch, var(--primary) 90%, transparent); }
    .stat-change.down { color: var(--destructive); }

    .kbd {
      display: inline-flex; align-items: center; padding: 2px 6px;
      border-radius: 4px; border: 1px solid var(--border);
      background: var(--muted); font-family: monospace; font-size: 11px;
      color: var(--muted-foreground);
    }

    .sep { border: none; border-top: 1px solid var(--border); }
    .flex   { display: flex; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-col { flex-direction: column; }
    .items-center { align-items: center; }
    .gap-1 { gap: 4px; } .gap-2 { gap: 8px; } .gap-3 { gap: 12px; }
    .w-full { width: 100%; }
    .space-y { display: flex; flex-direction: column; gap: 8px; }
    .text-muted { color: var(--muted-foreground); }
    .text-xs { font-size: 11px; }
    .text-sm { font-size: 12px; }
    .font-mono { font-family: monospace; }

    /* ── Color tokens section ── */
    .token-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 12px; }
    .token-block-swatch { width: 100%; height: 56px; border-radius: var(--radius); border: 1px solid var(--border); }
    .token-block-name   { font-size: 10px; font-weight: 500; margin-top: 4px; color: var(--foreground); }
    .token-block-var    { font-size: 9px; color: var(--muted-foreground); font-family: monospace; }
  </style>
</head>
<body class="${isDarkSystem ? "dark" : ""}">

  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-card">
      <p class="sidebar-title">Sections</p>
      <nav class="toc-nav" id="toc">
        ${tocLinks}
      </nav>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="main">
    <h1 class="page-title">Component Showcase</h1>
    <p class="page-desc">Every component, live and styled with your generated design system.</p>

    <!-- TYPOGRAPHY -->
    <section id="typography" class="section">
      <p class="section-heading">Typography</p>
      <div class="grid grid-2">
        <div class="demo">
          <div class="demo-body col" style="align-items:flex-start; gap:12px;">
            <div class="type-h1">Heading 1</div>
            <div class="type-h2">Heading 2</div>
            <div class="type-h3">Heading 3</div>
            <div class="type-lead">Lead paragraph text</div>
          </div>
          <div class="demo-footer">Headings</div>
        </div>
        <div class="demo">
          <div class="demo-body col" style="align-items:flex-start; gap:10px;">
            <div class="type-body">Body text — the quick brown fox jumps over the lazy dog.</div>
            <div class="type-small">Small / caption text for secondary information</div>
            <span class="type-mono">monospace</span>
            <div class="flex gap-2 flex-wrap">
              <span class="kbd">⌘K</span>
              <span class="kbd">⌃⇧P</span>
              <span class="kbd">Esc</span>
            </div>
          </div>
          <div class="demo-footer">Body & Utilities</div>
        </div>
      </div>
    </section>

    <!-- BUTTONS -->
    <section id="buttons" class="section">
      <p class="section-heading">Buttons</p>
      <div class="grid grid-3">
        <div class="demo">
          <div class="demo-body gap-2 flex-wrap">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-outline">Outline</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-destructive">Destructive</button>
          </div>
          <div class="demo-footer">Button Variants</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2">
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
          <div class="demo-footer">Button Sizes</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2">
            <button class="btn btn-primary" disabled>Disabled</button>
            <button class="btn btn-outline" disabled>Outline</button>
            <button class="btn btn-ghost btn-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="btn btn-primary btn-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </button>
          </div>
          <div class="demo-footer">States & Icon Buttons</div>
        </div>
      </div>
    </section>

    <!-- INPUTS -->
    <section id="inputs" class="section">
      <p class="section-heading">Inputs</p>
      <div class="grid grid-3">
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="field">
              <label class="label">Email</label>
              <input class="input" type="email" placeholder="you@example.com" />
            </div>
            <div class="field">
              <label class="label">Password</label>
              <input class="input" type="password" value="secret123" />
              <span class="hint">At least 8 characters</span>
            </div>
          </div>
          <div class="demo-footer">Text Inputs</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <input class="input" placeholder="Search..." />
            <input class="input" value="Read only value" readonly />
            <input class="input" placeholder="Disabled" disabled />
          </div>
          <div class="demo-footer">Input States</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <select class="select">
              <option>Select option...</option>
              <option>Option A</option>
              <option>Option B</option>
            </select>
            <textarea class="textarea" placeholder="Write something..." style="min-height:60px;"></textarea>
          </div>
          <div class="demo-footer">Select & Textarea</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="field">
              <label class="label">Search</label>
              <div style="position:relative;">
                <svg style="position:absolute;left:9px;top:50%;transform:translateY(-50%);opacity:0.5;" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input class="input" style="padding-left:28px;" placeholder="Search..." />
              </div>
            </div>
          </div>
          <div class="demo-footer">Search Input</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2">
            <div class="input-group-h" style="width:100%;">
              <input class="input" style="flex:1;" placeholder="Amount" />
              <select class="select" style="width:90px;">
                <option>USD</option><option>EUR</option><option>GBP</option>
              </select>
            </div>
          </div>
          <div class="demo-footer">Input Group</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2">
            <div style="display:flex;gap:6px;">
              ${[1,2,3,4,5,6].map(i => `<div style="width:36px;height:40px;display:flex;align-items:center;justify-content:center;border:1px solid var(--input);border-radius:var(--radius);font-size:15px;font-weight:600;font-family:monospace;">${i < 4 ? i : ""}</div>`).join("")}
            </div>
          </div>
          <div class="demo-footer">OTP Input</div>
        </div>
      </div>
    </section>

    <!-- SELECTION CONTROLS -->
    <section id="selection" class="section">
      <p class="section-heading">Selection Controls</p>
      <div class="grid grid-3">
        <div class="demo">
          <div class="demo-body col gap-2 start">
            <div class="ctrl-row"><div class="checkbox checked"></div><span>Accept terms</span></div>
            <div class="ctrl-row"><div class="checkbox"></div><span>Email updates</span></div>
            <div class="ctrl-row"><div class="checkbox checked"></div><span>Newsletter</span></div>
          </div>
          <div class="demo-footer">Checkbox</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2 start">
            <div class="ctrl-row"><div class="radio checked"></div><span>Option A</span></div>
            <div class="ctrl-row"><div class="radio"></div><span>Option B</span></div>
            <div class="ctrl-row"><div class="radio"></div><span>Option C</span></div>
          </div>
          <div class="demo-footer">Radio Group</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2 start">
            <div class="ctrl-row">
              <button class="switch-track on" onclick="this.classList.toggle('on')"><div class="switch-thumb"></div></button>
              <span>Notifications</span>
            </div>
            <div class="ctrl-row">
              <button class="switch-track" onclick="this.classList.toggle('on')"><div class="switch-thumb"></div></button>
              <span>Dark mode</span>
            </div>
          </div>
          <div class="demo-footer">Switch</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <input class="slider" type="range" value="60" />
            <input class="slider" type="range" value="30" />
          </div>
          <div class="demo-footer">Slider</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2 flex-wrap">
            <div class="tabs-list">
              <button class="tab-btn active" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">All</button>
              <button class="tab-btn" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Active</button>
              <button class="tab-btn" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Archived</button>
            </div>
          </div>
          <div class="demo-footer">Segmented Control</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-2 flex-wrap">
            <button class="btn btn-secondary btn-sm" style="border-radius:999px;">Design</button>
            <button class="btn btn-primary btn-sm" style="border-radius:999px;">Development</button>
            <button class="btn btn-secondary btn-sm" style="border-radius:999px;">Product</button>
            <button class="btn btn-secondary btn-sm" style="border-radius:999px;">Marketing</button>
          </div>
          <div class="demo-footer">Toggle Tags</div>
        </div>
      </div>
    </section>

    <!-- FEEDBACK -->
    <section id="feedback" class="section">
      <p class="section-heading">Feedback</p>
      <div class="grid grid-2">
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="progress-track"><div class="progress-fill" style="width:70%"></div></div>
            <div class="progress-track"><div class="progress-fill" style="width:40%"></div></div>
            <div class="progress-track" style="height:4px;"><div class="progress-fill" style="width:85%"></div></div>
          </div>
          <div class="demo-footer">Progress</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-3 flex-wrap">
            <span class="badge badge-primary">Primary</span>
            <span class="badge badge-secondary">Secondary</span>
            <span class="badge badge-outline">Outline</span>
            <span class="badge badge-destructive">Error</span>
            <span class="badge badge-muted">Muted</span>
          </div>
          <div class="demo-footer">Badges</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="alert">
              <svg class="alert-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
              <div><div class="alert-title">Info</div><div>Your session expires in 30 minutes.</div></div>
            </div>
            <div class="alert alert-destructive">
              <svg class="alert-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div><div class="alert-title">Error</div><div>Failed to save changes. Please retry.</div></div>
            </div>
            <div class="alert alert-success">
              <svg class="alert-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <div><div class="alert-title">Success</div><div>Changes saved successfully.</div></div>
            </div>
          </div>
          <div class="demo-footer">Alerts</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="flex gap-2 items-center">
              <div class="spinner"></div>
              <span class="text-sm text-muted">Loading...</span>
            </div>
            <div class="flex flex-col gap-2" style="width:100%">
              <div class="skeleton" style="height:14px;width:80%;"></div>
              <div class="skeleton" style="height:14px;width:60%;"></div>
              <div class="skeleton" style="height:14px;width:70%;"></div>
            </div>
          </div>
          <div class="demo-footer">Spinner & Skeleton</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2" style="align-items:flex-start;">
            <div class="card" style="max-width:260px;padding:12px;display:flex;gap:10px;align-items:flex-start;">
              <div class="avatar avatar-sm" style="background:var(--primary);">N</div>
              <div>
                <div style="font-size:12px;font-weight:600;">New comment</div>
                <div style="font-size:11px;color:var(--muted-foreground);">Alex left a comment on your PR.</div>
                <div style="font-size:10px;color:var(--muted-foreground);margin-top:4px;">2 min ago</div>
              </div>
            </div>
          </div>
          <div class="demo-footer">Notification Toast</div>
        </div>
        <div class="demo">
          <div class="demo-body">
            <div style="display:flex;flex-direction:column;gap:6px;width:100%;">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;">
                <span style="font-size:12px;">Storage</span>
                <span class="badge badge-secondary">75%</span>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width:75%"></div></div>
              <div style="display:flex;justify-content:space-between;">
                <span class="text-xs text-muted">7.5 GB used</span>
                <span class="text-xs text-muted">10 GB total</span>
              </div>
            </div>
          </div>
          <div class="demo-footer">Stat with Progress</div>
        </div>
      </div>
    </section>

    <!-- DATA DISPLAY -->
    <section id="data-display" class="section">
      <p class="section-heading">Data Display</p>
      <div class="grid" style="gap:12px;">
        <div class="grid grid-3">
          <div class="stat-card">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value">$45,231</div>
            <div class="stat-change up">↑ +20.1% from last month</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Active Users</div>
            <div class="stat-value">2,350</div>
            <div class="stat-change up">↑ +180 new users</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Churn Rate</div>
            <div class="stat-value">3.2%</div>
            <div class="stat-change down">↓ +0.4% this month</div>
          </div>
        </div>
        <div class="demo">
          <div class="demo-body" style="padding:0;display:block;">
            <table class="table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th></tr>
              </thead>
              <tbody>
                <tr><td>Alice Johnson</td><td>alice@example.com</td><td>Admin</td><td><span class="badge badge-primary">Active</span></td><td class="text-muted text-sm">Jan 2024</td></tr>
                <tr><td>Bob Smith</td><td>bob@example.com</td><td>Member</td><td><span class="badge badge-muted">Inactive</span></td><td class="text-muted text-sm">Mar 2024</td></tr>
                <tr><td>Carol White</td><td>carol@example.com</td><td>Viewer</td><td><span class="badge badge-outline">Pending</span></td><td class="text-muted text-sm">May 2024</td></tr>
                <tr><td>Dan Lee</td><td>dan@example.com</td><td>Editor</td><td><span class="badge badge-primary">Active</span></td><td class="text-muted text-sm">Jun 2024</td></tr>
              </tbody>
            </table>
          </div>
          <div class="demo-footer">Data Table</div>
        </div>
        <div class="grid grid-3">
          <div class="demo">
            <div class="demo-body gap-2">
              <div class="avatar-group">
                <div class="avatar">JD</div>
                <div class="avatar" style="background:var(--secondary);color:var(--secondary-foreground)">AB</div>
                <div class="avatar" style="background:var(--accent);color:var(--accent-foreground)">MK</div>
                <div class="avatar" style="background:var(--muted);color:var(--muted-foreground);font-size:10px;">+5</div>
              </div>
            </div>
            <div class="demo-footer">Avatar Group</div>
          </div>
          <div class="demo">
            <div class="demo-body">
              <div class="tabs-list">
                <button class="tab-btn active" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Account</button>
                <button class="tab-btn" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Password</button>
                <button class="tab-btn" onclick="this.parentNode.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">Billing</button>
              </div>
            </div>
            <div class="demo-footer">Tabs</div>
          </div>
          <div class="demo">
            <div class="demo-body col gap-2 start">
              <div class="accordion-item" style="width:100%;border-top:1px solid var(--border);">
                <button class="accordion-trigger">Is it accessible?<span>↓</span></button>
                <div class="accordion-content">Yes. It follows WAI-ARIA design pattern.</div>
              </div>
              <div class="accordion-item" style="width:100%;">
                <button class="accordion-trigger">Is it styled?<span>↓</span></button>
              </div>
            </div>
            <div class="demo-footer">Accordion</div>
          </div>
        </div>
      </div>
    </section>

    <!-- OVERLAYS -->
    <section id="overlay" class="section">
      <p class="section-heading">Overlays</p>
      <div class="grid grid-3">
        <div class="demo">
          <div class="demo-body" style="align-items:flex-start;">
            <div class="dialog-mock">
              <div class="dialog-title">Confirm deletion</div>
              <div class="dialog-desc">This action cannot be undone. Are you sure you want to permanently delete this item?</div>
              <div class="dialog-footer">
                <button class="btn btn-outline btn-sm">Cancel</button>
                <button class="btn btn-destructive btn-sm">Delete</button>
              </div>
            </div>
          </div>
          <div class="demo-footer">Dialog</div>
        </div>
        <div class="demo">
          <div class="demo-body" style="align-items:flex-start;">
            <div class="dropdown-mock">
              <div class="dropdown-label">My Account</div>
              <div class="dropdown-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Profile
              </div>
              <div class="dropdown-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
                Settings
              </div>
              <div class="dropdown-sep"></div>
              <div class="dropdown-item" style="color:var(--destructive);">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign out
              </div>
            </div>
          </div>
          <div class="demo-footer">Dropdown Menu</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-3" style="align-items:flex-start;">
            <div>
              <div class="tooltip-mock">Keyboard shortcut: ⌘K</div>
              <div style="margin-top:4px;font-size:11px;color:var(--muted-foreground);">↑ Tooltip</div>
            </div>
            <div class="popover-mock">
              <div style="font-weight:600;font-size:12px;margin-bottom:4px;">Quick filters</div>
              <div class="ctrl-row" style="font-size:12px;"><div class="checkbox checked"></div> Show archived</div>
              <div class="ctrl-row" style="font-size:12px;"><div class="checkbox"></div> My items only</div>
            </div>
            <div style="font-size:11px;color:var(--muted-foreground);">↑ Popover</div>
          </div>
          <div class="demo-footer">Tooltip & Popover</div>
        </div>
      </div>
    </section>

    <!-- NAVIGATION -->
    <section id="navigation" class="section">
      <p class="section-heading">Navigation</p>
      <div class="grid grid-2">
        <div class="demo">
          <div class="demo-body col gap-2 start">
            <nav class="breadcrumb">
              <span class="bc-item">Home</span>
              <span class="bc-sep">/</span>
              <span class="bc-item">Projects</span>
              <span class="bc-sep">/</span>
              <span class="bc-item current">Design System</span>
            </nav>
          </div>
          <div class="demo-footer">Breadcrumb</div>
        </div>
        <div class="demo">
          <div class="demo-body gap-1">
            <nav class="pagination">
              <button class="page-btn">‹</button>
              <button class="page-btn">1</button>
              <button class="page-btn active">2</button>
              <button class="page-btn">3</button>
              <button class="page-btn">4</button>
              <button class="page-btn">›</button>
            </nav>
          </div>
          <div class="demo-footer">Pagination</div>
        </div>
        <div class="demo" style="grid-column:span 2;">
          <div class="demo-body">
            <div class="steps" style="width:100%;">
              <div class="step">
                <div class="step-circle done">✓</div>
                <div style="display:flex;flex-direction:column;gap:1px;">
                  <span style="font-size:12px;font-weight:500;">Account</span>
                  <span class="step-label">Create account</span>
                </div>
                <div class="step-line done"></div>
              </div>
              <div class="step">
                <div class="step-circle active">2</div>
                <div style="display:flex;flex-direction:column;gap:1px;">
                  <span style="font-size:12px;font-weight:500;">Profile</span>
                  <span class="step-label">Set up profile</span>
                </div>
                <div class="step-line"></div>
              </div>
              <div class="step">
                <div class="step-circle pending">3</div>
                <div style="display:flex;flex-direction:column;gap:1px;">
                  <span style="font-size:12px;font-weight:500;">Review</span>
                  <span class="step-label">Confirm details</span>
                </div>
              </div>
            </div>
          </div>
          <div class="demo-footer">Steps / Wizard</div>
        </div>
      </div>
    </section>

    <!-- LAYOUT & CARDS -->
    <section id="layout" class="section">
      <p class="section-heading">Layout & Cards</p>
      <div class="grid grid-2">
        <div class="demo">
          <div class="demo-body">
            <div class="card w-full">
              <div class="card-title">Create project</div>
              <div class="card-desc">Deploy your new project in one-click.</div>
              <div class="card-footer">
                <button class="btn btn-outline btn-sm">Cancel</button>
                <button class="btn btn-primary btn-sm">Deploy</button>
              </div>
            </div>
          </div>
          <div class="demo-footer">Card</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <div class="card w-full" style="padding:12px;display:flex;align-items:center;gap:12px;">
              <div class="avatar">A</div>
              <div>
                <div style="font-size:13px;font-weight:600;">Alice Johnson</div>
                <div style="font-size:11px;color:var(--muted-foreground);">alice@example.com · Admin</div>
              </div>
              <button class="btn btn-outline btn-sm" style="margin-left:auto;">Edit</button>
            </div>
            <div class="card w-full" style="padding:12px;display:flex;align-items:center;gap:12px;">
              <div class="avatar" style="background:var(--secondary);color:var(--secondary-foreground);">B</div>
              <div>
                <div style="font-size:13px;font-weight:600;">Bob Smith</div>
                <div style="font-size:11px;color:var(--muted-foreground);">bob@example.com · Member</div>
              </div>
              <button class="btn btn-outline btn-sm" style="margin-left:auto;">Edit</button>
            </div>
          </div>
          <div class="demo-footer">List Card</div>
        </div>
        <div class="demo">
          <div class="demo-body">
            <div class="card w-full">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div class="card-title" style="margin:0;">Activity</div>
                <span class="badge badge-secondary">Last 7 days</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${["Deployed v2.1.0", "PR merged: Fix auth bug", "New member joined"].map(t => `
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                  <div style="width:6px;height:6px;border-radius:50%;background:var(--primary);flex-shrink:0;"></div>
                  ${t}
                </div>`).join("")}
              </div>
            </div>
          </div>
          <div class="demo-footer">Activity Card</div>
        </div>
        <div class="demo">
          <div class="demo-body col gap-2">
            <div style="background:var(--muted);border-radius:var(--radius);padding:16px;width:100%;">
              <div style="font-size:12px;color:var(--muted-foreground);margin-bottom:8px;">Code block</div>
              <code style="font-family:monospace;font-size:11px;color:var(--foreground);">
                const theme = {<br/>
                &nbsp;&nbsp;primary: "hsl(238 65% 65%)",<br/>
                &nbsp;&nbsp;radius: "0.5rem",<br/>
                }
              </code>
            </div>
          </div>
          <div class="demo-footer">Code Block</div>
        </div>
      </div>
    </section>

    <!-- COLOR TOKENS -->
    <section id="tokens" class="section">
      <p class="section-heading">Color Tokens</p>
      <div class="token-grid">
        ${COLOR_TOKENS.map(([v, l]) => `
        <div>
          <div class="token-block-swatch" style="background:var(${v})"></div>
          <div class="token-block-name">${l}</div>
          <div class="token-block-var">${v}</div>
        </div>`).join("")}
      </div>
    </section>

  </main>

  <!-- RIGHT SIDEBAR (Color Tokens) -->
  <aside class="sidebar-right">
    <div class="sidebar-card">
      <p class="sidebar-title">Color Tokens</p>
      <div class="token-list" style="padding: 8px 10px 10px;">
        ${colorSwatches}
      </div>
    </div>
  </aside>

  <script>
    // Highlight active TOC item on scroll
    const sections = document.querySelectorAll('section[id]');
    const tocLinks = document.querySelectorAll('.toc-link');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => obs.observe(s));
  </script>

</body>
</html>`;
}
