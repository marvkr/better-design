// Better Design — design-system guardrail (flat ESLint config fragment).
// Flags raw HTML primitives in feature code when the installed DS ships an
// equivalent in components/ui/*, plus the uppercase micro-label tell.
// Wire it into eslint.config.mjs:
//
//   import dsGuardrail from "./.better-design/eslint-design-system.mjs"; // better-design-guardrail
//   export default [ ...dsGuardrail, /* ...your config */ ];
//
// Scoped to app/** and components/** but NOT components/ui/** (the DS itself).
// Bump "warn" -> "error" to fail lint/CI on violations.
const banned = [
  { selector: "JSXOpeningElement[name.name='aside']:has(JSXAttribute[name.name='aria-label'][value.value='Primary navigation'])", message: "Use <Sidebar> from @/components/ui/sidebar instead of a raw primary-navigation <aside>." },
  { selector: "JSXOpeningElement[name.name='aside']:has(JSXAttribute[name.name='aria-label'][value.value='Main navigation'])", message: "Use <Sidebar> from @/components/ui/sidebar instead of a raw main-navigation <aside>." },
  { selector: "JSXOpeningElement[name.name='button']", message: "Use <Button> from @/components/ui/button instead of a raw <button>." },
  { selector: "JSXOpeningElement[name.name='table']", message: "Use <Table> from @/components/ui/table instead of a raw <table>." },
  { selector: "JSXOpeningElement[name.name='input']", message: "Use <Input> from @/components/ui/input instead of a raw <input>." },
  { selector: "JSXOpeningElement[name.name='select']", message: "Use <Select> from @/components/ui/select instead of a raw <select>." },
  { selector: "JSXOpeningElement[name.name='textarea']", message: "Use <Textarea> from @/components/ui/textarea instead of a raw <textarea>." },
  { selector: "JSXAttribute[name.name='className'] Literal[value=/(^|[ ])uppercase([ ]|$)/][value=/(^|[ ])tracking-[^ ]+([ ]|$)/]", message: "Letter-spaced capitals are a generated-UI tell. Use sentence case at the design system's own label size; keep font-mono for code, IDs, and aligned figures." },
];

export default [
  {
    files: ["app/**/*.{tsx,jsx}", "components/**/*.{tsx,jsx}"],
    // Exclude the DS itself and co-located tests, which legitimately render raw
    // <button>/<input> for queries/assertions and would otherwise emit noise.
    ignores: ["components/ui/**", "**/*.{test,spec}.{tsx,jsx}", "**/__tests__/**"],
    rules: { "no-restricted-syntax": ["warn", ...banned] },
  },
];
