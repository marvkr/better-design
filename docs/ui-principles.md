# Refactoring UI: Design System Guidelines for AI Coding Agents

> **📌 Note:** This file is a comprehensive reference. For better AI tool context retrieval, use the topic-specific files:
> - [design-process.md](./design-process.md) - Starting from scratch, personality, limiting choices
> - [hierarchy.md](./hierarchy.md) - Visual hierarchy, emphasis, semantic actions
> - [layout-spacing.md](./layout-spacing.md) - Spacing systems, white space, grids
> - [typography.md](./typography.md) - Type scale, fonts, line height, alignment
> - [colors.md](./colors.md) - Color systems, HSL/OKLCH, contrast, accessibility
> - [depth.md](./depth.md) - Shadows, elevation, layering
> - [images.md](./images.md) - Photos, icons, user-uploaded content
> - [finishing-touches.md](./finishing-touches.md) - Polish, empty states, borders
> - [animation-patterns.md](./animation-patterns.md) - Animation principles, interruptibility, timing
> - [sound-design.md](./sound-design.md) - Audio feedback, accessibility, user preferences
> - [jobs-product-design.md](./jobs-product-design.md) - Steve Jobs product design philosophy

This document contains distilled learnings from Refactoring UI to guide AI agents in creating well-designed user interfaces.

## 1. Starting from Scratch

### Start with a Feature, Not a Layout
- **DO NOT** start by designing the shell (navigation, sidebar, containers)
- **START** with actual functionality and features first
- Design one piece of functionality at a time (e.g., a search form, a login screen)
- The navigation structure will emerge naturally once you have features designed

### Detail Comes Later
- **Avoid premature detail**: Don't obsess over typefaces, shadows, icons too early
- **Design in grayscale first**: Use spacing, contrast, and size to create hierarchy before adding color
- **Stay low-fidelity initially**: Use sketches or wireframes to explore ideas quickly
- Sketches are disposable - move to implementation as soon as you have direction

### Don't Design Too Much
- **Work in short cycles**: Design → Build → Iterate
- Don't try to design every feature and edge case upfront
- Build simple versions first, discover complexity during implementation
- **Be a pessimist**: Only design features you're ready to build
- Design the smallest useful version you can ship

### Choose a Personality
Consider these factors when establishing personality:

**Font Choice:**
- Serif = elegant, classic, traditional
- Rounded sans-serif = playful, friendly, approachable
- Neutral sans-serif = plain, modern, let other elements provide personality

**Color:**
- Blue = safe, familiar, trustworthy
- Gold = expensive, sophisticated, premium
- Pink = fun, playful, less serious

**Border Radius:**
- Small radius = neutral, professional
- Large radius = playful, friendly
- No radius = serious, formal
- **Stay consistent** - don't mix square and rounded corners

**Language/Copy:**
- Formal tone = professional, official
- Casual tone = friendly, approachable

### Limit Your Choices

**Define Systems in Advance:**
- Create a constrained set of options for all design decisions
- Define systems for: font sizes, font weights, colors, spacing, sizing, shadows, border radius, opacity

**Decision-Making:**
- Pick an initial value from your system
- Compare with adjacent values
- Choose by process of elimination

**Systems to Define:**
- Font size scale (8-10 options)
- Font weight (usually just 2: normal 400-500, bold 600-700)
- Color palettes (8-10 shades per color)
- Spacing scale
- Sizing scale
- Shadow styles
- Border radius options
- Opacity levels

---

## 2. Hierarchy is Everything

### Size Isn't Everything
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

### Don't Use Grey Text on Colored Backgrounds
- Grey text on white works because of reduced contrast
- **Don't use opacity to lighten text on colored backgrounds** (looks washed out)
- Instead: Hand-pick a color with the same hue, adjust saturation and lightness
- Maintains readability without looking faded

### Emphasize by De-emphasizing
- When an element needs more emphasis, try de-emphasizing competing elements instead
- Soften colors of less important items
- Remove background colors from competing sections
- Let important content stand out by making everything else quieter

