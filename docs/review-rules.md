# Code Review Rules: Accessibility & Visual Design

Guidelines for automated code reviews checking accessibility (WCAG 2.1) and visual design consistency.

## Accessibility (WCAG 2.1)

### Critical Issues

These issues MUST be fixed before shipping. They prevent users from accessing content.

#### Images without alt text

**Rule:** All `<img>` elements must have an `alt` attribute.

```tsx
// ❌ Bad
<img src="/profile.jpg" />

// ✅ Good
<img src="/profile.jpg" alt="User profile photo" />

// ✅ Good (decorative images)
<img src="/divider.png" alt="" />
```

**WCAG Reference:** 1.1.1 Non-text Content (Level A)

**Why it matters:** Screen readers cannot convey image content without alt text. Decorative images should use `alt=""` to indicate they should be skipped.

#### Icon-only buttons missing aria-labels

**Rule:** Buttons without text content must have `aria-label` or `aria-labelledby`.

```tsx
// ❌ Bad
<button onClick={handleClose}>
  <CloseIcon />
</button>

// ✅ Good
<button onClick={handleClose} aria-label="Close dialog">
  <CloseIcon />
</button>

// ✅ Good (with visible text)
<button onClick={handleClose}>
  <CloseIcon />
  <span>Close</span>
</button>
```

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)

**Why it matters:** Screen reader users cannot understand button purpose without accessible names.

#### Form inputs without labels

**Rule:** All `<input>`, `<select>`, and `<textarea>` elements must have associated labels.

```tsx
// ❌ Bad
<input type="email" placeholder="Email" />

// ✅ Good (visible label)
<label htmlFor="email">Email</label>
<input type="email" id="email" />

// ✅ Good (aria-label for compact layouts)
<input type="email" aria-label="Email address" />

// ✅ Good (aria-labelledby)
<span id="email-label">Email</span>
<input type="email" aria-labelledby="email-label" />
```

**WCAG Reference:** 3.3.2 Labels or Instructions (Level A)

**Why it matters:** Users need to understand what data to enter. Placeholders disappear and aren't reliable.

#### Non-semantic click handlers

**Rule:** Don't use `onClick` on non-interactive elements. Use `<button>` or add role + keyboard handlers.

```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>

// ✅ Good (styled button)
<button onClick={handleClick} className="link-style">
  Click me
</button>

// ⚠️ Acceptable if necessary (but avoid)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  Click me
</div>
```

**WCAG Reference:** 2.1.1 Keyboard (Level A)

**Why it matters:** Keyboard users cannot interact with `div onClick` elements. Screen readers don't announce them as interactive.

#### Links without href

**Rule:** All `<a>` elements must have an `href` attribute. Use `<button>` for actions.

```tsx
// ❌ Bad
<a onClick={handleClick}>Settings</a>

// ✅ Good (actual link)
<a href="/settings">Settings</a>

// ✅ Good (action - use button)
<button onClick={handleClick}>Open Settings</button>
```

**WCAG Reference:** 2.1.1 Keyboard (Level A)

**Why it matters:** Links without `href` aren't focusable by keyboard and confuse screen readers.

### Serious Issues

These significantly impact accessibility but have workarounds. Should be fixed soon.

#### Focus outline removed without replacement

**Rule:** Don't use `outline: none` or `outline-none` without visible focus alternative.

```tsx
// ❌ Bad
<button className="outline-none">Click me</button>

// ✅ Good (custom focus style)
<button className="outline-none focus-visible:ring-2 focus-visible:ring-primary">
  Click me
</button>

// ✅ Good (default outline)
<button>Click me</button>
```

**WCAG Reference:** 2.4.7 Focus Visible (Level AA)

**Why it matters:** Keyboard users cannot see where focus is without visible indicators.

#### Missing keyboard handlers

**Rule:** Elements with mouse events (`onMouseEnter`, `onMouseLeave`) should have keyboard equivalents.

