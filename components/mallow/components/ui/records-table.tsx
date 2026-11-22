"use client"

import * as React from "react"
import { Icon } from "@iconify/react"

import { cn } from "@/lib/utils"
import { focusRing, primaryFinish, optionTrack } from "./_shared"

// RecordsTable: a compact accounts grid on a lilac option track, with a sticky first
// column, real links, row selection, sorting and a totals footer.
//
// Usage:
//   <RecordsTable />

type Strength = "strong" | "weak" | "veryweak" | "none"
type SortKey = "name" | "last" | "strength"

const STRENGTH: Record<Strength, { label: string; color: string; rank: number }> = {
  strong: { label: "Very strong", color: "var(--chart-1)", rank: 3 },
  weak: { label: "Weak", color: "var(--chart-3)", rank: 2 },
  veryweak: { label: "Very weak", color: "var(--fee)", rank: 1 },
  none: { label: "No contact", color: "var(--chart-5)", rank: 0 },
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
  { id: "north-loom", name: "North Loom Studio", tags: ["Textiles", "Wholesale"], last: "9 days ago", strength: "strong", website: "north-loom.example.com" },
  { id: "quarry-press", name: "Quarry Press", tags: ["Print", "Local"], last: "3 weeks ago", strength: "strong", website: "quarry-press.example.com" },
  { id: "tidewater", name: "Tidewater Ceramics", tags: ["Ceramics", "Retail"], last: "2 months ago", strength: "weak", website: "tidewater.example.com" },
  { id: "fernwood", name: "Fernwood Joinery", tags: ["Furniture", "Wholesale", "Custom"], last: "15 days ago", strength: "weak", website: "fernwood.example.com" },
  { id: "slate-row", name: "Slate Row Goods", tags: ["Retail"], last: "over a year ago", strength: "veryweak", website: "slate-row.example.com" },
  { id: "ridgeway-lamp", name: "Ridgeway Lamp Works", tags: ["Lighting", "Local"], last: "5 months ago", strength: "veryweak" },
  { id: "pine-and-ash", name: "Pine and Ash", tags: ["Furniture", "Custom"], last: "No contact", strength: "none", website: "pine-and-ash.example.com" },
  { id: "lowfield", name: "Lowfield Paper Co", tags: ["Print", "Retail"], last: "3 months ago", strength: "veryweak", website: "lowfield.example.com" },
  { id: "cobble-yard", name: "Cobble Yard Supply", tags: ["Wholesale"], last: "about a month ago", strength: "weak", website: "cobble-yard.example.com" },
  { id: "grey-heron", name: "Grey Heron Glass", tags: ["Lighting", "Custom"], last: "9 days ago", strength: "strong", website: "grey-heron.example.com" },
]

function SelectBox({ checked, mixed = false, onChange, label }: { checked: boolean; mixed?: boolean; onChange: () => void; label: string }) {
  return (
    <label className="relative flex shrink-0 cursor-pointer items-center">
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-4 items-center justify-center rounded-sm transition-colors duration-fast",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          checked || mixed ? primaryFinish : "border border-input bg-transparent",
        )}
      >
        {mixed ? (
          <Icon icon="iconoir:minus" className="size-3" />
        ) : checked ? (
          <Icon icon="iconoir:check" className="size-3" />
        ) : null}
      </span>
    </label>
  )
}

const headerCell = "bg-(--option-track) px-3 py-2 text-left text-xs font-normal whitespace-nowrap text-muted-foreground"
const bodyCell = "border-b border-border px-3 py-2 text-sm whitespace-nowrap text-foreground"

function HeaderCell({
  label,
  icon,
  sortKey,
  sort,
  onSort,
}: {
  label: string
  icon: string
  sortKey?: SortKey
  sort: { key: SortKey; dir: 1 | -1 }
  onSort: (key: SortKey) => void
}) {
  const active = sortKey && sort.key === sortKey
  return (
    <th
      className={headerCell}
      aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : sortKey ? "none" : undefined}
    >
      {sortKey ? (
        <button
          type="button"
          className={cn(focusRing, "flex w-full items-center gap-1.5 rounded-sm text-left hover:text-foreground")}
          onClick={() => onSort(sortKey)}
        >
          <Icon icon={icon} className="size-3.5" aria-hidden="true" />
          <span className="truncate">{label}</span>
          {active && (
            <Icon
              icon={sort.dir === 1 ? "iconoir:arrow-down" : "iconoir:arrow-up"}
              className="size-3"
              aria-hidden="true"
            />
          )}
        </button>
      ) : (
        <span className="flex items-center gap-1.5">
          <Icon icon={icon} className="size-3.5" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </span>
      )}
    </th>
  )
}