### Labels are a Last Resort

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

### Separate Visual from Document Hierarchy
- Use semantic HTML (h1, h2, h3) for accessibility
- **Don't let semantic tags dictate visual size**
- Section titles often work as labels (should be small)
- Style elements for visual hierarchy, not semantic meaning

### Balance Weight and Contrast

**Contrast compensates for weight:**
- Heavy elements (bold text, solid icons) naturally draw attention
- Reduce contrast (soften color) to de-emphasize heavy elements
- Icons next to text should be softer in color to balance

**Weight compensates for contrast:**
- Low-contrast elements can feel too subtle
- Increase weight (thicker borders, bolder text) instead of darkening color
- Maintains softer look while adding emphasis

### Semantics are Secondary

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

---

## 3. Layout and Spacing

### Start with Too Much White Space
- Start with more white space than you think you need
- It's easier to remove than to add
- White space creates breathing room and reduces cognitive load

### Establish a Spacing and Sizing System

**Linear Scale (bad):**
- Don't use: 10px, 20px, 30px, 40px, 50px...
- Too limiting at small sizes, not enough options at large sizes

**Better Approach:**
- More options at small sizes (4px, 8px, 12px, 16px)
- Bigger jumps at large sizes (32px, 48px, 64px, 96px, 128px)

**Recommended Scale:**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 192px, 256px, 384px, 512px, 640px, 768px

**Sizing Scale:**
- Use same scale for width, height, max-width, margin, padding
- Maintains consistency across the interface

### You Don't Have to Fill the Whole Screen
- Just because you have space doesn't mean you need to use it
- Adding unnecessary filler content creates clutter
- **Give content a max-width** instead of expanding to fill screen
- Shrink elements until they start to feel cramped, then add space back

### Grids are Overrated
- Don't force yourself to fill all 12 grid columns
- **Use grids as a guide, not a constraint**
- It's okay to have unequal column sizes
- Consider sidebar + main content (e.g., 1/3 + 2/3) instead of forcing equal columns

### Relative Sizing Doesn't Scale
- **Don't use percentages for element sizes**
- Elements that are large on desktop become too large on mobile
- Elements that are small on desktop become too small on mobile

**Better approach:**
- Use absolute sizes (px, rem)
- Adjust sizes at breakpoints if needed
- Same applies to font sizes

### Avoid Ambiguous Spacing
- When spacing between elements is ambiguous, it's unclear what's related
- **Use more spacing between groups** than within groups
- Make relationships clear through spacing

---

## 4. Designing Text

### Establish a Type Scale
- Define a set of font sizes (8-10 options)
- Use mathematical ratios or hand-pick sizes
- Not every size needs to be used
- Having options available speeds up decision-making

**Example Scale:**
- 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 60px, 72px

### Use Good Fonts

**Trust the professionals:**
- Good free options: Inter, Roboto, Open Sans, Lato
- Premium options often worth the investment
- Ignore fonts with less than 5 weights

**Play it safe:**
- Neutral fonts work for almost everything
- You don't need a personality-filled font

**Optimize for legibility:**
- Good font makes all the difference in readability
- Poor font choice can make even good design feel unprofessional

### Keep Your Line Length in Check
- **Optimal line length: 45-75 characters**
- If text is too wide, decrease font size or limit width
- Don't use percentage-based widths for text

### Use text-wrap: balance for Headings
- Use `text-wrap: balance` to distribute text evenly across lines, avoiding orphaned words
- Limited to short content (<6-10 lines depending on browser)
- Best applied to headings or short paragraphs, not body text

### Baseline, Not Center
- When mixing different font sizes, align by baseline (not vertical center)
- Forms: align label and input by baseline
- Exception: Single line of text with icon - center align is okay

### Line-height is Proportional

**General rule:**
- Narrow content (45-75 chars) = normal line height (1.5-2)
- Wide content = taller line height needed
- Short lines = shorter line height works

