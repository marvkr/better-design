# Shadcn/UI Components

## Layout & Structure
- Accordion
- Aspect Ratio
- Card
- Collapsible
- Resizable
- Scroll Area
- Scroll Fade Effect *(chanhdai.com)*
- Separator
- Sidebar

## Navigation
- Breadcrumb
- Menubar
- Navigation Menu
- Pagination
- Tabs

## Forms & Inputs
- Button
- Button Group *(New)*
- Calendar
- Checkbox
- Combobox
- Copy Button *(chanhdai.com)*
- Date Picker
- Field *(New)*
- Form
- Input
- Input Group *(New)*
- Input OTP
- Label
- Native Select *(New)*
- Radio Group
- Select
- Slide to Unlock *(chanhdai.com)*
- Slider
- Switch
- Textarea
- Wheel Picker *(chanhdai.com — requires `@ncdai/react-wheel-picker` npm package)*

## Data Display
- Avatar
- Badge
- Carousel
- Chart
- Data Table
- Empty *(New)*
- GitHub Stars *(chanhdai.com)*
- Item *(New)*
- Kbd *(New)*
- Progress
- Shimmering Text *(chanhdai.com)*
- Skeleton
- Spinner *(New)*
- Table
- Testimonial *(chanhdai.com)*
- Text Flip *(chanhdai.com)*
- Typography

## Feedback
- Alert
- Alert Dialog
- Apple Hello Effect *(chanhdai.com)*
- Sonner
- Toast

## Overlays
- Dialog
- Drawer
- Hover Card
- Popover
- Sheet
- Tooltip

## Menus
- Command
- Context Menu
- Dropdown Menu

## Toggle
- Toggle
- Toggle Group

---

## chanhdai.com Components

Components from [chanhdai.com/components](https://chanhdai.com/components) — copy source manually, no shadcn CLI needed.

All use `motion/react` (already installed as `motion`), `cn` from `@/lib/utils`.

| Component | File | Notes |
|-----------|------|-------|
| Apple Hello Effect | `components/ui/apple-hello-effect.tsx` | SVG stroke animation, English + Vietnamese |
| Copy Button | `components/ui/copy-button.tsx` | Needs `hooks/use-copy-to-clipboard.ts` |
| GitHub Stars | `components/ui/github-stars.tsx` | Uses Button + Tooltip |
| Scroll Fade Effect | `components/ui/scroll-fade-effect.tsx` | Needs CSS in `globals.css` |
| Shimmering Text | `components/ui/shimmering-text.tsx` | Per-char shimmer animation |
| Slide to Unlock | `components/ui/slide-to-unlock.tsx` | iOS-style drag slider |
| Testimonial | `components/ui/testimonial.tsx` | Compound component |
| Text Flip | `components/ui/text-flip.tsx` | Cycles through text items |
| Wheel Picker | `components/ui/wheel-picker.tsx` | Needs `@ncdai/react-wheel-picker` npm package |
| Haptic | `lib/haptic.ts` | Utility function, not a component |
