# Better Design

> 27 open-source design systems for [shadcn/ui](https://ui.shadcn.com). Drop any of them into your app with one command.

Browse and preview them all at **[better-design.com](https://www.better-design.com/design-systems)**.

Every design system ships the same ~87 components (accordion → typography), themed end-to-end. Pick a style, install the components you need, keep iterating.


<img width="1693" height="983" alt="Screenshot 2026-05-05 at 12 14 41" src="https://github.com/user-attachments/assets/94efdd7e-59f2-4e5d-a589-780249be3401" />




## Install

Install any component into your shadcn/ui project:

```bash
npx shadcn@latest add https://www.better-design.com/registry/<design-system>/<component>.json
```

Example — install Linear's button:

```bash
npx shadcn@latest add https://www.better-design.com/registry/linear/button.json
```

The CLI handles dependencies, CSS variables, and `globals.css` automatically.

---

## Design systems

| Design System | Slug | Preview |
|---|---|---|
| Airbnb | `airbnb` | [view](https://www.better-design.com/design-systems/airbnb) |
| Apple | `apple` | [view](https://www.better-design.com/design-systems/apple) |
| Beam Custom | `beam-custom` | [view](https://www.better-design.com/design-systems/beam-custom) |
| Beam Lib | `beam-lib` | [view](https://www.better-design.com/design-systems/beam-lib) |
| Cinematic Dark | `cinematic-dark` | [view](https://www.better-design.com/design-systems/cinematic-dark) |
| Column (Corporate Fintech) | `corporate-fintech` | [view](https://www.better-design.com/design-systems/corporate-fintech) |
| Dark Orange | `dark-orange` | [view](https://www.better-design.com/design-systems/dark-orange) |
| Editorial Dark | `editorial-dark` | [view](https://www.better-design.com/design-systems/editorial-dark) |
| Figma | `figma` | [view](https://www.better-design.com/design-systems/figma) |
| Glassmorphic Dark | `glassmorphic-dark` | [view](https://www.better-design.com/design-systems/glassmorphic-dark) |
| Inset Dark | `inset-dark` | [view](https://www.better-design.com/design-systems/inset-dark) |
| Light Marketplace | `light-marketplace` | [view](https://www.better-design.com/design-systems/light-marketplace) |
| Linear | `linear` | [view](https://www.better-design.com/design-systems/linear) |
| Linear Quality | `linear-quality` | [view](https://www.better-design.com/design-systems/linear-quality) |
| Lumen Dark | `lumen-dark` | [view](https://www.better-design.com/design-systems/lumen-dark) |
| Midnight Glass | `midnight-glass` | [view](https://www.better-design.com/design-systems/midnight-glass) |
| Minimal Light | `minimal-light` | [view](https://www.better-design.com/design-systems/minimal-light) |
| Monochrome Industrial | `monochrome-industrial` | [view](https://www.better-design.com/design-systems/monochrome-industrial) |
| Neutral Monochrome | `neutral-monochrome` | [view](https://www.better-design.com/design-systems/neutral-monochrome) |
| Notion | `notion` | [view](https://www.better-design.com/design-systems/notion) |
| Precision Light | `precision-light` | [view](https://www.better-design.com/design-systems/precision-light) |
| Stripe | `stripe` | [view](https://www.better-design.com/design-systems/stripe) |
| Supabase | `supabase` | [view](https://www.better-design.com/design-systems/supabase) |
| Tactile Minimal | `tactile-minimal` | [view](https://www.better-design.com/design-systems/tactile-minimal) |
| TV Style | `tv-style` | [view](https://www.better-design.com/design-systems/tv-style) |
| Vercel | `vercel` | [view](https://www.better-design.com/design-systems/vercel) |
| Vibrant Dark | `vibrant-dark` | [view](https://www.better-design.com/design-systems/vibrant-dark) |

---

## Repo layout

```
registry/
  <design-system>/
    button.json        # shadcn registry entry — what the CLI installs
    card.json
    ...
  index.json           # registry manifest

components/
  <design-system>/
    components/ui/     # extracted .tsx source — readable, forkable
      button.tsx
      card.tsx
      ...
    globals.css        # CSS variables + tokens for the theme
    lib/utils.ts       # cn() helper
```

- `registry/` is the source of truth — what `shadcn add` reads.
- `components/` is a mirror of the same code as plain `.tsx` files for browsing, copying, or diffing on GitHub.

Both stay in sync. If you fork or copy directly, grab the matching `globals.css` for that design system so the tokens resolve.

---

## Browse, fork, contribute

- **Want to browse the code?** Open `components/<design-system>/components/ui/` for any DS.
- **Want a new theme?** Open an issue or PR — every DS is a folder under `registry/` plus a matching folder under `components/`.
- **Found a bug or want to tweak a token?** PRs welcome.

---

## License

MIT — use these in personal, commercial, and client work. Attribution appreciated but not required.