interface RecordsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  records?: RecordRow[]
}

/**
 * Mallow RecordsTable: a wide accounts grid on a lilac option track, with a
 * sticky first column, sortable headers, row selection that tints a row
 * light violet, and a totals footer.
 */
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

  const average = records.length
    ? Math.round((records.reduce((sum, row) => sum + STRENGTH[row.strength].rank, 0) / records.length / 3) * 100)
    : 0

  return (
    <div className={cn(optionTrack, "w-full overflow-hidden rounded-2xl p-1", className)} {...props}>
      <div
        className={cn(focusRing, "relative isolate max-h-80 overflow-auto rounded-xl")}
        role="region"
        tabIndex={0}
        aria-label="Accounts table. Scroll to see every column and record."
      >
        <table className="w-full min-w-3xl border-separate border-spacing-0 text-left tabular-nums">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className={cn(headerCell, "sticky left-0 z-30")}>
                <div className="flex items-center gap-2.5">
                  <SelectBox checked={allSelected} mixed={partiallySelected} onChange={toggleAll} label="Select all accounts" />
                  <button
                    type="button"
                    onClick={() => toggleSort("name")}
                    className={cn(focusRing, "flex items-center gap-1.5 rounded-sm hover:text-foreground")}
                  >
                    Account
                    {sort.key === "name" && (
                      <Icon icon={sort.dir === 1 ? "iconoir:arrow-down" : "iconoir:arrow-up"} className="size-3" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </th>
              <HeaderCell label="Categories" icon="iconoir:label" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Last contact" icon="iconoir:clock" sortKey="last" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Relationship" icon="iconoir:heart" sortKey="strength" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Website" icon="iconoir:link" sort={sort} onSort={toggleSort} />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isSelected = selected.has(row.id)
              const strength = STRENGTH[row.strength]
              return (
                <tr
                  key={row.id}
                  aria-selected={isSelected}
                  className={cn("group transition-colors duration-fast", isSelected ? "bg-(--option-face)" : "hover:bg-accent/40")}
                >
                  <td className={cn(bodyCell, "sticky left-0 z-10", isSelected ? "bg-(--option-face)" : "bg-(--option-track) group-hover:bg-accent/40")}>
                    <div className="flex items-center gap-2.5">
                      <SelectBox checked={isSelected} onChange={() => toggleRow(row.id)} label={`Select ${row.name}`} />
                      <span
                        aria-hidden="true"
                        className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-(--tag) text-xs font-medium text-muted-foreground"
                      >
                        {row.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="truncate font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className={bodyCell}>
                    <div className="flex gap-1">
                      {row.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex h-6 items-center rounded-full bg-(--tag) px-2 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      {row.tags.length > 3 ? (
                        <span className="self-center text-xs text-muted-foreground">+{row.tags.length - 3}</span>
                      ) : null}
                    </div>
                  </td>
                  <td className={cn(bodyCell, "text-muted-foreground")}>{row.last}</td>
                  <td className={bodyCell}>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: strength.color }} />
                      {strength.label}
                    </span>
                  </td>
                  <td className={bodyCell}>
                    {row.website ? (
                      <a
                        className={cn(
                          focusRing,
                          "inline-flex items-center gap-1 rounded-sm text-muted-foreground underline decoration-current/30 underline-offset-4 hover:text-foreground",
                        )}
                        href={`https://${row.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.website}
                        <Icon icon="iconoir:arrow-up-right" className="size-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="sticky bottom-0 z-20">
            <tr>
              <td className={cn(bodyCell, "sticky left-0 z-30 border-0 bg-(--option-track) font-medium")}>
                {records.length} <span className="font-normal text-muted-foreground">accounts</span>
              </td>
              <td className={cn(bodyCell, "border-0 bg-(--option-track) text-muted-foreground")}>
                {selected.size} selected
              </td>
              <td className={cn(bodyCell, "border-0 bg-(--option-track)")} />
              <td className={cn(bodyCell, "border-0 bg-(--option-track)")}>
                {average}% <span className="text-muted-foreground">average</span>
              </td>
              <td className={cn(bodyCell, "border-0 bg-(--option-track) text-muted-foreground")}>
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