```tsx
// ❌ Bad
<div onMouseEnter={handleOpen}>Hover me</div>

// ✅ Good
<button
  onMouseEnter={handleOpen}
  onFocus={handleOpen}
  onMouseLeave={handleClose}
  onBlur={handleClose}
>
  Hover me
</button>
```

**WCAG Reference:** 2.1.1 Keyboard (Level A)

**Why it matters:** Hover-only interactions exclude keyboard users.

#### Color-only information

**Rule:** Don't convey information through color alone. Add icons, labels, or patterns.

```tsx
// ❌ Bad
<span className="text-red-500">Error</span>

// ✅ Good (icon + color)
<span className="text-red-500">
  <AlertIcon aria-hidden="true" />
  Error
</span>

// ✅ Good (explicit label)
<span className="text-red-500">
  <span className="sr-only">Error:</span>
  Invalid email format
</span>
```

**WCAG Reference:** 1.4.1 Use of Color (Level A)

**Why it matters:** Color blind users and screen reader users cannot perceive color-only distinctions.

#### Touch targets under 44×44px

**Rule:** Interactive elements should be at least 44×44px for touch devices.

```tsx
// ❌ Bad
<button className="w-8 h-8">
  <CloseIcon />
</button>

// ✅ Good
<button className="w-11 h-11">
  <CloseIcon />
</button>

// ✅ Good (small visual, large touch area with padding)
<button className="p-3">
  <CloseIcon className="w-5 h-5" />
</button>
```

**WCAG Reference:** 2.5.5 Target Size (Level AAA)

**Why it matters:** Small touch targets are difficult to tap accurately on mobile devices.

### Moderate Issues

These are best practices that improve accessibility but aren't blockers.

#### Skipped heading levels

**Rule:** Don't skip heading levels (h1 → h2 → h3, not h1 → h3).

```tsx
// ❌ Bad
<h1>Page Title</h1>
<h3>Subsection</h3>

// ✅ Good
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>

// ✅ Good (visual size ≠ semantic level)
<h2 className="text-sm">Small Section Title</h2>
```

**WCAG Reference:** 1.3.1 Info and Relationships (Level A)

**Why it matters:** Screen readers use heading hierarchy for navigation. Skipped levels create confusing document structure.

#### Positive tabIndex values

**Rule:** Don't use `tabIndex` greater than 0. Use `tabIndex={0}` or `tabIndex={-1}` only.

```tsx
// ❌ Bad
<div tabIndex={1}>First</div>
<div tabIndex={2}>Second</div>

// ✅ Good (natural DOM order)
<button>First</button>
<button>Second</button>

// ✅ Good (programmatic focus management)
<div tabIndex={-1} ref={focusRef}>
  Can be focused programmatically
</div>
```

**WCAG Reference:** 2.4.3 Focus Order (Level A)

**Why it matters:** Custom tab orders are confusing and break user expectations.

#### Role without required attributes

**Rule:** ARIA roles require specific attributes. Check ARIA specs for requirements.

```tsx
// ❌ Bad
<div role="checkbox" onClick={toggle}>Accept terms</div>

// ✅ Good
<div
  role="checkbox"
  aria-checked={isChecked}
  tabIndex={0}
  onClick={toggle}
  onKeyDown={handleKeyDown}
>
  Accept terms
</div>

// ✅ Better (use native elements)
<input type="checkbox" checked={isChecked} onChange={toggle} />
<label>Accept terms</label>
```

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)

**Why it matters:** Incomplete ARIA implementations confuse assistive technologies.

## Visual Design

### Layout & Spacing

#### Inconsistent spacing values

**Rule:** Use spacing values from your design system. Don't use arbitrary values.

```tsx
// ❌ Bad (arbitrary values)
<div className="mt-[13px] mb-[27px]">

// ✅ Good (system values)
<div className="mt-3 mb-6">

// Reference your spacing scale
// spacing-1: 4px
// spacing-2: 8px
// spacing-3: 12px
// spacing-4: 16px
// spacing-5: 24px
// spacing-6: 32px
```