**By font size:**
- Large text (headings) = shorter line height (1.1-1.3)
- Body text = medium line height (1.5)
- Small text = taller line height (needed for legibility)

### Not Every Link Needs a Color
- Links in blocks of text should be obvious (colored, underlined)
- Links in navigation don't need special treatment
- If it's obviously clickable from context, you don't need link styling

### Align with Readability in Mind

**Center alignment:**
- Fine for headlines or short blocks
- Don't center long content (hard to read)

**Right alignment:**
- Good for numbers in tables
- Generally avoid for long content

**Justified text:**
- Creates awkward spacing
- Generally avoid

**Left alignment:**
- Safest choice for most content

### Use Letter-spacing Effectively

**Tighten headlines:**
- Large text often needs negative letter-spacing (tracking)
- Makes headlines feel more cohesive

**Open up all-caps:**
- All caps text needs increased letter-spacing
- Otherwise letters feel too cramped

---

## 5. Working with Color

### Ditch Hex for HSL
- **HSL = Hue, Saturation, Lightness**
- Much easier to manipulate colors
- Easy to create lighter/darker versions
- Easy to shift hue while keeping saturation/lightness

### You Need More Colors Than You Think

**Don't limit yourself to primary and accent:**
- Need 8-10 shades of each color for flexibility

**Color categories needed:**
- Greys (8-10 shades)
- Primary color(s) (8-10 shades each)
- Accent colors (8-10 shades each)
- Semantic colors:
  - Red for errors/destructive (8-10 shades)
  - Yellow for warnings (8-10 shades)
  - Green for success/positive (8-10 shades)

### Define Your Shades Up Front
- Choose darkest and lightest shades first
- Fill in the middle
- You'll need more options in the middle than at the extremes

**Recommended approach:**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- 9 shades gives good flexibility

### Don't Let Lightness Kill Your Saturation
- As you make colors lighter, increase saturation
- As you make colors darker, decrease saturation
- This keeps colors vibrant across the scale

**Why:**
- Fully saturated light colors look fluorescent
- Fully saturated dark colors look muddy

**General rule:**
- Lightest shades: highest saturation
- Middle shades: moderate saturation
- Darkest shades: lowest saturation

### Greys Don't Have to Be Grey
- Pure grey (no hue) can feel lifeless
- Add a slight tint of your primary color
- Or add blue for a cooler look
- Makes greys feel more cohesive with your design

### Accessible Doesn't Have to Mean Ugly
- WCAG recommends 4.5:1 contrast ratio for normal text
- **Don't just use pure black (#000) for text** - too harsh
- Use very dark grey or colored dark (maintains contrast while softer)
- For colored backgrounds, hand-pick dark colors that pass contrast

**Tips:**
- Flip background and text in high-contrast areas
- Rotate hue for colored text on colored background

### Don't Rely on Color Alone
- Use color + another indicator (icon, label, position)
- Important for accessibility
- Makes interface clearer for everyone
- Examples:
  - Errors: red + icon + error message
  - Success: green + checkmark + message

---

## 6. Creating Depth

### Emulate a Light Source
- Imagine light coming from above (natural)
- Top edges are lighter
- Bottom edges are darker
- Creates 3D effect

**Shadows:**
- Light source above means shadows below
- Shadows help convey elevation

### Use Shadows to Convey Elevation
- Small, subtle shadows = element slightly raised
- Large, soft shadows = element floating high
- No shadow = flat on page

**Shadow guidelines:**
- Small elements = small shadows
- Large elements can have larger shadows
- More elevation = larger, softer, more offset shadow

**Define a shadow system:**
- 5 shadow levels usually enough
- xs, sm, md, lg, xl

### Shadows Can Have Two Parts
- Most realistic shadows have two layers:

**Shadow 1: Sharp and offset**
- Simulates direct light
- Small blur radius
- Offset downward

**Shadow 2: Larger and softer**
- Simulates ambient light
- Large blur radius
- Minimal offset

