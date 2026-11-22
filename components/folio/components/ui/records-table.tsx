"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// RecordsTable: a compact CRM grid with the details that make a wide table
// feel usable: explicit grid lines, a restrained tag palette, a sticky first
// column, real links, selection, sorting, and a calculation footer.
// Ported from Beautiful UI: https://beautiful-ui-five.vercel.app/
//
// Usage:
//   <RecordsTable />

type Strength = "strong" | "weak" | "veryweak" | "none"
type SortKey = "name" | "last" | "strength"

const STRENGTH: Record<Strength, { label: string; color: string; rank: number }> = {
  strong: { label: "Very strong", color: "var(--chart-2)", rank: 3 },
  weak: { label: "Weak", color: "var(--chart-4)", rank: 2 },
  veryweak: { label: "Very weak", color: "var(--destructive)", rank: 1 },
  none: { label: "No communication", color: "var(--muted-foreground)", rank: 0 },
}

const TAG_COLORS: Record<string, string> = {
  B2B: "var(--chart-4)",
  B2C: "var(--chart-2)",
  Cafe: "var(--destructive)",
  Catering: "var(--chart-5)",
  "Dairy-free": "var(--chart-1)",
  Gelato: "var(--chart-5)",
  Imports: "var(--chart-1)",
  Local: "var(--chart-2)",
  Seasonal: "var(--chart-4)",
  Sorbet: "var(--chart-1)",
  Vegan: "var(--chart-2)",
  Wholesale: "var(--chart-3)",
}

interface RecordRow {
  id: string
  name: string
  tags: string[]
  last: string
  strength: Strength
  website?: string
}

const DEFAULT_ROWS: RecordRow[] = [
  { id: "aurora", name: "Aurora Scoops, Reykjavik", tags: ["Gelato", "Seasonal"], last: "9 days ago", strength: "strong", website: "aurora-scoops.example.com" },
  { id: "kumo", name: "Kumo Creamery, Tokyo", tags: ["B2C", "Cafe", "Vegan"], last: "3 weeks ago", strength: "strong", website: "kumo-creamery.example.com" },
  { id: "sol-nieve", name: "Sol y Nieve, Buenos Aires", tags: ["Gelato", "Local"], last: "2 months ago", strength: "weak", website: "sol-y-nieve.example.com" },
  { id: "maple-orbit", name: "Maple Orbit, Montreal", tags: ["B2B", "Wholesale", "Seasonal"], last: "15 days ago", strength: "weak", website: "maple-orbit.example.com" },
  { id: "blue-fig", name: "Blue Fig Gelato, Florence", tags: ["Gelato", "Cafe"], last: "over 1 year ago", strength: "veryweak", website: "blue-fig.example.com" },
  { id: "sahara-swirl", name: "Sahara Swirl, Marrakech", tags: ["Sorbet", "Local"], last: "5 months ago", strength: "veryweak" },
  { id: "cloudberry", name: "Cloudberry Cone, Helsinki", tags: ["Dairy-free", "Seasonal"], last: "No contact", strength: "none", website: "cloudberry-cone.example.com" },
  { id: "palm-sugar", name: "Palm Sugar Creamery, Bangkok", tags: ["B2C", "Vegan"], last: "3 months ago", strength: "veryweak", website: "palm-sugar.example.com" },
  { id: "silk-road", name: "Silk Road Sorbet, Tbilisi", tags: ["Sorbet", "Imports"], last: "about 1 month ago", strength: "weak", website: "silk-road.example.com" },
  { id: "ember-cone", name: "Ember Cone Company, Seoul", tags: ["B2C", "Vegan"], last: "15 days ago", strength: "weak", website: "ember-cone.example.com" },
  { id: "coral-coast", name: "Coral Coast Sorbet, Honolulu", tags: ["Sorbet", "Local"], last: "9 days ago", strength: "strong", website: "coral-coast.example.com" },
  { id: "mooncake", name: "Mooncake Ice Cream, Singapore", tags: ["B2B", "Wholesale"], last: "about 1 month ago", strength: "veryweak", website: "mooncake-ice-cream.example.com" },
]

