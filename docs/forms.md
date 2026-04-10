# Form Behavior & Patterns

## Form Submission

### Enter Key Submits
- When a text input is focused, Enter submits the form
- If it's the only input: Enter submits
- If there are multiple inputs: Enter on the last input submits
- Wrap inputs with `<form>` element to enable this behavior

```html
<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

### Textarea Behavior
- In `<textarea>`, Enter inserts a new line
- ⌘+Enter (Mac) or Ctrl+Enter (Windows) submits the form
- Implement with keyboard event handler

```tsx
<textarea
  onKeyDown={(e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  }}
/>
```

### Submission Rule
- Keep submit button **enabled** until submission starts
- Once submission starts:
  - Disable button
  - Show spinner/loading indicator
  - Keep original button label visible
  - Include idempotency key in request
- Re-enable after response (success or error)

```tsx
<button type="submit" disabled={isSubmitting}>
  {isSubmitting && <Spinner />}
  Submit
</button>
```

### Don't Pre-Disable Submit
- Don't disable submit button for incomplete forms
- Let users submit incomplete forms to surface validation feedback
- Show validation errors on submit attempt

## Labels & Inputs

### Every Input Has a Label
- Every control must have a `<label>` or accessible label
- Use `<label>` element associated with `for` attribute
- Or use `aria-label` / `aria-labelledby`

```html
<label for="email">Email</label>
<input id="email" type="email" />
```

### Label Activation
- Clicking a `<label>` should focus the associated control
- Automatically works with proper `for`/`id` pairing
- Increases hit target size

### No Dead Zones on Controls
- Checkboxes, radios: avoid dead zones between label and control
- Make entire label + control a single clickable area
- Use `<label>` wrapper or increase padding

```html
<label class="checkbox-wrapper">
  <input type="checkbox" />
  <span>Label text</span>
</label>
```

```css
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
}
```

## Input Behavior

### Don't Block Typing
- Even if field only accepts numbers, allow any input
- Show validation feedback instead of blocking keystrokes
- Blocking keystrokes is confusing (user gets no explanation)

```tsx
// ❌ Bad: Blocks input
<input onKeyPress={(e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
}} />

// ✅ Good: Allow input, show validation
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  aria-invalid={!/^\d+$/.test(value)}
/>
{!/^\d+$/.test(value) && <span>Must be a number</span>}
```

### Trim Input Values
- Text input methods can add trailing whitespace
- Trim values before validation to avoid confusing errors
- Especially important for emails, usernames, codes

```tsx
const handleSubmit = () => {
  const email = emailInput.value.trim();
  // Validate trimmed value
};
```

### Allow Paste Everywhere
- Never disable paste in inputs
- Users need to paste passwords, 2FA codes, etc.
- Validate after paste, don't block it

## Input Types & Attributes

### Use Correct Input Types
- Set appropriate `type` attribute:
  - `type="email"` for emails
  - `type="password"` for passwords
  - `type="tel"` for phone numbers
  - `type="number"` for numeric input
  - `type="url"` for URLs
  - `type="search"` for search boxes
- Enables better mobile keyboards and validation

### Use inputmode for Keyboards
- Set `inputmode` for better mobile keyboard
- Works with `type="text"` when you need custom validation

```html
<input type="text" inputmode="numeric" /> <!-- Number keyboard -->
<input type="text" inputmode="decimal" /> <!-- Decimal keyboard -->
<input type="text" inputmode="email" />   <!-- Email keyboard -->
<input type="text" inputmode="tel" />     <!-- Phone keyboard -->
```

### Autocomplete Attributes
- Set `autocomplete` to enable browser autofill
- Helps users fill forms faster
- Important for accessibility

```html
<input type="email" autocomplete="email" />
<input type="text" autocomplete="given-name" />
<input type="text" autocomplete="family-name" />
<input type="tel" autocomplete="tel" />
<input type="password" autocomplete="current-password" />
<input type="password" autocomplete="new-password" />
```

### Spellcheck Selectively
- Disable spellcheck for:
  - Emails
  - Usernames
  - Codes/tokens
  - Technical input
- Enable for long-form text content

```html
<input type="email" spellcheck="false" />
<textarea spellcheck="true"></textarea>
```

### Prevent Password Manager Interference
- For non-auth fields (like search), avoid reserved names
- Use `autocomplete="off"` or specific tokens
- Don't use `name="password"` for non-password fields

```html
<!-- Search input that shouldn't trigger password manager -->
<input
  type="text"
  name="query"
  autocomplete="off"
