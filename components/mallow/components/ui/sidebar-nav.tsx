"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { cardSlab, focusRing, panelSpring, primaryFinish, selectedOption, optionTrack } from "./_shared";

const ITEMS = [
  { key: "overview", label: "Overview", section: "Workspace", icon: "iconoir:home-simple", count: true },
  { key: "ledger", label: "Ledger", section: "Workspace", icon: "iconoir:list" },
  { key: "transfers", label: "Transfers", section: "Workspace", icon: "iconoir:data-transfer-both" },
  { key: "reports", label: "Reports", section: "Insights", icon: "iconoir:stats-report", plus: true },
  { key: "alerts", label: "Alerts", section: "Insights", icon: "iconoir:bell" },
];

const SECTIONS = ["Workspace", "Insights"];

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  workspace?: string;
  detail?: string;
}

/**
 * Mallow SidebarNav: a rail on the card with a lilac search field, grouped
 * links on a lilac option track, and the current page in a violet tint and
 * ring that slides between links.
 */
function SidebarNav({
  workspace = "Northfield Studio",
  detail = "Team plan, 8 seats",
  className,
  ...props
}: SidebarNavProps) {
  const [active, setActive] = React.useState("overview");
  const [query, setQuery] = React.useState("");
  const [badge, setBadge] = React.useState(3);
  const panelId = React.useId();
  const reduceMotion = useReducedMotion() ?? false;

  const visible = ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={cn(cardSlab, "flex w-72 flex-col gap-3 rounded-3xl p-3", className)} {...props}>
      <button
        type="button"
        className={cn(
          focusRing,
          "flex w-full items-center gap-3 rounded-xl p-1.5 text-left transition-colors duration-fast hover:bg-accent",
        )}
      >
        <span
          className={cn(primaryFinish, "flex size-9 shrink-0 items-center justify-center rounded-md text-sm font-medium")}
        >
          {workspace.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{workspace}</span>
          <span className="block truncate text-xs text-muted-foreground">{detail}</span>
        </span>
        <Icon icon="iconoir:nav-arrow-down" aria-hidden="true" className="size-4 text-muted-foreground" />
      </button>

      <label
        className={cn(
          optionTrack,
          "flex h-10 items-center gap-2 rounded-full ps-3.5 pe-1.5 focus-within:ring-2 focus-within:ring-ring",
        )}
      >
        <Icon icon="iconoir:search" aria-hidden="true" className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages"
          aria-label="Search pages"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex h-6 items-center rounded-full bg-(--tag) px-2 font-mono text-xs text-muted-foreground">
          ⌘K
        </kbd>
      </label>

      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1);
          setActive("overview");
        }}
        className={cn(
          focusRing,
          "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors duration-fast hover:bg-accent",
        )}
      >
        <Icon icon="iconoir:plus-circle" aria-hidden="true" className="size-4.5" />
        <span className="min-w-0 flex-1 truncate text-left">New page</span>
      </button>

      <nav aria-label="Pages" className={cn(optionTrack, "isolate flex flex-col gap-3 rounded-2xl p-1")}>
        {visible.length === 0 && (
          <p className="px-3 py-4 text-sm text-muted-foreground">No page matches that search.</p>
        )}
        {SECTIONS.map((section) => {
          const items = visible.filter((item) => item.section === section);
          if (items.length === 0) return null;
          return (
            <div key={section} className="flex flex-col gap-0.5">
              <div className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">{section}</div>
              {items.map((item) => {
                const isActive = item.key === active;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActive(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      focusRing,
                      "group relative flex min-h-10 w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={`${panelId}-panel`}
                        aria-hidden="true"
                        className={cn(selectedOption, "absolute inset-0 z-0 rounded-xl")}
                        transition={reduceMotion ? { duration: 0 } : panelSpring}
                      />
                    )}
                    <Icon
                      icon={item.icon}
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 size-4.5 shrink-0",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        "relative z-10 min-w-0 flex-1 truncate text-sm transition-colors duration-fast",
                        isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                    {item.count && (
                      <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--tag) px-1.5 text-xs tabular-nums text-muted-foreground">
                        {badge}
                      </span>
                    )}
                    {item.plus && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative z-10 flex size-5 items-center justify-center rounded-full text-muted-foreground transition-opacity duration-fast",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                        )}
                      >
                        <Icon icon="iconoir:plus" className="size-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

interface SidebarNavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

/** Mallow SidebarNavSection: a muted label above a group of links. */
function SidebarNavSection({ label, className, children, ...props }: SidebarNavSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      <span className="px-3 pb-1 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

interface SidebarNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  count?: number;
  active?: boolean;
}

/** Mallow SidebarNavItem: one link row; the current one takes the violet tint and ring. */
function SidebarNavItem({ label, count, active = false, className, ...props }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        focusRing,
        "flex min-h-10 items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm",
        active
          ? cn(selectedOption, "font-medium")
          : "text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-(--tag) px-1.5 text-xs tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
    </button>
  );
}

export { SidebarNav, SidebarNavSection, SidebarNavItem };
