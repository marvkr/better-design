/**
 * Shared styles for Margin components.
 *
 * Margin has very few finishes, and each one lives here so a component picks
 * a finish instead of writing its own shadow:
 *
 * - the oxblood face: flat oxblood ink inside a darker rule, worn by the
 *   primary Button and by every checked control;
 * - the tab: a paper face inside one ruled hairline, with no shadow, worn by
 *   toolbar buttons, chips and unchecked controls;
 * - the clean field: a lighter sheet inside a firm rule, worn by fields;
 * - the sheet: a paper card bounded by one hairline.
 *
 * `../components-base/_shared.ts` carries the same finishes under the same
 * names and values, so the Radix and Base UI sets share one recipe.
 *
 * Form fields (Input, Textarea, PasswordInput, SearchInput, NumberInput,
 * PhoneInput, InputOTP) MUST import `formFieldBase` instead of re-declaring
 * classes. Do NOT copy-paste these strings into a component.
 */

/** The focus ring every interactive part shares: a soft oxblood halo, no offset. */
export const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-ring";

/**
 * The oxblood face: the primary Button's fill, darker oxblood rule.
 * Checkbox, switch, radio and slider wear the same classes on their checked
 * parts, so they read as one material with the button.
 */
export const oxFace =
  "bg-(image:--ox-face) text-primary-foreground shadow-(--ox-edge)";

/** The oxblood face, a step deeper, for hover. */
export const oxFaceHover = "hover:bg-(image:--ox-face-hover)";

/** The darker oxblood rule on its own, around a paper slider thumb. */
export const oxHairline = "shadow-(--ox-hairline)";

/** The pale oxblood mark for a gentle call to action. */
export const markFace =
  "bg-(image:--mark-face) text-(--mark-foreground) shadow-(--mark-edge) hover:brightness-97";

/** The ruled toolbar tab: a hairline ring and a shadow one step above flat. */
export const pillFace =
  "bg-card text-foreground shadow-(--pill-edge) " +
  "transition duration-fast ease-(--ease-out) " +
  "hover:bg-(--pill-face-hover) hover:shadow-(--pill-edge-hover)";

/** The quiet face: a step of paper for quiet buttons and neutral chips. */
export const quietFace =
  "bg-(--field) text-foreground shadow-(--field-shade) " +
  "transition duration-fast ease-(--ease-out) hover:bg-(--field-hover)";

/** The red face for a destructive action, as flat as the oxblood. */
export const destructiveFace =
  "bg-(image:--destructive-face) text-destructive-foreground shadow-xs hover:brightness-105";

/** The sheet: a paper face bounded by one hairline, with no drop. */
export const sheetSurface = "bg-card text-card-foreground shadow-(--shadow-card)";

/** The desk: one paper step below a card, for nested areas. */
export const canvasSurface = "bg-muted text-card-foreground shadow-(--shadow-card)";

/** The slot: tracks and resting switch wells, sunk behind a firmer hairline. */
export const slotWell = "bg-(--field) shadow-(--slot-edge)";

/** The press every button shares: a small scale toward the page. */
export const pressScale =
  "transition duration-fast ease-(--ease-out) active:scale-97 motion-reduce:active:scale-100";

/**
 * Base styles shared by every form-field surface: a clean sheet inside a
 * firm rule. On focus it takes an oxblood edge and wears the oxblood halo. The transparent border is there
 * so an invalid field can turn it red.
 */
export const formFieldBase =
  "w-full min-w-0 rounded-lg border border-transparent bg-(--field) px-3 text-sm text-foreground " +
  "shadow-(--field-edge) placeholder:text-muted-foreground " +
  "transition duration-fast ease-(--ease-out) " +
  "focus-visible:outline-none focus-visible:border-primary/45 focus-visible:bg-card focus-visible:ring-3 focus-visible:ring-ring " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

/** Height and vertical padding for single-line form fields (2.25rem). */
export const formFieldSingleLine = "flex h-9 py-1.5";

