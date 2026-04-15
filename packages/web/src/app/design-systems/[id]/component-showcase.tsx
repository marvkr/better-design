"use client"

import { useState, useEffect, useRef } from "react"
import type { CSSProperties, ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Icon } from "@iconify/react"
import { IconBrowser } from "@/components/ui/icon-browser"

// ─── Color tokens shown in the right sidebar ───
const COLOR_TOKEN_KEYS = [
  "--background", "--foreground", "--card", "--primary",
  "--primary-foreground", "--secondary", "--secondary-foreground",
  "--muted", "--muted-foreground", "--border", "--input", "--ring", "--destructive",
] as const

const COLOR_TOKEN_LABELS: Record<string, string> = {
  "--background": "Background", "--foreground": "Foreground", "--card": "Card",
  "--primary": "Primary", "--primary-foreground": "Primary FG",
  "--secondary": "Secondary", "--secondary-foreground": "Secondary FG",
  "--muted": "Muted", "--muted-foreground": "Muted FG",
  "--border": "Border", "--input": "Input", "--ring": "Ring", "--destructive": "Destructive",
}

function cssColorToHex(cssValue: string): string {
  if (typeof window === "undefined") return "#808080"
  const el = document.createElement("div")
  el.style.cssText = "position:absolute;opacity:0;pointer-events:none;top:-9999px"
  el.style.backgroundColor = cssValue
  document.body.appendChild(el)
  const rgb = getComputedStyle(el).backgroundColor
  document.body.removeChild(el)
  const nums = rgb.match(/\d+/g)
  if (!nums || nums.length < 3) return "#808080"
  return "#" + nums.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, "0")).join("")
}

// ─── Web app shadcn components (structural/interactive) ───
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog as ShadcnAlertDialog, AlertDialogAction as ShadcnAlertDialogAction, AlertDialogCancel as ShadcnAlertDialogCancel, AlertDialogContent as ShadcnAlertDialogContent,
  AlertDialogDescription as ShadcnAlertDialogDescription, AlertDialogFooter as ShadcnAlertDialogFooter, AlertDialogHeader as ShadcnAlertDialogHeader,
  AlertDialogTitle as ShadcnAlertDialogTitle, AlertDialogTrigger as ShadcnAlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox"
// ─── Tactile Minimal self-contained primitives (override web app's shadcn) ───
import { Checkbox as TactileMinimalCheckbox } from "../../../../../../design-systems/tactile-minimal/components/checkbox"
import { Switch as TactileMinimalSwitch } from "../../../../../../design-systems/tactile-minimal/components/switch"
import { RadioGroup as TactileMinimalRadioGroup, RadioGroupItem as TactileMinimalRadioGroupItem } from "../../../../../../design-systems/tactile-minimal/components/radio-group"
import { Toggle as TactileMinimalToggle } from "../../../../../../design-systems/tactile-minimal/components/toggle"
import { Popover as TactileMinimalPopover, PopoverContent as TactileMinimalPopoverContent, PopoverTrigger as TactileMinimalPopoverTrigger } from "../../../../../../design-systems/tactile-minimal/components/popover"
import { DropdownMenu as TactileMinimalDropdownMenu, DropdownMenuContent as TactileMinimalDropdownMenuContent, DropdownMenuItem as TactileMinimalDropdownMenuItem, DropdownMenuLabel as TactileMinimalDropdownMenuLabel, DropdownMenuSeparator as TactileMinimalDropdownMenuSeparator, DropdownMenuTrigger as TactileMinimalDropdownMenuTrigger } from "../../../../../../design-systems/tactile-minimal/components/dropdown-menu"
import { Dialog as TactileMinimalDialog, DialogContent as TactileMinimalDialogContent, DialogDescription as TactileMinimalDialogDescription, DialogFooter as TactileMinimalDialogFooter, DialogHeader as TactileMinimalDialogHeader, DialogTitle as TactileMinimalDialogTitle, DialogTrigger as TactileMinimalDialogTrigger } from "../../../../../../design-systems/tactile-minimal/components/dialog"
import { Tooltip as TactileMinimalTooltip, TooltipContent as TactileMinimalTooltipContent, TooltipProvider as TactileMinimalTooltipProvider, TooltipTrigger as TactileMinimalTooltipTrigger } from "../../../../../../design-systems/tactile-minimal/components/tooltip"
import { HoverCard as TactileMinimalHoverCard, HoverCardContent as TactileMinimalHoverCardContent, HoverCardTrigger as TactileMinimalHoverCardTrigger } from "../../../../../../design-systems/tactile-minimal/components/hover-card"
import { Select as TactileMinimalSelect, SelectContent as TactileMinimalSelectContent, SelectItem as TactileMinimalSelectItem, SelectTrigger as TactileMinimalSelectTrigger, SelectValue as TactileMinimalSelectValue } from "../../../../../../design-systems/tactile-minimal/components/select"
import { Command as TactileMinimalCommand, CommandEmpty as TactileMinimalCommandEmpty, CommandGroup as TactileMinimalCommandGroup, CommandInput as TactileMinimalCommandInput, CommandItem as TactileMinimalCommandItem, CommandList as TactileMinimalCommandList } from "../../../../../../design-systems/tactile-minimal/components/command"
import { Sheet as TactileMinimalSheet, SheetContent as TactileMinimalSheetContent, SheetDescription as TactileMinimalSheetDescription, SheetHeader as TactileMinimalSheetHeader, SheetTitle as TactileMinimalSheetTitle, SheetTrigger as TactileMinimalSheetTrigger } from "../../../../../../design-systems/tactile-minimal/components/sheet"
import { ContextMenu as TactileMinimalContextMenu, ContextMenuContent as TactileMinimalContextMenuContent, ContextMenuItem as TactileMinimalContextMenuItem, ContextMenuLabel as TactileMinimalContextMenuLabel, ContextMenuSeparator as TactileMinimalContextMenuSeparator, ContextMenuTrigger as TactileMinimalContextMenuTrigger } from "../../../../../../design-systems/tactile-minimal/components/context-menu"
import { AlertDialog as TactileMinimalAlertDialog, AlertDialogAction as TactileMinimalAlertDialogAction, AlertDialogCancel as TactileMinimalAlertDialogCancel, AlertDialogContent as TactileMinimalAlertDialogContent, AlertDialogDescription as TactileMinimalAlertDialogDescription, AlertDialogFooter as TactileMinimalAlertDialogFooter, AlertDialogHeader as TactileMinimalAlertDialogHeader, AlertDialogTitle as TactileMinimalAlertDialogTitle, AlertDialogTrigger as TactileMinimalAlertDialogTrigger } from "../../../../../../design-systems/tactile-minimal/components/alert-dialog"
import { Menubar as TactileMinimalMenubar, MenubarContent as TactileMinimalMenubarContent, MenubarItem as TactileMinimalMenubarItem, MenubarMenu as TactileMinimalMenubarMenu, MenubarSeparator as TactileMinimalMenubarSeparator, MenubarTrigger as TactileMinimalMenubarTrigger } from "../../../../../../design-systems/tactile-minimal/components/menubar"
import { Drawer as TactileMinimalDrawer, DrawerClose as TactileMinimalDrawerClose, DrawerContent as TactileMinimalDrawerContent, DrawerDescription as TactileMinimalDrawerDescription, DrawerFooter as TactileMinimalDrawerFooter, DrawerHeader as TactileMinimalDrawerHeader, DrawerTitle as TactileMinimalDrawerTitle, DrawerTrigger as TactileMinimalDrawerTrigger } from "../../../../../../design-systems/tactile-minimal/components/drawer"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog as ShadcnDialog, DialogContent as ShadcnDialogContent, DialogDescription as ShadcnDialogDescription, DialogFooter as ShadcnDialogFooter,
  DialogHeader as ShadcnDialogHeader, DialogTitle as ShadcnDialogTitle, DialogTrigger as ShadcnDialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu as ShadcnDropdownMenu, DropdownMenuContent as ShadcnDropdownMenuContent, DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuLabel as ShadcnDropdownMenuLabel, DropdownMenuSeparator as ShadcnDropdownMenuSeparator, DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard as ShadcnHoverCard, HoverCardContent as ShadcnHoverCardContent, HoverCardTrigger as ShadcnHoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import {
  Menubar as ShadcnMenubar, MenubarContent as ShadcnMenubarContent, MenubarItem as ShadcnMenubarItem, MenubarMenu as ShadcnMenubarMenu,
  MenubarSeparator as ShadcnMenubarSeparator, MenubarTrigger as ShadcnMenubarTrigger,
} from "@/components/ui/menubar"
import { MegaMenu } from "@/components/ui/mega-menu"
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover as ShadcnPopover, PopoverContent as ShadcnPopoverContent, PopoverTrigger as ShadcnPopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem as ShadcnRadioGroupItem } from "@/components/ui/radio-group"
import {
  Select as ShadcnSelect, SelectContent as ShadcnSelectContent, SelectItem as ShadcnSelectItem, SelectTrigger as ShadcnSelectTrigger, SelectValue as ShadcnSelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet as ShadcnSheet, SheetContent as ShadcnSheetContent, SheetDescription as ShadcnSheetDescription, SheetHeader as ShadcnSheetHeader,
  SheetTitle as ShadcnSheetTitle, SheetTrigger as ShadcnSheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch as ShadcnSwitch } from "@/components/ui/switch"
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea"
import { Textarea as TactileMinimalTextarea } from "../../../../../../design-systems/tactile-minimal/components/textarea"
import { Textarea as LumenDarkTextarea } from "../../../../../../design-systems/lumen-dark/components/textarea"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip as ShadcnTooltip, TooltipContent as ShadcnTooltipContent, TooltipProvider as ShadcnTooltipProvider, TooltipTrigger as ShadcnTooltipTrigger,
} from "@/components/ui/tooltip"

import { Calendar } from "@/components/ui/calendar"
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Command as ShadcnCommand, CommandEmpty as ShadcnCommandEmpty, CommandGroup as ShadcnCommandGroup,
  CommandInput as ShadcnCommandInput, CommandItem as ShadcnCommandItem, CommandList as ShadcnCommandList,
} from "@/components/ui/command"
import {
  ContextMenu as ShadcnContextMenu, ContextMenuContent as ShadcnContextMenuContent, ContextMenuItem as ShadcnContextMenuItem, ContextMenuLabel as ShadcnContextMenuLabel,
  ContextMenuSeparator as ShadcnContextMenuSeparator, ContextMenuTrigger as ShadcnContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Drawer as ShadcnDrawer, DrawerClose as ShadcnDrawerClose, DrawerContent as ShadcnDrawerContent, DrawerDescription as ShadcnDrawerDescription,
  DrawerFooter as ShadcnDrawerFooter, DrawerHeader as ShadcnDrawerHeader, DrawerTitle as ShadcnDrawerTitle, DrawerTrigger as ShadcnDrawerTrigger,
} from "@/components/ui/drawer"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"

// ─── New chanhdai.com components ───
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect"
import { CopyStateIcon } from "@/components/ui/copy-button"
import { GitHubStars } from "@/components/ui/github-stars"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShimmeringText } from "@/components/ui/shimmering-text"
import {
  SlideToUnlock, SlideToUnlockHandle, SlideToUnlockText, SlideToUnlockTrack,
} from "@/components/ui/slide-to-unlock"
import {
  Testimonial, TestimonialAuthor, TestimonialAuthorName, TestimonialAuthorTagline,
  TestimonialAvatar, TestimonialAvatarImg, TestimonialAvatarRing,
  TestimonialQuote, TestimonialVerifiedBadge,
} from "@/components/ui/testimonial"
import { TextFlip } from "@/components/ui/text-flip"
import {
  WheelPicker, WheelPickerWrapper,
} from "@/components/ui/wheel-picker"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

