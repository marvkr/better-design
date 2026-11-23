'use client'

// From Liquid Glass by Bilal Gürsen, https://github.com/bilalgursen/liquid-glass
// (commit 2311cd12d56fc105b4127a1e762f4092bfbb9283). Copyright (c) 2026 Bilal Abdullah Gürşen.
// MIT licence: the full text is in LICENSE beside this system's components folder.
// Changed here: flat file names, import paths, theme tokens in place of fixed label
// colours, and the props marked [port].

export const iconNames = [
  'sun',
  'moon',
  'plus',
  'minus',
  'check',
  'close',
  'search',
  'arrow-right',
  'chevron-down',
  'settings',
  'bell',
  'volume',
  'sparkle',
] as const

export type IconName = (typeof iconNames)[number]

// 24 × 24 stroke paths; circles are [cx, cy, r]. Shared with canvas drawing (glass/draw.ts).
export const iconShapes: Record<IconName, { paths: string[]; circles?: [number, number, number][] }> = {
  sun: {
    circles: [[12, 12, 4]],
    paths: ['M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4'],
  },
  moon: { paths: ['M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z'] },
  plus: { paths: ['M12 5v14M5 12h14'] },
  minus: { paths: ['M5 12h14'] },
  check: { paths: ['m5 12.5 4.5 4.5L19 7.5'] },
  close: { paths: ['M6 6l12 12M18 6 6 18'] },
  search: { circles: [[11, 11, 6.5]], paths: ['m16 16 4.5 4.5'] },
  'arrow-right': { paths: ['M4.5 12h15M13.5 6l6 6-6 6'] },
  'chevron-down': { paths: ['m6 9 6 6 6-6'] },
  settings: {
    circles: [[12, 12, 3]],
    paths: [
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
    ],
  },
  bell: { paths: ['M18 8.5a6 6 0 1 0-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5Z', 'M13.7 20.5a2 2 0 0 1-3.4 0'] },
  volume: { paths: ['M11 5 6 9H2.5v6H6l5 4V5Z', 'M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13'] },
  sparkle: { paths: ['M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z'] },
}

export type IconProps = {
  name?: IconName
  size?: number
  strokeWidth?: number
  className?: string
}

export function Icon({ name = 'sparkle', size = 15, strokeWidth = 2, className }: IconProps) {
  const shape = iconShapes[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shape.circles?.map(([cx, cy, r]) => <circle key={`${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />)}
      {shape.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export default Icon