**Why it matters:** Consistent spacing creates visual rhythm and makes designs feel cohesive.

#### Overflow and alignment issues

**Rule:** Ensure content doesn't overflow containers unintentionally.

```tsx
// ❌ Bad (can overflow)
<div className="w-64">
  <p>{veryLongTextWithoutBreaks}</p>
</div>

// ✅ Good (handles overflow)
<div className="w-64 overflow-hidden">
  <p className="truncate">{veryLongTextWithoutBreaks}</p>
</div>

// ✅ Good (wrap text)
<div className="w-64">
  <p className="break-words">{veryLongTextWithoutBreaks}</p>
</div>
```

**Why it matters:** Overflow breaks layouts and creates horizontal scrolling.

#### Z-index conflicts

**Rule:** Use a z-index scale. Don't use arbitrary high values.

```tsx
// ❌ Bad
<div style={{ zIndex: 99999 }}>

// ✅ Good (defined scale)
<div className="z-modal"> {/* z-index: 50 */}
<div className="z-dropdown"> {/* z-index: 40 */}
<div className="z-sticky"> {/* z-index: 20 */}

// Recommended z-index scale:
// z-0: 0
// z-10: 10
// z-20: 20
// z-30: 30
// z-40: 40
// z-50: 50
```

**Why it matters:** Arbitrary z-index values create stacking conflicts and are hard to debug.

### Typography

#### Mixed font families and weights

**Rule:** Stick to 1-2 font families and 2-3 weights maximum.

```tsx
// ❌ Bad (too many fonts)
<h1 className="font-serif">Title</h1>
<p className="font-sans">Body</p>
<button className="font-mono">Action</button>

// ✅ Good (consistent family)
<h1 className="font-sans font-bold">Title</h1>
<p className="font-sans">Body</p>
<button className="font-sans font-semibold">Action</button>
```

**Why it matters:** Too many fonts create visual chaos. Professional designs use 1-2 families consistently.

#### Line height issues

**Rule:** Use appropriate line-height for text size.

```tsx
// ❌ Bad (tight line-height on body text)
<p className="text-base leading-tight">Long paragraph...</p>

// ✅ Good (appropriate line-height)
<h1 className="text-4xl leading-tight">Heading</h1>
<p className="text-base leading-relaxed">Long paragraph...</p>

// Guidelines:
// - Large headings: leading-tight (1.25)
// - Body text: leading-normal to leading-relaxed (1.5-1.75)
// - Small text: leading-relaxed (1.75)
```

**Why it matters:** Tight line-height on body text reduces readability. Headlines need tighter spacing.

#### Missing font fallbacks

**Rule:** Always provide fallback fonts.

```css
/* ❌ Bad */
font-family: "CustomFont";

/* ✅ Good */
font-family: "CustomFont", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**Why it matters:** Custom fonts fail to load. Fallbacks ensure readable text.

### Color & Contrast

#### Contrast ratio below 4.5:1

**Rule:** Normal text needs 4.5:1 contrast ratio. Large text (18px+ or 14px+ bold) needs 3:1.

```tsx
// ❌ Bad (insufficient contrast)
<p className="text-gray-400">Important text</p> {/* on white bg */}

// ✅ Good
<p className="text-gray-900">Important text</p> {/* on white bg */}
<p className="text-gray-400">Supporting text</p> {/* less important */}
```

**WCAG Reference:** 1.4.3 Contrast (Minimum) (Level AA)

**Tools:** Use contrast checkers (WebAIM, Figma plugins) to verify.

**Why it matters:** Low contrast text is difficult to read, especially for users with visual impairments.

#### Missing hover/focus states

**Rule:** Interactive elements need visible hover and focus states.

```tsx
// ❌ Bad (no hover state)
<button className="bg-blue-500 text-white">
  Click me
