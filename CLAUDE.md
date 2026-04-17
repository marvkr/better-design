# Better Design

Monorepo with `packages/web` (Next.js app) and `packages/mcp` (MCP server).

## Web App (`packages/web`)

## Testing & Git Workflow

**CRITICAL: Always build and test before pushing**

1. **NEVER push code without building first**
2. **Pre-push workflow:**
   - Make code changes
   - Run `cd packages/web && bun run build` — **mandatory before every push**
   - Run `cd packages/web && npx wrangler deploy --dry-run` — **mandatory before every push** (verifies the Cloudflare Worker build)
   - If either build fails, fix the errors and rebuild both
   - Test locally using Chrome MCP or manual testing
   - Verify changes work as expected
   - Check for errors in logs/console
   - Only after confirming both builds pass and everything works → commit
   - Only after successful commit → push

3. **When staging files, check for dependencies:**
   - If a modified file imports a new/moved file, that file MUST also be staged
   - Run `git diff --cached` after staging to review ALL changes that will be committed
   - Verify every import in the diff resolves to a file that exists or is also staged

4. **Local build passing ≠ CI will pass. Before every push, run `git status` and check for unstaged changes from OTHER sessions.**
   - The local build sees ALL files on disk (staged, unstaged, untracked). CI only sees what's committed.
   - If `component-showcase.tsx` or `ds-registry.ts` imports a new DS (e.g. `TvStyleButton`), the DS files AND the registry exports AND the showcase imports ALL must be committed together — not just the ones you touched.
   - Never `git add` files from another session without understanding what they are. If you find untracked DS directories or modified registry files you didn't write, ask before committing them.
   - **Pre-push check**: `git diff --name-only` (unstaged) + `git ls-files --others --exclude-standard` (untracked) — if anything there is imported by files you ARE committing, stage it too or the build breaks on CI.
   - **Always check `bun.lock`**: if `git diff bun.lock` shows changes, a dependency was added in another session. CI uses `--frozen-lockfile` so it will fail if the lock file is stale. Stage `bun.lock` alongside any new dependency.

5. **If build or tests fail:**
   - Fix the issues
   - Rebuild (`bun run build`)
   - Re-test
   - Commit the fixes
   - Only then push

**Never assume code works - always verify it first.**

## Component Structure (SOLID)

**One component per file.** Never inline new components into existing large files. Extract them into their own file and import them. Keep files focused on a single responsibility — if you're adding a new UI piece (pill, sidebar, modal, etc.), it gets its own file.

## Wiring Rule

**NEVER create functions, helpers, or utilities without wiring them up to the actual call site.** If you build something (alert, hook, handler, etc.), you MUST also connect it where it gets triggered. Dead code is worse than no code — it gives a false sense of coverage. Always verify new code is actually called by tracing the execution path end-to-end.

## Generating Design Systems (`design-systems/<name>/`)

- **Always generate the full component set** — every new DS ships with the same ~87 components as every other DS (accordion → typography, plus `_shared.ts`, `globals.css`, `utils.ts`). Never ship a partial DS with only a handful of components. The fastest path: copy an existing DS whose theme is closest (e.g. `lumen-dark` for dark DSes, `airbnb` for light) and re-skin its tokens + signature components.
- Extract actual computed styles from the source site via Chrome DevTools. Don't guess.
- Build only the primitives the source uses. Extrapolate the rest in the same language.
- Use semantic tokens only: `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`. No `dark:` variants, no raw `bg-white`/`bg-neutral-*`.
- No `shadow-md`/`lg`/`xl`/`2xl` on popover surfaces unless the source has them. Border-only by default.
- Form fields (Input, Textarea, PasswordInput, SearchInput, NumberInput, PhoneInput, InputOTP) import a single `formFieldBase` constant from `./_shared.ts`.
- Each DS picks its own icon library (Phosphor, Solar, Lucide, Tabler, etc.). The Tabler rule below is for the app, not DSs.
- If the DS has sound: wire `playClick`/`playTick` into every interactive primitive (Button, Checkbox, Switch, RadioGroup, Toggle, Item), not just Button.
- **All imports use `@/lib/utils`**, never `../utils` — DS components are served via the shadcn registry and land in the user's `components/ui/` where `@/lib/utils` is the standard path.