function Icon({ children, size = 14, strokeWidth = 1.8 }: { children: React.ReactNode; size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

function Checkbox({ checked, mixed = false, onChange, label }: { checked: boolean; mixed?: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex shrink-0 cursor-pointer items-center" title={label}>
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="sr-only" />
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-[0.3125rem] transition-colors duration-fast",
          checked || mixed
            ? "bg-primary text-primary-foreground"
            : "text-transparent shadow-[inset_0_0_0_0.0938rem_var(--border)]",
        )}
      >
        {mixed ? (
          <span className="h-[0.0938rem] w-2 rounded-full bg-primary-foreground" />
        ) : checked ? (
          <Icon size={12} strokeWidth={3}><path d="m5 12 4 4L19 6" /></Icon>
        ) : null}
      </span>
    </label>
  )
}

function Tag({ name }: { name: string }) {
  const color = TAG_COLORS[name] ?? "var(--muted-foreground)"
  return (
    <span
      className="inline-flex h-[1.25rem] items-center gap-1 rounded-full border border-border px-1.5 text-[0.6875rem] font-medium text-foreground/80"
      style={{ background: `color-mix(in oklab, ${color} 9%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}

const headerCell = "border-b border-border bg-muted px-2.5 py-1.5 text-left text-[0.7188rem] font-medium text-muted-foreground whitespace-nowrap"
const bodyCell = "border-b border-border px-2.5 py-1.5 text-[0.75rem] text-foreground/80 whitespace-nowrap"

function HeaderCell({
  label,
  icon,
  sortKey,
  sort,
  onSort,
}: {
  label: string
  icon: React.ReactNode
  sortKey?: SortKey
  sort: { key: SortKey; dir: 1 | -1 }
  onSort: (key: SortKey) => void
}) {
  return (
    <th className={headerCell}>
      <button
        type="button"
        className="flex w-full items-center gap-1.5 text-left"
        onClick={sortKey ? () => onSort(sortKey) : undefined}
      >
        <span className="text-muted-foreground">{icon}</span>
        <span className="truncate">{label}</span>
        {sortKey && sort.key === sortKey && (
          <span style={{ transform: sort.dir === -1 ? "rotate(180deg)" : undefined }}>
            <Icon size={12}><path d="M12 5v14M5 12l7 7 7-7" /></Icon>
          </span>
        )}
      </button>
    </th>
  )
}

interface RecordsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  records?: RecordRow[]
}

function RecordsTable({ records = DEFAULT_ROWS, className, ...props }: RecordsTableProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "name", dir: 1 })

  const visibleRows = React.useMemo(() => {
    return [...records].sort((a, b) => {
      const value =
        sort.key === "name"
          ? a.name.localeCompare(b.name)
          : sort.key === "last"
            ? a.last.localeCompare(b.last)
            : STRENGTH[a.strength].rank - STRENGTH[b.strength].rank
      return value * sort.dir
    })
  }, [records, sort])

  const allSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id))
  const partiallySelected = !allSelected && visibleRows.some((row) => selected.has(row.id))

  const toggleSort = (key: SortKey) =>
    setSort((current) => (current.key === key ? { key, dir: (current.dir * -1) as 1 | -1 } : { key, dir: 1 }))
  const toggleRow = (id: string) =>
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const toggleAll = () =>
    setSelected((current) => {
      const next = new Set(current)
      if (allSelected) visibleRows.forEach((row) => next.delete(row.id))
      else visibleRows.forEach((row) => next.add(row.id))
      return next
    })

  const average = Math.round(
    (records.reduce((sum, row) => sum + STRENGTH[row.strength].rank, 0) / records.length / 3) * 100,
  )

  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)} {...props}>
      <div
        className="relative isolate max-h-[20rem] overflow-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        role="region"
        tabIndex={0}
        aria-label="Companies table. Scroll horizontally and vertically to view all columns and records."
      >
        <table className="w-full min-w-[45rem] border-collapse text-left">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className={cn(headerCell, "sticky left-0 z-30 bg-muted")}>
                <div className="flex items-center gap-2">
                  <Checkbox checked={allSelected} mixed={partiallySelected} onChange={toggleAll} label="Select all companies" />
                  <span>Company</span>
                </div>
              </th>
              <HeaderCell label="Categories" sort={sort} onSort={toggleSort} icon={<Icon size={14}><path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01" /></Icon>} />
              <HeaderCell label="Last interaction" sortKey="last" sort={sort} onSort={toggleSort} icon={<Icon size={14}><path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6" /></Icon>} />
              <HeaderCell label="Connection strength" sortKey="strength" sort={sort} onSort={toggleSort} icon={<Icon size={14}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z" /></Icon>} />
              <HeaderCell label="Links" sort={sort} onSort={toggleSort} icon={<Icon size={14}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></Icon>} />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isSelected = selected.has(row.id)
              const strength = STRENGTH[row.strength]
              return (
                <tr key={row.id} className={cn("transition-colors", isSelected ? "bg-primary/5" : "hover:bg-accent/50")}>
                  <td className={cn(bodyCell, "sticky left-0 z-[1]", isSelected ? "bg-primary/5" : "bg-card")}>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} label={`Select ${row.name}`} />
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-[0.625rem] font-semibold text-muted-foreground"
                      >
                        {row.name.slice(0, 1).toUpperCase()}
                      </span>
                      {row.website ? (
                        <a
                          href={`https://${row.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate font-medium text-foreground underline decoration-transparent underline-offset-2 hover:decoration-border"
                        >
                          {row.name}
                        </a>
                      ) : (
                        <span className="truncate font-medium text-foreground">{row.name}</span>
                      )}
                    </div>
                  </td>
                  <td className={bodyCell}>
                    <div className="flex gap-1">
                      {row.tags.slice(0, 4).map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                      {row.tags.length > 4 ? (
                        <span className="text-[0.6875rem] text-muted-foreground">+{row.tags.length - 4}</span>
                      ) : null}
                    </div>
                  </td>
                  <td className={cn(bodyCell, row.last === "No contact" && "text-muted-foreground")}>{row.last}</td>
                  <td className={bodyCell}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full" style={{ background: strength.color }} />
                      {strength.label}
                    </span>
                  </td>
                  <td className={bodyCell}>
                    {row.website ? (
                      <a
                        className="inline-flex items-center gap-1 text-foreground/80 underline decoration-border underline-offset-2 transition-colors hover:decoration-foreground"
                        href={`https://${row.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.website}
                        <Icon size={11}><path d="M14 5h5v5M19 5l-8 8" /></Icon>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="sticky bottom-0 z-20">
            <tr>
              <td className={cn(bodyCell, "sticky left-0 z-30 border-t bg-muted font-medium text-foreground")}>
                <span className="tabular-nums">{records.length}</span>{" "}
                <span className="text-muted-foreground">count</span>
              </td>
              <td className={cn(bodyCell, "border-t bg-muted")}>
                <button type="button" className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                  <Icon size={13}><path d="M12 5v14M5 12h14" /></Icon>
                  Add calculation
                </button>
              </td>
              <td className={cn(bodyCell, "border-t bg-muted text-muted-foreground")}>-</td>
              <td className={cn(bodyCell, "border-t bg-muted")}>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: "var(--chart-4)" }} />
                  {average}% average
                </span>
              </td>
              <td className={cn(bodyCell, "border-t bg-muted text-muted-foreground")}>
                {records.filter((row) => row.website).length} links
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export { RecordsTable }
export type { RecordRow }