// ─── Design system components (Button, Card, Input, Badge per system) ───
import {
  LinearButton, AirbnbButton, SupabaseButton, CorporateFintechButton,
  DarkOrangeButton, VibrantDarkButton, MinimalLightButton, NeutralMonochromeButton, LightMarketplaceButton, PrecisionLightButton, CinematicDarkButton,
  LinearQualityButton, EditorialDarkButton,
  NotionButton, StripeButton, VercelButton, AppleButton, FigmaButton, MonoIndustrialButton, GlassmorphicDarkButton, MidnightGlassButton, TactileMinimalButton, LumenDarkButton,
  LinearCard, LinearCardHeader, LinearCardTitle, LinearCardDescription, LinearCardContent, LinearCardFooter,
  AirbnbCard, AirbnbCardHeader, AirbnbCardTitle, AirbnbCardDescription, AirbnbCardContent, AirbnbCardFooter,
  SupabaseCard, SupabaseCardHeader, SupabaseCardTitle, SupabaseCardDescription, SupabaseCardContent, SupabaseCardFooter,
  CorporateFintechCard, CorporateFintechCardHeader, CorporateFintechCardTitle, CorporateFintechCardDescription, CorporateFintechCardContent, CorporateFintechCardFooter,
  DarkOrangeCard, DarkOrangeCardHeader, DarkOrangeCardTitle, DarkOrangeCardDescription, DarkOrangeCardContent, DarkOrangeCardFooter,
  VibrantDarkCard, VibrantDarkCardHeader, VibrantDarkCardTitle, VibrantDarkCardDescription, VibrantDarkCardContent, VibrantDarkCardFooter,
  MinimalLightCard, MinimalLightCardHeader, MinimalLightCardTitle, MinimalLightCardDescription, MinimalLightCardContent, MinimalLightCardFooter,
  NeutralMonochromeCard, NeutralMonochromeCardHeader, NeutralMonochromeCardTitle, NeutralMonochromeCardDescription, NeutralMonochromeCardContent, NeutralMonochromeCardFooter,
  LightMarketplaceCard, LightMarketplaceCardHeader, LightMarketplaceCardTitle, LightMarketplaceCardDescription, LightMarketplaceCardContent, LightMarketplaceCardFooter,
  PrecisionLightCard, PrecisionLightCardHeader, PrecisionLightCardTitle, PrecisionLightCardDescription, PrecisionLightCardContent, PrecisionLightCardFooter,
  CinematicDarkCard, CinematicDarkCardHeader, CinematicDarkCardTitle, CinematicDarkCardDescription, CinematicDarkCardContent, CinematicDarkCardFooter,
  LinearQualityCard, LinearQualityCardPoster, LinearQualityCardMedia, LinearQualityCardLabel,
  LinearQualityCardHeader, LinearQualityCardTitle, LinearQualityCardDescription, LinearQualityCardContent, LinearQualityCardFooter,
  EditorialDarkCard, EditorialDarkCardMedia, EditorialDarkCardHeader, EditorialDarkCardTitle, EditorialDarkCardDescription, EditorialDarkCardContent, EditorialDarkCardFooter,
  NotionCard, NotionCardHeader, NotionCardTitle, NotionCardDescription, NotionCardContent, NotionCardFooter,
  StripeCard, StripeCardHeader, StripeCardTitle, StripeCardDescription, StripeCardContent, StripeCardFooter,
  VercelCard, VercelCardHeader, VercelCardTitle, VercelCardDescription, VercelCardContent, VercelCardFooter,
  AppleCard, AppleCardHeader, AppleCardTitle, AppleCardDescription, AppleCardContent, AppleCardFooter,
  FigmaCard, FigmaCardHeader, FigmaCardTitle, FigmaCardDescription, FigmaCardContent, FigmaCardFooter,
  MonoIndustrialCard, MonoIndustrialCardHeader, MonoIndustrialCardTitle, MonoIndustrialCardDescription, MonoIndustrialCardContent, MonoIndustrialCardFooter,
  GlassmorphicDarkCard, GlassmorphicDarkCardHeader, GlassmorphicDarkCardTitle, GlassmorphicDarkCardDescription, GlassmorphicDarkCardContent, GlassmorphicDarkCardFooter,
  MidnightGlassCard, MidnightGlassCardHeader, MidnightGlassCardTitle, MidnightGlassCardDescription, MidnightGlassCardContent, MidnightGlassCardFooter,
  TactileMinimalCard, TactileMinimalCardHeader, TactileMinimalCardTitle, TactileMinimalCardDescription, TactileMinimalCardContent, TactileMinimalCardFooter,
  LumenDarkCard, LumenDarkCardHeader, LumenDarkCardTitle, LumenDarkCardDescription, LumenDarkCardContent, LumenDarkCardFooter,
  LinearInput, AirbnbInput, SupabaseInput, CorporateFintechInput,
  DarkOrangeInput, VibrantDarkInput, MinimalLightInput, NeutralMonochromeInput, LightMarketplaceInput, PrecisionLightInput, CinematicDarkInput,
  LinearQualityInput, EditorialDarkInput,
  NotionInput, StripeInput, VercelInput, AppleInput, FigmaInput, MonoIndustrialInput, GlassmorphicDarkInput, MidnightGlassInput, TactileMinimalInput, LumenDarkInput,
  LinearBadge, AirbnbBadge, SupabaseBadge, CorporateFintechBadge,
  DarkOrangeBadge, VibrantDarkBadge, MinimalLightBadge, NeutralMonochromeBadge, LightMarketplaceBadge, PrecisionLightBadge, CinematicDarkBadge,
  LinearQualityBadge, EditorialDarkBadge,
  NotionBadge, StripeBadge, VercelBadge, AppleBadge, FigmaBadge, MonoIndustrialBadge, GlassmorphicDarkBadge, MidnightGlassBadge, TactileMinimalBadge, LumenDarkBadge,
  LinearCodeTabs, AirbnbCodeTabs, SupabaseCodeTabs, CorporateFintechCodeTabs,
  DarkOrangeCodeTabs, VibrantDarkCodeTabs, MinimalLightCodeTabs, NeutralMonochromeCodeTabs, LightMarketplaceCodeTabs, PrecisionLightCodeTabs, CinematicDarkCodeTabs,
  LinearQualityCodeTabs, EditorialDarkCodeTabs,
  NotionCodeTabs, StripeCodeTabs, VercelCodeTabs, AppleCodeTabs, FigmaCodeTabs, MonoIndustrialCodeTabs, GlassmorphicDarkCodeTabs, MidnightGlassCodeTabs, TactileMinimalCodeTabs, LumenDarkCodeTabs,
  LinearCursor, AirbnbCursor, SupabaseCursor, CorporateFintechCursor,
  DarkOrangeCursor, VibrantDarkCursor, MinimalLightCursor, NeutralMonochromeCursor, LightMarketplaceCursor, PrecisionLightCursor, CinematicDarkCursor,
  LinearQualityCursor, EditorialDarkCursor,
  NotionCursor, StripeCursor, VercelCursor, AppleCursor, FigmaCursor, MonoIndustrialCursor, GlassmorphicDarkCursor, MidnightGlassCursor, TactileMinimalCursor, LumenDarkCursor,
  MonoIndustrialSpinner,
} from "./ds-registry"

// ─── Sections ───
type SubSection = { id: string; title: string }
type Section = { id: string; title: string; subsections: SubSection[] }

const SECTIONS: Section[] = [
  {
    id: "forms-inputs", title: "Forms & Inputs",
    subsections: [
      { id: "fi-button", title: "Button" },
      { id: "fi-input", title: "Input" },
      { id: "fi-checkbox", title: "Checkbox" },
      { id: "fi-radio", title: "Radio" },
      { id: "fi-select", title: "Select" },
      { id: "fi-slider", title: "Slider" },
      { id: "fi-switch", title: "Switch" },
      { id: "fi-textarea", title: "Textarea" },
      { id: "fi-calendar", title: "Calendar" },
      { id: "fi-wheel", title: "Wheel Picker" },
      { id: "fi-slide", title: "Slide to Unlock" },
    ],
  },
  {
    id: "data-display", title: "Data Display",
    subsections: [
      { id: "dd-avatar", title: "Avatar" },
      { id: "dd-badge", title: "Badge" },
      { id: "dd-progress", title: "Progress" },
      { id: "dd-skeleton", title: "Skeleton" },
      { id: "dd-table", title: "Table" },
      { id: "dd-typography", title: "Typography" },
      { id: "dd-testimonial", title: "Testimonial" },
    ],
  },
  {
    id: "overlays", title: "Overlays",
    subsections: [
      { id: "ov-dialog", title: "Dialog" },
      { id: "ov-dropdown", title: "Dropdown" },
      { id: "ov-popover", title: "Popover" },
      { id: "ov-sheet", title: "Sheet" },
      { id: "ov-hovercard", title: "Hover Card" },
      { id: "ov-tooltip", title: "Tooltip" },
    ],
  },
  {
    id: "navigation", title: "Navigation",
    subsections: [
      { id: "nav-tabs", title: "Tabs" },
      { id: "nav-codetabs", title: "Code Tabs" },
      { id: "nav-breadcrumb", title: "Breadcrumb" },
      { id: "nav-menubar", title: "Menubar" },
      { id: "nav-mega", title: "Mega Menu" },
      { id: "nav-contextmenu", title: "Context Menu" },
      { id: "nav-pagination", title: "Pagination" },
      { id: "nav-drawer", title: "Drawer" },
      { id: "nav-command", title: "Command" },
    ],
  },
  {
    id: "layout-structure", title: "Layout & Structure",
    subsections: [
      { id: "ls-accordion", title: "Accordion" },
      { id: "ls-card", title: "Card" },
      { id: "ls-carousel", title: "Carousel" },
      { id: "ls-collapsible", title: "Collapsible" },
      { id: "ls-scroll", title: "Scroll Area" },
      { id: "ls-separator", title: "Separator" },
      { id: "ls-resizable", title: "Resizable" },
    ],
  },
  {
    id: "feedback", title: "Feedback",
    subsections: [
      { id: "fb-alert", title: "Alert" },
      { id: "fb-alertdialog", title: "Alert Dialog" },
      { id: "fb-cursor", title: "Cursor" },
      { id: "fb-hello", title: "Apple Hello" },
      { id: "fb-spinner", title: "Spinner" },
      { id: "fb-kbd", title: "Kbd" },
    ],
  },
  {
    id: "toggle", title: "Toggle",
    subsections: [
      { id: "tg-toggle", title: "Toggle" },
      { id: "tg-toolbar", title: "Toolbar" },
    ],
  },
]

// ─── Per-design-system highlights ───
const FEATURED_DS_IDS = new Set(["editorial-dark", "cinematic-dark", "linear-quality", "airbnb", "supabase", "linear"])
const HIGHLIGHTS_SECTION: Section = {
  id: "highlights",
  title: "Highlights",
  subsections: [{ id: "feat-showcase", title: "Showcase" }],
}

// ─── Component lookup maps ───
type AnyButton = React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string; asChild?: boolean; className?: string }>
type AnyInput = React.ComponentType<React.InputHTMLAttributes<HTMLInputElement> & { className?: string }>
type AnyBadge = React.ComponentType<{ variant?: string; className?: string; children?: ReactNode }>
type AnyCard = React.ComponentType<{ className?: string; children?: ReactNode; style?: CSSProperties }>
type AnyCardSub = React.ComponentType<{ className?: string; children?: ReactNode }>

const BUTTON_MAP: Record<string, AnyButton> = {
  linear: LinearButton as AnyButton,
  airbnb: AirbnbButton as AnyButton,
  supabase: SupabaseButton as AnyButton,
  "corporate-fintech": CorporateFintechButton as AnyButton,
  "dark-orange": DarkOrangeButton as AnyButton,
  "precision-light": PrecisionLightButton as AnyButton,
  "vibrant-dark": VibrantDarkButton as AnyButton,
  "minimal-light": MinimalLightButton as AnyButton,
  "neutral-monochrome": NeutralMonochromeButton as AnyButton,
  "light-marketplace": LightMarketplaceButton as AnyButton,
  "cinematic-dark": CinematicDarkButton as AnyButton,
  "linear-quality": LinearQualityButton as AnyButton,
  "editorial-dark": EditorialDarkButton as AnyButton,
  notion: NotionButton as AnyButton,
  stripe: StripeButton as AnyButton,
  vercel: VercelButton as AnyButton,
  apple: AppleButton as AnyButton,
  figma: FigmaButton as AnyButton,
  "monochrome-industrial": MonoIndustrialButton as AnyButton,
  "glassmorphic-dark": GlassmorphicDarkButton as AnyButton,
  "midnight-glass": MidnightGlassButton as AnyButton,
  "tactile-minimal": TactileMinimalButton as AnyButton,
  "lumen-dark": LumenDarkButton as AnyButton,
}

const INPUT_MAP: Record<string, AnyInput> = {
  linear: LinearInput as AnyInput,
  airbnb: AirbnbInput as AnyInput,
  supabase: SupabaseInput as AnyInput,
  "corporate-fintech": CorporateFintechInput as AnyInput,
  "dark-orange": DarkOrangeInput as AnyInput,
  "precision-light": PrecisionLightInput as AnyInput,
  "vibrant-dark": VibrantDarkInput as AnyInput,
  "minimal-light": MinimalLightInput as AnyInput,
  "neutral-monochrome": NeutralMonochromeInput as AnyInput,
  "light-marketplace": LightMarketplaceInput as AnyInput,
  "cinematic-dark": CinematicDarkInput as AnyInput,
  "linear-quality": LinearQualityInput as AnyInput,
  "editorial-dark": EditorialDarkInput as AnyInput,
  notion: NotionInput as AnyInput,
  stripe: StripeInput as AnyInput,
  vercel: VercelInput as AnyInput,
  apple: AppleInput as AnyInput,
  figma: FigmaInput as AnyInput,
  "monochrome-industrial": MonoIndustrialInput as AnyInput,
  "glassmorphic-dark": GlassmorphicDarkInput as AnyInput,
  "midnight-glass": MidnightGlassInput as AnyInput,
  "tactile-minimal": TactileMinimalInput as AnyInput,
  "lumen-dark": LumenDarkInput as AnyInput,
}

const BADGE_MAP: Record<string, AnyBadge> = {
  linear: LinearBadge as AnyBadge,
  airbnb: AirbnbBadge as AnyBadge,
  supabase: SupabaseBadge as AnyBadge,
  "corporate-fintech": CorporateFintechBadge as AnyBadge,
  "dark-orange": DarkOrangeBadge as AnyBadge,
  "precision-light": PrecisionLightBadge as AnyBadge,
  "vibrant-dark": VibrantDarkBadge as AnyBadge,
  "minimal-light": MinimalLightBadge as AnyBadge,
  "neutral-monochrome": NeutralMonochromeBadge as AnyBadge,
  "light-marketplace": LightMarketplaceBadge as AnyBadge,
  "cinematic-dark": CinematicDarkBadge as AnyBadge,
  "linear-quality": LinearQualityBadge as AnyBadge,
  "editorial-dark": EditorialDarkBadge as AnyBadge,
  notion: NotionBadge as AnyBadge,
  stripe: StripeBadge as AnyBadge,
  vercel: VercelBadge as AnyBadge,
  apple: AppleBadge as AnyBadge,
  figma: FigmaBadge as AnyBadge,
  "monochrome-industrial": MonoIndustrialBadge as AnyBadge,
  "glassmorphic-dark": GlassmorphicDarkBadge as AnyBadge,
  "midnight-glass": MidnightGlassBadge as AnyBadge,
  "tactile-minimal": TactileMinimalBadge as AnyBadge,
  "lumen-dark": LumenDarkBadge as AnyBadge,
}

