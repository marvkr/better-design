"use client"

import * as React from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { focusRing } from "./_shared"

// RecordsTable: a compact client grid with the details that make a wide
// table usable: thin cool rules, grey tag chips with a hue dot, a sticky first
// column, real links, selection, sorting and a totals footer.
//
// Usage:
//   <RecordsTable />

type Strength = "strong" | "weak" | "veryweak" | "none"
type SortKey = "name" | "last" | "strength"

const STRENGTH: Record<Strength, { label: string; dot: string; rank: number }> = {
  strong: { label: "Very strong", dot: "bg-success", rank: 3 },
  weak: { label: "Weak", dot: "bg-warning", rank: 2 },
  veryweak: { label: "Very weak", dot: "bg-(--status-late)", rank: 1 },
  none: { label: "No contact yet", dot: "bg-input", rank: 0 },
}

const TAG_DOTS: Record<string, string> = {
  Agency: "bg-chart-4",
  Design: "bg-chart-1",
  Finance: "bg-chart-3",
  Health: "bg-chart-3",
  Hardware: "bg-chart-5",
  Logistics: "bg-chart-2",
  Nonprofit: "bg-chart-4",
  Retail: "bg-chart-1",
  Software: "bg-chart-2",
  Studio: "bg-chart-5",
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
  { id: "larkspur", name: "Larkspur Works", tags: ["Studio", "Design"], last: "2 days ago", strength: "strong", website: "larkspur.example.com" },
  { id: "pinecrest", name: "Pinecrest Clinic", tags: ["Health"], last: "1 week ago", strength: "strong", website: "pinecrest.example.com" },
  { id: "tidewater", name: "Tidewater Freight", tags: ["Logistics", "Hardware"], last: "3 weeks ago", strength: "weak", website: "tidewater.example.com" },
  { id: "cedarleaf", name: "Cedarleaf Ledger", tags: ["Finance", "Software"], last: "5 days ago", strength: "strong", website: "cedarleaf.example.com" },
  { id: "meadowlark", name: "Meadowlark Goods", tags: ["Retail"], last: "2 months ago", strength: "veryweak", website: "meadowlark.example.com" },
  { id: "foxglove", name: "Foxglove Partners", tags: ["Agency", "Design"], last: "1 month ago", strength: "weak" },
  { id: "riverbend", name: "Riverbend Trust", tags: ["Nonprofit"], last: "No contact", strength: "none", website: "riverbend.example.com" },
  { id: "granite", name: "Granite Row Labs", tags: ["Software", "Hardware", "Studio"], last: "4 days ago", strength: "strong", website: "granite-row.example.com" },
  { id: "saltmarsh", name: "Saltmarsh Supply", tags: ["Retail", "Logistics"], last: "6 months ago", strength: "veryweak", website: "saltmarsh.example.com" },
  { id: "willowby", name: "Willowby Health", tags: ["Health", "Nonprofit"], last: "3 weeks ago", strength: "weak", website: "willowby.example.com" },
]

function Checkbox({ checked, mixed = false, onChange, label }: { checked: boolean; mixed?: boolean; onChange: () => void; label: string }) {
  return (
    <label className="relative flex shrink-0 cursor-pointer items-center" title={label}>
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="peer sr-only" />
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-xs transition-colors duration-fast",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          checked || mixed
            ? "bg-primary text-primary-foreground shadow-(--primary-face)"
            : "bg-card text-transparent ring-1 ring-inset ring-input",
        )}
      >
        {mixed ? (
          <span className="h-0.5 w-2 rounded-xs bg-primary-foreground" />
        ) : checked ? (
          <Icon icon="mingcute:check-line" className="size-3" aria-hidden="true" />
        ) : null}
      </span>
    </label>
  )
}

function Tag({ name }: { name: string }) {
  return (
    <span className="inline-flex h-5 items-center gap-1 rounded-sm bg-secondary px-2 text-xs font-medium text-secondary-foreground">
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", TAG_DOTS[name] ?? "bg-muted-foreground")} />
      {name}
    </span>
  )
}

const headerCell =
  "whitespace-nowrap border-b border-border bg-muted px-3 py-2 text-left text-xs font-medium text-muted-foreground"