**Post-generation audit (mandatory before committing):**
After generating or modifying a design system, audit EVERY component file against the DS's theme:
1. **Shadows** — scan for `shadow-md`/`lg`/`xl`/`2xl` and custom `rgba` shadows. Light DSes should have subtle shadows (`rgba(0,0,0,0.06-0.12)`); only dark DSes may use heavier values. Popover surfaces (dropdown, select, popover, context-menu, tooltip, command, navigation-menu) must match the DS's shadow token, not the shadcn default.
2. **Semantic tokens** — `bg-secondary` renders as the DS's secondary color. If secondary is dark (#222), using it as an input surface is wrong. Check every `bg-secondary`, `bg-foreground`, `bg-primary` usage in context.
3. **Border-radius** — match the source site. Airbnb is rounder (12-16px on containers); Linear is sharper (8px). Don't leave shadcn's default `rounded-md` (6px) if the source site uses bigger radii.
4. **Popover surfaces** — dropdown-menu, select, context-menu, popover, tooltip, hover-card, menubar, command, navigation-menu ALL need consistent shadow + radius + border treatment. Check every one, not just the first you see.
5. **Typography** — confirm `globals.css` declares the right font-family (not Geist if the source uses a different font).
6. **Use the MCP to verify** — call `get-review-rules({ category: "visual-design" })` and check the generated components against those rules. Also call `get-ui-principle({ topic: "depth" })` to verify shadow/elevation decisions match the principle docs.

**Wiring checklist (all 6 or the showcase falls back to Linear):**
1. `packages/web/src/app/(home)/page.tsx` — `DS_META`
2. `packages/web/src/app/design-systems/page.tsx` — `DS_META`
3. `packages/web/src/app/design-systems/[id]/page.tsx` — `DS_META` + per-DS `<style>` block if the DS needs custom fonts/overrides
4. `packages/web/src/app/design-systems/[id]/ds-registry.ts` — exports for Button, Card, Input, Textarea, Badge, CodeTabs, Cursor
5. `packages/web/src/app/design-systems/[id]/component-showcase.tsx` — imports + MAP entries
6. `packages/web/src/app/design-systems/preview-card.tsx` — `DS_STYLE` entry

Add each import and the MAP entry referencing it in the same edit (IDE auto-fixer strips unused imports on save).

**Do not modify** `packages/web/src/app/globals.css`'s `[data-ds] :is(h1,h2,h3,h4,h5,h6) { font-family: inherit; font-weight: inherit; letter-spacing: inherit; }` rule. Without it, the app's global serif-heading style leaks into every DS showcase.

## Icons

Use **Tabler** icons via `@iconify/react` in the Better Design **app** code (`packages/web`). Tabler has brand icons (Supabase, Airbnb, etc.) plus comprehensive UI icons. Note: this rule does NOT apply to generated design systems — those pick their own icon library.

```tsx
import { Icon } from "@iconify/react";

// UI icons
<Icon icon="tabler:arrow-right" />
<Icon icon="tabler:settings" />
<Icon icon="tabler:user" />

// Brand icons
<Icon icon="tabler:brand-supabase" />
<Icon icon="tabler:brand-airbnb" />
<Icon icon="tabler:brand-github" />

// Filled variant
<Icon icon="tabler:heart-filled" />
```

**Variants:** `outline` (default), `filled`

**Do NOT use:** `lucide-react` for new code - migrate existing usage to Tabler when touching those files.

## Styling

- **Theme:** Linear-style dark theme with purple accents
- **Primary color:** OKLCH purple (`--primary` in globals.css)
- **Buttons:** Gradient primary/secondary with `rounded-lg`
- **Background:** Uses `--background` CSS variable

## Code Review

**Proactive Accessibility & Design Review:**

After building UI components, automatically review for accessibility and visual design issues:

1. Call `get-review-rules` MCP tool to fetch review guidelines
2. Check code against WCAG 2.1 and design system rules
3. Fix any critical or serious issues found
4. Present clean, production-ready code

**When to auto-review:**
- UI components (buttons, modals, forms, inputs, cards, etc.)
- Pages with user interactions
- Anything rendering to the screen

**When to skip:**
- Backend code, API routes, utilities
- TypeScript types and interfaces
- Configuration files
- Documentation