/** Vertical padding and min-height for multi-line form fields. */
export const formFieldMultiLine = "flex min-h-24 py-2 leading-normal";

/** The floating panel shared by every menu, popover, select and tooltip. */
export const popoverSurface =
  "rounded-xl bg-popover text-popover-foreground shadow-(--shadow-menu) outline-none";

/** A row inside a floating panel; the highlighted row turns a step of paper. */
export const menuItemBase =
  "relative flex h-8 cursor-default select-none items-center gap-2 rounded-md px-2.5 text-sm outline-none " +
  "transition-colors duration-fast " +
  "focus:bg-(--field) focus:text-accent-foreground data-[highlighted]:bg-(--field) data-[highlighted]:text-accent-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:text-muted-foreground " +
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground";

/**
 * A checked small control (checkbox box, radio, switch track) in the oxblood
 * face. Radix marks it with data-state="checked"; Base UI with data-checked.
 */
export const controlChecked =
  "data-[state=checked]:bg-(image:--ox-face) data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-(--ox-edge) " +
  "data-[checked]:bg-(image:--ox-face) data-[checked]:text-primary-foreground data-[checked]:shadow-(--ox-edge)";

/** The colour a run of code takes, named after the token it holds. */
export type CodeTone =
  | "plain"
  | "comment"
  | "keyword"
  | "control"
  | "fn"
  | "string"
  | "doc"
  | "number"
  | "op"
  | "key";

/** One coloured run of code. */
export interface CodeToken {
  text: string;
  tone: CodeTone;
}

/** The class each tone renders with, from the editor's clause inks. */
export const codeToneClass = {
  plain: "",
  comment: "text-(--clause-comment)",
  keyword: "text-(--clause-keyword)",
  control: "text-(--clause-control)",
  fn: "text-(--clause-fn)",
  string: "text-(--clause-string)",
  doc: "text-(--clause-doc)",
  number: "text-(--clause-number)",
  op: "text-(--clause-op)",
  key: "text-(--clause-key)",
} satisfies { [tone in CodeTone]: string };

// One pass over the source, in priority order: comments, doc strings,
// strings, control words, keywords, numbers, calls, operators.
const CODE_TOKEN =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("""[\s\S]*?"""|'''[\s\S]*?''')|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\b(return|if|elif|else|for|while|try|except|catch|throw|break|continue|yield|await)\b|\b(def|class|import|from|as|export|const|let|var|function|async|new|type|interface|extends|in|is|not|and|or|None|True|False|null|true|false|undefined)\b|(\b\d+(?:\.\d+)?\b)|\b([A-Za-z_$][\w$]*)(?=\s*\()|([=+\-*/<>!%&|^~?]+)/g;

const GROUP_TONES: CodeTone[] = ["plain", "comment", "doc", "string", "control", "keyword", "number", "fn", "op"];

/**
 * Splits source into coloured lines with a small, language-agnostic lexer.
 * A string followed by a colon is an object key. Each inner array is one
 * line, so a block can draw its line-number gutter.
 */
export function tokenizeCodeLines(code: string): CodeToken[][] {
  const flat: CodeToken[] = [];
  let last = 0;
  for (const match of code.matchAll(CODE_TOKEN)) {
    const start = match.index ?? 0;
    if (start > last) flat.push({ text: code.slice(last, start), tone: "plain" });
    const group = GROUP_TONES.findIndex((_, g) => g > 0 && match[g] !== undefined);
    let tone = GROUP_TONES[group] ?? "plain";
    const end = start + match[0].length;
    if (tone === "string" && /^\s*:/.test(code.slice(end, end + 8))) tone = "key";
    flat.push({ text: match[0], tone });
    last = end;
  }
  if (last < code.length) flat.push({ text: code.slice(last), tone: "plain" });

  const lines: CodeToken[][] = [[]];
  for (const token of flat) {
    const pieces = token.text.split("\n");
    pieces.forEach((piece, i) => {
      if (i > 0) lines.push([]);
      if (piece) lines[lines.length - 1].push({ text: piece, tone: token.tone });
    });
  }
  return lines;
}
