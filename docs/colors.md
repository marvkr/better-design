# Color System

## Design Theory

### Ditch Hex for HSL (or OKLCH)
- **HSL = Hue, Saturation, Lightness**
- Much easier to manipulate colors
- Easy to create lighter/darker versions
- Easy to shift hue while keeping saturation/lightness
- OKLCH is even better for perceptual uniformity

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

### Checklist

- [ ] Work in HSL or OKLCH, not hex
- [ ] Hand-pick colors for colored backgrounds (don't use opacity)
- [ ] Add accent colors for interest
- [ ] Ensure 4.5:1 contrast ratio for text
- [ ] Use color + another indicator (not color alone)
- [ ] Define 8-10 shades per color

---

## OKLCH Implementation

You are working with a modern design system that uses OKLCH color space and a sophisticated shadow system.

### OKLCH Color System

### What is OKLCH?

OKLCH is a perceptually uniform color space where:

- **L** (Lightness): 0 (black) to 1 (white)
- **C** (Chroma): 0 (grayscale) to ~0.4 (highly saturated)
- **H** (Hue): 0-360 degrees (color wheel)

**Key advantage:** Equal lightness steps look equally different to human eyes, unlike RGB/HSL.

### Color Variables

**Dark Theme:**

```css
:root {
  --primary: oklch(0.9 0.17 100);      /* Vibrant accent - high L, high C, yellow-orange H */
  --bg-dark: oklch(0.1 0 264);         /* Nearly black - low L, no C, blue H */
  --bg: oklch(0.2 0 264);              /* Dark gray - slightly higher L */
  --bg-light: oklch(0.3 0 264);        /* Lighter gray - continues progression */
  --text: oklch(0.96 0 264);           /* Near white - very high L */
  --text-muted: oklch(0.76 0 264);     /* Muted gray - mid-high L */
}
Light Theme:
cssbody.light {
  --primary: oklch(0.65 0.15 264);     /* Purple accent - mid L, lower C */
  --bg-dark: oklch(0.92 0 264);        /* Light gray - inverted hierarchy */
  --bg: oklch(0.96 0 264);             /* Lighter gray */
  --bg-light: oklch(1 0 264);          /* Pure white */
  --text: oklch(0.15 0 264);           /* Near black */
  --text-muted: oklch(0.4 0 264);      /* Mid gray */
}
OKLCH Usage Rules
Creating new colors:

Keep hue consistent: Use 264 (blue-purple) for neutral colors
Use chroma=0 for grays: Keeps them perfectly neutral
Lightness hierarchy:

Dark theme: 0.1 → 0.2 → 0.3 (backgrounds), 0.76 → 0.96 (text)
Light theme: 0.92 → 0.96 → 1.0 (backgrounds), 0.4 → 0.15 (text)


Accent colors: Higher chroma (0.15-0.2) and different hue (100 for warm, 264 for cool)

Color contrast rules:

Minimum lightness difference: 0.5 for readability
Dark theme: 0.2 bg with 0.76+ text ✓
Light theme: 0.96 bg with 0.4 text ✓

Example - Creating a success color:
css--success-dark: oklch(0.8 0.15 145);   /* Green hue, high lightness for dark theme */
--success-light: oklch(0.5 0.12 145);  /* Lower lightness for light theme */
Example - Creating hover states:
css/* Move up the lightness hierarchy */
.card {
  background: var(--bg);              /* oklch(0.2 0 264) */
}
.card:hover {
  background: var(--bg-light);        /* oklch(0.3 0 264) */
}
Shadow System
Three-Tier Shadows
Each shadow has THREE layers for realistic depth:
css:root {
  --shadow-s:
    inset 0 1px 2px #ffffff30,  /* Top highlight - simulates light source */
    0 1px 2px #00000030,        /* Contact shadow - sharp, close */
    0 2px 4px #00000015;        /* Ambient shadow - soft, diffused */

  --shadow-m:
    inset 0 1px 2px #ffffff50,  /* Stronger highlight */
    0 2px 4px #00000030,        /* Medium contact shadow */
    0 4px 8px #00000015;        /* Larger ambient shadow */

  --shadow-l:
    inset 0 1px 2px #ffffff70,  /* Strongest highlight */
    0 4px 6px #00000030,        /* Larger contact shadow */
    0 6px 10px #00000015;       /* Maximum ambient shadow */
}
Shadow Anatomy
Layer 1 - Inset Highlight:

inset = inner glow effect
0 1px 2px = positioned just inside top edge
#ffffff30/50/70 = white with 30%/50%/70% opacity
Purpose: Simulates light hitting the top surface

Layer 2 - Contact Shadow:

0 Xpx Ypx = X is offset, Y is blur
#00000030 = black at 30% opacity
Purpose: Sharp shadow where element "touches" surface
Scales: 1px→2px→4px offset, 2px→4px→6px blur

Layer 3 - Ambient Shadow:

Larger offset and blur than contact shadow
#00000015 = black at 15% opacity (very soft)
Purpose: Diffused environmental shadow
Scales: 2px→4px→6px offset, 4px→8px→10px blur

When to Use Each Shadow
Small (--shadow-s):

Default cards and containers
Subtle elevation
Always-visible UI elements

css.card { box-shadow: var(--shadow-s); }
Medium (--shadow-m):

Hover states
Focused elements
Moderate emphasis

css.card:hover { box-shadow: var(--shadow-m); }
Large (--shadow-l):

Modals and dialogs
Popovers and dropdowns
Maximum elevation

css.modal { box-shadow: var(--shadow-l); }
Creating Custom Shadows
Follow the three-layer pattern:
css--shadow-custom:
  inset 0 1px 2px #ffffff40,    /* Adjust opacity for theme */
  0 [offset] [blur] #000000[opacity],     /* Contact layer */
  0 [larger-offset] [larger-blur] #000000[lower-opacity];  /* Ambient layer */
Scaling rules:

Highlight opacity: 30% → 50% → 70%
Contact shadow: 30% black, scale offset/blur proportionally
Ambient shadow: 15% black, always softer than contact
Offset ratio: ~1:2 (contact:ambient)
Blur ratio: ~1:2 (contact:ambient)

Combining OKLCH + Shadows
Perfect combination example:
css.elevated-card {
  background: var(--bg);              /* oklch(0.2 0 264) */
  box-shadow: var(--shadow-s);        /* Subtle depth */
  transition: background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.elevated-card:hover {
  background: var(--bg-light);        /* oklch(0.3 0 264) - lighter */
  box-shadow: var(--shadow-m);        /* More depth */
}
Why this works:

OKLCH ensures smooth color transitions
Shadows create physical depth perception
Both scale together for consistent elevation feel
Light theme automatically adjusts via CSS variables

Code Generation Rules
When writing color code:

ALWAYS use oklch() format, never hex or rgb
Keep chroma at 0 for neutral grays
Maintain consistent hue (264) across theme
Test lightness contrast (minimum 0.5 difference)
Use CSS variables, don't hardcode values

When writing shadow code:

Choose appropriate shadow tier for elevation
Apply via box-shadow: var(--shadow-[s/m/l])
Transition shadows on interactive states
Never use single-layer shadows
Consider shadow visibility on both themes

Theme compatibility:
Both OKLCH colors and shadows work across themes because:

- CSS variables update automatically with .light class
- Shadow opacity values are theme-agnostic
- OKLCH perceptual uniformity maintains contrast ratios