</button>

// ✅ Good
<button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:ring-2">
  Click me
</button>
```

**Why it matters:** Users need feedback when hovering or focusing on interactive elements.

#### Dark mode inconsistencies

**Rule:** If supporting dark mode, ensure all elements have dark variants.

```tsx
// ❌ Bad (only light mode)
<div className="bg-white text-black">

// ✅ Good
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

**Why it matters:** Missing dark mode styles create unusable interfaces when dark mode is enabled.

### Components

#### Missing button states

**Rule:** Buttons need disabled, loading, hover, and focus states.

```tsx
// ❌ Bad (only default state)
<button onClick={handleSubmit}>Submit</button>

// ✅ Good
<button
  onClick={handleSubmit}
  disabled={isLoading}
  className="
    bg-blue-500 hover:bg-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:ring-2 focus-visible:ring-offset-2
  "
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

**Why it matters:** Clear states provide feedback and prevent user confusion.

#### Missing form field states

**Rule:** Form fields need error, disabled, and focus states.

```tsx
// ❌ Bad (no error state)
<input type="email" />

// ✅ Good
<input
  type="email"
  className={cn(
    "border rounded-lg px-3 py-2",
    "focus:border-blue-500 focus:ring-2",
    error && "border-red-500",
    disabled && "opacity-50 cursor-not-allowed"
  )}
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <p id="email-error" className="text-red-500 text-sm">{error}</p>}
```

**Why it matters:** Users need to understand field state (error, disabled, focused).

#### Inconsistent borders and shadows

**Rule:** Use shadows and borders from your design system.

```tsx
// ❌ Bad (arbitrary shadow)
<div className="shadow-[0_4px_12px_rgba(0,0,0,0.15)]">

// ✅ Good (system shadow)
<div className="shadow-md">

// Define shadow scale:
// shadow-sm: subtle elevation
// shadow-md: moderate elevation
// shadow-lg: high elevation
// shadow-xl: dramatic elevation
```

**Why it matters:** Consistent shadows create coherent depth hierarchy.

## Review Output Format

When reviewing code, return issues in this format:

```typescript
interface ReviewIssue {
  severity: 'critical' | 'serious' | 'moderate';
  category: 'accessibility' | 'visual-design';
  rule: string;
  lineNumber?: number;
  codeSnippet: string;
  problem: string;
  fix: string;
  wcagReference?: string; // For accessibility issues
}
```

**Example:**

```json
{
  "severity": "critical",
  "category": "accessibility",
  "rule": "Icon-only buttons missing aria-labels",
  "lineNumber": 24,
  "codeSnippet": "<button><CloseIcon /></button>",
  "problem": "Button has no accessible name for screen readers",
  "fix": "Add aria-label=\"Close\"",
  "wcagReference": "4.1.2 Name, Role, Value (Level A)"
}
```

## Scoring

Calculate a score out of 100:

- **Critical issues:** -20 points each (max -100)
- **Serious issues:** -10 points each
- **Moderate issues:** -5 points each

Start at 100 and subtract points. Minimum score is 0.

**Score interpretation:**
- 90-100: Excellent
- 75-89: Good
- 60-74: Needs improvement
- 0-59: Poor

## Implementation Notes

When building the review tool:

1. **Parse code** - Use regex or AST parsing to find patterns
2. **Check each rule** - Iterate through rules and find violations
3. **Calculate line numbers** - Match violations to line numbers in source
4. **Format output** - Structure issues with all required fields
5. **Calculate score** - Apply scoring formula
6. **Prioritize fixes** - Show critical issues first

**Performance:**
- Focus on critical and serious issues first
- Moderate issues are nice-to-have
- Don't report every single spacing inconsistency - cluster similar issues

**Context awareness:**
- Consider framework patterns (Next.js Image, Radix components have built-in a11y)
- Allow exceptions for well-tested component libraries
- Focus on custom code more than library usage
