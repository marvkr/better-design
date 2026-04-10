# Using Shadows Instead of Borders

Instead of using a border in light mode I often prefer to use a subtle box-shadow that adds more depth to the element instead.

The specific shadow in this example is actually comprised of three different shadows.

## Base Shadow (3 layers)

```css
.border-shadow {
  box-shadow:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
}
```

## Hover State

For the hover state, it is the same box-shadow just slightly darker. To transition between the shadows we can add box-shadow to the transition property like this `transition-[colors, box-shadow]`.

```css
.border-shadow:hover {
  box-shadow:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
```

## Why Shadows Over Borders

Using shadows instead of borders also has a benefit when using images or multiple colors as backgrounds. Shadows are versatile and they adapt really well to any kind of background, since they use transparency.

Solid colors on the other hand don't work as well when used on a background other than they are intended to be used on.

## Benefits

- Works with any background (images, gradients)
- Uses transparency so adapts automatically
- Adds subtle depth instead of flat lines
- Better than solid borders on complex backgrounds