const bodyCell = "whitespace-nowrap border-b border-border px-3 py-2 text-[0.8125rem] text-foreground"

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
  const active = sortKey !== undefined && sort.key === sortKey
  const content = (
    <>
      <Icon icon={icon} className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
      {active && (
        <Icon
          icon={sort.dir === 1 ? "mingcute:arrow-down-line" : "mingcute:arrow-up-line"}
          className="size-3 shrink-0 text-foreground"
          aria-hidden="true"
        />
      )}
    </>
  )
  return (
    <th
      className={headerCell}
      aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : undefined}
    >
      {sortKey ? (
        <button
          type="button"
          className={cn(focusRing, "flex w-full items-center gap-1.5 rounded-sm text-left transition-colors hover:text-foreground")}
          onClick={() => onSort(sortKey)}
        >
          {content}
        </button>
      ) : (
        <span className="flex items-center gap-1.5">{content}</span>
      )}
    </th>
  )
}

interface RecordsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  records?: RecordRow[]
}

/**
 * Paddock RecordsTable: a wide client grid in a white card, with a grey well
 * header and footer, a sticky first column, sortable headings and row
 * selection drawn with the teal checkbox.
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
    <div className={cn("w-full overflow-hidden rounded-xl bg-card shadow-(--shadow-card)", className)} {...props}>
      <div
        className={cn(focusRing, "relative isolate max-h-80 overflow-auto")}
        role="region"
        tabIndex={0}
        aria-label="Clients table. Scroll horizontally and vertically to see every column and record."
      >
        <table className="w-full min-w-3xl border-collapse text-left">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className={cn(headerCell, "sticky left-0 z-30")}>
                <div className="flex items-center gap-2">
                  <Checkbox checked={allSelected} mixed={partiallySelected} onChange={toggleAll} label="Select all clients" />
                  <span>Client</span>
                </div>
              </th>
              <HeaderCell label="Tags" sort={sort} onSort={toggleSort} icon="mingcute:tag-line" />
              <HeaderCell label="Last touch" sortKey="last" sort={sort} onSort={toggleSort} icon="mingcute:time-line" />
              <HeaderCell label="Relationship" sortKey="strength" sort={sort} onSort={toggleSort} icon="mingcute:heart-line" />
              <HeaderCell label="Website" sort={sort} onSort={toggleSort} icon="mingcute:link-line" />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isSelected = selected.has(row.id)
              const strength = STRENGTH[row.strength]
              return (
                <tr key={row.id} className={cn("transition-colors duration-fast", isSelected ? "bg-accent" : "hover:bg-accent/60")}>
                  <td className={cn(bodyCell, "sticky left-0 z-10", isSelected ? "bg-accent" : "bg-card")}>
                    <div className="flex items-center gap-2">
                      <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} label={`Select ${row.name}`} />
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-secondary text-xs font-semibold text-secondary-foreground"
                      >
                        {row.name.slice(0, 1).toUpperCase()}
                      </span>
                      {row.website ? (
                        <a
                          href={`https://${row.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(focusRing, "truncate rounded-xs font-medium text-foreground underline decoration-transparent underline-offset-2 hover:decoration-input")}
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
                      {row.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                      {row.tags.length > 3 ? (
                        <span className="text-xs text-muted-foreground">+{row.tags.length - 3}</span>
                      ) : null}
                    </div>
                  </td>
                  <td className={cn(bodyCell, row.last === "No contact" && "text-muted-foreground")}>{row.last}</td>
                  <td className={bodyCell}>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={cn("size-1.5 rounded-full", strength.dot)} />
                      {strength.label}
                    </span>
                  </td>
                  <td className={bodyCell}>
                    {row.website ? (
                      <a
                        className={cn(focusRing, "inline-flex items-center gap-1 rounded-xs text-muted-foreground underline decoration-input underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground")}
                        href={`https://${row.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.website}
                        <Icon icon="mingcute:arrow-right-up-line" className="size-3" aria-hidden="true" />
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
              <td className={cn(bodyCell, "sticky left-0 z-30 border-t border-b-0 bg-muted font-medium")}>
                <span className="tabular-nums">{records.length}</span>{" "}
                <span className="text-muted-foreground">clients</span>
              </td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted")}>
                <button
                  type="button"
                  className={cn(focusRing, "inline-flex items-center gap-1 rounded-sm text-muted-foreground transition-colors hover:text-foreground")}
                >
                  <Icon icon="mingcute:add-line" className="size-3.5" aria-hidden="true" />
                  Add total
                </button>
              </td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted text-muted-foreground")}>None</td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted")}>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-(--status-late)" />
                  {average}% average
                </span>
              </td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted text-muted-foreground")}>
                {records.filter((row) => row.website).length} sites
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
