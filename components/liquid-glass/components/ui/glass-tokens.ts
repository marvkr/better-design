// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

// Theme colors shared by every canvas glass control; light/dark match the hero slider.
export type GlassThemeName = 'light' | 'dark'

export type GlassTokens = {
  /** Page color the glass refracts where nothing is drawn beneath it. */
  surface: string
  track: string
  accent: string
  accentDeep: string
  frostCenter: string
  frostEdge: string
  text: string
  textMuted: string
  well: string
}

export const glassTokens: Record<GlassThemeName, GlassTokens> = {
  light: {
    surface: '#dedfe2',
    track: '#c6c5c9',
    accent: '#3291FF',
    accentDeep: '#02458f',
    frostCenter: '#f9fafc',
    frostEdge: '#e2e4e9',
    text: '#1d1d1f',
    textMuted: '#6e6e75',
    well: 'rgba(0, 0, 0, 0.055)',
  },
  dark: {
    surface: '#17181c',
    track: '#34353b',
    accent: '#3291FF',
    accentDeep: '#02458f',
    frostCenter: '#2a2c31',
    frostEdge: '#1c1d21',
    text: '#f5f5f7',
    textMuted: '#8d8d95',
    well: 'rgba(255, 255, 255, 0.06)',
  },
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h.slice(0, 6), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}