**Example:**
```css
box-shadow:
  0 1px 3px rgba(0,0,0,0.12),
  0 1px 2px rgba(0,0,0,0.24);
```

### Even Flat Designs Can Have Depth
- Depth ≠ skeuomorphism
- Use subtle techniques:
  - Light borders on top edge
  - Dark borders on bottom edge
  - Subtle gradients
  - Layering (overlapping elements)

### Overlap Elements to Create Layers
- Overlapping creates depth through layering
- Pull elements out of their container
- Offset elements on top of backgrounds
- Creates visual interest and hierarchy

---

## 7. Working with Images

### Use Good Photos
- Bad photos make everything look unprofessional
- Use high-quality stock photos or hire photographer
- Good free sources: Unsplash, Pexels

### Text Needs Consistent Contrast

**Problem:** Text on images can be illegible
**Solutions:**

1. **Add overlay:** Dark semi-transparent layer between image and text
2. **Lower image contrast:** Reduce saturation and brightness of background
3. **Colorize image:** Apply color filter to reduce contrast
4. **Add text shadow:** Subtle shadow makes text readable on varied backgrounds
5. **Blur background:** Use gaussian blur on area behind text

### Everything Has an Intended Size

**Icons and graphics:**
- SVGs can scale but not infinitely
- Small icons blown up look amateurish
- Design at the size you'll use them

**Don't scale up:**
- Icons designed at 16-24px shouldn't be used at 48px+
- Screenshots lose quality when enlarged
- Product photos should be high-res

**Don't scale down unnecessarily:**
- Large graphics scaled way down are wasteful (file size)
- Use appropriate size assets

### Beware User-Uploaded Content

**Problems:**
- Unpredictable dimensions
- Variable quality
- Can break layouts

**Solutions:**

**Control background:**
- Use consistent background color/pattern
- Centers mismatched images

**Center-crop:**
- Use object-fit: cover
- Crops to fill space
- Best for thumbnails and avatars

**Avatars:**
- Use fallback (initials) for missing photos
- Makes interface feel more complete

---

## 8. Finishing Touches

### Supercharge the Defaults

**Don't settle for browser defaults:**
- Checkboxes, radios, selects can be styled
- Custom controls feel more polished
- Maintain usability while improving aesthetics

**Upgrade:**
- Checkboxes: Custom design with brand colors
- Radio buttons: Better styling
- Dropdowns: Custom styling instead of native select
- File inputs: Hide and style label instead

### Add Color with Accent Borders
- Short, colorful border adds pop to bland elements
- Top border on cards
- Left border on alerts/notifications
- Side border on active navigation items
- Adds visual interest without overwhelming

### Decorate Your Backgrounds

**Make backgrounds interesting:**
- Subtle patterns
- Gradients
- Abstract shapes
- Geometric designs

**Keep it subtle:**
- Low contrast
- Doesn't compete with content
- Adds polish without distraction

### Don't Overlook Empty States

**When there's no data yet:**
- Don't just show empty table/list
- Make it an opportunity

**Good empty state has:**
- Brief explanation of what will be here
- Call-to-action to add first item
- Maybe illustration or icon
- Encouraging, friendly copy

### Use Fewer Borders

**Borders add visual noise:**
- Use sparingly
- Often other methods work better

**Alternatives to borders:**

1. **Box shadow:** Subtle outline without harsh line
2. **Different background color:** Separates sections cleanly
3. **Extra spacing:** More space between elements defines groups

**When borders make sense:**
- Defining boundaries of clickable areas (buttons)
- Dividing distinct sections (not just spacing)

### Think Outside the Box

**Challenge your preconceptions about components:**

Most people have fixed ideas about how components "should" look. Don't let conditioning limit your creativity.

**Dropdowns:**
- Don't default to boring list of links
- Don't hide everything in dropdowns - show popular options directly
- A dropdown is just a floating box — be creative with it
- Break it into sections with headings
- Use multiple columns for better organization
- Add supporting text or descriptions
- Include colorful icons for visual interest
- Use cards, tabs, or other patterns when appropriate
- Make it functional AND beautiful