const CARD_MAP: Record<string, {
  Card: AnyCard; CardHeader: AnyCardSub; CardTitle: AnyCardSub;
  CardDescription: AnyCardSub; CardContent: AnyCardSub; CardFooter: AnyCardSub;
}> = {
  linear: { Card: LinearCard as AnyCard, CardHeader: LinearCardHeader as AnyCardSub, CardTitle: LinearCardTitle as AnyCardSub, CardDescription: LinearCardDescription as AnyCardSub, CardContent: LinearCardContent as AnyCardSub, CardFooter: LinearCardFooter as AnyCardSub },
  airbnb: { Card: AirbnbCard as AnyCard, CardHeader: AirbnbCardHeader as AnyCardSub, CardTitle: AirbnbCardTitle as AnyCardSub, CardDescription: AirbnbCardDescription as AnyCardSub, CardContent: AirbnbCardContent as AnyCardSub, CardFooter: AirbnbCardFooter as AnyCardSub },
  supabase: { Card: SupabaseCard as AnyCard, CardHeader: SupabaseCardHeader as AnyCardSub, CardTitle: SupabaseCardTitle as AnyCardSub, CardDescription: SupabaseCardDescription as AnyCardSub, CardContent: SupabaseCardContent as AnyCardSub, CardFooter: SupabaseCardFooter as AnyCardSub },
  "corporate-fintech": { Card: CorporateFintechCard as AnyCard, CardHeader: CorporateFintechCardHeader as AnyCardSub, CardTitle: CorporateFintechCardTitle as AnyCardSub, CardDescription: CorporateFintechCardDescription as AnyCardSub, CardContent: CorporateFintechCardContent as AnyCardSub, CardFooter: CorporateFintechCardFooter as AnyCardSub },
  "dark-orange": { Card: DarkOrangeCard as AnyCard, CardHeader: DarkOrangeCardHeader as AnyCardSub, CardTitle: DarkOrangeCardTitle as AnyCardSub, CardDescription: DarkOrangeCardDescription as AnyCardSub, CardContent: DarkOrangeCardContent as AnyCardSub, CardFooter: DarkOrangeCardFooter as AnyCardSub },
  "precision-light": { Card: PrecisionLightCard as AnyCard, CardHeader: PrecisionLightCardHeader as AnyCardSub, CardTitle: PrecisionLightCardTitle as AnyCardSub, CardDescription: PrecisionLightCardDescription as AnyCardSub, CardContent: PrecisionLightCardContent as AnyCardSub, CardFooter: PrecisionLightCardFooter as AnyCardSub },
  "vibrant-dark": { Card: VibrantDarkCard as AnyCard, CardHeader: VibrantDarkCardHeader as AnyCardSub, CardTitle: VibrantDarkCardTitle as AnyCardSub, CardDescription: VibrantDarkCardDescription as AnyCardSub, CardContent: VibrantDarkCardContent as AnyCardSub, CardFooter: VibrantDarkCardFooter as AnyCardSub },
  "minimal-light": { Card: MinimalLightCard as AnyCard, CardHeader: MinimalLightCardHeader as AnyCardSub, CardTitle: MinimalLightCardTitle as AnyCardSub, CardDescription: MinimalLightCardDescription as AnyCardSub, CardContent: MinimalLightCardContent as AnyCardSub, CardFooter: MinimalLightCardFooter as AnyCardSub },
  "neutral-monochrome": { Card: NeutralMonochromeCard as AnyCard, CardHeader: NeutralMonochromeCardHeader as AnyCardSub, CardTitle: NeutralMonochromeCardTitle as AnyCardSub, CardDescription: NeutralMonochromeCardDescription as AnyCardSub, CardContent: NeutralMonochromeCardContent as AnyCardSub, CardFooter: NeutralMonochromeCardFooter as AnyCardSub },
  "light-marketplace": { Card: LightMarketplaceCard as AnyCard, CardHeader: LightMarketplaceCardHeader as AnyCardSub, CardTitle: LightMarketplaceCardTitle as AnyCardSub, CardDescription: LightMarketplaceCardDescription as AnyCardSub, CardContent: LightMarketplaceCardContent as AnyCardSub, CardFooter: LightMarketplaceCardFooter as AnyCardSub },
  "cinematic-dark": { Card: CinematicDarkCard as AnyCard, CardHeader: CinematicDarkCardHeader as AnyCardSub, CardTitle: CinematicDarkCardTitle as AnyCardSub, CardDescription: CinematicDarkCardDescription as AnyCardSub, CardContent: CinematicDarkCardContent as AnyCardSub, CardFooter: CinematicDarkCardFooter as AnyCardSub },
  "linear-quality": { Card: LinearQualityCard as AnyCard, CardHeader: LinearQualityCardHeader as AnyCardSub, CardTitle: LinearQualityCardTitle as AnyCardSub, CardDescription: LinearQualityCardDescription as AnyCardSub, CardContent: LinearQualityCardContent as AnyCardSub, CardFooter: LinearQualityCardFooter as AnyCardSub },
  "editorial-dark": { Card: EditorialDarkCard as AnyCard, CardHeader: EditorialDarkCardHeader as AnyCardSub, CardTitle: EditorialDarkCardTitle as AnyCardSub, CardDescription: EditorialDarkCardDescription as AnyCardSub, CardContent: EditorialDarkCardContent as AnyCardSub, CardFooter: EditorialDarkCardFooter as AnyCardSub },
  notion: { Card: NotionCard as AnyCard, CardHeader: NotionCardHeader as AnyCardSub, CardTitle: NotionCardTitle as AnyCardSub, CardDescription: NotionCardDescription as AnyCardSub, CardContent: NotionCardContent as AnyCardSub, CardFooter: NotionCardFooter as AnyCardSub },
  stripe: { Card: StripeCard as AnyCard, CardHeader: StripeCardHeader as AnyCardSub, CardTitle: StripeCardTitle as AnyCardSub, CardDescription: StripeCardDescription as AnyCardSub, CardContent: StripeCardContent as AnyCardSub, CardFooter: StripeCardFooter as AnyCardSub },
  vercel: { Card: VercelCard as AnyCard, CardHeader: VercelCardHeader as AnyCardSub, CardTitle: VercelCardTitle as AnyCardSub, CardDescription: VercelCardDescription as AnyCardSub, CardContent: VercelCardContent as AnyCardSub, CardFooter: VercelCardFooter as AnyCardSub },
  apple: { Card: AppleCard as AnyCard, CardHeader: AppleCardHeader as AnyCardSub, CardTitle: AppleCardTitle as AnyCardSub, CardDescription: AppleCardDescription as AnyCardSub, CardContent: AppleCardContent as AnyCardSub, CardFooter: AppleCardFooter as AnyCardSub },
  figma: { Card: FigmaCard as AnyCard, CardHeader: FigmaCardHeader as AnyCardSub, CardTitle: FigmaCardTitle as AnyCardSub, CardDescription: FigmaCardDescription as AnyCardSub, CardContent: FigmaCardContent as AnyCardSub, CardFooter: FigmaCardFooter as AnyCardSub },
  "monochrome-industrial": { Card: MonoIndustrialCard as AnyCard, CardHeader: MonoIndustrialCardHeader as AnyCardSub, CardTitle: MonoIndustrialCardTitle as AnyCardSub, CardDescription: MonoIndustrialCardDescription as AnyCardSub, CardContent: MonoIndustrialCardContent as AnyCardSub, CardFooter: MonoIndustrialCardFooter as AnyCardSub },
  "glassmorphic-dark": { Card: GlassmorphicDarkCard as AnyCard, CardHeader: GlassmorphicDarkCardHeader as AnyCardSub, CardTitle: GlassmorphicDarkCardTitle as AnyCardSub, CardDescription: GlassmorphicDarkCardDescription as AnyCardSub, CardContent: GlassmorphicDarkCardContent as AnyCardSub, CardFooter: GlassmorphicDarkCardFooter as AnyCardSub },
  "midnight-glass": { Card: MidnightGlassCard as AnyCard, CardHeader: MidnightGlassCardHeader as AnyCardSub, CardTitle: MidnightGlassCardTitle as AnyCardSub, CardDescription: MidnightGlassCardDescription as AnyCardSub, CardContent: MidnightGlassCardContent as AnyCardSub, CardFooter: MidnightGlassCardFooter as AnyCardSub },
  "tactile-minimal": { Card: TactileMinimalCard as AnyCard, CardHeader: TactileMinimalCardHeader as AnyCardSub, CardTitle: TactileMinimalCardTitle as AnyCardSub, CardDescription: TactileMinimalCardDescription as AnyCardSub, CardContent: TactileMinimalCardContent as AnyCardSub, CardFooter: TactileMinimalCardFooter as AnyCardSub },
  "lumen-dark": { Card: LumenDarkCard as AnyCard, CardHeader: LumenDarkCardHeader as AnyCardSub, CardTitle: LumenDarkCardTitle as AnyCardSub, CardDescription: LumenDarkCardDescription as AnyCardSub, CardContent: LumenDarkCardContent as AnyCardSub, CardFooter: LumenDarkCardFooter as AnyCardSub },
}

type AnyCodeTabs = React.ComponentType<{ tabs: { label: string; lang: string; code: string }[]; defaultTab?: number; className?: string }>
type AnyCursor = React.ComponentType<{ text: string; label?: string; color?: string; speed?: number; delay?: number; loop?: boolean; className?: string }>

const CODE_TABS_MAP: Record<string, AnyCodeTabs> = {
  linear: LinearCodeTabs as AnyCodeTabs,
  airbnb: AirbnbCodeTabs as AnyCodeTabs,
  supabase: SupabaseCodeTabs as AnyCodeTabs,
  "corporate-fintech": CorporateFintechCodeTabs as AnyCodeTabs,
  "dark-orange": DarkOrangeCodeTabs as AnyCodeTabs,
  "precision-light": PrecisionLightCodeTabs as AnyCodeTabs,
  "vibrant-dark": VibrantDarkCodeTabs as AnyCodeTabs,
  "minimal-light": MinimalLightCodeTabs as AnyCodeTabs,
  "neutral-monochrome": NeutralMonochromeCodeTabs as AnyCodeTabs,
  "light-marketplace": LightMarketplaceCodeTabs as AnyCodeTabs,
  "cinematic-dark": CinematicDarkCodeTabs as AnyCodeTabs,
  "linear-quality": LinearQualityCodeTabs as AnyCodeTabs,
  "editorial-dark": EditorialDarkCodeTabs as AnyCodeTabs,
  notion: NotionCodeTabs as AnyCodeTabs,
  stripe: StripeCodeTabs as AnyCodeTabs,
  vercel: VercelCodeTabs as AnyCodeTabs,
  apple: AppleCodeTabs as AnyCodeTabs,
  figma: FigmaCodeTabs as AnyCodeTabs,
  "monochrome-industrial": MonoIndustrialCodeTabs as AnyCodeTabs,
  "glassmorphic-dark": GlassmorphicDarkCodeTabs as AnyCodeTabs,
  "midnight-glass": MidnightGlassCodeTabs as AnyCodeTabs,
  "tactile-minimal": TactileMinimalCodeTabs as AnyCodeTabs,
  "lumen-dark": LumenDarkCodeTabs as AnyCodeTabs,
}

const CURSOR_MAP: Record<string, AnyCursor> = {
  linear: LinearCursor as AnyCursor,
  airbnb: AirbnbCursor as AnyCursor,
  supabase: SupabaseCursor as AnyCursor,
  "corporate-fintech": CorporateFintechCursor as AnyCursor,
  "dark-orange": DarkOrangeCursor as AnyCursor,
  "precision-light": PrecisionLightCursor as AnyCursor,
  "vibrant-dark": VibrantDarkCursor as AnyCursor,
  "minimal-light": MinimalLightCursor as AnyCursor,
  "neutral-monochrome": NeutralMonochromeCursor as AnyCursor,
  "light-marketplace": LightMarketplaceCursor as AnyCursor,
  "cinematic-dark": CinematicDarkCursor as AnyCursor,
  "linear-quality": LinearQualityCursor as AnyCursor,
  "editorial-dark": EditorialDarkCursor as AnyCursor,
  notion: NotionCursor as AnyCursor,
  stripe: StripeCursor as AnyCursor,
  vercel: VercelCursor as AnyCursor,
  apple: AppleCursor as AnyCursor,
  figma: FigmaCursor as AnyCursor,
  "monochrome-industrial": MonoIndustrialCursor as AnyCursor,
  "glassmorphic-dark": GlassmorphicDarkCursor as AnyCursor,
  "midnight-glass": MidnightGlassCursor as AnyCursor,
  "tactile-minimal": TactileMinimalCursor as AnyCursor,
  "lumen-dark": LumenDarkCursor as AnyCursor,
}

const ICONS_SECTION: Section = {
  id: "icons",
  title: "Icons",
  subsections: [
    { id: "ic-grid",   title: "Common Icons" },
    { id: "ic-sizes",  title: "Sizes"        },
    { id: "ic-usage",  title: "Usage"        },
  ],
}