/>

<!-- OTP field -->
<input
  type="text"
  autocomplete="one-time-code"
/>
```

## Validation & Errors

### Error Placement
- Show errors **next to their fields**, not just at top of form
- On submit, **focus the first error**
- Use `aria-invalid` and `aria-describedby`

```html
<input
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email
  </span>
)}
```

### HTML Form Validation
- Use `required` attribute when appropriate
- Leverage browser validation before custom validation
- Provides consistent UX across browsers

```html
<input type="email" required />
<input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
```

## Placeholder Patterns

### Placeholders Show Example Values
- End with ellipsis to signal emptiness
- Show pattern or example: `+1 (123) 456-7890`
- Or: `sk-012345679…`
- Don't use as replacement for labels

```html
<label for="phone">Phone</label>
<input
  id="phone"
  type="tel"
  placeholder="+1 (123) 456-7890"
/>
```

## Password Fields & 2FA

### Password Manager Compatibility
- Ensure password fields work with managers
- Use correct `autocomplete` values
- Allow pasting one-time codes

```html
<!-- Login -->
<input type="email" autocomplete="email" />
<input type="password" autocomplete="current-password" />

<!-- Registration -->
<input type="email" autocomplete="email" />
<input type="password" autocomplete="new-password" />

<!-- 2FA code -->
<input type="text" autocomplete="one-time-code" />
```

## Unsaved Changes Warning

### Warn Before Navigation
- When form has unsaved changes, warn before:
  - Navigation to another page
  - Browser tab close
  - Browser refresh
- Use `beforeunload` event

```tsx
useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  window.addEventListener('beforeunload', handler);
  return () => window.removeEventListener('beforeunload', handler);
}, [hasUnsavedChanges]);
```

## Windows-Specific Issues

### Windows `<select>` Background
- Windows has dark mode contrast bugs with native `<select>`
- Explicitly set `background-color` and `color`

```css
select {
  background-color: var(--bg);
  color: var(--text);
}
```

## Form Organization

### Multi-Step Forms
- Break long forms into steps
- Show progress indicator
- Allow going back to previous steps
- Persist data between steps

### Inline Editing
- Prefer inline editing over separate edit forms
- Toggle between view/edit mode in place
- Reduces context switching

### Progressive Disclosure
- Show additional fields only when needed
- Don't overwhelm users with all options upfront
- Reveal complexity gradually

## Controlled vs Uncontrolled

### Prefer Uncontrolled Inputs
- Uncontrolled inputs are more performant
- Less re-renders on every keystroke
- Use `defaultValue` instead of `value`
- Access value via ref when needed

```tsx
// Uncontrolled (preferred for performance)
const inputRef = useRef<HTMLInputElement>(null);

const handleSubmit = () => {
  const value = inputRef.current?.value;
};

<input ref={inputRef} defaultValue="" />
```

```tsx
// Controlled (use when you need real-time validation)
const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Checklist

### Structure
- [ ] Inputs wrapped in `<form>` element
- [ ] Enter key submits form
- [ ] Textarea: ⌘/Ctrl+Enter submits
- [ ] Every input has a `<label>`
- [ ] Clicking label focuses input

### Submission
- [ ] Submit button enabled until submission starts
- [ ] Disabled + spinner during submission
- [ ] Don't pre-disable for incomplete forms
- [ ] Idempotency key included in request

### Input Behavior
- [ ] Don't block typing (validate instead)
- [ ] Allow paste everywhere
- [ ] Trim values before validation
- [ ] No dead zones on checkboxes/radios

### Attributes
- [ ] Correct `type` attribute set
- [ ] `inputmode` for mobile keyboards
- [ ] `autocomplete` for autofill
- [ ] `spellcheck` disabled for technical fields
- [ ] `required` for required fields

### Validation
- [ ] Errors shown next to fields
- [ ] Focus first error on submit
- [ ] `aria-invalid` and `aria-describedby` set
- [ ] HTML validation enabled

### Special Cases
- [ ] Password manager compatibility
- [ ] 2FA code autofill supported
- [ ] Unsaved changes warning
- [ ] Windows `<select>` background set

### Organization
- [ ] Long forms broken into steps
- [ ] Inline editing where appropriate
- [ ] Progressive disclosure used
- [ ] Prefer uncontrolled inputs for performance