**Tables:**
- Not just for data grids
- Don't force every table into sortable columns
- Combine related columns to introduce hierarchy
- Data + description in same cell works great
- Add images when it makes sense
- Use color to enrich data (status badges, priority indicators)
- Table content doesn't have to be plain text
- Consider cards for smaller screens
- Better for responsive design
- Consider when traditional table structure actually helps vs. hinders

**Radio Buttons:**
- Don't settle for boring stack of labels with circles
- For important choices, use selectable cards instead
- Add icons, images, or illustrations
- Include descriptions or additional context
- Make the whole card clickable, not just the radio button
- Visual representation > minimal form controls

**Forms:**
- Multi-step instead of one long form
- Inline editing instead of edit forms
- Progressive disclosure
- Break long forms into manageable sections
- Consider alternative input methods

**General approach:**
- Question every "this is how it's done" assumption
- Try unconventional layouts
- Ask: "Does this pattern serve my users, or is it just convention?"
- Constraints are powerful, but don't let them stifle creativity
- Freedom can take an interface to the next level
- Think about the purpose, not just the pattern
- What works for others might not be best for you
- Users care about clarity and function, not conformity

---

## Implementation Checklist for AI Agents

When implementing UI, ensure you:

### Planning Phase
- [ ] Start with a single feature, not the shell
- [ ] Design in grayscale first
- [ ] Keep initial fidelity low
- [ ] Design only what you're ready to build

### Design System Setup
- [ ] Define spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128...)
- [ ] Define type scale (8-10 font sizes)
- [ ] Define color palettes (8-10 shades per color)
- [ ] Define shadow scale (5 levels)
- [ ] Define border radius options
- [ ] Limit font weights to 2-3 options

### Visual Hierarchy
- [ ] Use weight and color for hierarchy, not just size
- [ ] Primary content: dark color
- [ ] Secondary content: grey
- [ ] Tertiary content: light grey
- [ ] De-emphasize to emphasize
- [ ] Avoid unnecessary labels
- [ ] Balance weight and contrast