interface ShowcaseProps {
  id: string
  tokens: Record<string, string>
  radius: string
  btnRadius: string
  name: string
  description: string
  theme: "light" | "dark"
  iconPrefix?: string
  iconLibraryName?: string
}

function Grid({ children, cols = 1 }: { children: ReactNode; cols?: number }) {
  const className = cols === 2
    ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
    : cols === 3
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      : "grid grid-cols-1 gap-3"
  return <div className={className}>{children}</div>
}

function DemoCard({ name, children, minH = 110, overflow = "visible", anchorId }: { name: string; children: ReactNode; minH?: number; overflow?: string; anchorId?: string }) {
  return (
    <div id={anchorId} style={{ borderRadius: "8px", border: "1px solid var(--border)", overflow: "hidden", fontSize: "13px", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: "center", flex: 1, minHeight: `${minH}px`, backgroundColor: "var(--background)", color: "var(--foreground)", overflow }}>
        {children}
      </div>
      <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted-foreground)", padding: "5px 10px 7px", borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
        {name}
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle, isFirst }: { title: string; subtitle?: string; isFirst?: boolean }) {
  return (
    <div style={{
      marginBottom: "20px",
      marginTop: isFirst ? "28px" : "64px",
      paddingTop: isFirst ? "0" : "48px",
      borderTop: isFirst ? "none" : "1px solid var(--border)",
    }}>
      <div style={{
        fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const,
        color: "var(--muted-foreground)",
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: "12px", color: "var(--muted-foreground)", opacity: 0.7, marginTop: "4px" }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

function MobileTOCPill({
  sections,
  activeSections,
  scrollToSection,
}: {
  sections: Section[]
  activeSections: Set<string>
  scrollToSection: (id: string) => void
}) {
  const activeId = sections.find(s => activeSections.has(s.id))?.id ?? sections[0].id
  const activeTitle = sections.find(s => s.id === activeId)?.title ?? ""
  const measureRef = useRef<HTMLSpanElement>(null)
  const [textWidth, setTextWidth] = useState<number>(0)

  useEffect(() => {
    if (measureRef.current) setTextWidth(measureRef.current.offsetWidth)
  }, [activeTitle])

  return (
    <div className="lg:hidden" style={{
      position: "fixed", bottom: "20px", left: "50%",
      transform: "translateX(-50%)", zIndex: 50,
    }}>
      <button
        onClick={() => scrollToSection(activeId)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          backgroundColor: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "999px", padding: "8px 16px 8px 12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
          backgroundColor: "var(--primary)", boxShadow: "0 0 6px var(--primary)",
        }} />
        <div style={{
          position: "relative", height: "16px", overflow: "hidden",
          width: textWidth || "auto",
          transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={activeId}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center",
                fontSize: "12px", fontWeight: 500,
                color: "var(--foreground)", whiteSpace: "nowrap",
              }}
            >
              {activeTitle}
            </motion.span>
          </AnimatePresence>
          {/* Invisible sizer — measures current title width */}
          <span ref={measureRef} style={{
            visibility: "hidden", pointerEvents: "none",
            fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap",
          }}>
            {activeTitle}
          </span>
        </div>
      </button>
    </div>
  )
}

export function ComponentShowcase({ id, tokens, name, description, iconPrefix, iconLibraryName }: ShowcaseProps) {
  const hasFeatured = FEATURED_DS_IDS.has(id)
  const sections = [
    ...(hasFeatured ? [HIGHLIGHTS_SECTION] : []),
    ...SECTIONS,
    ...(iconPrefix ? [ICONS_SECTION] : []),
  ]

  const [sliderVal, setSliderVal] = useState([60])
  const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined)
  const [comboOpen, setComboOpen] = useState(false)
  const [comboValue, setComboValue] = useState("")
  const [activeSections, setActiveSections] = useState<Set<string>>(new Set([sections[0].id]))
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>({})
  const [baseHex, setBaseHex] = useState<Record<string, string>>({})
  const origBodyVarsRef = useRef<Record<string, string>>({})

  // Reset scroll to top on mount — runs after cmdk's useEffect may focus the CommandInput
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Compute hex equivalents for the native color picker (needs #rrggbb)
  useEffect(() => {
    const result: Record<string, string> = {}
    COLOR_TOKEN_KEYS.forEach(key => {
      const val = tokens[key]
      if (val) result[key] = cssColorToHex(val)
    })
    setBaseHex(result)
  }, [tokens])

  const mergedTokens = { ...tokens, ...colorOverrides }
  const hasOverrides = Object.keys(colorOverrides).length > 0

  const handleColorChange = (key: string, hex: string) => {
    setColorOverrides(prev => ({ ...prev, [key]: hex }))
  }

  // Track the single active section — the last one whose top has crossed NAV_HEIGHT
  useEffect(() => {
    const onScroll = () => {
      const NAV_HEIGHT = 120

      // Find the last section that has scrolled past NAV_HEIGHT
      let activeSection = sections[0].id
      for (const { id: sId } of sections) {
        const el = document.getElementById(sId)
        if (!el) continue
        if (el.getBoundingClientRect().top <= NAV_HEIGHT) {
          activeSection = sId
        }
      }

      setActiveSections(new Set([activeSection]))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Inject DS tokens into document.body so Radix UI portals (Dropdown, Dialog, Sheet…) inherit them
  useEffect(() => {
    const body = document.body
    const orig: Record<string, string> = {}
    Object.keys(tokens).forEach(key => {
      orig[key] = body.style.getPropertyValue(key)
    })
    origBodyVarsRef.current = orig
    return () => {
      Object.entries(origBodyVarsRef.current).forEach(([key, val]) => {
        if (val) body.style.setProperty(key, val)
        else body.style.removeProperty(key)
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const root = document.documentElement
    Object.entries(mergedTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
      // Also set the Tailwind --color-* variable so bg-popover etc. resolve correctly in portals
      const colorKey = key.replace(/^--/, "--color-")
      if (colorKey !== key) {
        root.style.setProperty(colorKey, value)
      }
    })
    return () => {
      Object.keys(mergedTokens).forEach((key) => {
        root.style.removeProperty(key)
        root.style.removeProperty(key.replace(/^--/, "--color-"))
      })
    }
  }, [mergedTokens])

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: "smooth" })
  }

  const { state: copyState1, copy: copyText1 } = useCopyToClipboard()
  const { state: copyState2, copy: copyText2 } = useCopyToClipboard()

  // Resolve design system components
  const Button = (BUTTON_MAP[id] ?? BUTTON_MAP.linear) as AnyButton
  const Input = (INPUT_MAP[id] ?? INPUT_MAP.linear) as AnyInput
  const Badge = (BADGE_MAP[id] ?? BADGE_MAP.linear) as AnyBadge
  const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } = CARD_MAP[id] ?? CARD_MAP.linear
  const CodeTabs = (CODE_TABS_MAP[id] ?? CODE_TABS_MAP.linear) as AnyCodeTabs
  const DSCursor = (CURSOR_MAP[id] ?? CURSOR_MAP.linear) as AnyCursor

  // Tactile Minimal swaps the web app's shadcn primitives for its own DS-native versions.
  // This keeps the DS showcase self-contained instead of inheriting the web app's Linear-glass styles.
  // Other DSs continue to use the shadcn versions for now (rollout is tactile-minimal-first).
  const isTactile = id === "tactile-minimal"
  const Checkbox = (isTactile ? TactileMinimalCheckbox : ShadcnCheckbox) as typeof ShadcnCheckbox
  const Switch = (isTactile ? TactileMinimalSwitch : ShadcnSwitch) as typeof ShadcnSwitch
  const RadioGroup = (isTactile ? TactileMinimalRadioGroup : ShadcnRadioGroup) as typeof ShadcnRadioGroup
  const RadioGroupItem = (isTactile ? TactileMinimalRadioGroupItem : ShadcnRadioGroupItem) as typeof ShadcnRadioGroupItem
  const Popover = (isTactile ? TactileMinimalPopover : ShadcnPopover) as typeof ShadcnPopover
  const PopoverContent = (isTactile ? TactileMinimalPopoverContent : ShadcnPopoverContent) as typeof ShadcnPopoverContent
  const PopoverTrigger = (isTactile ? TactileMinimalPopoverTrigger : ShadcnPopoverTrigger) as typeof ShadcnPopoverTrigger
  const HoverCard = (isTactile ? TactileMinimalHoverCard : ShadcnHoverCard) as typeof ShadcnHoverCard
  const HoverCardContent = (isTactile ? TactileMinimalHoverCardContent : ShadcnHoverCardContent) as typeof ShadcnHoverCardContent
  const HoverCardTrigger = (isTactile ? TactileMinimalHoverCardTrigger : ShadcnHoverCardTrigger) as typeof ShadcnHoverCardTrigger
  const Command = (isTactile ? TactileMinimalCommand : ShadcnCommand) as typeof ShadcnCommand
  const Textarea = (
    id === "tactile-minimal" ? TactileMinimalTextarea :
    id === "lumen-dark" ? LumenDarkTextarea :
    ShadcnTextarea
  ) as typeof ShadcnTextarea
  const CommandEmpty = (isTactile ? TactileMinimalCommandEmpty : ShadcnCommandEmpty) as typeof ShadcnCommandEmpty
  const CommandGroup = (isTactile ? TactileMinimalCommandGroup : ShadcnCommandGroup) as typeof ShadcnCommandGroup
  const CommandInput = (isTactile ? TactileMinimalCommandInput : ShadcnCommandInput) as typeof ShadcnCommandInput
  const CommandItem = (isTactile ? TactileMinimalCommandItem : ShadcnCommandItem) as typeof ShadcnCommandItem
  const CommandList = (isTactile ? TactileMinimalCommandList : ShadcnCommandList) as typeof ShadcnCommandList
  const TactileToggle = isTactile ? TactileMinimalToggle : null
  void TactileToggle

  // Dialog
  const Dialog = (isTactile ? TactileMinimalDialog : ShadcnDialog) as typeof ShadcnDialog
  const DialogContent = (isTactile ? TactileMinimalDialogContent : ShadcnDialogContent) as typeof ShadcnDialogContent
  const DialogDescription = (isTactile ? TactileMinimalDialogDescription : ShadcnDialogDescription) as typeof ShadcnDialogDescription
  const DialogFooter = (isTactile ? TactileMinimalDialogFooter : ShadcnDialogFooter) as typeof ShadcnDialogFooter
  const DialogHeader = (isTactile ? TactileMinimalDialogHeader : ShadcnDialogHeader) as typeof ShadcnDialogHeader
  const DialogTitle = (isTactile ? TactileMinimalDialogTitle : ShadcnDialogTitle) as typeof ShadcnDialogTitle
  const DialogTrigger = (isTactile ? TactileMinimalDialogTrigger : ShadcnDialogTrigger) as typeof ShadcnDialogTrigger

  // AlertDialog
  const AlertDialog = (isTactile ? TactileMinimalAlertDialog : ShadcnAlertDialog) as typeof ShadcnAlertDialog
  const AlertDialogAction = (isTactile ? TactileMinimalAlertDialogAction : ShadcnAlertDialogAction) as typeof ShadcnAlertDialogAction
  const AlertDialogCancel = (isTactile ? TactileMinimalAlertDialogCancel : ShadcnAlertDialogCancel) as typeof ShadcnAlertDialogCancel
  const AlertDialogContent = (isTactile ? TactileMinimalAlertDialogContent : ShadcnAlertDialogContent) as typeof ShadcnAlertDialogContent
  const AlertDialogDescription = (isTactile ? TactileMinimalAlertDialogDescription : ShadcnAlertDialogDescription) as typeof ShadcnAlertDialogDescription
  const AlertDialogFooter = (isTactile ? TactileMinimalAlertDialogFooter : ShadcnAlertDialogFooter) as typeof ShadcnAlertDialogFooter
  const AlertDialogHeader = (isTactile ? TactileMinimalAlertDialogHeader : ShadcnAlertDialogHeader) as typeof ShadcnAlertDialogHeader
  const AlertDialogTitle = (isTactile ? TactileMinimalAlertDialogTitle : ShadcnAlertDialogTitle) as typeof ShadcnAlertDialogTitle
  const AlertDialogTrigger = (isTactile ? TactileMinimalAlertDialogTrigger : ShadcnAlertDialogTrigger) as typeof ShadcnAlertDialogTrigger

  // DropdownMenu
  const DropdownMenu = (isTactile ? TactileMinimalDropdownMenu : ShadcnDropdownMenu) as typeof ShadcnDropdownMenu
  const DropdownMenuContent = (isTactile ? TactileMinimalDropdownMenuContent : ShadcnDropdownMenuContent) as typeof ShadcnDropdownMenuContent
  const DropdownMenuItem = (isTactile ? TactileMinimalDropdownMenuItem : ShadcnDropdownMenuItem) as typeof ShadcnDropdownMenuItem
  const DropdownMenuLabel = (isTactile ? TactileMinimalDropdownMenuLabel : ShadcnDropdownMenuLabel) as typeof ShadcnDropdownMenuLabel
  const DropdownMenuSeparator = (isTactile ? TactileMinimalDropdownMenuSeparator : ShadcnDropdownMenuSeparator) as typeof ShadcnDropdownMenuSeparator
  const DropdownMenuTrigger = (isTactile ? TactileMinimalDropdownMenuTrigger : ShadcnDropdownMenuTrigger) as typeof ShadcnDropdownMenuTrigger

  // ContextMenu
  const ContextMenu = (isTactile ? TactileMinimalContextMenu : ShadcnContextMenu) as typeof ShadcnContextMenu
  const ContextMenuContent = (isTactile ? TactileMinimalContextMenuContent : ShadcnContextMenuContent) as typeof ShadcnContextMenuContent
  const ContextMenuItem = (isTactile ? TactileMinimalContextMenuItem : ShadcnContextMenuItem) as typeof ShadcnContextMenuItem
  const ContextMenuLabel = (isTactile ? TactileMinimalContextMenuLabel : ShadcnContextMenuLabel) as typeof ShadcnContextMenuLabel
  const ContextMenuSeparator = (isTactile ? TactileMinimalContextMenuSeparator : ShadcnContextMenuSeparator) as typeof ShadcnContextMenuSeparator
  const ContextMenuTrigger = (isTactile ? TactileMinimalContextMenuTrigger : ShadcnContextMenuTrigger) as typeof ShadcnContextMenuTrigger

  // Menubar
  const Menubar = (isTactile ? TactileMinimalMenubar : ShadcnMenubar) as typeof ShadcnMenubar
  const MenubarContent = (isTactile ? TactileMinimalMenubarContent : ShadcnMenubarContent) as typeof ShadcnMenubarContent
  const MenubarItem = (isTactile ? TactileMinimalMenubarItem : ShadcnMenubarItem) as typeof ShadcnMenubarItem
  const MenubarMenu = (isTactile ? TactileMinimalMenubarMenu : ShadcnMenubarMenu) as typeof ShadcnMenubarMenu
  const MenubarSeparator = (isTactile ? TactileMinimalMenubarSeparator : ShadcnMenubarSeparator) as typeof ShadcnMenubarSeparator
  const MenubarTrigger = (isTactile ? TactileMinimalMenubarTrigger : ShadcnMenubarTrigger) as typeof ShadcnMenubarTrigger

  // Sheet
  const Sheet = (isTactile ? TactileMinimalSheet : ShadcnSheet) as typeof ShadcnSheet
  const SheetContent = (isTactile ? TactileMinimalSheetContent : ShadcnSheetContent) as typeof ShadcnSheetContent
  const SheetDescription = (isTactile ? TactileMinimalSheetDescription : ShadcnSheetDescription) as typeof ShadcnSheetDescription
  const SheetHeader = (isTactile ? TactileMinimalSheetHeader : ShadcnSheetHeader) as typeof ShadcnSheetHeader
  const SheetTitle = (isTactile ? TactileMinimalSheetTitle : ShadcnSheetTitle) as typeof ShadcnSheetTitle
  const SheetTrigger = (isTactile ? TactileMinimalSheetTrigger : ShadcnSheetTrigger) as typeof ShadcnSheetTrigger

  // Drawer
  const Drawer = (isTactile ? TactileMinimalDrawer : ShadcnDrawer) as typeof ShadcnDrawer
  const DrawerClose = (isTactile ? TactileMinimalDrawerClose : ShadcnDrawerClose) as typeof ShadcnDrawerClose
  const DrawerContent = (isTactile ? TactileMinimalDrawerContent : ShadcnDrawerContent) as typeof ShadcnDrawerContent
  const DrawerDescription = (isTactile ? TactileMinimalDrawerDescription : ShadcnDrawerDescription) as typeof ShadcnDrawerDescription
  const DrawerFooter = (isTactile ? TactileMinimalDrawerFooter : ShadcnDrawerFooter) as typeof ShadcnDrawerFooter
  const DrawerHeader = (isTactile ? TactileMinimalDrawerHeader : ShadcnDrawerHeader) as typeof ShadcnDrawerHeader
  const DrawerTitle = (isTactile ? TactileMinimalDrawerTitle : ShadcnDrawerTitle) as typeof ShadcnDrawerTitle
  const DrawerTrigger = (isTactile ? TactileMinimalDrawerTrigger : ShadcnDrawerTrigger) as typeof ShadcnDrawerTrigger

  // Tooltip
  const Tooltip = (isTactile ? TactileMinimalTooltip : ShadcnTooltip) as typeof ShadcnTooltip
  const TooltipContent = (isTactile ? TactileMinimalTooltipContent : ShadcnTooltipContent) as typeof ShadcnTooltipContent
  const TooltipProvider = (isTactile ? TactileMinimalTooltipProvider : ShadcnTooltipProvider) as typeof ShadcnTooltipProvider
  const TooltipTrigger = (isTactile ? TactileMinimalTooltipTrigger : ShadcnTooltipTrigger) as typeof ShadcnTooltipTrigger

  // Select
  const Select = (isTactile ? TactileMinimalSelect : ShadcnSelect) as typeof ShadcnSelect
  const SelectContent = (isTactile ? TactileMinimalSelectContent : ShadcnSelectContent) as typeof ShadcnSelectContent
  const SelectItem = (isTactile ? TactileMinimalSelectItem : ShadcnSelectItem) as typeof ShadcnSelectItem
  const SelectTrigger = (isTactile ? TactileMinimalSelectTrigger : ShadcnSelectTrigger) as typeof ShadcnSelectTrigger
  const SelectValue = (isTactile ? TactileMinimalSelectValue : ShadcnSelectValue) as typeof ShadcnSelectValue

  const cssVars = { ...mergedTokens, backgroundColor: "var(--background)" } as CSSProperties

  return (
    <div data-ds={id} style={{ ...cssVars, backgroundColor: "var(--background)", minHeight: "calc(100vh - 57px)" } as CSSProperties}>

      {/* ─── Page header — inside DS theme ─── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }} className="px-4 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-8 max-w-4xl lg:max-w-none mx-auto lg:mx-0">
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2, margin: 0 }}>{name}</h1>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", marginTop: "6px" }}>{description}</p>
        </div>
      </div>

      {/* ─── 3-column layout ─── */}
      <div className="flex items-start">

      {/* ─── Left sidebar ─── */}
      <aside className="hidden lg:block" style={{
        width: "200px",
        flexShrink: 0,
        position: "sticky",
        top: "57px",
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 73px)",
        overflowY: "auto",
        padding: "16px",
      }}>
        <div style={{
          border: "1px solid var(--border)",
          borderRadius: "8px",
          backgroundColor: "var(--card)",
          overflow: "clip",
        }}>
          <div style={{
            padding: "10px 12px",
            borderBottom: "1px solid var(--border)",
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase" as const, color: "var(--muted-foreground)", opacity: 0.6,
          }}>
            Sections
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "1px", padding: "6px 6px 8px" }}>
            {sections.map(({ id: sId, title }) => {
              const isActive = activeSections.has(sId)
              return (
                <button
                  key={sId}
                  onClick={() => scrollToSection(sId)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    textAlign: "left" as const,
                    padding: "5px 8px",
                    fontSize: "12px",
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                    backgroundColor: isActive ? "var(--muted)" : "transparent",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                    backgroundColor: isActive ? "var(--primary)" : "var(--border)",
                    transition: "background-color 0.15s",
                  }} />
                  {title}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* ─── Main content ─── */}
      <div className="px-4 sm:px-7 mx-auto lg:mx-0 w-full max-w-4xl lg:max-w-none" style={{ flex: 1, minWidth: 0 }}>
        <TooltipProvider delayDuration={300}>

          {/* ─── Highlights ─── */}
          {hasFeatured && (
            <div id="highlights">
              <SectionHeader title="Highlights" isFirst />

              {/* Editorial Dark: Library of Minds — editorial episode row */}
              {id === "editorial-dark" && (<>
                <DemoCard name="Episodes" anchorId="feat-showcase" minH={180} overflow="visible">
                  <div style={{ display: "flex", gap: "12px", width: "100%", overflowX: "auto", paddingBottom: "4px" }}>
                    {[
                      { ep: "EP 01", title: "The Future of Publishing", host: "Grant Lee · Gamma", dur: "45 min", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=180&fit=crop&auto=format" },
                      { ep: "EP 02", title: "Knowledge as Architecture", host: "Ada Lovelace · Pioneer", dur: "30 min", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=180&fit=crop&auto=format" },
                      { ep: "EP 03", title: "Rethinking the Library", host: "Jorge Luis Borges · Author", dur: "60 min", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=180&fit=crop&auto=format" },
                      { ep: "EP 04", title: "On Solitude & Deep Work", host: "Cal Newport · Author", dur: "52 min", img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=180&fit=crop&auto=format" },
                    ].map(({ ep, title, host, dur, img }) => (
                      <div key={ep} style={{ flexShrink: 0, width: "160px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ borderRadius: "6px", overflow: "hidden", height: "100px", position: "relative" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                          <span style={{ position: "absolute", bottom: "6px", left: "8px", fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}>{ep}</span>
                          <span style={{ position: "absolute", bottom: "6px", right: "8px", fontSize: "9px", color: "rgba(255,255,255,0.6)" }}>{dur}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "12px", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3, marginBottom: "2px" }}>{title}</p>
                          <p style={{ fontSize: "10px", color: "var(--muted-foreground)", lineHeight: 1.3 }}>{host}</p>
                        </div>
                        <Button className="gap-1 text-xs h-7 w-full">
                          <Icon icon="tabler:player-play-filled" width={10} />Play
                        </Button>
                      </div>
                    ))}
                  </div>
                </DemoCard>
                <Grid cols={3}>
                  <DemoCard name="Editorial Typography">
                    <div className="w-full space-y-2">
                      <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--muted-foreground)" }}>Philosophy</p>
                      <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "18px", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>The Examined Life</h2>
                      <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: 1.6 }}>Ancient wisdom for modern questions of meaning and identity.</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button className="text-xs h-7 gap-1.5"><Icon icon="tabler:bookmark" width={12} />Save</Button>
                        <Button variant="ghost" className="text-xs h-7">Share</Button>
                      </div>
                    </div>
                  </DemoCard>
                  <DemoCard name="Media Card" minH={160}>
                    <EditorialDarkCard style={{ width: "200px" }}>
                      <EditorialDarkCardMedia>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=180&fit=crop&auto=format" alt="Reading" className="w-full h-full object-cover" />
                      </EditorialDarkCardMedia>
                      <EditorialDarkCardContent>
                        <p style={{ fontSize: "9px", color: "var(--primary)", marginBottom: "4px" }}>25 min · Essay</p>
                        <h4 style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "var(--foreground)", lineHeight: 1.3 }}>On Solitude & Deep Work</h4>
                      </EditorialDarkCardContent>
                    </EditorialDarkCard>
                  </DemoCard>
                  <DemoCard name="Reading List" minH={130}>
                    <div className="w-full">
                      {[
                        { title: "Meditations", author: "Marcus Aurelius", time: "4h" },
                        { title: "Thinking, Fast and Slow", author: "Kahneman", time: "12h" },
                        { title: "The Art of War", author: "Sun Tzu", time: "2h" },
                      ].map(({ title, author, time }) => (
                        <div key={title} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                          <div style={{ width: "24px", height: "32px", borderRadius: "3px", background: "var(--muted)", flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "11px", fontWeight: 500, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
                            <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{author}</div>
                          </div>
                          <div style={{ fontSize: "10px", color: "var(--muted-foreground)", flexShrink: 0 }}>{time}</div>
                        </div>
                      ))}
                    </div>
                  </DemoCard>
                </Grid>
              </>)}

              {/* Cinematic Dark: ultra-dark streaming — cinematic hero + browse row */}
              {id === "cinematic-dark" && (<>
                <div id="feat-showcase" style={{ marginBottom: "12px", borderRadius: "8px", overflow: "hidden", position: "relative", minHeight: "220px", border: "1px solid var(--border)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&h=400&fit=crop&auto=format" alt="Cinema" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3))" }} />
                  <div style={{ position: "relative", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "220px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>Now Streaming</p>
                    <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>Oppenheimer</h2>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "16px" }}>2023 · 3h · Biography, Drama · Christopher Nolan</p>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button className="gap-1.5 text-sm"><Icon icon="tabler:player-play-filled" width={14} />Play</Button>
                      <Button variant="outline" className="text-sm gap-1.5"><Icon icon="tabler:info-circle" width={14} />More Info</Button>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, fontSize: "11px", fontWeight: 500, color: "var(--muted-foreground)", padding: "5px 10px 7px", borderTop: "1px solid var(--border)", backgroundColor: "var(--card)" }}>Cinematic Hero</div>
                </div>
                <Grid cols={3}>
                  {[
                    { title: "Dune: Part Two", genre: "Sci-Fi · 2024", img: "https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?w=300&h=180&fit=crop&auto=format" },
                    { title: "The Batman", genre: "Action · 2022", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=180&fit=crop&auto=format" },
                    { title: "Past Lives", genre: "Drama · 2023", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=180&fit=crop&auto=format" },
                  ].map(({ title, genre, img }) => (
                    <DemoCard key={title} name={title} minH={120}>
                      <div className="w-full">
                        <div style={{ borderRadius: "6px", overflow: "hidden", marginBottom: "8px", height: "70px", position: "relative" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                            <Icon icon="tabler:player-play-filled" width={20} style={{ color: "#fff" }} />
                          </div>
                        </div>
                        <p style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{genre}</p>
                      </div>
                    </DemoCard>
                  ))}
                </Grid>
              </>)}

              {/* Linear Quality: precision episode row */}
              {id === "linear-quality" && (
                <DemoCard name="Episodes" anchorId="feat-showcase" minH={200} overflow="visible">
                  <div style={{ display: "flex", gap: "16px", width: "100%", overflowX: "auto", paddingBottom: "4px" }}>
                    {[
                      { label: "Episode 01", title: "Dick Costolo", sub: "CEO, Twitter", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop&auto=format" },
                      { label: "Episode 02", title: "Karri Saarinen", sub: "CEO, Linear", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=200&fit=crop&auto=format" },
                      { label: "Episode 03", title: "Tobi Lütke", sub: "CEO, Shopify", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format" },
                      { label: "Episode 04", title: "Anne Wojcicki", sub: "CEO, 23andMe", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=200&fit=crop&auto=format" },
                    ].map(({ label, title, sub, img }) => (
                      <LinearQualityCardPoster key={title} style={{ flexShrink: 0, width: "150px" }}>
                        <LinearQualityCardMedia>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} className="w-full h-full object-cover" />
                        </LinearQualityCardMedia>
                        <hgroup>
                          <LinearQualityCardLabel>{label}</LinearQualityCardLabel>
                          <h2 className="text-sm font-semibold text-foreground leading-tight">{title}</h2>
                          <p className="text-xs text-muted-foreground">{sub}</p>
                        </hgroup>
                      </LinearQualityCardPoster>
                    ))}
                  </div>
                </DemoCard>
              )}
              {/* Airbnb: destination search + property listings */}
              {id === "airbnb" && (<>
                <DemoCard name="Destination Search" anchorId="feat-showcase" minH={100}>
                  <div className="w-full space-y-3">
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--foreground)", textAlign: "center" }}>Where to next?</h2>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Input placeholder="Search destinations..." className="flex-1" />
                      <Button className="gap-1.5 shrink-0"><Icon icon="tabler:search" width={14} />Search</Button>
                    </div>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" as const }}>
                      {["Paris", "Tokyo", "New York", "Bali"].map(city => (
                        <button key={city} style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer" }}>{city}</button>
                      ))}
                    </div>
                  </div>
                </DemoCard>
                <Grid cols={3}>
                  {[
                    { title: "Villa in Tuscany", meta: "4 guests · 3 beds", price: "$180/night", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=220&fit=crop&auto=format" },
                    { title: "Studio in Paris", meta: "2 guests · 1 bed", price: "$95/night", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=220&fit=crop&auto=format" },
                    { title: "Loft in Brooklyn", meta: "3 guests · 2 beds", price: "$140/night", img: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=220&fit=crop&auto=format" },
                  ].map(({ title, meta, price, img }) => (
                    <DemoCard key={title} name={title} minH={160}>
                      <div className="w-full">
                        <div style={{ borderRadius: "8px", overflow: "hidden", marginBottom: "8px", height: "90px" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)", marginBottom: "2px" }}>{title}</div>
                        <div style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "6px" }}>{meta}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>{price}</span>
                          <Button size="sm" className="text-xs h-6 px-2">Book</Button>
                        </div>
                      </div>
                    </DemoCard>
                  ))}
                </Grid>
              </>)}

              {/* Supabase: auth + database */}
              {id === "supabase" && (
                <Grid cols={2}>
                  <DemoCard name="Authentication" anchorId="feat-showcase" minH={200}>
                    <div className="w-full space-y-3">
                      <div style={{ textAlign: "center" as const, marginBottom: "4px" }}>
                        <Icon icon="tabler:brand-supabase" width={28} style={{ color: "var(--primary)" }} />
                        <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)", marginTop: "6px" }}>Sign in to Supabase</h3>
                      </div>
                      <div className="space-y-2">
                        <Input placeholder="email@example.com" type="email" />
                        <Input placeholder="Password" type="password" />
                      </div>
                      <Button className="w-full">Sign In</Button>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <Button variant="outline" className="flex-1 text-xs gap-1.5"><Icon icon="tabler:brand-github" width={13} />GitHub</Button>
                        <Button variant="outline" className="flex-1 text-xs gap-1.5"><Icon icon="tabler:brand-google" width={13} />Google</Button>
                      </div>
                    </div>
                  </DemoCard>
                  <DemoCard name="Database Tables" minH={200}>
                    <div className="w-full space-y-2">
                      {[
                        { table: "users", rows: "12,401", size: "2.3 MB" },
                        { table: "posts", rows: "48,920", size: "8.1 MB" },
                        { table: "comments", rows: "204,711", size: "31 MB" },
                        { table: "files", rows: "9,382", size: "142 MB" },
                      ].map(({ table, rows, size }) => (
                        <div key={table} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", border: "1px solid var(--border)", background: "var(--card)" }}>
                          <Icon icon="tabler:table" width={13} style={{ color: "var(--primary)", flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: "12px", fontWeight: 500, color: "var(--foreground)", fontFamily: "monospace" }}>{table}</span>
                          <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{rows}</span>
                          <span style={{ fontSize: "11px", color: "var(--muted-foreground)", width: "50px", textAlign: "right" as const }}>{size}</span>
                        </div>
                      ))}
                    </div>
                  </DemoCard>
                </Grid>
              )}

              {/* Linear: issue tracker */}
              {id === "linear" && (<>
                <DemoCard name="Issue Tracker" anchorId="feat-showcase" minH={200}>
                  <div className="w-full space-y-1">
                    {[
                      { issueId: "ENG-142", title: "Implement OAuth2 flow", priority: "urgent", status: "In Progress", assignee: "MK" },
                      { issueId: "ENG-141", title: "Fix sidebar scroll on mobile", priority: "high", status: "In Review", assignee: "JS" },
                      { issueId: "ENG-139", title: "Add dark mode for email templates", priority: "medium", status: "Todo", assignee: "AR" },
                      { issueId: "ENG-137", title: "Refactor auth middleware", priority: "low", status: "Todo", assignee: "MK" },
                      { issueId: "ENG-134", title: "Update Figma tokens export script", priority: "low", status: "Done", assignee: "TL" },
                    ].map(({ issueId, title, priority, status, assignee }) => (
                      <div key={issueId} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", borderRadius: "6px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, background: priority === "urgent" ? "#ef4444" : priority === "high" ? "#f97316" : priority === "medium" ? "#eab308" : "#6b7280" }} />
                        <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "monospace", flexShrink: 0, width: "52px" }}>{issueId}</span>
                        <span style={{ flex: 1, fontSize: "12px", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, textDecoration: status === "Done" ? "line-through" : "none", opacity: status === "Done" ? 0.5 : 1 }}>{title}</span>
                        <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "4px", background: "var(--muted)", color: "var(--muted-foreground)", flexShrink: 0 }}>{status}</span>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "var(--primary-foreground)", flexShrink: 0 }}>{assignee[0]}</div>
                      </div>
                    ))}
                  </div>
                </DemoCard>
                <Grid cols={3}>
                  <DemoCard name="Project Overview" minH={120}>
                    <div className="w-full space-y-2">
                      {[{ label: "In Progress", count: 8, color: "#a78bfa" }, { label: "In Review", count: 3, color: "#60a5fa" }, { label: "Completed", count: 24, color: "#34d399" }].map(({ label, count, color }) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: color, flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: "11px", color: "var(--muted-foreground)" }}>{label}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{count}</span>
                        </div>
                      ))}
                    </div>
                  </DemoCard>
                  <DemoCard name="Priority Badges" minH={100}>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[{ label: "Urgent", color: "#ef4444" }, { label: "High", color: "#f97316" }, { label: "Medium", color: "#eab308" }, { label: "Low", color: "#6b7280" }].map(({ label, color }) => (
                        <span key={label} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "4px", border: `1px solid ${color}30`, background: `${color}15`, color }}>{label}</span>
                      ))}
                    </div>
                  </DemoCard>
                  <DemoCard name="Cycle Progress" minH={100}>
                    <div className="w-full space-y-2">
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                        <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Cycle 24</span>
                        <span style={{ color: "var(--muted-foreground)" }}>68%</span>
                      </div>
                      <div style={{ height: "6px", borderRadius: "3px", background: "var(--muted)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "68%", borderRadius: "3px", background: "var(--primary)" }} />
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>3 days remaining · 24/35 issues</div>
                    </div>
                  </DemoCard>
                </Grid>
              </>)}
            </div>
          )}

          {/* ─── Forms & Inputs ─── */}
          <div id="forms-inputs">
            <SectionHeader title="Forms & Inputs" isFirst={!hasFeatured} />
            <Grid cols={3}>

              <DemoCard name="Button" anchorId="fi-button" minH={100}>
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
              <DemoCard name="Input" anchorId="fi-input" minH={100}>
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
              <DemoCard name="Checkbox" anchorId="fi-checkbox" minH={100}>
                <div className="space-y-3">
                  {[
                    { id: "terms", label: "Accept terms", defaultChecked: true },
                    { id: "email", label: "Email updates", defaultChecked: false },
                    { id: "news", label: "Newsletter", defaultChecked: true },
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
                    { id: "cc-push", label: "Push Notifications", desc: "Alerts & updates" },
                    { id: "cc-email", label: "Email Digest", desc: "Weekly summary" },
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
              <DemoCard name="Radio Group" anchorId="fi-radio" minH={100}>
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
                    { value: "card", label: "Credit Card", desc: "Visa, Mastercard" },
                    { value: "paypal", label: "PayPal", desc: "Secure payment" },
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
              <DemoCard name="Select" anchorId="fi-select" minH={90}>
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
              <DemoCard name="Slider" anchorId="fi-slider" minH={90}>
                <div className="w-full space-y-3">
                  <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span className="font-medium text-foreground">{sliderVal[0]}</span>
                    <span>100</span>
                  </div>
                </div>
              </DemoCard>
              <DemoCard name="Switch" anchorId="fi-switch" minH={100}>
                <div className="space-y-3">
                  {[
                    { id: "sw1", label: "Airplane Mode", defaultChecked: true },
                    { id: "sw2", label: "Wi-Fi", defaultChecked: false },
                    { id: "sw3", label: "Bluetooth", defaultChecked: true },
                  ].map(({ id: sid, label, defaultChecked }) => (
                    <div key={sid} className="flex items-center gap-2">
                      <Switch id={sid} defaultChecked={defaultChecked} />
                      <Label htmlFor={sid}>{label}</Label>
                    </div>
                  ))}
                </div>
              </DemoCard>
              <DemoCard name="Textarea" anchorId="fi-textarea" minH={90}>
                <Textarea
                  placeholder="Type your message here..."
                  className="w-full min-h-[70px] resize-none"
                />
              </DemoCard>
              <DemoCard name="Calendar" anchorId="fi-calendar" minH={280}>
                <Calendar mode="single" className="rounded-md border" />
              </DemoCard>
              <DemoCard name="Date Picker" minH={80} overflow="visible">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Icon icon="tabler:calendar" className="mr-2 h-4 w-4" />
                      {pickerDate
                        ? pickerDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                        : <span className="text-muted-foreground">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={pickerDate} onSelect={setPickerDate} />
                  </PopoverContent>
                </Popover>
              </DemoCard>
              <DemoCard name="Combobox" minH={80} overflow="visible">
                <Popover open={comboOpen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={comboOpen}
                      className="w-[200px] justify-between"
                    >
                      {comboValue
                        ? ["Next.js","SvelteKit","Nuxt.js","Remix","Astro"].find(f => f.toLowerCase() === comboValue)
                        : "Select framework..."}
                      <Icon icon="tabler:chevrons-up-down" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {["Next.js","SvelteKit","Nuxt.js","Remix","Astro"].map(f => (
                            <CommandItem
                              key={f}
                              value={f.toLowerCase()}
                              onSelect={v => { setComboValue(v === comboValue ? "" : v); setComboOpen(false) }}
                            >
                              <Icon icon="tabler:check" className={`mr-2 h-4 w-4 ${comboValue === f.toLowerCase() ? "opacity-100" : "opacity-0"}`} />
                              {f}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </DemoCard>
              <DemoCard name="Input OTP" minH={80}>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </DemoCard>
              <DemoCard name="Wheel Picker" anchorId="fi-wheel" minH={130}>
                <WheelPickerWrapper className="w-48">
                  <WheelPicker
                    options={[1,2,3,4,5,6,7,8,9,10,11,12].map(h => ({ label: String(h).padStart(2,"0"), value: h }))}
                    defaultValue={9}
                    infinite
                  />
                  <WheelPicker
                    options={Array.from({length:60},(_,i)=>({ label: String(i).padStart(2,"0"), value: i }))}
                    defaultValue={30}
                    infinite
                  />
                  <WheelPicker
                    options={[{ label: "AM", value: "AM" }, { label: "PM", value: "PM" }]}
                    defaultValue="AM"
                  />
                </WheelPickerWrapper>
              </DemoCard>
              <DemoCard name="Slide to Unlock" anchorId="fi-slide" minH={90}>
                <SlideToUnlock onUnlock={() => {}}>
                  <SlideToUnlockTrack>
                    <SlideToUnlockText>
                      {({ isDragging }) => (
                        <ShimmeringText text="slide to unlock" isStopped={isDragging} />
                      )}
                    </SlideToUnlockText>
                    <SlideToUnlockHandle />
                  </SlideToUnlockTrack>
                </SlideToUnlock>
              </DemoCard>
              <DemoCard name="Copy Button" minH={80}>
                <div className="flex items-center gap-3">
                  <Button size="icon" variant="secondary" onClick={() => copyText1("Hello, world!")} aria-label="Copy" className="active:scale-[0.97] transition-transform duration-[120ms]">
                    <CopyStateIcon state={copyState1} />
                  </Button>
                  <Button variant="outline" className="gap-1.5 pr-3 pl-2.5 active:scale-[0.97] transition-transform duration-[120ms]" onClick={() => copyText2("Copy text")} aria-label="Copy">
                    <CopyStateIcon state={copyState2} /> Copy
                  </Button>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Data Display ─── */}
          <div id="data-display">
            <SectionHeader title="Data Display" />
            <Grid cols={3}>

              <DemoCard name="Avatar" anchorId="dd-avatar" minH={80}>
                <div className="flex gap-3 items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces&auto=format" alt="Ada" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex">
                    {[
                      { init: "AB", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&auto=format" },
                      { init: "CD", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces&auto=format" },
                      { init: "EF", img: null },
                    ].map(({ init, img }, i) => (
                      <Avatar key={init} className="h-8 w-8 border-2 border-background" style={{ marginLeft: i > 0 ? "-8px" : "0" }}>
                        {img && <AvatarImage src={img} alt={init} />}
                        <AvatarFallback className={i === 2 ? "bg-primary text-primary-foreground text-xs" : "bg-secondary text-secondary-foreground text-xs"}>{init}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </DemoCard>
              <DemoCard name="Avatar Sizes" minH={80}>
                <div className="flex items-end gap-3">
                  {[
                    { size: "h-6 w-6", textSize: "text-[8px]", dot: false, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&auto=format" },
                    { size: "h-8 w-8", textSize: "text-[10px]", dot: false, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces&auto=format" },
                    { size: "h-10 w-10", textSize: "text-xs", dot: true, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces&auto=format" },
                    { size: "h-14 w-14", textSize: "text-sm", dot: false, img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop&crop=faces&auto=format" },
                  ].map(({ size, textSize, dot, img }, i) => (
                    <div key={i} className="relative">
                      <Avatar className={size}>
                        <AvatarImage src={img} alt="User" />
                        <AvatarFallback className={`bg-primary text-primary-foreground ${textSize}`}>JD</AvatarFallback>
                      </Avatar>
                      {dot && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
                    </div>
                  ))}
                </div>
              </DemoCard>
              <DemoCard name="Badge" anchorId="dd-badge" minH={80}>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </DemoCard>
              <DemoCard name="Badge with Dots" minH={80}>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { label: "Active", color: "bg-green-500" },
                    { label: "Pending", color: "bg-yellow-500" },
                    { label: "Error", color: "bg-red-500" },
                  ].map(({ label, color }) => (
                    <Badge key={label} variant="outline" className="gap-1.5 text-xs">
                      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                      {label}
                    </Badge>
                  ))}
                  <Badge className="gap-1"><Icon icon="tabler:star-filled" width={10} />Featured</Badge>
                </div>
              </DemoCard>
              <DemoCard name="Progress" anchorId="dd-progress" minH={90}>
                <div className="w-full space-y-3">
                  {[25, 60, 88].map((val) => (
                    <div key={val}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Loading</span><span>{val}%</span>
                      </div>
                      <Progress value={val} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </DemoCard>
              <DemoCard name="Progress Sizes" minH={90}>
                <div className="w-full space-y-3">
                  {[
                    { label: "Thin", value: 72, h: "h-1" },
                    { label: "Default", value: 55, h: "h-2" },
                    { label: "Thick", value: 40, h: "h-3" },
                  ].map(({ label, value, h }) => (
                    <div key={label}>
                      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
                      <Progress value={value} className={h} />
                    </div>
                  ))}
                </div>
              </DemoCard>
              <DemoCard name="Skeleton" anchorId="dd-skeleton" minH={100}>
                <div className="w-full flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <Skeleton className="h-3 w-4/5 rounded" />
                    <Skeleton className="h-3 w-3/5 rounded" />
                    <Skeleton className="h-3 w-2/3 rounded" />
                  </div>
                </div>
              </DemoCard>
              <DemoCard name="Table" anchorId="dd-table" minH={120}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[["INV-001", "Paid", "$250"], ["INV-002", "Pending", "$150"], ["INV-003", "Unpaid", "$350"]].map(([inv, status, amt]) => (
                      <TableRow key={inv}>
                        <TableCell className="font-mono text-xs">{inv}</TableCell>
                        <TableCell>
                          <Badge variant={status === "Paid" ? "default" : status === "Pending" ? "secondary" : "outline"} className="text-xs">{status}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-xs">{amt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DemoCard>
              <DemoCard name="Typography" anchorId="dd-typography" minH={120}>
                <div className="w-full space-y-1.5">
                  <div className="text-2xl font-extrabold leading-tight">Heading 1</div>
                  <div className="text-lg font-bold leading-snug">Heading 2</div>
                  <div className="text-base font-semibold">Heading 3</div>
                  <p className="text-sm leading-relaxed">Body — regular weight, full foreground color.</p>
                  <p className="text-xs text-muted-foreground">Muted — secondary content and labels.</p>
                </div>
              </DemoCard>
              <DemoCard name="Shimmering Text" minH={80}>
                <ShimmeringText className="text-xl font-medium" text="Shimmering Text" />
              </DemoCard>
              <DemoCard name="Text Flip" minH={80}>
                <div className="text-lg font-medium text-muted-foreground flex items-center gap-1.5">
                  <span>I am a</span>
                  <TextFlip className="min-w-24 text-foreground" interval={2}>
                    <span>Developer</span>
                    <span>Designer</span>
                    <span>Creator</span>
                    <span>Builder</span>
                  </TextFlip>
                </div>
              </DemoCard>
              <DemoCard name="GitHub Stars" minH={80}>
                <GitHubStars repo="shadcn-ui/ui" stargazersCount={82400} />
              </DemoCard>
              <DemoCard name="Testimonial" anchorId="dd-testimonial" minH={140}>
                <div className="w-full rounded-xl border bg-card ring-1 ring-border/50">
                  <Testimonial>
                    <TestimonialQuote>
                      <p className="text-sm">awesome. Love the components, especially slide-to-unlock. Great job</p>
                    </TestimonialQuote>
                    <TestimonialAuthor>
                      <TestimonialAvatar>
                        <TestimonialAvatarImg src="https://unavatar.io/x/rauchg" alt="Guillermo Rauch" />
                        <TestimonialAvatarRing />
                      </TestimonialAvatar>
                      <TestimonialAuthorName>
                        Guillermo Rauch<TestimonialVerifiedBadge />
                      </TestimonialAuthorName>
                      <TestimonialAuthorTagline>CEO @Vercel</TestimonialAuthorTagline>
                    </TestimonialAuthor>
                  </Testimonial>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Overlays ─── */}
          <div id="overlays">
            <SectionHeader title="Overlays" />
            <Grid cols={3}>
              <DemoCard name="Dialog" anchorId="ov-dialog" minH={100}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>Make changes to your profile here.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                      <div className="space-y-1">
                        <Label htmlFor="dlg-name">Name</Label>
                        <Input id="dlg-name" defaultValue="Jane Doe" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="dlg-email">Email</Label>
                        <Input id="dlg-email" defaultValue="jane@example.com" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DemoCard>

              <DemoCard name="Dropdown Menu" anchorId="ov-dropdown" minH={100}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1.5">Open menu <Icon icon="tabler:chevron-down" width={14} /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DemoCard>

              <DemoCard name="Popover" anchorId="ov-popover" minH={100}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-52">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Dimensions</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Label className="w-14 text-xs">Width</Label>
                          <Input className="h-7 text-xs" defaultValue="100%" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="w-14 text-xs">Height</Label>
                          <Input className="h-7 text-xs" defaultValue="auto" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </DemoCard>

              <DemoCard name="Sheet" anchorId="ov-sheet" minH={100}>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet →</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>Make changes to your profile here.</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-3 mt-4">
                      <div className="space-y-1">
                        <Label htmlFor="sh-name">Name</Label>
                        <Input id="sh-name" defaultValue="Jane Doe" />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </DemoCard>

              <DemoCard name="Hover Card" anchorId="ov-hovercard" minH={100}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="text-sm underline decoration-dotted cursor-pointer text-primary">@shadcn</span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">SH</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">@shadcn</div>
                        <div className="text-xs text-muted-foreground">Creator of shadcn/ui.</div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </DemoCard>

              <DemoCard name="Tooltip" anchorId="ov-tooltip" minH={100}>
                <div className="flex gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><Icon icon="tabler:help" width={16} /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to library</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">This is a tooltip</TooltipContent>
                  </Tooltip>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Navigation ─── */}
          <div id="navigation">
            <SectionHeader title="Navigation" />
            <Grid cols={3}>

              <DemoCard name="Tabs" anchorId="nav-tabs" minH={130}>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                    <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <p className="text-sm text-muted-foreground pt-2">Make changes to your account here.</p>
                  </TabsContent>
                  <TabsContent value="password">
                    <p className="text-sm text-muted-foreground pt-2">Change your password here.</p>
                  </TabsContent>
                  <TabsContent value="settings">
                    <p className="text-sm text-muted-foreground pt-2">Manage your settings.</p>
                  </TabsContent>
                </Tabs>
              </DemoCard>
              <DemoCard name="Tabs – Underline" minH={90}>
                <Tabs defaultValue="overview" variant="underline" className="w-full">
                  <TabsList className="w-full justify-start">
                    {["Overview", "Analytics", "Reports"].map((tab) => (
                      <TabsTrigger key={tab} value={tab.toLowerCase()}>
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="overview">
                    <p className="text-sm text-muted-foreground pt-2">Overview content here.</p>
                  </TabsContent>
                  <TabsContent value="analytics">
                    <p className="text-sm text-muted-foreground pt-2">Analytics data here.</p>
                  </TabsContent>
                  <TabsContent value="reports">
                    <p className="text-sm text-muted-foreground pt-2">Reports content here.</p>
                  </TabsContent>
                </Tabs>
              </DemoCard>
              <DemoCard name="Code Tabs" anchorId="nav-codetabs" minH={180}>
                <div className="w-full">
                  <CodeTabs
                    tabs={[
                      { label: "App.tsx", lang: "tsx", code: `export default function App() {\n  return <h1>Hello World</h1>\n}` },
                      { label: "styles.css", lang: "css", code: `body {\n  margin: 0;\n  font-family: sans-serif;\n}` },
                      { label: "install", lang: "bash", code: `bun add motion react` },
                    ]}
                  />
                </div>
              </DemoCard>
              <DemoCard name="Breadcrumb" anchorId="nav-breadcrumb" minH={70}>
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
              <DemoCard name="Menubar" anchorId="nav-menubar" minH={70}>
                <Menubar className="bg-card">
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
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Zoom In</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </DemoCard>
              <DemoCard name="Mega Menu" anchorId="nav-mega" minH={100} overflow="visible">
                <MegaMenu items={[
                  { id: "products", label: "Products", columns: [
                    { title: "Platform", items: ["Analytics", "Automation", "Commerce"] },
                    { title: "Solutions", items: ["Enterprise", "Startups", "Developers"] },
                  ]},
                  { id: "docs", label: "Docs", columns: [
                    { title: "Guides", items: ["Getting Started", "Components", "Theming"] },
                  ]},
                ]} />
              </DemoCard>
              <DemoCard name="Context Menu" anchorId="nav-contextmenu" minH={100}>
                <ContextMenu>
                  <ContextMenuTrigger className="flex items-center justify-center w-full h-16 rounded-md border border-dashed border-border text-sm text-muted-foreground select-none">
                    Right-click here
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-44">
                    <ContextMenuLabel>Actions</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Copy</ContextMenuItem>
                    <ContextMenuItem>Paste</ContextMenuItem>
                    <ContextMenuItem>Cut</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </DemoCard>
              <DemoCard name="Pagination" anchorId="nav-pagination" minH={70}>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </DemoCard>
              <DemoCard name="Drawer" anchorId="nav-drawer" minH={100}>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Edit profile</DrawerTitle>
                      <DrawerDescription>Make changes to your profile here.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Save changes</Button>
                      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </DemoCard>
              <DemoCard name="Command" anchorId="nav-command" minH={200}>
                <Command className="rounded-lg border w-full max-w-xs">
                  <CommandInput placeholder="Search…" autoFocus={false} />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>Calendar</CommandItem>
                      <CommandItem>Search</CommandItem>
                      <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Layout & Structure ─── */}
          <div id="layout-structure">
            <SectionHeader title="Layout & Structure" />
            <Grid cols={3}>

              <DemoCard name="Accordion" anchorId="ls-accordion" minH={140}>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>Yes. It adheres to WAI-ARIA design patterns.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>Yes. It&apos;s animated by default using CSS transitions.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DemoCard>
              <DemoCard name="Accordion – Bordered" minH={140}>
                <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="b1">
                  {[
                    { value: "b1", q: "Free shipping?", a: "On orders over $50." },
                    { value: "b2", q: "Return policy?", a: "30-day returns, no questions asked." },
                  ].map(({ value, q, a }) => (
                    <AccordionItem key={value} value={value} className="border rounded-lg px-4 last:border-b">
                      <AccordionTrigger className="text-sm py-3">{q}</AccordionTrigger>
                      <AccordionContent className="text-xs">{a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoCard>
              <DemoCard name="Accordion – Flush" minH={140}>
                <Accordion type="single" collapsible className="w-full" defaultValue="f1">
                  {[
                    { value: "f1", q: "What's included?", a: "Full access to all features and updates." },
                    { value: "f2", q: "Cancel anytime?", a: "Yes, no lock-in contracts." },
                    { value: "f3", q: "Support?", a: "Priority email & chat support." },
                  ].map(({ value, q, a }) => (
                    <AccordionItem key={value} value={value} className="border-b-0">
                      <AccordionTrigger className="text-sm py-2 hover:no-underline font-medium">{q}</AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground pb-2">{a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoCard>
              <DemoCard name="Card" anchorId="ls-card">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Card body content goes here.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Save changes</Button>
                  </CardFooter>
                </Card>
              </DemoCard>
              <DemoCard name="Card – Stats" minH={120}>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {[
                    { label: "Revenue", value: "$24.5k", change: "+12%" },
                    { label: "Users", value: "8,291", change: "+4%" },
                    { label: "Orders", value: "1,429", change: "+8%" },
                    { label: "Bounce", value: "42%", change: "-3%" },
                  ].map(({ label, value, change }) => (
                    <div key={label} className="rounded-lg border border-border bg-card p-3">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="text-lg font-bold text-foreground leading-tight">{value}</div>
                      <div className="text-xs text-green-500">{change}</div>
                    </div>
                  ))}
                </div>
              </DemoCard>
              <DemoCard name="Card – Horizontal" minH={100}>
                <div className="w-full space-y-2">
                  {[
                    { icon: "tabler:database", title: "Database", desc: "Postgres, unlimited storage" },
                    { icon: "tabler:cloud", title: "Storage", desc: "S3-compatible object store" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon icon={icon} width={16} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground">{title}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DemoCard>
              {/* ── Media card: per-system treatment ── */}
              {id === "linear-quality" ? (
                <DemoCard name="Card – Media (Poster)" minH={200}>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { label: "Episode 01", title: "Dick Costolo", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=225&fit=crop&auto=format" },
                      { label: "Episode 02", title: "Karri Saarinen", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=225&fit=crop&auto=format" },
                    ].map(({ label, title, img }) => (
                      <LinearQualityCardPoster key={title}>
                        <LinearQualityCardMedia>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} className="w-full h-full object-cover" />
                        </LinearQualityCardMedia>
                        <hgroup>
                          <LinearQualityCardLabel>{label}</LinearQualityCardLabel>
                          <h2 className="text-sm font-semibold text-foreground leading-tight">{title}</h2>
                        </hgroup>
                      </LinearQualityCardPoster>
                    ))}
                  </div>
                </DemoCard>
              ) : id === "editorial-dark" ? (
                <DemoCard name="Card – Media (Glass)" minH={280}>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { tag: "30 min · New Episode", title: "Grant Lee", desc: "Founder and CEO of Gamma, the $2.1B AI storytelling platform.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&auto=format" },
                      { tag: "45 min · Interview", title: "Ada Lovelace", desc: "Pioneer of computing whose ideas shaped modern software thinking.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=225&fit=crop&auto=format" },
                    ].map(({ tag, title, desc, img }) => (
                      <EditorialDarkCard key={title}>
                        <EditorialDarkCardMedia>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} className="w-full h-full object-cover" />
                        </EditorialDarkCardMedia>
                        <EditorialDarkCardContent>
                          <div className="flex flex-col gap-1 mb-3">
                            <p className="text-[10px] text-blue-400">{tag}</p>
                            <h3 className="text-foreground font-serif text-base leading-tight">{title}</h3>
                            <p className="text-foreground/70 text-[10px] line-clamp-2">{desc}</p>
                          </div>
                          <Button className="w-full text-xs h-7">Watch Now</Button>
                        </EditorialDarkCardContent>
                      </EditorialDarkCard>
                    ))}
                  </div>
                </DemoCard>
              ) : (
                <DemoCard name="Card – Media" minH={140}>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {[
                      { tag: "Tutorial", title: "Getting Started", meta: "5 min read", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop&auto=format" },
                      { tag: "Case Study", title: "Production Tips", meta: "8 min read", img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop&auto=format" },
                    ].map(({ tag, title, meta, img }) => (
                      <Card key={title} className="overflow-hidden">
                        <div className="relative h-[60px] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-1.5 left-2 text-[9px] font-semibold uppercase tracking-wider bg-black/40 text-white/90 px-1.5 py-0.5 rounded-full backdrop-blur-sm">{tag}</span>
                        </div>
                        <CardContent className="p-2.5 !pt-2">
                          <div className="text-xs font-semibold text-foreground leading-tight mb-1">{title}</div>
                          <div className="text-[10px] text-muted-foreground">{meta}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DemoCard>
              )}
              <DemoCard name="Carousel" anchorId="ls-carousel" minH={140}>
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {["One", "Two", "Three"].map((label) => (
                      <CarouselItem key={label}>
                        <div className="p-1">
                          <div className="flex aspect-square items-center justify-center rounded-lg border bg-card p-6 text-sm font-medium text-card-foreground">{label}</div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DemoCard>
              <DemoCard name="Collapsible" anchorId="ls-collapsible" minH={120}>
                <Collapsible className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">@radix-ui/react</span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">Toggle <Icon icon="tabler:chevron-down" width={14} /></Button>
                    </CollapsibleTrigger>
                  </div>
                  <div className="rounded-md border px-4 py-2 text-sm font-mono">@radix-ui/react-collapsible@1.0.3</div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-2 text-sm font-mono">@radix-ui/react-dialog@1.0.5</div>
                    <div className="rounded-md border px-4 py-2 text-sm font-mono">@radix-ui/react-slot@1.0.2</div>
                  </CollapsibleContent>
                </Collapsible>
              </DemoCard>
              <DemoCard name="Scroll Area" anchorId="ls-scroll" minH={110}>
                <ScrollArea className="h-[80px] w-full rounded-md border p-3">
                  <div className="space-y-1">
                    {["Radix UI", "Tailwind CSS", "TypeScript", "Next.js", "React", "Vercel", "shadcn/ui"].map((item) => (
                      <div key={item} className="text-sm text-muted-foreground border-b last:border-b-0 py-0.5">{item}</div>
                    ))}
                  </div>
                </ScrollArea>
              </DemoCard>
              <DemoCard name="Separator" anchorId="ls-separator" minH={80}>
                <div className="w-full space-y-2">
                  <div className="text-sm font-medium">shadcn/ui</div>
                  <Separator />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Blog</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Docs</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>GitHub</span>
                  </div>
                </div>
              </DemoCard>
              <DemoCard name="Resizable" anchorId="ls-resizable" minH={90}>
                <div className="w-full h-[70px] flex rounded-md border overflow-hidden">
                  <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">One</div>
                  <div className="w-px bg-border cursor-col-resize" />
                  <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Two</div>
                  <div className="w-px bg-border cursor-col-resize" />
                  <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Three</div>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Feedback ─── */}
          <div id="feedback">
            <SectionHeader title="Feedback" />
            <Grid cols={3}>

              <DemoCard name="Alert" anchorId="fb-alert" minH={110}>
                <div className="w-full space-y-2">
                  <Alert>
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>You can add components using the CLI.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                  </Alert>
                </div>
              </DemoCard>
              <DemoCard name="Alert with Icons" minH={110}>
                <div className="w-full space-y-2">
                  <Alert>
                    <Icon icon="tabler:info-circle" width={16} />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>Your plan renews in 3 days.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <Icon icon="tabler:alert-triangle" width={16} />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>Disk usage is at 92% capacity.</AlertDescription>
                  </Alert>
                </div>
              </DemoCard>
              <DemoCard name="Alert Dialog" anchorId="fb-alertdialog" minH={110}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DemoCard>
              <DemoCard name="Cursor" anchorId="fb-cursor" minH={140}>
                <div className="flex gap-8">
                  <DSCursor text="Hello, world!" label="Alice" color="var(--primary)" speed={50} />
                  <DSCursor text="Nice to meet you." label="Bob" color="var(--destructive)" speed={70} delay={1500} />
                </div>
              </DemoCard>
              <DemoCard name="Apple Hello" anchorId="fb-hello" minH={110}>
                <AppleHelloEnglishEffect className="text-foreground h-14 w-full" speed={0.8} />
              </DemoCard>
              <DemoCard name="Spinner" anchorId="fb-spinner" minH={80}>
                <div className="flex items-center gap-4">
                  {id === "monochrome-industrial" ? (
                    <>
                      <MonoIndustrialSpinner size="sm" />
                      <MonoIndustrialSpinner size="md" />
                      <MonoIndustrialSpinner size="lg" />
                      <MonoIndustrialSpinner size="xl" />
                    </>
                  ) : (
                    <>
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                      <Spinner size="xl" />
                    </>
                  )}
                </div>
              </DemoCard>
              <DemoCard name="Kbd" anchorId="fb-kbd" minH={80}>
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    Save <Kbd>⌘</Kbd><Kbd>S</Kbd>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    Search <Kbd>⌘</Kbd><Kbd>K</Kbd>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    Undo <Kbd>⌘</Kbd><Kbd>Z</Kbd>
                  </div>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Toggle ─── */}
          <div id="toggle">
            <SectionHeader title="Toggle" />
            <Grid cols={2}>
              <DemoCard name="Toggle" anchorId="tg-toggle" minH={80}>
                <div className="flex gap-2">
                  <Toggle aria-label="Bold"><span className="font-bold text-sm">B</span></Toggle>
                  <Toggle aria-label="Italic"><span className="italic text-sm">I</span></Toggle>
                  <Toggle aria-label="Underline" defaultPressed><span className="underline text-sm">U</span></Toggle>
                </div>
              </DemoCard>

              <DemoCard name="Toggle Group" minH={80}>
                <ToggleGroup type="single" defaultValue="center">
                  <ToggleGroupItem value="left" className="gap-1"><Icon icon="tabler:align-left" width={14} /> Left</ToggleGroupItem>
                  <ToggleGroupItem value="center" className="gap-1"><Icon icon="tabler:align-center" width={14} /> Center</ToggleGroupItem>
                  <ToggleGroupItem value="right" className="gap-1"><Icon icon="tabler:align-right" width={14} /> Right</ToggleGroupItem>
                </ToggleGroup>
              </DemoCard>

              <DemoCard name="Icon Toolbar" anchorId="tg-toolbar" minH={80}>
                <div className="flex flex-col items-center gap-2">
                  <ToggleGroup type="multiple" className="border border-border rounded-md p-0.5 gap-0">
                    {[
                      { value: "bold", icon: "tabler:bold", label: "Bold" },
                      { value: "italic", icon: "tabler:italic", label: "Italic" },
                      { value: "underline", icon: "tabler:underline", label: "Underline" },
                    ].map(({ value, icon, label }) => (
                      <ToggleGroupItem key={value} value={value} size="sm" className="rounded-sm h-7 w-7 data-[state=on]:bg-muted" aria-label={label}>
                        <Icon icon={icon} width={14} />
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <ToggleGroup type="single" defaultValue="left" className="border border-border rounded-md p-0.5 gap-0">
                    {[
                      { value: "left", icon: "tabler:align-left" },
                      { value: "center", icon: "tabler:align-center" },
                      { value: "right", icon: "tabler:align-right" },
                      { value: "justify", icon: "tabler:align-justified" },
                    ].map(({ value, icon }) => (
                      <ToggleGroupItem key={value} value={value} size="sm" className="rounded-sm h-7 w-7 data-[state=on]:bg-muted" aria-label={value}>
                        <Icon icon={icon} width={14} />
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </DemoCard>
            </Grid>
          </div>

          {/* ─── Icons ─── */}
          {iconPrefix && (
            <div id="icons">
              <SectionHeader title="Icons" subtitle={iconLibraryName} />
              <div style={{ borderRadius: "8px", border: "1px solid var(--border)", overflow: "hidden", backgroundColor: "var(--card)", padding: "16px" }}>
                <IconBrowser prefix={iconPrefix} libraryName={iconLibraryName} />
              </div>
            </div>
          )}

        </TooltipProvider>
      </div>

      {/* ─── Right sidebar: interactive color tokens ─── */}
      <aside className="hidden xl:block" style={{
        width: "196px",
        flexShrink: 0,
        position: "sticky",
        top: "57px",
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 73px)",
        overflowY: "auto",
        padding: "16px",
      }}>
        <div style={{
          border: "1px solid var(--border)",
          borderRadius: "8px",
          backgroundColor: "var(--card)",
          overflow: "clip",
        }}>
          <div style={{
            padding: "10px 12px",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--muted-foreground)", opacity: 0.6 }}>
              Colors
            </div>
            {hasOverrides && (
              <button
                onClick={() => setColorOverrides({})}
                style={{ fontSize: "10px", color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", opacity: 0.7, padding: "0" }}
              >
                Reset
              </button>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "6px 6px 10px" }}>
            {COLOR_TOKEN_KEYS.map(key => {
              const currentHex = colorOverrides[key] ?? baseHex[key] ?? "#808080"
              const swatchColor = colorOverrides[key] ?? mergedTokens[key] ?? "transparent"
              const isOverridden = key in colorOverrides
              return (
                <label
                  key={key}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", borderRadius: "5px", padding: "3px 6px 3px 4px", transition: "background 0.1s", backgroundColor: isOverridden ? "var(--muted)" : "transparent" }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "4px",
                      backgroundColor: swatchColor,
                      boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.25)",
                      transition: "background-color 0.1s",
                    }} />
                    <input
                      type="color"
                      value={currentHex}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer", padding: 0, border: "none" }}
                    />
                  </div>
                  <span style={{
                    fontSize: "11px", color: isOverridden ? "var(--foreground)" : "var(--muted-foreground)",
                    fontWeight: isOverridden ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {COLOR_TOKEN_LABELS[key]}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      </aside>
      </div>{/* end 3-column layout */}

      {/* ─── Mobile bottom pill TOC ─── */}
      <MobileTOCPill sections={sections} activeSections={activeSections} scrollToSection={scrollToSection} />
    </div>
  )
}
