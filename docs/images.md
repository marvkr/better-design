# Image Guidelines

## Use Good Photos
- Bad photos make everything look unprofessional
- Use high-quality stock photos or hire photographer
- Good free sources: Unsplash, Pexels

## Text Needs Consistent Contrast

**Problem:** Text on images can be illegible

**Solutions:**

1. **Add overlay:** Dark semi-transparent layer between image and text
2. **Lower image contrast:** Reduce saturation and brightness of background
3. **Colorize image:** Apply color filter to reduce contrast
4. **Add text shadow:** Subtle shadow makes text readable on varied backgrounds
5. **Blur background:** Use gaussian blur on area behind text

## Everything Has an Intended Size

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

## Beware User-Uploaded Content

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

## Checklist

- [ ] Ensure consistent contrast for text on images
- [ ] Use appropriate-sized assets (don't scale up icons)
- [ ] Handle user content gracefully (center-crop, fallbacks)
- [ ] Use high-quality photos only