### Color Usage
- [ ] Work in HSL, not hex
- [ ] Hand-pick colors for colored backgrounds (don't use opacity)
- [ ] Add accent colors for interest
- [ ] Ensure 4.5:1 contrast ratio for text
- [ ] Use color + another indicator (not color alone)

### Spacing & Layout
- [ ] Start with extra white space
- [ ] Use spacing system consistently
- [ ] Don't force elements to fill space
- [ ] Clear spacing relationships between groups
- [ ] Max-width for text content (45-75 characters)

### Typography
- [ ] Line height: smaller for headings (1.2), larger for body (1.5-1.8)
- [ ] Align by baseline when mixing sizes
- [ ] Increase letter-spacing for all-caps
- [ ] Decrease letter-spacing for large headings
- [ ] Use `text-wrap: balance` on headings and short paragraphs
- [ ] Left-align most text

### Depth & Shadows
- [ ] Use shadows to convey elevation
- [ ] Light source from above
- [ ] Two-part shadows for realism
- [ ] Subtle depth even in flat designs

### Images & Media
- [ ] Ensure consistent contrast for text on images
- [ ] Use appropriate-sized assets (don't scale up icons)
- [ ] Handle user content gracefully (center-crop, fallbacks)

### Polish
- [ ] Style default form elements
- [ ] Add accent borders for interest
- [ ] Design empty states
- [ ] Use fewer borders (try alternatives first)
- [ ] Add subtle background decoration
- [ ] Use `overscroll-behavior: none` to avoid page bounce

### Final Check
- [ ] Does hierarchy feel clear?
- [ ] Is spacing consistent (using system)?
- [ ] Are colors from defined palette?
- [ ] Is text readable (contrast, line length)?
- [ ] Do shadows feel natural?
- [ ] Are empty states handled?
- [ ] Does it feel polished?

---

## Quick Reference: Common Mistakes to Avoid

1. ❌ Starting with navigation/layout instead of features
2. ❌ Adding color too early (design in grayscale first)
3. ❌ Relying only on font size for hierarchy
4. ❌ Using grey text (opacity) on colored backgrounds
5. ❌ Using font weights below 400 for UI
6. ❌ Adding unnecessary labels
7. ❌ Letting semantic HTML dictate visual hierarchy
8. ❌ Using linear spacing scale (10, 20, 30...)
9. ❌ Forcing content to fill the whole screen
10. ❌ Using percentage-based sizing for components
11. ❌ Tight line-height for body text
12. ❌ Using only 2-3 shades per color
13. ❌ Keeping same saturation as you change lightness
14. ❌ Using pure grey (#777777)
15. ❌ Using only color to convey meaning
16. ❌ Text directly on photos without contrast treatment
17. ❌ Scaling up icons beyond their intended size
18. ❌ Ignoring empty states
19. ❌ Overusing borders when alternatives exist
20. ❌ Defaulting to common patterns without questioning them

---

## Design Tokens Reference

Use this as a starting point for your design system:

### Spacing Scale
```
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-5: 24px
spacing-6: 32px
spacing-7: 48px
spacing-8: 64px
spacing-9: 96px
spacing-10: 128px
spacing-11: 192px
spacing-12: 256px
```

### Font Sizes
```
text-xs: 12px
text-sm: 14px
text-base: 16px
text-lg: 18px
text-xl: 20px
text-2xl: 24px
text-3xl: 30px
text-4xl: 36px
text-5xl: 48px
text-6xl: 60px
text-7xl: 72px
```

### Font Weights
```
font-normal: 400-500
font-bold: 600-700
```

### Shadows
```
shadow-xs: 0 1px 2px rgba(0,0,0,0.05)
shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
shadow-md: 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)
shadow-lg: 0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)
shadow-xl: 0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)
```

### Border Radius
```
rounded-sm: 2px
rounded: 4px
rounded-md: 6px
rounded-lg: 8px
rounded-xl: 12px
rounded-2xl: 16px
rounded-full: 9999px
```

---

## Leveling Up: Continuous Improvement

### Look for Decisions You Wouldn't Have Made

When you see a design you really like, ask yourself:
**"Did the designer do anything here that I never would have thought to do?"**

Pay attention to unintuitive decisions:
- Inverted background colors in unexpected places (e.g., dark datepicker on light page)
- Unusual positioning (e.g., button inside a text input instead of outside)
- Creative typography (e.g., two different font colors for a single headline)
- Unexpected use of spacing or alignment
- Novel interaction patterns

**Why this works:**
- Helps you discover new techniques beyond conventional patterns
- Expands your design vocabulary
- Reveals creative solutions to common problems
- Builds intuition for when to break rules effectively

**Action items:**
- Create a swipe file of inspiring designs
- Note specific techniques, not just "looks nice"
- Try applying these techniques to your own projects
- Understand the "why" behind each decision

### Rebuild Your Favorite Interfaces

**The absolute best way to notice design details:**
- Pick an interface you admire
- Try to rebuild it pixel-perfect
- You'll discover dozens of subtle details you didn't notice at first
- Learn spacing, sizing, color, and hierarchy decisions

**What you'll learn:**
- Exact spacing values used
- Color palette relationships
- How hierarchy is established
- Typography pairings and scales
- Shadow and depth techniques
- Responsive behavior patterns

**Practice approach:**
- Start with components (buttons, cards, forms)
- Progress to full pages
- Don't look at the code - use your eyes
- Compare your result with the original
- Iterate until it matches

---

## When to Break These Rules

These are guidelines, not laws. Break them when:
- You have a good reason
- User experience benefits
- You're intentionally creating contrast or tension
- Your specific use case demands it
- Testing shows users prefer something different

But always break them intentionally, not accidentally.
