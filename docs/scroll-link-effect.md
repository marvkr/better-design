# Scroll-Linked Fade Effect

A CSS-only scroll-linked fade effect that creates dynamic top and bottom gradients based on scroll position.

## Overview

This technique uses CSS scroll-driven animations to create fade effects at the top and bottom edges of scrollable containers. The fade distances animate dynamically as the user scrolls, providing visual feedback about scroll position.

## Browser Support

Requires `animation-timeline: scroll()` support:

- Chrome/Edge 115+
- Opera 101+
- Not yet supported in Firefox or Safari (as of January 2025)

The code uses `@supports` for progressive enhancement, so it degrades gracefully in unsupported browsers.

## The Code

```css
@supports (animation-timeline: scroll()) {
  @property --ft {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }
  @property --fb {
    syntax: "<length>";
    inherits: false;
    initial-value: 40px;
  }

  .scroll-fade-y {
    mask-image: linear-gradient(
      to bottom,
      transparent 0,
      #000 var(--ft),
      #000 calc(100% - var(--fb)),
      transparent 100%
    );
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    animation: t 1 linear both, b 1 linear both;
    animation-timeline: scroll(self), scroll(self);
    animation-range: 0% 12%, 88% 100%;
  }

  @keyframes t {
    from {
      --ft: 0px;
    }
    to {
      --ft: 40px;
    }
  }
  @keyframes b {
    from {
      --fb: 40px;
    }
    to {
      --fb: 0px;
    }
  }
}
```
