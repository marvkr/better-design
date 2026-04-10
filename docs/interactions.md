# Interactions & Accessibility

## Keyboard Accessibility

### Keyboard Works Everywhere
- All flows are keyboard-operable
- Follow WAI-ARIA Authoring Patterns
- Every interactive element is reachable via Tab/Shift+Tab

### Clear Focus Indicators
- Every focusable element shows a visible focus ring
- Prefer `:focus-visible` over `:focus` to avoid distracting pointer users
- Set `:focus-within` for grouped controls
- Use `box-shadow` for focus rings, not `outline` (outline doesn't respect border-radius)

**Example:**
```css
.button:focus-visible {
  box-shadow: 0 0 0 3px var(--focus-ring);
}
```

### Focus Management
- Use focus traps in modals/dialogs
- Return focus to trigger element when closing
- Move focus to first interactive element when opening
- Follow WAI-ARIA patterns for specific components

### Keyboard Navigation in Lists
- Focusable elements in sequential lists: navigable with ↑↓ arrow keys
- Deletable list items: support ⌘ Backspace or Delete key

## Hit Targets

### Minimum Sizes
- **Desktop**: 24×24px minimum hit target
- **Mobile**: 44×44px minimum hit target
- If visual target is smaller, expand the hit target with padding/pseudo-elements

### Match Visual & Hit Targets
- Exception: if visual target < 24px, expand hit target to ≥ 24px
- Use `padding` or `::before`/`::after` pseudo-elements to expand clickable area

**Example:**
```css
.small-icon-button {
  /* Visual: 16x16px icon */
  padding: 4px; /* Hit target: 24x24px */
}
```

### No Dead Zones
- Interactive elements in vertical/horizontal lists: no dead areas between items
- Increase padding instead of margin to eliminate gaps
- If part of a control looks interactive, it should be interactive

## Touch Interactions

### Hover States on Touch Devices
- Only show hover states on devices with hover capability
- Use `@media (hover: hover)` media query

```css
@media (hover: hover) {
  .button:hover {
    background: var(--bg-light);
  }
}
```

### Prevent Double-Tap Zoom
- Set `touch-action: manipulation` on interactive controls
- Disables double-tap to zoom on that element

```css
button, a, [role="button"] {
  touch-action: manipulation;
}
```

### Custom Tap Highlight
- Set `-webkit-tap-highlight-color` to match your design
- Don't just disable it - provide a replacement

```css
button {
  -webkit-tap-highlight-color: rgba(var(--primary-rgb), 0.2);
}
```

### Mobile Input Zoom Prevention
- `<input>` font size must be ≥ 16px on mobile
- Prevents iOS Safari auto-zoom/pan on focus
- Alternative: set viewport `maximum-scale=1` (not recommended - blocks user zoom)

```html
<input style="font-size: 16px;" />
```

## Links vs Buttons

### Links are Links
- Use `<a>` or `<Link>` for navigation
- Enables standard browser behaviors:
  - Cmd/Ctrl+Click to open in new tab
  - Middle-click to open in new tab
  - Right-click to copy link/open in new window
- **Never** use `<button>` or `<div>` for navigational links

### Button Click Timing
- Dropdown menus: trigger on `mousedown`, not `click`
- Opens immediately on press for better perceived performance

## URL as State

### Deep-Link Everything
- Persist state in URL when possible:
  - Filters
  - Tabs
  - Pagination
  - Expanded panels
  - Search queries
  - Modal/dialog state
- Enables share, refresh, Back/Forward navigation
- Use libraries like `nuqs` for Next.js

**Example with nuqs:**
```tsx
import { useQueryState } from 'nuqs';

const [filter, setFilter] = useQueryState('filter');
// URL: ?filter=active
```

### Scroll Position Persistence
- Back/Forward navigation restores prior scroll position
- Next.js handles this automatically
- For custom scroll containers, implement manually

## Drag Interactions

### Clean Drag UX
- Disable text selection during drag (`user-select: none`)
- Apply `inert` attribute to prevent interaction with other elements
- Prevents selection/hover happening simultaneously with drag

```tsx
<div
  draggable
  onDragStart={() => setDragging(true)}
  onDragEnd={() => setDragging(false)}
  style={{ userSelect: dragging ? 'none' : 'auto' }}
  inert={dragging ? '' : undefined}
>
  Draggable item
</div>
```

## Hydration

### Hydration-Safe Inputs
- Inputs must not lose focus after hydration
- Inputs must not lose value after hydration
- Test SSR → client hydration carefully
- Use controlled inputs carefully (can cause issues)

## Optimistic Updates

### Update UI Immediately
- Update UI when success is likely
- Reconcile on server response
- On failure: show error + roll back or provide Undo
- Makes interface feel instant

**Example:**
```tsx
const addItem = async (item) => {
  // Optimistic update
  setItems([...items, item]);

  try {
    await api.addItem(item);
  } catch (error) {
    // Roll back on error
    setItems(items);
    showError('Failed to add item');
  }
};
```

## Loading States

### Loading Buttons
- Show loading indicator + keep original label text
- Disable button during loading
- Add `aria-busy="true"` for screen readers

```tsx
<button disabled={loading} aria-busy={loading}>
  {loading && <Spinner />}
  Submit
</button>
```

### Minimum Loading Duration
- If showing spinner/skeleton, use:
  - Short show-delay (~150–300ms) to avoid flicker on fast responses
  - Minimum visible time (~300–500ms) once shown
- React `<Suspense>` does this automatically

### Ellipsis for Loading States
- Loading/processing states end with ellipsis
- "Loading…", "Saving…", "Generating…"
- Menu options that open follow-up also use ellipsis: "Rename…"

## Accessibility Announcements

### Announce Async Updates
- Use `aria-live` regions for dynamic content
- `aria-live="polite"` for toasts and inline validation
- `aria-live="assertive"` for critical errors

```tsx
<div aria-live="polite" aria-atomic="true">
  {message}
</div>
```

### Icon-Only Buttons
- Must have `aria-label` for screen readers

```tsx
<button aria-label="Close dialog">
  <CloseIcon />
</button>
```

## Tooltips

### Tooltip Timing
- First tooltip in a group: ~500ms delay
- Subsequent tooltips (while hovering nearby): no delay
- Implement using `data-instant` attribute

```css
[data-tooltip] {
  /* First tooltip */
  transition: opacity 200ms;
  transition-delay: 500ms;
}

[data-instant] [data-tooltip] {
  /* Subsequent tooltips */
  transition-delay: 0ms;
}
```

### Tooltip Restrictions
- Tooltips triggered by hover should not contain interactive content
- Interactive content belongs in popovers/dialogs, not tooltips

## Semantic HTML & ARIA

### Semantics Before ARIA
- Prefer native elements (`<button>`, `<a>`, `<label>`, `<table>`)
- Only use ARIA when native elements can't achieve the pattern
- Native elements have built-in keyboard support and semantics

### Headings & Skip Link
- Use hierarchical `<h1>` through `<h6>`
- Include a "Skip to content" link as first focusable element
- Hides visually but available to screen readers

```html
<a href="#main" class="skip-link">Skip to content</a>
<main id="main">...</main>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  top: 0;
  z-index: 9999;
}
```

## Prevent Accidental Input

### Don't Block Paste
- Never disable paste in `<input>` or `<textarea>`
- Users should be able to paste passwords, codes, etc.

### Respect Browser Zoom
- Never disable browser zoom
- Never set `user-scalable=no` in viewport meta tag

## Locale & Content

### Non-Breaking Spaces
- Use `&nbsp;` (non-breaking space) to keep units/terms together:
  - `10&nbsp;MB` (not `10 MB`)
  - `⌘&nbsp;+&nbsp;K` (not `⌘ + K`)
  - `Vercel&nbsp;SDK` (not `Vercel SDK`)
- Use `&#x2060;` (word joiner) for no space but prevent break

### Locale-Aware Formats
- Format dates, times, numbers, delimiters, currencies for user's locale
- Use browser `Intl` APIs or libraries like `date-fns`

```tsx
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(1234.56); // "$1,234.56"
```

### Prefer Language Settings Over Location
- Detect language via `Accept-Language` header + `navigator.languages`
- Never rely on IP/GPS for language (user might be traveling)

## Confirm Destructive Actions
- Require confirmation for destructive actions
- Or provide Undo with a safe time window
- Make safe option (Cancel) more prominent than destructive action

## Overscroll Behavior
- Set `overscroll-behavior: contain` intentionally in modals/drawers
- Prevents background page from scrolling when modal is open
- Use `overscroll-behavior: none` on navbars and fixed containers to prevent users from scrolling past them
- Use per-axis variants for more granular control:
  - `overscroll-behavior-x: none` — prevent horizontal overscroll only
  - `overscroll-behavior-y: none` — prevent vertical overscroll only

```css
.modal {
  overscroll-behavior: contain;
}

.navbar, .sidebar {
  overscroll-behavior: none;
}
```

## Checklist

### Keyboard
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible (`:focus-visible`)
- [ ] Focus management (traps, return focus)
- [ ] Arrow key navigation in lists
- [ ] Delete key works for deletable items

### Touch
- [ ] Hover states only on `@media (hover: hover)`
- [ ] Hit targets ≥ 24px desktop, ≥ 44px mobile
- [ ] `touch-action: manipulation` on controls
- [ ] Custom tap highlight color set
- [ ] Input font size ≥ 16px on mobile

### Links & Navigation
- [ ] Use `<a>` for navigation, not `<button>`
- [ ] URL persists state (filters, tabs, pagination)
- [ ] Scroll position persists on Back/Forward
- [ ] Deep-link everything

### Loading & Updates
- [ ] Optimistic updates implemented
- [ ] Loading states show spinner + label
- [ ] Minimum loading duration prevents flicker
- [ ] Ellipsis used for loading states

### Accessibility
- [ ] Semantic HTML before ARIA
- [ ] Icon-only buttons have `aria-label`
- [ ] Async updates announced with `aria-live`
- [ ] Skip to content link included
- [ ] Heading hierarchy correct

### Input
- [ ] Paste is never blocked
- [ ] Browser zoom is never disabled
- [ ] Inputs are hydration-safe
- [ ] Destructive actions require confirmation

### Locale
- [ ] Non-breaking spaces used for units
- [ ] Dates/numbers formatted for locale
- [ ] Language from settings, not location
