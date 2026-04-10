"use client";

import { useState, useEffect, useMemo, useCallback, type CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { IconBrowser } from "@/components/ui/icon-browser";

import type { DesignConfig, Fragment } from "@/db";
import { ColorPicker } from "@/components/ui/color-picker";
import { MobileTOCPill } from "./mobile-toc-pill";
import { useUpdateFragmentConfig } from "@/hooks/use-update-fragment-config";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ─── Sections ─────────────────────────────────────────────────────────────────

// Maps Iconify library ID → prefix (most IDs equal their prefix; list exceptions here)
const LIBRARY_ID_TO_PREFIX: Record<string, string> = {
  "phosphor": "ph",
  "solar-icons": "solar",
};

function getIconPrefix(libraryId?: string, variant?: string | null): string | null {
  if (!libraryId) return null;
  const prefix = LIBRARY_ID_TO_PREFIX[libraryId] ?? libraryId;
  if (variant && variant !== "default" && variant !== "regular") {
    return `${prefix}-${variant}`;
  }
  return prefix;
}

type SubSection = { id: string; title: string };
type Section = { id: string; title: string; subsections: SubSection[] };

const SECTIONS: Section[] = [
  {
    id: "forms-inputs", title: "Forms & Inputs",
    subsections: [
      { id: "fi-button",   title: "Button"   },
      { id: "fi-input",    title: "Input"    },
      { id: "fi-checkbox", title: "Checkbox" },
      { id: "fi-radio",    title: "Radio"    },
      { id: "fi-select",   title: "Select"   },
      { id: "fi-slider",   title: "Slider"   },
      { id: "fi-switch",   title: "Switch"   },
      { id: "fi-textarea", title: "Textarea" },
    ],
  },
  {
    id: "data-display", title: "Data Display",
    subsections: [
      { id: "dd-avatar",     title: "Avatar"     },
      { id: "dd-badge",      title: "Badge"      },
      { id: "dd-progress",   title: "Progress"   },
      { id: "dd-skeleton",   title: "Skeleton"   },
      { id: "dd-table",      title: "Table"      },
      { id: "dd-typography", title: "Typography" },
    ],
  },
  {
    id: "overlays", title: "Overlays",
    subsections: [
      { id: "ov-dialog",    title: "Dialog"     },
      { id: "ov-dropdown",  title: "Dropdown"   },
      { id: "ov-popover",   title: "Popover"    },
      { id: "ov-sheet",     title: "Sheet"      },
      { id: "ov-hovercard", title: "Hover Card" },
      { id: "ov-tooltip",   title: "Tooltip"    },
    ],
  },
  {
    id: "navigation", title: "Navigation",
    subsections: [
      { id: "nav-tabs",       title: "Tabs"       },
      { id: "nav-breadcrumb", title: "Breadcrumb" },
      { id: "nav-menubar",    title: "Menubar"    },
      { id: "nav-pagination", title: "Pagination" },
    ],
  },
  {
    id: "layout-structure", title: "Layout & Structure",
    subsections: [
      { id: "ls-accordion",   title: "Accordion"   },
      { id: "ls-card",        title: "Card"        },
      { id: "ls-collapsible", title: "Collapsible" },
      { id: "ls-separator",   title: "Separator"   },
    ],
  },
  {
    id: "feedback", title: "Feedback",
    subsections: [
      { id: "fb-alert",       title: "Alert"        },
      { id: "fb-alertdialog", title: "Alert Dialog" },
    ],
  },
];

// ─── Color token helpers ───────────────────────────────────────────────────────

const COLOR_KEY_TO_VAR: Record<string, string> = {
  primary: "--primary", secondary: "--secondary", accent: "--accent",
  muted: "--muted", destructive: "--destructive", background: "--background",
  foreground: "--foreground", card: "--card", cardForeground: "--card-foreground",
  border: "--border", input: "--input", ring: "--ring",
};

function configToVars(config: DesignConfig): Record<string, string> {
  const vars: Record<string, string> = {};
  if (config.colors) {
    for (const [key, cssVar] of Object.entries(COLOR_KEY_TO_VAR)) {
      const value = config.colors[key as keyof typeof config.colors];
      if (value) vars[cssVar] = value;
    }
  }
  if (config.radius) vars["--radius"] = config.radius;
  return vars;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Grid({ children, cols = 1 }: { children: React.ReactNode; cols?: number }) {
  const className = cols === 2
    ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
    : cols === 3
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      : "grid grid-cols-1 gap-3";
  return <div className={className}>{children}</div>;
}

function DemoCard({ name, children, minH = 110, overflow = "hidden", anchorId }: {
  name: string; children: React.ReactNode; minH?: number; overflow?: string; anchorId?: string;
}) {
  return (
    <div id={anchorId} style={{ borderRadius: "8px", border: "1px solid var(--border)", overflow, fontSize: "13px", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: "center", flex: 1, minHeight: `${minH}px`, backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        {children}
      </div>
      <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted-foreground)", padding: "5px 10px 7px", borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
        {name}
      </div>
    </div>
  );
}

function SectionHeader({ title, isFirst }: { title: string; isFirst?: boolean }) {
  return (
    <div style={{
      fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
      color: "var(--muted-foreground)", marginBottom: "20px",
      marginTop: isFirst ? "28px" : "64px",
      paddingTop: isFirst ? "0" : "48px",
      borderTop: isFirst ? "none" : "1px solid var(--border)",
    }}>
      {title}
    </div>
  );
}

const COLOR_TOKENS = [
  { variable: "--background", label: "Background" },
  { variable: "--foreground", label: "Foreground"  },
  { variable: "--primary",    label: "Primary"     },
  { variable: "--secondary",  label: "Secondary"   },
  { variable: "--muted",      label: "Muted"       },
  { variable: "--accent",     label: "Accent"      },
  { variable: "--card",       label: "Card"        },
  { variable: "--border",     label: "Border"      },
  { variable: "--destructive",label: "Destructive" },
];

const COLOR_VAR_TO_KEY: Record<string, keyof NonNullable<DesignConfig["colors"]>> = {
  "--primary":     "primary",
  "--secondary":   "secondary",
  "--muted":       "muted",
  "--accent":      "accent",
  "--card":        "card",
  "--border":      "border",
  "--destructive": "destructive",
};

interface ColorTokensSidebarProps {
  fragment?: Fragment | null;
  cssVariables?: Record<string, string>;
  onConfigChange?: (config: DesignConfig) => void;
}

function ColorTokensSidebar({ fragment, cssVariables, onConfigChange }: ColorTokensSidebarProps) {
  const updateConfigMutation = useUpdateFragmentConfig();

  const handleColorChange = useCallback((variable: string, value: string) => {
    const colorKey = COLOR_VAR_TO_KEY[variable];
    if (!colorKey || !fragment || !onConfigChange) return;

    const newConfig: DesignConfig = {
      ...(fragment.config ?? {}),
      colors: { ...(fragment.config?.colors ?? {}), [colorKey]: value },
    };
    onConfigChange(newConfig);
    updateConfigMutation.mutate({ fragmentId: fragment.id, config: newConfig });
  }, [fragment, onConfigChange, updateConfigMutation]);

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "8px", backgroundColor: "var(--card)", overflow: "clip" }}>
      <div style={{
        padding: "10px 12px", borderBottom: "1px solid var(--border)",
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase" as const, color: "var(--muted-foreground)", opacity: 0.6,
      }}>
        Color Tokens
      </div>
      <div style={{ padding: "8px 6px" }}>
        {COLOR_TOKENS.map(({ variable, label }) => {
          const colorKey = COLOR_VAR_TO_KEY[variable];
          const currentValue = (colorKey && cssVariables?.[variable]) ?? `var(${variable})`;
          const canEdit = Boolean(fragment && onConfigChange && colorKey);

          if (canEdit) {
            return (
              <Popover key={variable}>
                <PopoverTrigger asChild>
                  <button
                    style={{
                      display: "flex", alignItems: "center", gap: "8px", width: "100%",
                      textAlign: "left" as const, padding: "5px 6px", borderRadius: "5px",
                      border: "none", cursor: "pointer", background: "transparent", transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    title={`Edit ${label}`}
                  >
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                      backgroundColor: `var(${variable})`, border: "1px solid var(--border)",
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "11px", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</p>
                      <p style={{ fontSize: "9px", color: "var(--muted-foreground)", fontFamily: "monospace" }}>{variable}</p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="end">
                  <ColorPicker
                    label={label}
                    value={currentValue.startsWith("var(") ? "oklch(0.5 0.1 265)" : currentValue}
                    onChange={(v) => handleColorChange(variable, v)}
                  />
                </PopoverContent>
              </Popover>
            );
          }

          return (
            <div
              key={variable}
              style={{
                display: "flex", alignItems: "center", gap: "8px", width: "100%",
                padding: "5px 6px", borderRadius: "5px",
              }}
            >
              <div style={{
                width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                backgroundColor: `var(${variable})`, border: "1px solid var(--border)",
              }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "11px", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</p>
                <p style={{ fontSize: "9px", color: "var(--muted-foreground)", fontFamily: "monospace" }}>{variable}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  cssVariables: Record<string, string>;
  config?: DesignConfig | null;
  fragment?: Fragment | null;
  onConfigChange?: (config: DesignConfig) => void;
}

export function ComponentShowcase({ cssVariables, config, fragment, onConfigChange }: Props) {
  const iconPrefix = getIconPrefix(config?.icons?.libraryId, config?.icons?.variant);
  const iconographySection: Section | null = iconPrefix ? {
    id: "iconography",
    title: "Iconography",
    subsections: [
      { id: "ic-grid",  title: "Common Icons" },
      { id: "ic-sizes", title: "Sizes"        },
      { id: "ic-usage", title: "Usage"        },
    ],
  } : null;
  const allSections = iconographySection ? [iconographySection, ...SECTIONS] : SECTIONS;

  const [sliderVal, setSliderVal] = useState([60]);
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set([allSections[0].id]));

  const merged = useMemo(() => {
    const all = { ...cssVariables, ...(config ? configToVars(config) : {}) };

    // Only inject brand-defining vars so the app's dark/light mode controls
    // neutral vars (background, card, muted, etc.). This prevents a light-only
    // generated CSS from forcing white background in dark mode.
    const BRAND_VARS = new Set([
      "--primary", "--primary-foreground",
      "--secondary", "--secondary-foreground",
      "--accent", "--accent-foreground",
      "--destructive", "--destructive-foreground",
      "--ring",
    ]);
    const base: Record<string, string> = {};
    for (const [k, v] of Object.entries(all)) {
      if (BRAND_VARS.has(k)) base[k] = v;
    }

    // Override gradient button vars with generated primary so button color is correct
    const primary = base["--primary"];
    if (primary) {
      base["--primary-gradient-start"] = primary;
      base["--primary-gradient-mid"] = primary;
      base["--primary-gradient-end"] = primary;
      base["--primary-gradient-hover-mid"] = primary;
    }

    return base;
  }, [cssVariables, config]);
  const styleVars = useMemo(
    () => Object.entries(merged).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as CSSProperties),
    [merged],
  );

  // Inject CSS vars into document.body so Radix portals (Dialog, Sheet, Dropdown) inherit the generated theme
  useEffect(() => {
    if (Object.keys(merged).length === 0) return;
    const prev: Record<string, string> = {};
    for (const [k, v] of Object.entries(merged)) {
      prev[k] = document.body.style.getPropertyValue(k);
      document.body.style.setProperty(k, v);
    }
    return () => {
      for (const k of Object.keys(merged)) {
        const old = prev[k];
        if (old) document.body.style.setProperty(k, old);
        else document.body.style.removeProperty(k);
      }
    };
  }, [merged]);

  // Track visible sections via scroll within this container
  useEffect(() => {
    const container = document.getElementById("showcase-scroll");
    if (!container) return;

    const onScroll = () => {
      const NAV_HEIGHT = 120;
      const containerRect = container.getBoundingClientRect();

      // Find the last section whose top has crossed NAV_HEIGHT
      let activeSection = allSections[0].id;
      for (const { id: sId } of allSections) {
        const el = container.querySelector<HTMLElement>(`#showcase-${sId}`);
        if (!el) continue;
        const relTop = el.getBoundingClientRect().top - containerRect.top;
        if (relTop <= NAV_HEIGHT) activeSection = sId;
      }

      setActiveSections(new Set([activeSection]));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const container = document.getElementById("showcase-scroll");
    const el = container?.querySelector<HTMLElement>(`#showcase-${sectionId}`);
    if (!container || !el) return;
    const top = el.offsetTop - 90;
    container.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        style={{ ...styleVars, backgroundColor: "var(--background)", color: "var(--foreground)" }}
        className="h-full overflow-hidden flex flex-col"
      >
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexShrink: 0 }} className="px-4 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-8">
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2, margin: 0 }}>Component Showcase</h1>
            <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>Every component, live and interactive. Click, type, and explore.</p>
          </div>
        </div>

        {/* 3-column layout */}
        <div className="flex items-start flex-1 min-h-0">

          {/* Left TOC sidebar */}
          <aside className="hidden lg:block" style={{
            width: "200px", flexShrink: 0, position: "sticky", top: "0px",
            alignSelf: "flex-start", maxHeight: "100%", overflowY: "auto", padding: "16px",
          }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: "8px", backgroundColor: "var(--card)", overflow: "clip" }}>
              <div style={{
                padding: "10px 12px", borderBottom: "1px solid var(--border)",
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase" as const, color: "var(--muted-foreground)", opacity: 0.6,
              }}>
                Sections
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1px", padding: "6px 6px 8px" }}>
                {allSections.map(({ id: sId, title }) => {
                  const isActive = activeSections.has(sId);
                  return (
                    <button
                      key={sId}
                      onClick={() => scrollToSection(sId)}
                      style={{
                        display: "flex", alignItems: "center", gap: "8px", width: "100%",
                        textAlign: "left" as const, padding: "5px 8px", fontSize: "12px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                        backgroundColor: isActive ? "var(--muted)" : "transparent",
                        borderRadius: "5px", border: "none", cursor: "pointer",
                        transition: "all 0.15s ease", lineHeight: 1.4,
                      }}
                    >
                      <span style={{
                        width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                        backgroundColor: isActive ? "var(--primary)" : "var(--border)",
                        transition: "background-color 0.15s",
                      }} />
                      {title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main scrollable content */}
          <div id="showcase-scroll" className="px-4 sm:px-7 flex-1 min-w-0 overflow-y-auto h-full">

            {/* Iconography */}
            {iconPrefix && (
              <div id="showcase-iconography">
                <SectionHeader title="Iconography" isFirst />
                <IconBrowser prefix={iconPrefix} libraryName={config?.icons?.libraryId} />
              </div>
            )}

            {/* Forms & Inputs */}
            <div id="showcase-forms-inputs">
              <SectionHeader title="Forms & Inputs" isFirst={!iconPrefix} />
              <Grid cols={3}>
                <DemoCard name="Button" anchorId="showcase-fi-button" minH={100}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </DemoCard>

                <DemoCard name="Button Sizes" minH={80}>
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <Button size="sm">Small</Button>
                    <Button>Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </DemoCard>

                <DemoCard name="Button with Icons" minH={80}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button className="gap-2"><Icon icon="tabler:download" width={14} />Download</Button>
                    <Button variant="outline" className="gap-2">Settings <Icon icon="tabler:chevron-right" width={14} /></Button>
                    <Button variant="secondary" size="icon"><Icon icon="tabler:plus" width={16} /></Button>
                  </div>
                </DemoCard>

                <DemoCard name="Button States" minH={80}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button disabled className="gap-2"><Icon icon="tabler:loader-2" width={14} className="animate-spin" />Loading...</Button>
                    <Button disabled variant="outline">Disabled</Button>
                    <Button variant="secondary" className="gap-1.5"><Icon icon="tabler:check" width={14} />Saved</Button>
                  </div>
                </DemoCard>

                <DemoCard name="Input" anchorId="showcase-fi-input" minH={100}>
                  <div className="w-full space-y-2">
                    <Input placeholder="Default input..." />
                    <Input defaultValue="Filled value" />
                    <Input placeholder="Disabled..." disabled />
                  </div>
                </DemoCard>

                <DemoCard name="Input with Icons" minH={100}>
                  <div className="w-full space-y-2">
                    <div className="relative">
                      <Icon icon="tabler:search" width={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <Input placeholder="Search..." className="pl-8" />
                    </div>
                    <div className="relative">
                      <Icon icon="tabler:mail" width={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <Input placeholder="Email address" className="pl-8" type="email" />
                    </div>
                  </div>
                </DemoCard>

                <DemoCard name="Checkbox" anchorId="showcase-fi-checkbox" minH={100}>
                  <div className="space-y-3">
                    {[
                      { id: "terms", label: "Accept terms",  defaultChecked: true  },
                      { id: "email", label: "Email updates", defaultChecked: false },
                      { id: "news",  label: "Newsletter",    defaultChecked: true  },
                    ].map(({ id: cid, label, defaultChecked }) => (
                      <div key={cid} className="flex items-center gap-2">
                        <Checkbox id={cid} defaultChecked={defaultChecked} />
                        <Label htmlFor={cid}>{label}</Label>
                      </div>
                    ))}
                  </div>
                </DemoCard>

                <DemoCard name="Checkbox Cards" minH={100}>
                  <div className="w-full space-y-2">
                    {[
                      { id: "cc-push",  label: "Push Notifications", desc: "Alerts & updates" },
                      { id: "cc-email", label: "Email Digest",        desc: "Weekly summary"  },
                    ].map(({ id: cid, label, desc }) => (
                      <label key={cid} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 cursor-pointer has-[[data-state=checked]]:border-primary transition-colors">
                        <Checkbox id={cid} defaultChecked={cid === "cc-push"} />
                        <div>
                          <div className="text-xs font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </DemoCard>

                <DemoCard name="Radio Group" anchorId="showcase-fi-radio" minH={100}>
                  <RadioGroup defaultValue="default" className="space-y-2">
                    {["Default", "Comfortable", "Compact"].map((val) => (
                      <div key={val} className="flex items-center gap-2">
                        <RadioGroupItem value={val.toLowerCase()} id={`radio-${val}`} />
                        <Label htmlFor={`radio-${val}`}>{val}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </DemoCard>

                <DemoCard name="Radio Cards" minH={100}>
                  <RadioGroup defaultValue="card" className="w-full space-y-2">
                    {[
                      { value: "card",   label: "Credit Card", desc: "Visa, Mastercard" },
                      { value: "paypal", label: "PayPal",      desc: "Secure payment"  },
                    ].map(({ value, label, desc }) => (
                      <label key={value} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 cursor-pointer has-[[data-state=checked]]:border-primary transition-colors">
                        <RadioGroupItem value={value} />
                        <div>
                          <div className="text-xs font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </DemoCard>

                <DemoCard name="Select" anchorId="showcase-fi-select" minH={90} overflow="visible">
                  <Select defaultValue="light">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </DemoCard>

                <DemoCard name="Slider" anchorId="showcase-fi-slider" minH={90}>
                  <div className="w-full space-y-3">
                    <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span className="font-medium text-foreground">{sliderVal[0]}</span>
                      <span>100</span>
                    </div>
                  </div>
                </DemoCard>

                <DemoCard name="Switch" anchorId="showcase-fi-switch" minH={100}>
                  <div className="space-y-3">
                    {[
                      { id: "sw1", label: "Airplane Mode", defaultChecked: true  },
                      { id: "sw2", label: "Wi-Fi",         defaultChecked: false },
                      { id: "sw3", label: "Bluetooth",     defaultChecked: true  },
                    ].map(({ id: sid, label, defaultChecked }) => (
                      <div key={sid} className="flex items-center gap-2">
                        <Switch id={sid} defaultChecked={defaultChecked} />
                        <Label htmlFor={sid}>{label}</Label>
                      </div>
                    ))}
                  </div>
                </DemoCard>

                <DemoCard name="Textarea" anchorId="showcase-fi-textarea" minH={90}>
                  <textarea
                    placeholder="Type your message here..."
                    className="w-full min-h-[70px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  />
                </DemoCard>
              </Grid>
            </div>

            {/* Data Display */}
            <div id="showcase-data-display">
              <SectionHeader title="Data Display" />
              <Grid cols={3}>
                <DemoCard name="Avatar" anchorId="showcase-dd-avatar" minH={80}>
                  <div className="flex items-center gap-3">
                    {["AJ", "BM", "CW", "DK"].map((initials) => (
                      <Avatar key={initials}>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </DemoCard>

                <DemoCard name="Avatar Sizes" minH={80}>
                  <div className="flex items-end gap-3">
                    <Avatar className="size-6 text-[10px]"><AvatarFallback>SM</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
                    <Avatar className="size-12 text-base"><AvatarFallback>LG</AvatarFallback></Avatar>
                  </div>
                </DemoCard>

                <DemoCard name="Badge" anchorId="showcase-dd-badge" minH={80}>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </DemoCard>

                <DemoCard name="Progress" anchorId="showcase-dd-progress" minH={90}>
                  <div className="w-full space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Upload</span><span>72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Storage</span><span>40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                  </div>
                </DemoCard>

                <DemoCard name="Skeleton" anchorId="showcase-dd-skeleton" minH={100}>
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-10 rounded-full shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full rounded-lg" />
                  </div>
                </DemoCard>

                <DemoCard name="Typography" anchorId="showcase-dd-typography" minH={130}>
                  <div className="w-full space-y-2">
                    <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>The quick brown fox</p>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)" }}>Jumps over the lazy dog</p>
                    <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>Body text — How vexingly quick daft zebras jump!</p>
                    <code style={{ fontSize: "11px", fontFamily: "monospace", backgroundColor: "var(--muted)", padding: "2px 6px", borderRadius: "4px", color: "var(--foreground)" }}>{"const greeting = \"Hello\""}</code>
                  </div>
                </DemoCard>

                <DemoCard name="Table" anchorId="showcase-dd-table" minH={150}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { name: "Alice Johnson", role: "Designer", status: "Active"   },
                        { name: "Bob Martinez",  role: "Engineer", status: "Active"   },
                        { name: "Carol White",   role: "Product",  status: "Pending"  },
                        { name: "David Kim",     role: "Engineer", status: "Inactive" },
                      ].map(({ name, role, status }) => (
                        <TableRow key={name}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell>{role}</TableCell>
                          <TableCell>
                            <Badge variant={status === "Active" ? "default" : status === "Pending" ? "secondary" : "outline"}>
                              {status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DemoCard>
              </Grid>
            </div>

            {/* Overlays */}
            <div id="showcase-overlays">
              <SectionHeader title="Overlays" />
              <Grid cols={3}>
                <DemoCard name="Dialog" anchorId="showcase-ov-dialog" minH={80} overflow="visible">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone. This will permanently delete your account.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Continue</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DemoCard>

                <DemoCard name="Dropdown Menu" anchorId="showcase-ov-dropdown" minH={80} overflow="visible">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu <Icon icon="tabler:chevron-down" width={14} className="ml-1.5" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><Icon icon="tabler:user" width={14} className="mr-2" />Profile</DropdownMenuItem>
                      <DropdownMenuItem><Icon icon="tabler:settings" width={14} className="mr-2" />Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><Icon icon="tabler:logout" width={14} className="mr-2" />Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DemoCard>

                <DemoCard name="Popover" anchorId="showcase-ov-popover" minH={80} overflow="visible">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Dimensions</h4>
                        <p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-2">
                            <Label className="text-xs">Width</Label>
                            <Input className="col-span-2 h-7" defaultValue="100%" />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-2">
                            <Label className="text-xs">Height</Label>
                            <Input className="col-span-2 h-7" defaultValue="25px" />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </DemoCard>

                <DemoCard name="Sheet" anchorId="showcase-ov-sheet" minH={80} overflow="visible">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>Make changes to your profile here. Click save when done.</SheetDescription>
                      </SheetHeader>
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input defaultValue="Alice Johnson" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input defaultValue="alice@example.com" />
                        </div>
                        <Button className="w-full">Save changes</Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </DemoCard>

                <DemoCard name="Hover Card" anchorId="showcase-ov-hovercard" minH={80} overflow="visible">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@nextjs</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>NX</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@nextjs</h4>
                          <p className="text-xs text-muted-foreground">The React Framework — created and maintained by Vercel.</p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </DemoCard>

                <DemoCard name="Tooltip" anchorId="showcase-ov-tooltip" minH={80} overflow="visible">
                  <div className="flex gap-2">
                    {["Add", "Edit", "Delete", "Share"].map((label) => (
                      <Tooltip key={label}>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Icon icon={label === "Add" ? "tabler:plus" : label === "Edit" ? "tabler:pencil" : label === "Delete" ? "tabler:trash" : "tabler:share"} width={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>{label}</p></TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </DemoCard>
              </Grid>
            </div>

            {/* Navigation */}
            <div id="showcase-navigation">
              <SectionHeader title="Navigation" />
              <Grid cols={2}>
                <DemoCard name="Tabs" anchorId="showcase-nav-tabs" minH={130}>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                      <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
                      <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                      <p className="text-xs text-muted-foreground p-3">Manage your account settings and preferences.</p>
                    </TabsContent>
                    <TabsContent value="password">
                      <p className="text-xs text-muted-foreground p-3">Change your password and security settings.</p>
                    </TabsContent>
                  </Tabs>
                </DemoCard>

                <DemoCard name="Breadcrumb" anchorId="showcase-nav-breadcrumb" minH={80}>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </DemoCard>

                <DemoCard name="Menubar" anchorId="showcase-nav-menubar" minH={80} overflow="visible">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>New Tab</MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Zoom In</MenubarItem>
                        <MenubarItem>Zoom Out</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </DemoCard>

                <DemoCard name="Pagination" anchorId="showcase-nav-pagination" minH={80}>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                      <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </DemoCard>
              </Grid>
            </div>

            {/* Layout & Structure */}
            <div id="showcase-layout-structure">
              <SectionHeader title="Layout & Structure" />
              <Grid cols={2}>
                <DemoCard name="Accordion" anchorId="showcase-ls-accordion" minH={160}>
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      { q: "Is it accessible?", a: "Yes. It adheres to the WAI-ARIA design pattern." },
                      { q: "Is it styled?",      a: "Yes. It comes with default styles that matches the other components." },
                      { q: "Is it animated?",    a: "Yes. It's animated by default, but you can disable it." },
                    ].map(({ q, a }) => (
                      <AccordionItem key={q} value={q}>
                        <AccordionTrigger className="text-sm">{q}</AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">{a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </DemoCard>

                <DemoCard name="Card" anchorId="showcase-ls-card" minH={160}>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-sm">Notifications</CardTitle>
                      <CardDescription className="text-xs">You have 3 unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {["Push Notifications", "Email Updates", "SMS Alerts"].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-xs text-foreground">{item}</span>
                          <Switch defaultChecked={item !== "SMS Alerts"} />
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" size="sm">Save changes</Button>
                    </CardFooter>
                  </Card>
                </DemoCard>

                <DemoCard name="Collapsible" anchorId="showcase-ls-collapsible" minH={120}>
                  <Collapsible className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Starred repositories</span>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm"><Icon icon="tabler:chevron-down" width={14} /></Button>
                      </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border border-border px-3 py-2 text-xs font-mono text-foreground">@radix-ui/primitives</div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border border-border px-3 py-2 text-xs font-mono text-foreground">@radix-ui/colors</div>
                      <div className="rounded-md border border-border px-3 py-2 text-xs font-mono text-foreground">@stitches/react</div>
                    </CollapsibleContent>
                  </Collapsible>
                </DemoCard>

                <DemoCard name="Separator" anchorId="showcase-ls-separator" minH={100}>
                  <div className="w-full space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground">Radix Primitives</h4>
                      <p className="text-xs text-muted-foreground">An open-source UI component library.</p>
                    </div>
                    <Separator />
                    <div className="flex h-4 items-center gap-3 text-xs text-muted-foreground">
                      <span>Blog</span>
                      <Separator orientation="vertical" />
                      <span>Docs</span>
                      <Separator orientation="vertical" />
                      <span>Source</span>
                    </div>
                  </div>
                </DemoCard>
              </Grid>
            </div>

            {/* Feedback */}
            <div id="showcase-feedback" style={{ paddingBottom: "80px" }}>
              <SectionHeader title="Feedback" />
              <Grid cols={2}>
                <DemoCard name="Alert" anchorId="showcase-fb-alert" minH={100}>
                  <div className="w-full space-y-3">
                    <Alert>
                      <Icon icon="tabler:info-circle" width={16} />
                      <AlertTitle>Info</AlertTitle>
                      <AlertDescription className="text-xs">Your session will expire in 30 minutes.</AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <Icon icon="tabler:alert-circle" width={16} />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription className="text-xs">Your password has expired. Please update it.</AlertDescription>
                    </Alert>
                  </div>
                </DemoCard>

                <DemoCard name="Alert Dialog" anchorId="showcase-fb-alertdialog" minH={80} overflow="visible">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DemoCard>
              </Grid>
            </div>

          </div>

          {/* Right color tokens sidebar */}
          <aside className="hidden lg:block" style={{
            width: "200px", flexShrink: 0, padding: "16px",
            position: "sticky", top: "0px", alignSelf: "flex-start", maxHeight: "100%", overflowY: "auto",
          }}>
            <ColorTokensSidebar fragment={fragment} cssVariables={merged} onConfigChange={onConfigChange} />
          </aside>

        </div>

        {/* Mobile bottom pill TOC */}
        <MobileTOCPill sections={allSections} activeSections={activeSections} scrollToSection={scrollToSection} />
      </div>
    </TooltipProvider>
  );
}