## Package Manager

**ALWAYS use `bun`** - never use npm, yarn, or pnpm.

```bash
bun install    # install dependencies
bun run <script>  # run scripts
bun typecheck  # check types
bun build      # build the project
```

## Dev Server

Run without Turbopack (monorepo compatibility issue):
```bash
bun dev        # runs next dev (no turbopack)
bun dev:next   # next only
```

## API → Hooks Pattern (Hono RPC + TanStack Query)

This project uses Hono RPC for end-to-end type-safe APIs. Follow this pattern exactly.

### 1. Define the Hono route (`packages/web/src/server/api/routes/<resource>.ts`)

```ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db, projects } from "@/db";

const projectsRoute = new Hono()
  .get("/", async (c) => {
    const result = await db.query.projects.findMany();
    return c.json(result);
  })
  .post(
    "/",
    zValidator("json", z.object({ name: z.string().min(1) })),
    async (c) => {
      const { name } = c.req.valid("json");
      const [created] = await db.insert(projects).values({ name }).returning();
      return c.json(created);
    },
  );

export default projectsRoute;
```

### 2. Register the route in the router (`src/server/api/routes/index.ts`)

```ts
import projectsRoute from "./projects";
const routes = app.route("/projects", projectsRoute);
export type ApiType = typeof routes;
```

### 3. The API client is already set up (`src/lib/api-client.ts`)

```ts
import { hc } from "hono/client";
import type { ApiType } from "@/server/api/routes";
export const apiClient = hc<ApiType>(getBaseUrl());
```

### 4. Create a query hook (`src/hooks/use-get-<resource>.ts`)

```ts
import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export type ProjectsResponseType = InferResponseType<
  typeof apiClient.api.projects.$get,
  200
>;

export const useGetProjects = () => {
  return useQuery<ProjectsResponseType>({
    queryKey: ["projects", "getMany"],
    queryFn: async () => {
      const response = await apiClient.api.projects.$get();
      if (!response.ok) {
        const body = await response.json() as { code?: string; message?: string };
        throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
      }
      return response.json();
    },
  });
};
```

### 5. Create a mutation hook (`src/hooks/use-create-<resource>.ts`)

```ts
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type ResponseType = InferResponseType<typeof apiClient.api.projects.$post, 200>;
type RequestType = InferRequestType<typeof apiClient.api.projects.$post>["json"];

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async (json) => {
      const response = await apiClient.api.projects.$post({ json });
      if (!response.ok) {
        const body = await response.json() as { code?: string; message?: string };
        throw new ApiError(body.code ?? "UNKNOWN", body.message ?? "Something went wrong");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", "getMany"] });
    },
  });
};
```

**Rules:**
- Always use `InferResponseType` / `InferRequestType` from `hono` — never manually type API responses
- Always throw `ApiError` (not plain `Error`) so error handling is consistent
- Query keys follow `[resource, operation]` pattern: `["projects", "getMany"]`, `["projects", "getOne", id]`
- Mutations invalidate related queries in `onSuccess`
- One hook per file, named `use-<verb>-<resource>.ts`

## Tech Stack

- Next.js 15 (App Router)
- Hono (API server with RPC client)
- TanStack Query (server state)
- Drizzle ORM + Postgres (via Neon)
- Tailwind CSS v4
- Radix UI primitives
- better-auth for authentication
- Inngest for background jobs

## Canonical Schema Path

Database schemas live at **one canonical path** and are imported everywhere — never redefined inline in components, hooks, or routes. See the global `drizzle-schema-patterns` skill for the full rule set.

- **Schema file**: `packages/web/src/db/schema.ts`
- **Import alias**: `@/db` (re-exports tables, Zod schemas, and types from `schema.ts`)
- **Zod schemas**: generated via `drizzle-zod` (`createInsertSchema`, `createSelectSchema`) in the same file
- **Type inference**: use `typeof table.$inferSelect` / `$inferInsert` — never hand-write database types

## Platforms

Monorepo has three platforms, used by `/daily-update`, `/weekly-update`, and commit scope conventions:

| Platform           | Path              | Notes                                               |
|--------------------|-------------------|-----------------------------------------------------|
| **Web**            | `packages/web`    | Next.js app + Hono API (default platform)           |
| **MCP**            | `packages/mcp`    | MCP server (stdio, published to npm as `better-design-mcp`) |
| **Shared**         | `packages/shared` | Shared code consumed by both `web` and `mcp`        |

