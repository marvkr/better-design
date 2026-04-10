"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/ui/empty-state"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Notification } from "@/components/ui/notification"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Rating } from "@/components/ui/rating"
import { SectionHeader } from "@/components/ui/section-header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { StatCard } from "@/components/ui/stat-card"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Steps } from "@/components/ui/steps"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Timeline } from "@/components/ui/timeline"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// ─── Helpers ────────────────────────────────────────────────────────────────

function Section({ id, title, description, children }: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <SectionHeader title={title} description={description} size="lg" className="mb-6" />
      <div className="space-y-6">{children}</div>
    </section>
  )
}

function ComponentRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

const COLOR_TOKENS = [
  { token: "bg-background", label: "Background" },
  { token: "bg-foreground", label: "Foreground" },
  { token: "bg-primary", label: "Primary" },
  { token: "bg-secondary", label: "Secondary" },
  { token: "bg-muted", label: "Muted" },
  { token: "bg-accent", label: "Accent" },
  { token: "bg-border", label: "Border" },
  { token: "bg-input", label: "Input" },
  { token: "bg-destructive", label: "Destructive" },
  { token: "bg-card", label: "Card" },
]

const ICONS = [
  "tabler:book-2", "tabler:brain", "tabler:eye", "tabler:feather",
  "tabler:library", "tabler:moon-stars", "tabler:palette", "tabler:pen",
  "tabler:photo", "tabler:quote", "tabler:sparkles", "tabler:world",
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  const [rating, setRating] = useState(3)
  const [sliderValue, setSliderValue] = useState([60])
  const [switchOn, setSwitchOn] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [progress] = useState(68)
  const [currentStep, setCurrentStep] = useState(1)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New essay published", description: "The Art of Slow Reading — by Maria Chen", variant: "default" as const, unread: true },
    { id: 2, title: "Reading streak", description: "You've read for 7 days in a row.", variant: "success" as const, unread: false },
  ])

  const timelineItems = [
    { title: "Collection launched", date: "Jan 2024", description: "Platform goes live with 200 curated essays.", variant: "success" as const },
    { title: "Mobile app released", date: "Mar 2024", description: "Read anywhere, offline-first experience.", variant: "default" as const },
    { title: "Community features", date: "Jun 2024", description: "Annotations, highlights, and shared reading lists.", variant: "default" as const },
    { title: "Partnerships", date: "Upcoming", description: "Collaborating with independent publishers worldwide.", variant: "warning" as const },
  ]

  const stepItems = [
    { title: "Create account", description: "Set up your reader profile" },
    { title: "Choose interests", description: "Pick your reading categories" },
    { title: "Start reading", description: "Dive into the collection" },
    { title: "Join community", description: "Connect with other readers" },
  ]

  const tableData = [
    { title: "On Reading Slowly", author: "Maria Chen", category: "Philosophy", reads: "12.4k" },
    { title: "The Shape of Ideas", author: "James Liu", category: "Creativity", reads: "9.8k" },
    { title: "Memory & Place", author: "Amara Osei", category: "Culture", reads: "7.2k" },
    { title: "Against Productivity", author: "Lena Voss", category: "Essays", reads: "18.1k" },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">

        {/* ─── Header ─────────────────────────────────────────────────── */}
        <div className="border-b border-border">
          <div className="max-w-5xl mx-auto px-8 py-16">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Design System</Badge>
                  <Badge variant="secondary">v1.0</Badge>
                </div>
                <h1 className="font-serif text-5xl font-normal text-foreground tracking-tight">
                  Editorial Dark
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                  Serif display, flat no-shadow, generous 1rem radius, content-first.
                </p>
              </div>
              <div className="flex gap-2">
                <StatusIndicator status="online" showLabel pulse size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Content ────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">

          {/* Colors */}
          <Section id="colors" title="Colors" description="Semantic color tokens from globals.css">
            <div className="grid grid-cols-5 gap-3">
              {COLOR_TOKENS.map(({ token, label }) => (
                <div key={token} className="flex flex-col gap-2">
                  <div className={`h-14 w-full rounded-xl border border-border/50 ${token}`} />
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Typography */}
          <Section id="typography" title="Typography" description="Serif headings, sans-serif body — editorial contrast">
            <div className="space-y-4">
              <p className="font-serif text-5xl text-foreground leading-tight">The examined life<br />is worth living.</p>
              <p className="font-serif text-3xl text-foreground">On slowness, attention, and depth</p>
              <p className="font-serif text-xl text-foreground">Essays for the curious mind</p>
              <Separator />
              <p className="text-base text-foreground leading-relaxed max-w-prose">Reading slowly is a form of resistance. In a world optimized for skimming, choosing to linger on a page is a quiet act of defiance — and a profound investment in understanding.</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">This collection gathers essays that reward patience. Each piece has been selected for its depth, its clarity of thought, and its willingness to sit with complexity.</p>
              <div className="flex items-center gap-3 flex-wrap">
                <code className="text-xs font-mono bg-secondary px-2 py-1 rounded-md border border-border text-foreground">const reader = new Mind()</code>
                <Kbd>⌘ K</Kbd>
                <Kbd>⌘ ⇧ P</Kbd>
                <Kbd>Escape</Kbd>
              </div>
            </div>
          </Section>

          {/* Buttons */}
          <Section id="buttons" title="Buttons" description="All variants and sizes">
            <ComponentRow label="Variants">
              <Button variant="default">Read Now</Button>
              <Button variant="secondary">Save for Later</Button>
              <Button variant="outline">Browse Collection</Button>
              <Button variant="ghost">Learn More</Button>
              <Button variant="destructive">Remove</Button>
              <Button variant="link">View all essays</Button>
            </ComponentRow>
            <ComponentRow label="Sizes">
              <Button size="lg">Start Reading</Button>
              <Button size="default">Continue</Button>
              <Button size="sm">Bookmark</Button>
              <Button size="icon" variant="outline"><Icon icon="tabler:bookmark" className="size-4" /></Button>
              <Button size="icon"><Icon icon="tabler:arrow-right" className="size-4" /></Button>
            </ComponentRow>
            <ComponentRow label="States">
              <Button disabled>Unavailable</Button>
              <Button variant="outline" disabled>Coming Soon</Button>
              <Button variant="secondary">
                <Spinner size="sm" />
                Loading...
              </Button>
            </ComponentRow>
            <ComponentRow label="Toggle">
              <Toggle pressed><Icon icon="tabler:bold" className="size-4" /></Toggle>
              <Toggle><Icon icon="tabler:italic" className="size-4" /></Toggle>
              <Toggle><Icon icon="tabler:underline" className="size-4" /></Toggle>
            </ComponentRow>
          </Section>

          {/* Inputs & Forms */}
          <Section id="inputs" title="Inputs & Forms" description="Every input variant for collecting reader preferences">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="reader@libraryofminds.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bio">Reading bio</Label>
                  <Textarea id="bio" placeholder="Tell us what you love to read..." rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="philosophy">Philosophy</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="creativity">Creativity</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="essays">Essays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label>Reading level</Label>
                  <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} step={1} />
                  <p className="text-xs text-muted-foreground">{sliderValue[0]}% — Advanced reader</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
                  <Label htmlFor="notifications">Weekly digest emails</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="newsletter" checked={checkboxChecked} onCheckedChange={(v) => setCheckboxChecked(!!v)} />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>
                <RadioGroup defaultValue="serif">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="serif" id="serif" />
                    <Label htmlFor="serif">Serif (editorial)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="sans" id="sans" />
                    <Label htmlFor="sans">Sans-serif (modern)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mono" id="mono" />
                    <Label htmlFor="mono">Monospace (technical)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Section>

          {/* Cards */}
          <Section id="cards" title="Cards" description="The Library of Minds glassmorphism media card">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardMedia>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-stone-900/80 flex items-center justify-center">
                    <Icon icon="tabler:book-2" className="size-12 text-amber-200/60" />
                  </div>
                </CardMedia>
                <CardHeader>
                  <CardTitle>On Reading Slowly</CardTitle>
                  <CardDescription>A meditation on attention, patience, and the rewards of deep reading in an age of distraction.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Philosophy</Badge>
                    <Badge variant="outline">12 min read</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">Read Essay</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardMedia>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-purple-900/80 flex items-center justify-center">
                    <Icon icon="tabler:brain" className="size-12 text-indigo-200/60" />
                  </div>
                </CardMedia>
                <CardHeader>
                  <CardTitle>The Shape of Ideas</CardTitle>
                  <CardDescription>How concepts take form in the mind and why some thoughts resist language entirely.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Creativity</Badge>
                    <Badge variant="outline">8 min read</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">Save for Later</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardMedia>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-teal-900/80 flex items-center justify-center">
                    <Icon icon="tabler:world" className="size-12 text-emerald-200/60" />
                  </div>
                </CardMedia>
                <CardHeader>
                  <CardTitle>Memory & Place</CardTitle>
                  <CardDescription>An exploration of how geography shapes thought and the landscapes that live inside us.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Culture</Badge>
                    <Badge variant="outline">15 min read</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="ghost" className="w-full">Preview</Button>
                </CardFooter>
              </Card>
            </div>
          </Section>

          {/* Stat Cards */}
          <Section id="stats" title="Stat Cards" description="Metric displays for reader dashboards">
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                label="Essays Read"
                value="247"
                change={{ value: "+12 this week", trend: "up" }}
                icon={<Icon icon="tabler:book-2" className="size-5" />}
              />
              <StatCard
                label="Reading Time"
                value="48h"
                change={{ value: "+3.2h", trend: "up" }}
                description="vs last month"
                icon={<Icon icon="tabler:clock" className="size-5" />}
              />
              <StatCard
                label="Bookmarks"
                value="83"
                change={{ value: "–5 removed", trend: "neutral" }}
                icon={<Icon icon="tabler:bookmark" className="size-5" />}
              />
              <StatCard
                label="Streak"
                value="21 days"
                change={{ value: "Personal best!", trend: "up" }}
                icon={<Icon icon="tabler:flame" className="size-5" />}
              />
            </div>
          </Section>

          {/* Badges & Status */}
          <Section id="badges" title="Badges & Status" description="All badge variants and status indicators">
            <ComponentRow label="Badge variants">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Published</Badge>
              <Badge variant="success-light">Active</Badge>
              <Badge variant="warning">Draft</Badge>
              <Badge variant="warning-light">Pending</Badge>
              <Badge variant="destructive">Removed</Badge>
              <Badge variant="destructive-light">Flagged</Badge>
            </ComponentRow>
            <ComponentRow label="Badge sizes">
              <Badge size="sm">sm</Badge>
              <Badge size="default">default</Badge>
              <Badge size="lg">lg</Badge>
            </ComponentRow>
            <ComponentRow label="Avatars">
              <Avatar className="size-6"><AvatarFallback className="text-xs">MC</AvatarFallback></Avatar>
              <Avatar className="size-8"><AvatarFallback className="text-xs">JL</AvatarFallback></Avatar>
              <Avatar className="size-10"><AvatarFallback>AO</AvatarFallback></Avatar>
              <Avatar className="size-12"><AvatarFallback>LV</AvatarFallback></Avatar>
              <AvatarGroup
                size="md"
                items={[
                  { fallback: "MC" }, { fallback: "JL" },
                  { fallback: "AO" }, { fallback: "LV" },
                  { fallback: "RK" }, { fallback: "TN" },
                ]}
                max={4}
              />
            </ComponentRow>
            <ComponentRow label="Status indicators">
              <StatusIndicator status="online" showLabel pulse />
              <StatusIndicator status="busy" showLabel />
              <StatusIndicator status="away" showLabel />
              <StatusIndicator status="idle" showLabel />
              <StatusIndicator status="offline" showLabel />
            </ComponentRow>
            <ComponentRow label="Spinners">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </ComponentRow>
          </Section>

          {/* Progress & Skeleton */}
          <Section id="data" title="Progress & Loading" description="Progress bars and skeleton states">
            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Reading progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Collection complete</span>
                  <span>32%</span>
                </div>
                <Progress value={32} />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Monthly goal</span>
                  <span>91%</span>
                </div>
                <Progress value={91} />
              </div>
            </div>
            <div className="flex flex-col gap-3 max-w-sm">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-3/4 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-[20px]" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-5/6 rounded" />
                <Skeleton className="h-3 w-4/6 rounded" />
              </div>
            </div>
          </Section>

          {/* Navigation */}
          <Section id="navigation" title="Navigation" description="Breadcrumbs, tabs, and pagination">
            <div className="space-y-6">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbLink href="#">Philosophy</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>On Reading Slowly</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Tabs defaultValue="featured">
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="featured" className="mt-4">
                  <p className="text-sm text-muted-foreground">Handpicked essays from our editorial team — updated weekly.</p>
                </TabsContent>
                <TabsContent value="recent" className="mt-4">
                  <p className="text-sm text-muted-foreground">The latest additions to the Library of Minds collection.</p>
                </TabsContent>
                <TabsContent value="bookmarked" className="mt-4">
                  <p className="text-sm text-muted-foreground">Essays you've saved for later reading.</p>
                </TabsContent>
                <TabsContent value="history" className="mt-4">
                  <p className="text-sm text-muted-foreground">Your complete reading history across all sessions.</p>
                </TabsContent>
              </Tabs>

              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Section>

          {/* Rating & Feedback */}
          <Section id="feedback" title="Feedback" description="Alerts, notifications, ratings, and empty states">
            <div className="space-y-4">
              <Alert>
                <Icon icon="tabler:info-circle" className="size-4" />
                <AlertTitle>New essays available</AlertTitle>
                <AlertDescription>12 new essays have been added to your recommended reading list this week.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <Icon icon="tabler:alert-circle" className="size-4" />
                <AlertTitle>Subscription expired</AlertTitle>
                <AlertDescription>Your access to the full collection has ended. Renew to continue reading.</AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3 max-w-md">
              {notifications.map((n) => (
                <Notification
                  key={n.id}
                  title={n.title}
                  description={n.description}
                  variant={n.variant}
                  unread={n.unread}
                  onDismiss={() => setNotifications(prev => prev.filter(x => x.id !== n.id))}
                  icon={<Icon icon="tabler:bell" className="size-4" />}
                />
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Rate this essay</p>
              <Rating value={rating} onChange={setRating} />
              <p className="text-xs text-muted-foreground">{rating} of 5 stars</p>
            </div>

            <EmptyState
              className="max-w-sm"
              icon={<Icon icon="tabler:bookmark-off" className="size-6" />}
              title="No bookmarks yet"
              description="Save essays you want to read later. They'll appear here."
              action={<Button size="sm">Browse Collection</Button>}
            />
          </Section>

          {/* Accordion & Collapsible */}
          <Section id="collapsible" title="Accordion & Collapsible" description="Expandable content sections">
            <div className="grid grid-cols-2 gap-8">
              <Accordion type="single" collapsible>
                <AccordionItem value="reading">
                  <AccordionTrigger>What is deep reading?</AccordionTrigger>
                  <AccordionContent>Deep reading involves slow, immersive engagement with a text — attending to nuance, building on prior knowledge, and allowing ideas to resonate over time.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="curation">
                  <AccordionTrigger>How are essays curated?</AccordionTrigger>
                  <AccordionContent>Our editorial team reads thousands of pieces annually, selecting only those that offer genuine depth, original thinking, and enduring relevance.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="offline">
                  <AccordionTrigger>Can I read offline?</AccordionTrigger>
                  <AccordionContent>Yes. All essays can be downloaded to your device for offline reading. Your highlights and notes sync when you reconnect.</AccordionContent>
                </AccordionItem>
              </Accordion>

              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Show reading statistics
                    <Icon icon="tabler:chevron-down" className="size-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  <div className="rounded-xl bg-secondary/50 p-4 text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Total essays</span><span>247</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Avg. read time</span><span>11.6 min</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Favorite category</span><span>Philosophy</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Reading speed</span><span>280 wpm</span></div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Section>

          {/* Table */}
          <Section id="table" title="Data Table" description="Essay collection with metadata">
            <div className="rounded-[16px] border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reads</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell className="text-muted-foreground">{row.author}</TableCell>
                      <TableCell><Badge variant="secondary">{row.category}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{row.reads}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">Read</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Section>

          {/* Steps */}
          <Section id="steps" title="Steps" description="Onboarding and multi-step flows">
            <div className="space-y-8">
              <Steps steps={stepItems} currentStep={currentStep} orientation="horizontal" />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                  Back
                </Button>
                <Button size="sm" onClick={() => setCurrentStep(Math.min(stepItems.length - 1, currentStep + 1))} disabled={currentStep === stepItems.length - 1}>
                  Next Step
                </Button>
              </div>
              <Steps steps={stepItems.slice(0, 3)} currentStep={1} orientation="vertical" className="max-w-xs" />
            </div>
          </Section>

          {/* Timeline */}
          <Section id="timeline" title="Timeline" description="Chronological event history">
            <Timeline items={timelineItems} className="max-w-md" />
          </Section>

          {/* Overlays */}
          <Section id="overlays" title="Overlays" description="Dialogs, sheets, popovers, tooltips, and dropdowns">
            <ComponentRow label="Dialog & Sheet">
              <Dialog>
                <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start a reading session</DialogTitle>
                    <DialogDescription>Set your focus intention for this reading session. You can track your progress and notes afterward.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-1.5 py-2">
                    <Label>Session goal</Label>
                    <Input placeholder="e.g. Finish On Reading Slowly" />
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Begin Reading</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Delete Account</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This will permanently delete your account, reading history, bookmarks, and all annotations.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Account</AlertDialogCancel>
                    <AlertDialogAction>Delete Permanently</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Sheet>
                <SheetTrigger asChild><Button variant="secondary">Open Sheet</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Reading Settings</SheetTitle>
                    <SheetDescription>Customize your reading experience across all devices.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Dark mode</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Serif font</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Font size</Label>
                      <Slider defaultValue={[65]} min={12} max={100} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </ComponentRow>

            <ComponentRow label="Popover, Tooltip & HoverCard">
              <Popover>
                <PopoverTrigger asChild><Button variant="outline" size="sm">Popover</Button></PopoverTrigger>
                <PopoverContent className="w-64">
                  <p className="text-sm font-medium mb-1">Reading reminder</p>
                  <p className="text-xs text-muted-foreground">You have 3 essays in your queue. Pick up where you left off.</p>
                </PopoverContent>
              </Popover>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline"><Icon icon="tabler:info-circle" className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>View essay details</TooltipContent>
              </Tooltip>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">Maria Chen</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarFallback>MC</AvatarFallback></Avatar>
                    <div>
                      <p className="text-sm font-medium">Maria Chen</p>
                      <p className="text-xs text-muted-foreground">32 essays · Philosophy</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Philosopher and essayist exploring attention, memory, and the inner life of reading.</p>
                </HoverCardContent>
              </HoverCard>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Actions <Icon icon="tabler:chevron-down" className="ml-1 size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Essay options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Icon icon="tabler:bookmark" className="mr-2 size-4" />Bookmark</DropdownMenuItem>
                  <DropdownMenuItem><Icon icon="tabler:share" className="mr-2 size-4" />Share</DropdownMenuItem>
                  <DropdownMenuItem><Icon icon="tabler:download" className="mr-2 size-4" />Download</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive"><Icon icon="tabler:trash" className="mr-2 size-4" />Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentRow>
          </Section>

          {/* Icons */}
          <Section id="icons" title="Icons" description="Tabler icon library — brand-matched selection">
            <div className="grid grid-cols-6 gap-3">
              {ICONS.map((icon) => (
                <div key={icon} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/30 p-4 hover:bg-secondary/60 transition-colors">
                  <Icon icon={icon} className="size-6 text-foreground" />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">{icon.replace("tabler:", "")}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Keyboard Shortcuts */}
          <Section id="kbd" title="Keyboard Shortcuts" description="Command reference for power readers">
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              {[
                { keys: ["⌘", "K"], label: "Open command palette" },
                { keys: ["⌘", "B"], label: "Bookmark current essay" },
                { keys: ["⌘", "F"], label: "Search in essay" },
                { keys: ["⌘", "⇧", "L"], label: "Toggle reading mode" },
                { keys: ["J"], label: "Next essay" },
                { keys: ["K"], label: "Previous essay" },
                { keys: ["Space"], label: "Scroll down" },
                { keys: ["Escape"], label: "Close / go back" },
              ].map(({ keys, label }) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <div className="flex items-center gap-1">
                    {keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* ─── Footer ─────────────────────────────────────────────────── */}
        <div className="border-t border-border mt-8">
          <div className="max-w-5xl mx-auto px-8 py-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-serif">Editorial Dark — Design System</p>
          </div>
        </div>

      </div>
    </TooltipProvider>
  )
}
