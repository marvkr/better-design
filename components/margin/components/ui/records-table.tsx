"use client";

import * as React from "react";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { focusRing } from "./_shared";
import { Checkbox } from "./checkbox";

type Strength = "strong" | "weak" | "veryweak" | "none";
type SortKey = "name" | "last" | "strength";

const STRENGTH: { [key in Strength]: { label: string; dot: string; rank: number } } = {
  strong: { label: "Very strong", dot: "bg-success", rank: 3 },
  weak: { label: "Weak", dot: "bg-warning", rank: 2 },
  veryweak: { label: "Very weak", dot: "bg-destructive", rank: 1 },
  none: { label: "No contact yet", dot: "bg-muted-foreground", rank: 0 },
};

/** Tags share one soft oxblood chip; a few carry a status hue for meaning. */
const TAG_TONE: { [tag: string]: string } = {
  Partner: "bg-success/12 text-success-text",
  Trial: "bg-warning/15 text-warning-text",
  Churned: "bg-destructive/12 text-destructive-text",
};

/** One company row in the records grid. */
interface RecordRow {
  id: string;
  name: string;
  tags: string[];
  last: string;
  strength: Strength;
  website?: string;
}

const DEFAULT_ROWS: RecordRow[] = [
  { id: "north-desk", name: "North Desk Studio", tags: ["Design", "Partner"], last: "9 days ago", strength: "strong", website: "north-desk.example.com" },
  { id: "paper-lane", name: "Paper Lane Press", tags: ["Publishing", "Trial"], last: "3 weeks ago", strength: "weak", website: "paper-lane.example.com" },
  { id: "quiet-hour", name: "Quiet Hour Labs", tags: ["Research"], last: "2 months ago", strength: "weak", website: "quiet-hour.example.com" },
  { id: "field-notes", name: "Field Notes Co.", tags: ["Education", "Partner"], last: "15 days ago", strength: "strong", website: "field-notes.example.com" },
  { id: "slate-works", name: "Slate Works", tags: ["Agency", "Churned"], last: "over 1 year ago", strength: "veryweak" },
  { id: "margin-hall", name: "Margin Hall", tags: ["Nonprofit"], last: "5 months ago", strength: "veryweak", website: "margin-hall.example.com" },
  { id: "inkline", name: "Inkline Systems", tags: ["Software", "Trial"], last: "No contact", strength: "none", website: "inkline.example.com" },
  { id: "low-tide", name: "Low Tide Collective", tags: ["Design"], last: "about 1 month ago", strength: "weak", website: "low-tide.example.com" },
];

function Tag({ name }: { name: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-sm px-1.5 text-xs font-medium",
        TAG_TONE[name] ?? "bg-(--mark) text-(--mark-foreground)",
      )}
    >
      {name}
    </span>
  );
}

const headerCell =
  "h-8 whitespace-nowrap border-b border-border bg-muted px-3 text-left text-xs font-medium text-muted-foreground";
const bodyCell = "h-10 whitespace-nowrap border-b border-border px-3 text-sm text-foreground";

function HeaderCell({
  label,
  icon,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  icon: string;
  sortKey?: SortKey;
  sort: { key: SortKey; dir: 1 | -1 };
  onSort: (key: SortKey) => void;
}) {
  const active = sortKey && sort.key === sortKey;
  const inner = (
    <>
      <Icon icon={icon} className="size-3.5 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
      {active && (
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={cn("size-3.5 transition-transform duration-fast", sort.dir === -1 && "rotate-180")}
          aria-hidden
        />
      )}
    </>
  );
  return (
    <th
      className={headerCell}
      aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : undefined}
    >
      {sortKey ? (
        <button
          type="button"
          className={cn(focusRing, "flex items-center gap-1.5 rounded-sm text-left hover:text-foreground")}
          onClick={() => onSort(sortKey)}
        >
          {inner}
        </button>
      ) : (
        <span className="flex items-center gap-1.5">{inner}</span>
      )}
    </th>
  );
}

interface RecordsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  records?: RecordRow[];
}

/**
 * Margin RecordsTable: a compact records grid on a white sheet with a sticky
 * first column, sortable headers, row selection and a totals footer.
 */
