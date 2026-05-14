export const REVIEW_RULES = `
## Accessibility (WCAG 2.1)

### Critical Issues (-20 points each)

**Images without alt text**
- Every \`<img>\` must have an \`alt\` attribute
- Decorative images: \`alt=""\`
- Informative images: descriptive alt text
- WCAG: 1.1.1 Non-text Content (Level A)

**Icon-only buttons missing aria-labels**
- Buttons containing only an icon/SVG and no visible text must have \`aria-label\`
- Also applies to icon-only links
- WCAG: 4.1.2 Name, Role, Value (Level A)

**Form inputs without labels**
- Every \`<input>\`, \`<select>\`, \`<textarea>\` needs a visible \`<label>\` or \`aria-label\`
- Placeholder text is NOT a substitute for labels
- WCAG: 1.3.1 Info and Relationships (Level A)

**Missing dialog/modal accessibility**
- Modals must have \`role="dialog"\` and \`aria-modal="true"\`
- Must include \`aria-labelledby\` or \`aria-label\`
- Must trap focus inside when open
- Must close on Escape key
- WCAG: 4.1.2 Name, Role, Value (Level A)

### Serious Issues (-10 points each)

**Focus outline removed without replacement**
- Never use \`outline: none\` or \`outline: 0\` without adding a visible \`focus-visible\` style
- WCAG: 2.4.7 Focus Visible (Level AA)

**Missing keyboard event handlers**
- Interactive elements with \`onClick\` must also handle \`onKeyDown\` (Enter/Space)
- Or use semantic HTML (\`<button>\`, \`<a>\`) which handles this natively
- WCAG: 2.1.1 Keyboard (Level A)

**Touch targets under 44px**
- All interactive elements should be at least 44×44px
- Use padding to increase tap target without changing visual size
- WCAG: 2.5.5 Target Size (Level AAA, recommended)

**Color-only information**
- Don't convey information through color alone (e.g., red = error)
- Add icons, text, or patterns alongside color
- WCAG: 1.4.1 Use of Color (Level A)

### Moderate Issues (-5 points each)

**Skipped heading levels**
- Headings must follow sequential order (h1 → h2 → h3)
- Don't skip from h1 to h3 or use headings for styling
- WCAG: 1.3.1 Info and Relationships (Level A)

**Positive tabIndex values**
- Never use \`tabIndex\` > 0; it disrupts natural tab order
- Use \`tabIndex={0}\` to make non-interactive elements focusable
- Use \`tabIndex={-1}\` for programmatic focus only

**Incomplete ARIA attributes**
- If using ARIA roles, include all required attributes
- \`role="checkbox"\` needs \`aria-checked\`
- \`role="tab"\` needs \`aria-selected\` and \`aria-controls\`

## Visual Design

### Layout & Spacing (-10 points each)

**Inconsistent spacing values**
- Use consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
- Don't mix arbitrary values like \`p-[13px]\` with system values
- Stick to Tailwind's spacing scale or CSS custom properties

**Overflow issues**
- Containers with fixed widths must handle text overflow
- Use \`overflow-hidden\`, \`text-ellipsis\`, or \`overflow-auto\`
- Test with long content and small viewports

**Z-index conflicts**
- Use a defined z-index scale (10, 20, 30, 40, 50)
- Don't use arbitrary large values like \`z-[9999]\`
- Document z-index layers in your design system

### Typography (-5 points each)

**Mixed font families**
- Use at most 2 font families (one for headings, one for body)
- Don't import fonts that aren't used
- Ensure fallback fonts are specified

**Line height issues**
- Body text: line-height 1.5–1.75
- Headings: line-height 1.1–1.3
- Don't use unitless line-height below 1.2

**Missing font fallbacks**
- Always include system font fallbacks in font-family
- Example: \`font-family: 'Inter', system-ui, -apple-system, sans-serif\`

### Color & Contrast (-10 for critical, -5 for moderate)

**Contrast ratio below 4.5:1**
- Normal text needs 4.5:1 contrast ratio against background
- Large text (18px+ bold, or 24px+) needs 3:1
- Gray text on white: use gray-700+ for body, gray-500+ for secondary
- WCAG: 1.4.3 Contrast Minimum (Level AA)

**Missing hover/focus/active states**
- All interactive elements need visible state changes
- Buttons: hover, focus-visible, active, disabled
- Links: hover, focus-visible, visited
- Inputs: focus, error, disabled

### Components (-5 points each)

**Missing button states**
- Buttons need: default, hover, focus, active, disabled, loading
- Disabled buttons should use \`aria-disabled\` or \`disabled\` attribute
- Loading buttons should show a spinner and disable interaction

**Incomplete form states**
- Inputs need: default, focus, filled, error, disabled
- Error messages should be linked with \`aria-describedby\`
- Required fields should use \`aria-required="true"\`
`;
