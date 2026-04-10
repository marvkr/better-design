/**
 * Complete catalog of shadcn/ui components
 * Based on docs/shadcn-components.md
 *
 * This catalog guides the AI to:
 * 1. Generate ALL required components
 * 2. Use consistent prop names
 * 3. Organize files properly
 */

export interface ComponentDefinition {
  category: string;
  props: string[];
  description: string;
}

export const shadcnCatalog: Record<string, ComponentDefinition> = {
  // Layout & Structure
  Accordion: {
    category: "layout",
    props: ["type", "collapsible", "items"],
    description: "Collapsible content sections with expand/collapse"
  },
  AspectRatio: {
    category: "layout",
    props: ["ratio", "children"],
    description: "Maintains aspect ratio for media content"
  },
  Card: {
    category: "layout",
    props: ["title", "description", "footer", "children"],
    description: "Container with header, content, and optional footer"
  },
  Collapsible: {
    category: "layout",
    props: ["open", "onOpenChange", "trigger", "content"],
    description: "Expandable/collapsible content section"
  },
  Resizable: {
    category: "layout",
    props: ["direction", "panels", "handles"],
    description: "Resizable panel layout with draggable handles"
  },
  ScrollArea: {
    category: "layout",
    props: ["children", "className"],
    description: "Styled scrollable area"
  },
  Separator: {
    category: "layout",
    props: ["orientation", "decorative"],
    description: "Visual divider between sections"
  },
  Sidebar: {
    category: "layout",
    props: ["side", "children", "collapsible"],
    description: "Collapsible sidebar navigation"
  },

  // Navigation
  Breadcrumb: {
    category: "navigation",
    props: ["items", "separator"],
    description: "Navigation breadcrumb trail"
  },
  Menubar: {
    category: "navigation",
    props: ["items"],
    description: "Horizontal menu bar with dropdowns"
  },
  NavigationMenu: {
    category: "navigation",
    props: ["items", "orientation"],
    description: "Accessible navigation menu"
  },
  Pagination: {
    category: "navigation",
    props: ["currentPage", "totalPages", "onPageChange"],
    description: "Page navigation controls"
  },
  Tabs: {
    category: "navigation",
    props: ["defaultValue", "items", "onValueChange"],
    description: "Tabbed content navigation"
  },

  // Forms & Inputs
  Button: {
    category: "forms",
    props: ["variant", "size", "disabled", "children"],
    description: "Clickable button with variants"
  },
  ButtonGroup: {
    category: "forms",
    props: ["variant", "size", "children"],
    description: "Group of related buttons"
  },
  Calendar: {
    category: "forms",
    props: ["mode", "selected", "onSelect"],
    description: "Interactive calendar picker"
  },
  Checkbox: {
    category: "forms",
    props: ["checked", "onCheckedChange", "label"],
    description: "Toggle checkbox input"
  },
  Combobox: {
    category: "forms",
    props: ["options", "value", "onValueChange", "searchable"],
    description: "Searchable select dropdown"
  },
  DatePicker: {
    category: "forms",
    props: ["value", "onChange", "placeholder"],
    description: "Date selection input with calendar"
  },
  Field: {
    category: "forms",
    props: ["label", "error", "hint", "children"],
    description: "Form field wrapper with label and error"
  },
  Form: {
    category: "forms",
    props: ["onSubmit", "schema", "children"],
    description: "Form container with validation"
  },
  Input: {
    category: "forms",
    props: ["type", "placeholder", "value", "onChange"],
    description: "Text input field"
  },
  InputGroup: {
    category: "forms",
    props: ["prefix", "suffix", "children"],
    description: "Input with prefix/suffix elements"
  },
  InputOTP: {
    category: "forms",
    props: ["length", "value", "onChange"],
    description: "One-time password input"
  },
  Label: {
    category: "forms",
    props: ["htmlFor", "children"],
    description: "Form label for inputs"
  },
  NativeSelect: {
    category: "forms",
    props: ["options", "value", "onChange"],
    description: "Native HTML select dropdown"
  },
  RadioGroup: {
    category: "forms",
    props: ["options", "value", "onValueChange"],
    description: "Group of radio button options"
  },
  Select: {
    category: "forms",
    props: ["options", "value", "onValueChange", "placeholder"],
    description: "Custom styled select dropdown"
  },
  Slider: {
    category: "forms",
    props: ["min", "max", "step", "value", "onValueChange"],
    description: "Range slider input"
  },
  Switch: {
    category: "forms",
    props: ["checked", "onCheckedChange"],
    description: "Toggle switch input"
  },
  Textarea: {
    category: "forms",
    props: ["placeholder", "value", "onChange", "rows"],
    description: "Multi-line text input"
  },

  // Data Display
  Avatar: {
    category: "data-display",
    props: ["src", "alt", "fallback"],
    description: "User avatar with fallback"
  },
  Badge: {
    category: "data-display",
    props: ["variant", "children"],
    description: "Small status badge"
  },
  Carousel: {
    category: "data-display",
    props: ["items", "autoplay", "interval"],
    description: "Image/content carousel slider"
  },
  Chart: {
    category: "data-display",
    props: ["type", "data", "config"],
    description: "Data visualization chart"
  },
  DataTable: {
    category: "data-display",
    props: ["columns", "data", "pagination"],
    description: "Feature-rich data table"
  },
  Empty: {
    category: "data-display",
    props: ["title", "description", "action"],
    description: "Empty state placeholder"
  },
  Item: {
    category: "data-display",
    props: ["title", "description", "icon", "children"],
    description: "List item with icon and text"
  },
  Kbd: {
    category: "data-display",
    props: ["children"],
    description: "Keyboard shortcut display"
  },
  Progress: {
    category: "data-display",
    props: ["value", "max"],
    description: "Progress indicator bar"
  },
  Skeleton: {
    category: "data-display",
    props: ["className"],
    description: "Loading skeleton placeholder"
  },
  Spinner: {
    category: "data-display",
    props: ["size"],
    description: "Loading spinner indicator"
  },
  Table: {
    category: "data-display",
    props: ["headers", "rows"],
    description: "Basic HTML table"
  },
  Typography: {
    category: "data-display",
    props: ["variant", "children"],
    description: "Text with typography variants"
  },

  // Feedback
  Alert: {
    category: "feedback",
    props: ["variant", "title", "description"],
    description: "Alert message banner"
  },
  AlertDialog: {
    category: "feedback",
    props: ["open", "onOpenChange", "title", "description", "actions"],
    description: "Confirmation dialog modal"
  },
  Sonner: {
    category: "feedback",
    props: ["message", "variant", "duration"],
    description: "Toast notification (Sonner)"
  },
  Toast: {
    category: "feedback",
    props: ["title", "description", "variant", "duration"],
    description: "Toast notification"
  },

  // Overlays
  Dialog: {
    category: "overlays",
    props: ["open", "onOpenChange", "title", "description", "children"],
    description: "Modal dialog overlay"
  },
  Drawer: {
    category: "overlays",
    props: ["open", "onOpenChange", "side", "children"],
    description: "Slide-out drawer panel"
  },
  HoverCard: {
    category: "overlays",
    props: ["trigger", "content", "openDelay"],
    description: "Hover-triggered content card"
  },
  Popover: {
    category: "overlays",
    props: ["trigger", "content", "open", "onOpenChange"],
    description: "Popover content overlay"
  },
  Sheet: {
    category: "overlays",
    props: ["open", "onOpenChange", "side", "children"],
    description: "Modal sheet overlay"
  },
  Tooltip: {
    category: "overlays",
    props: ["content", "children", "delayDuration"],
    description: "Hover tooltip"
  },

  // Menus
  Command: {
    category: "menus",
    props: ["items", "onSelect", "search"],
    description: "Command palette menu"
  },
  ContextMenu: {
    category: "menus",
    props: ["trigger", "items"],
    description: "Right-click context menu"
  },
  DropdownMenu: {
    category: "menus",
    props: ["trigger", "items"],
    description: "Dropdown menu"
  },

  // Toggle
  Toggle: {
    category: "toggle",
    props: ["pressed", "onPressedChange", "children"],
    description: "Toggle button"
  },
  ToggleGroup: {
    category: "toggle",
    props: ["type", "value", "onValueChange", "items"],
    description: "Group of toggle buttons"
  },
};