function RecordsTable({ records = DEFAULT_ROWS, className, ...props }: RecordsTableProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: "name", dir: 1 });

  const visibleRows = React.useMemo(
    () =>
      [...records].sort((a, b) => {
        const value =
          sort.key === "name"
            ? a.name.localeCompare(b.name)
            : sort.key === "last"
              ? a.last.localeCompare(b.last)
              : STRENGTH[a.strength].rank - STRENGTH[b.strength].rank;
        return value * sort.dir;
      }),
    [records, sort],
  );

  const allSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id));
  const someSelected = !allSelected && visibleRows.some((row) => selected.has(row.id));

  const toggleSort = (key: SortKey) =>
    setSort((current) => (current.key === key ? { key, dir: (current.dir * -1) as 1 | -1 } : { key, dir: 1 }));
  const toggleRow = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const toggleAll = () =>
    setSelected((current) => {
      const next = new Set(current);
      if (allSelected) visibleRows.forEach((row) => next.delete(row.id));
      else visibleRows.forEach((row) => next.add(row.id));
      return next;
    });

  const average = records.length
    ? Math.round((records.reduce((sum, row) => sum + STRENGTH[row.strength].rank, 0) / records.length / 3) * 100)
    : 0;

  return (
    <div
      className={cn("w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground", className)}
      {...props}
    >
      <div
        className={cn(focusRing, "relative isolate max-h-80 overflow-auto")}
        role="region"
        tabIndex={0}
        aria-label="Companies table. Scroll to see every column and record."
      >
        <table className="w-full min-w-3xl border-collapse text-left">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className={cn(headerCell, "sticky left-0 z-30")}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                    onCheckedChange={toggleAll}
                    aria-label="Select all companies"
                  />
                  <span>Company</span>
                </div>
              </th>
              <HeaderCell label="Tags" icon="solar:tag-linear" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Last contact" icon="solar:clock-circle-linear" sortKey="last" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Relationship" icon="solar:heart-linear" sortKey="strength" sort={sort} onSort={toggleSort} />
              <HeaderCell label="Website" icon="solar:link-linear" sort={sort} onSort={toggleSort} />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isSelected = selected.has(row.id);
              const strength = STRENGTH[row.strength];
              return (
                <tr
                  key={row.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={cn("transition-colors duration-fast", isSelected ? "bg-(--mark)/50" : "pointer-fine:hover:bg-accent/60")}
                >
                  <td className={cn(bodyCell, "sticky left-0 z-1", isSelected ? "bg-(--mark)/50" : "bg-card")}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(row.id)}
                        aria-label={`Select ${row.name}`}
                      />
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-(--mark) text-xs font-semibold text-(--mark-foreground)"
                      >
                        {row.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="truncate font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className={bodyCell}>
                    <div className="flex gap-1">
                      {row.tags.slice(0, 3).map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                      {row.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{row.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className={cn(bodyCell, "text-muted-foreground")}>{row.last}</td>
                  <td className={bodyCell}>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className={cn("size-1.5 rounded-full", strength.dot)} />
                      {strength.label}
                    </span>
                  </td>
                  <td className={bodyCell}>
                    {row.website ? (
                      <a
                        className={cn(
                          focusRing,
                          "inline-flex items-center gap-1 rounded-sm text-(--primary-text) underline decoration-current/30 underline-offset-4 hover:decoration-current",
                        )}
                        href={`https://${row.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.website}
                        <Icon icon="solar:arrow-right-up-linear" className="size-3" aria-hidden />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="sticky bottom-0 z-20">
            <tr>
              <td className={cn(bodyCell, "sticky left-0 z-30 border-t border-b-0 bg-muted font-medium")}>
                <span className="tabular-nums">{records.length}</span>{" "}
                <span className="font-normal text-muted-foreground">companies</span>
              </td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted")}>
                <button
                  type="button"
                  className={cn(focusRing, "inline-flex items-center gap-1 rounded-sm text-xs text-muted-foreground hover:text-foreground")}
                >
                  <Icon icon="solar:add-circle-linear" className="size-3.5" aria-hidden />
                  Add total
                </button>
              </td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted text-muted-foreground")} />
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted tabular-nums")}>{average}% average</td>
              <td className={cn(bodyCell, "border-t border-b-0 bg-muted text-muted-foreground tabular-nums")}>
                {records.filter((row) => row.website).length} links
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export { RecordsTable };
export type { RecordRow };
