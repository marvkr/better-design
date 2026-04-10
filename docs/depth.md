# Shadows & Depth

## Emulate a Light Source
- Imagine light coming from above (natural)
- Top edges are lighter
- Bottom edges are darker
- Creates 3D effect

**Shadows:**
- Light source above means shadows below
- Shadows help convey elevation

## Use Shadows to Convey Elevation
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

## Shadows Can Have Two Parts
Most realistic shadows have two layers:

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

## Shadow Scale Reference
```css
shadow-xs: 0 1px 2px rgba(0,0,0,0.05)
shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
shadow-md: 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)
shadow-lg: 0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)
shadow-xl: 0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)
```

## Even Flat Designs Can Have Depth
- Depth ≠ skeuomorphism
- Use subtle techniques:
  - Light borders on top edge
  - Dark borders on bottom edge
  - Subtle gradients
  - Layering (overlapping elements)

## Overlap Elements to Create Layers
- Overlapping creates depth through layering
- Pull elements out of their container
- Offset elements on top of backgrounds
- Creates visual interest and hierarchy

## Checklist

- [ ] Use shadows to convey elevation
- [ ] Light source from above
- [ ] Two-part shadows for realism
- [ ] Subtle depth even in flat designs
- [ ] Define a shadow scale (xs to xl)