/**
 * Custom component templates for domain-specific use cases
 * These combine/remix shadcn components
 */
export const customComponentTemplates = {
  Voice: {
    description: "Voice animation component with multiple states",
    combines: ["Card", "Animation"],
    useCase: "Voice assistants, audio UI, call interfaces",
    props: ["state", "showWaveform"],
  },
  BentoGrid: {
    description: "Bento-style grid layout for feature showcases",
    combines: ["Grid", "Card"],
    useCase: "Landing pages, feature showcases, product tours",
    props: ["items", "columns", "gap"],
  },
  BentoCard: {
    description: "Individual bento-style feature card",
    combines: ["Card", "Icon", "Badge"],
    useCase: "Feature highlights, product cards",
    props: ["title", "description", "graphic", "badge"],
  },
  ArticleCallout: {
    description: "Highlighted article section with icon",
    combines: ["Alert", "Icon", "Button"],
    useCase: "Blog posts, documentation, articles",
    props: ["type", "title", "message", "action"],
  },
  ArticleHeader: {
    description: "Article header with metadata",
    combines: ["Typography", "Avatar", "Badge"],
    useCase: "Blog posts, news articles",
    props: ["title", "author", "date", "tags"],
  },
  AuthorBio: {
    description: "Author biography card",
    combines: ["Avatar", "Card", "Button"],
    useCase: "Blog posts, team pages",
    props: ["name", "bio", "avatar", "social"],
  },
  BackLink: {
    description: "Back navigation link",
    combines: ["Button", "Icon"],
    useCase: "Detail pages, navigation",
    props: ["href", "label"],
  },
  ClientCarousel: {
    description: "Client/partner logo carousel",
    combines: ["Carousel", "Avatar"],
    useCase: "Landing pages, about pages",
    props: ["clients", "autoplay"],
  },
  ClientLogo: {
    description: "Client/partner logo display",
    combines: ["Avatar", "Tooltip"],
    useCase: "Partner showcases, client lists",
    props: ["name", "logo", "url"],
  },
  CodeBlock: {
    description: "Syntax-highlighted code block",
    combines: ["Card", "ScrollArea"],
    useCase: "Documentation, tutorials",
    props: ["code", "language", "showLineNumbers"],
  },
  ContributionChart: {
    description: "GitHub-style contribution heatmap",
    combines: ["Chart", "Tooltip"],
    useCase: "Dashboards, analytics, activity tracking",
    props: ["data", "theme"],
  },
  Diagram: {
    description: "Flow diagram or chart visualization",
    combines: ["Card", "SVG"],
    useCase: "Documentation, architecture diagrams",
    props: ["nodes", "edges", "direction"],
  },
  FAQ: {
    description: "Frequently asked questions accordion",
    combines: ["Accordion"],
    useCase: "Support pages, documentation",
    props: ["items"],
  },
  MetricCard: {
    description: "Dashboard metric display card",
    combines: ["Card", "Typography", "Icon"],
    useCase: "Dashboards, analytics",
    props: ["label", "value", "change", "icon"],
  },
  Callout: {
    description: "Highlighted callout box",
    combines: ["Alert", "Icon"],
    useCase: "Documentation, articles",
    props: ["type", "title", "children"],
  },
};

/**
 * Get all component names (shadcn + custom templates)
 */
export function getAllComponentNames(): string[] {
  return [
    ...Object.keys(shadcnCatalog),
    ...Object.keys(customComponentTemplates),
  ];
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): string[] {
  return Object.entries(shadcnCatalog)
    .filter(([_, def]) => def.category === category)
    .map(([name]) => name);
}

/**
 * Get all categories
 */
export function getCategories(): string[] {
  const categories = new Set(
    Object.values(shadcnCatalog).map(def => def.category)
  );
  return Array.from(categories);
}
