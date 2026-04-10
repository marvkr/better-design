# Typography

## Establish a Type Scale
- Define a set of font sizes (8-10 options)
- Use mathematical ratios or hand-pick sizes
- Not every size needs to be used
- Having options available speeds up decision-making

**Example Scale:**
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

## Use Good Fonts

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

## Keep Your Line Length in Check
- **Optimal line length: 45-75 characters**
- If text is too wide, decrease font size or limit width
- Don't use percentage-based widths for text

## Use text-wrap: balance for Headings

A quick way to improve how text behaves is to use `text-wrap: balance`. It distributes text evenly across each line, avoiding orphaned words at the end.

```css
h1, h2, h3 {
  text-wrap: balance;
}
```

**Limitations:**
- Only supported for short content (<6-10 lines depending on the browser)
- Best used for headings or short paragraphs, not body text

## Baseline, Not Center
- When mixing different font sizes, align by baseline (not vertical center)
- Forms: align label and input by baseline
- Exception: Single line of text with icon - center align is okay

## Line-height is Proportional

**General rule:**
- Narrow content (45-75 chars) = normal line height (1.5-2)
- Wide content = taller line height needed
- Short lines = shorter line height works

**By font size:**
- Large text (headings) = shorter line height (1.1-1.3)
- Body text = medium line height (1.5)
- Small text = taller line height (needed for legibility)

## Not Every Link Needs a Color
- Links in blocks of text should be obvious (colored, underlined)
- Links in navigation don't need special treatment
- If it's obviously clickable from context, you don't need link styling

## Align with Readability in Mind

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

## Use Letter-spacing Effectively

**Tighten headlines:**
- Large text often needs negative letter-spacing (tracking)
- Makes headlines feel more cohesive

**Open up all-caps:**
- All caps text needs increased letter-spacing
- Otherwise letters feel too cramped

## Font Weights
```
font-normal: 400-500
font-bold: 600-700
```

## Checklist

- [ ] Line height: smaller for headings (1.2), larger for body (1.5-1.8)
- [ ] Align by baseline when mixing sizes
- [ ] Increase letter-spacing for all-caps
- [ ] Decrease letter-spacing for large headings
- [ ] Left-align most text
- [ ] Max line length 45-75 characters
- [ ] Use `text-wrap: balance` on headings and short paragraphs
