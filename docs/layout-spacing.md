# Spacing & Layout

## Start with Too Much White Space
- Start with more white space than you think you need
- It's easier to remove than to add
- White space creates breathing room and reduces cognitive load

## Establish a Spacing and Sizing System

**Linear Scale (bad):**
- Don't use: 10px, 20px, 30px, 40px, 50px...
- Too limiting at small sizes, not enough options at large sizes

**Better Approach:**
- More options at small sizes (4px, 8px, 12px, 16px)
- Bigger jumps at large sizes (32px, 48px, 64px, 96px, 128px)

**Recommended Scale:**
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

**Sizing Scale:**
- Use same scale for width, height, max-width, margin, padding
- Maintains consistency across the interface

## You Don't Have to Fill the Whole Screen
- Just because you have space doesn't mean you need to use it
- Adding unnecessary filler content creates clutter
- **Give content a max-width** instead of expanding to fill screen
- Shrink elements until they start to feel cramped, then add space back

## Grids are Overrated
- Don't force yourself to fill all 12 grid columns
- **Use grids as a guide, not a constraint**
- It's okay to have unequal column sizes
- Consider sidebar + main content (e.g., 1/3 + 2/3) instead of forcing equal columns

## Relative Sizing Doesn't Scale
- **Don't use percentages for element sizes**
- Elements that are large on desktop become too large on mobile
- Elements that are small on desktop become too small on mobile

**Better approach:**
- Use absolute sizes (px, rem)
- Adjust sizes at breakpoints if needed
- Same applies to font sizes

## Avoid Ambiguous Spacing
- When spacing between elements is ambiguous, it's unclear what's related
- **Use more spacing between groups** than within groups
- Make relationships clear through spacing

## Checklist

- [ ] Start with extra white space
- [ ] Use spacing system consistently
- [ ] Don't force elements to fill space
- [ ] Clear spacing relationships between groups
- [ ] Max-width for text content (45-75 characters)