Commit scopes: use `(web)`, `(mcp)`, or `(shared)` when applicable.

## Linear

Tickets are tracked in the Linear **Better Design** team.

- **Team name**: `Better Design`
- **Team ID**: `cb30d340-53dc-4f3d-b763-8baa890bf7cd`
- **Assignee**: always `me` (matches the global rule in `~/.claude/CLAUDE.md`)
- Used by `/create-ticket` and `/daily-update` / `/weekly-update` for ticket lookup

## Tickets

- **Prefix**: `BD-` (e.g., `[BD-42]`)
- **Commit reference format**: `<type>(<scope>): <description> [BD-42]` — ticket reference at the end in square brackets
- `/daily-update` and `/weekly-update` strip `[BD-\d+]` from commit messages when formatting updates

## PostHog

Used for product analytics and session replay. Events are instrumented server-side via `posthog-node` (see `packages/web/src/lib/posthog.ts`).

- **Project ID**: `374244`
- **UI host**: `https://us.posthog.com` (dashboards, replays, insights)
- **Ingestion host**: `https://us.i.posthog.com` (API calls from `posthog-node` client — already set in `packages/web/.env` as `POSTHOG_HOST`)
- **Client**: `posthog-node` singleton at `packages/web/src/lib/posthog.ts` (accessed via `getPostHog()`)
- **Identification**: every new signup identified in `better-auth` database hook with `email` + `name`
- **Error tracking**: Hono `onError` forwards unhandled exceptions via `captureException`
- **Project-local skill**: `packages/web/.claude/skills/integration-javascript_node/` — tailored PostHog integration guidance installed by the PostHog wizard. Use this skill when adding new events or modifying PostHog instrumentation.

### Instrumented events

| Event                            | Description                                        | File                                          |
|----------------------------------|----------------------------------------------------|-----------------------------------------------|
| `user_signed_up`                 | New user account created                           | `src/lib/auth.ts`                             |
| `project_created`                | Authenticated user creates a project               | `src/server/api/routes/projects.ts`           |
| `anonymous_project_created`      | Anonymous visitor creates a project (free trial)   | `src/server/api/routes/projects.ts`           |
| `design_system_selected`         | User selects a design system                       | `src/server/api/routes/projects.ts`           |
| `message_sent`                   | User sends a follow-up / iterates on a project     | `src/server/api/routes/messages.ts`           |
| `api_key_created`                | User creates a new API key                         | `src/server/api/routes/api-keys.ts`           |
| `api_key_revoked`                | User revokes an API key                            | `src/server/api/routes/api-keys.ts`           |
| `waitlist_joined`                | Visitor joins the MCP waitlist                     | `src/server/api/routes/waitlist.ts`           |
| `bonus_claimed`                  | User claims bonus credits                          | `src/server/api/routes/claim-bonus.ts`        |
| `fragment_config_updated`        | User customises a fragment's design config        | `src/server/api/routes/fragments.ts`          |
| `component_generation_completed` | AI agent successfully generates a component       | `src/inngest/functions.ts`                    |
| `component_generation_failed`    | AI agent fails to generate a component             | `src/inngest/functions.ts`                    |

### Key dashboards

- [Analytics basics](https://us.posthog.com/project/374244/dashboard/1444643)
- [Project Creation: Authenticated vs Anonymous](https://us.posthog.com/project/374244/insights/UA7HP3ad)
- [User Activation Funnel (Signup → Project → Component)](https://us.posthog.com/project/374244/insights/9AqOIY0t)
- [Component Generation: Success vs Failure](https://us.posthog.com/project/374244/insights/iRN1jHvU)
- [Weekly Growth: Signups, API Keys & Activations](https://us.posthog.com/project/374244/insights/q8yUYWax)
- [MCP Waitlist Joins & User Engagement](https://us.posthog.com/project/374244/insights/AIvvSY4L)

## Research

Screenshot / reference research folder for `/mobbin-research` and ad-hoc design research:

- **Path**: `./research/` (project root, relative)
- Structure: `research/<feature>/<platform>/<app>-<screen>-<description>.png`
