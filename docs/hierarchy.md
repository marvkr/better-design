# Visual Hierarchy

## Size Isn't Everything
- **Don't rely solely on font size** for hierarchy
- Use font weight and color to create hierarchy

**Font Weight:**
- Normal (400-500) for most text
- Heavier (600-700) for emphasis
- Avoid weights under 400 for UI (too hard to read at small sizes)

**Color for Hierarchy:**
- Dark color for primary content
- Grey for secondary content
- Lighter grey for tertiary content

## Don't Use Grey Text on Colored Backgrounds
- Grey text on white works because of reduced contrast
- **Don't use opacity to lighten text on colored backgrounds** (looks washed out)
- Instead: Hand-pick a color with the same hue, adjust saturation and lightness
- Maintains readability without looking faded

## Emphasize by De-emphasizing
- When an element needs more emphasis, try de-emphasizing competing elements instead
- Soften colors of less important items
- Remove background colors from competing sections
- Let important content stand out by making everything else quieter

## Labels are a Last Resort

**Avoid labels when possible:**
- Format can identify data (email@example.com, (555) 555-5555, $19.99)
- Context can identify data (seeing "Customer Support" under a name)

**Combine labels and values:**
- "In stock: 12" → "12 left in stock"
- "Bedrooms: 3" → "3 bedrooms"

**When labels are needed:**
- Treat label as supporting content
- Make label smaller, lighter weight, lower contrast
- **Exception**: Information-dense pages where users scan for labels (specs, technical data)

## Separate Visual from Document Hierarchy
- Use semantic HTML (h1, h2, h3) for accessibility
- **Don't let semantic tags dictate visual size**
- Section titles often work as labels (should be small)
- Style elements for visual hierarchy, not semantic meaning

## Balance Weight and Contrast

**Contrast compensates for weight:**
- Heavy elements (bold text, solid icons) naturally draw attention
- Reduce contrast (soften color) to de-emphasize heavy elements
- Icons next to text should be softer in color to balance

**Weight compensates for contrast:**
- Low-contrast elements can feel too subtle
- Increase weight (thicker borders, bolder text) instead of darkening color
- Maintains softer look while adding emphasis

## Semantics are Secondary

**Don't design actions purely on semantics:**
- Semantics are important but hierarchy matters more
- Not every positive action needs a big green button
- Not every destructive action needs a big red warning

**Three-Level Action Hierarchy:**

Every action on a page sits in a pyramid of importance:

**Primary actions:**
- One true primary action per page (usually)
- Should be obvious and high-contrast
- Use solid, high-contrast background colors
- Example: Main CTA button, Submit button

**Secondary actions:**
- A couple of less important actions
- Should be clear but not prominent
- Use outline styles or lower contrast background colors
- Example: Cancel button, Back button

**Tertiary actions:**
- Seldom used, supportive actions
- Should be discoverable but unobtrusive
- Style like links
- Example: "Delete account", "Reset to defaults"

**Destructive actions:**
- Primary action in destructive flows should be clear and obvious
- Use secondary/tertiary button style for destructive action
- Make safe option (cancel) more prominent
- Add confirmation step if needed

**Visual hierarchy > semantic meaning**

## Checklist

- [ ] Use weight and color for hierarchy, not just size
- [ ] Primary content: dark color
- [ ] Secondary content: grey
- [ ] Tertiary content: light grey
- [ ] De-emphasize to emphasize
- [ ] Avoid unnecessary labels
- [ ] Balance weight and contrast
