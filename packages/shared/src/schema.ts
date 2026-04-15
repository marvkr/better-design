import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  json,
  integer,
  serial,
  boolean,
  customType,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// ─── Custom Types ─────────────────────────────────────────────────────────────

const vector = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return "vector(768)";
  },
  toDriver(value: number[]): string {
    return `[${value.join(",")}]`;
  },
  fromDriver(value: string): number[] {
    return value
      .slice(1, -1)
      .split(",")
      .map((n) => parseFloat(n));
  },
});

// ─── Enums ────────────────────────────────────────────────────────────────────

export const messageRoleEnum = pgEnum("message_role", ["USER", "ASSISTANT"]);
export const messageTypeEnum = pgEnum("message_type", ["RESULT", "ERROR"]);
export const designSystemStatusEnum = pgEnum("design_system_status", [
  "PENDING",
  "SELECTED",
  "GENERATING",
  "COMPLETED",
  "ERROR",
]);

// ─── JSON Column Types ────────────────────────────────────────────────────────

export const designConfigSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    muted: z.string(),
    destructive: z.string(),
    background: z.string(),
    foreground: z.string(),
    card: z.string(),
    cardForeground: z.string(),
    popover: z.string(),
    popoverForeground: z.string(),
    border: z.string(),
    input: z.string(),
    ring: z.string(),
  }).partial(),
  radius: z.string(),
  font: z.object({
    sans: z.string(),
    mono: z.string(),
  }).partial(),
  icons: z.object({
    libraryId: z.string(),
    variant: z.string().nullable(),
  }).partial(),
}).partial();

export type DesignConfig = z.infer<typeof designConfigSchema>;

export interface DesignSystemRecommendation {
  id: string;
  title: string;
  description: string;
  personality: string[];
  matchScore: number;
}

export interface SuggestedIconLibrary {
  id: string;
  name: string;
  prefix: string;
  variants: string[] | null;
  defaultVariant: string | null;
  matchScore: number;
}

export interface MessageMetadata {
  type: "recommendation";
  recommendations: DesignSystemRecommendation[];
  suggestedIconLibrary?: SuggestedIconLibrary | null;
}

// ─── Tables ───────────────────────────────────────────────────────────────────

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  designSystemId: text("design_system_id"),
  designSystemStatus: designSystemStatusEnum("design_system_status"),
  currentStep: text("current_step"),
  iconLibraryId: text("icon_library_id"),
  iconVariant: text("icon_variant"),
  isAnonymous: boolean("is_anonymous").default(false).notNull(),
  sandboxUrl: text("sandbox_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull(),
  type: messageTypeEnum("type").notNull(),
  metadata: json("metadata").$type<MessageMetadata | null>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
});

export const fragments = pgTable("fragments", {
  id: uuid("id").primaryKey().defaultRandom(),
  messageId: uuid("message_id")
    .notNull()
    .unique()
    .references(() => messages.id, { onDelete: "cascade" }),
  sandboxUrl: text("sandbox_url").notNull(),
  title: text("title").notNull(),
  files: json("files").notNull(),
  config: json("config").$type<DesignConfig | null>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usage = pgTable("usage", {
  key: text("key").primaryKey(),
  points: integer("points").notNull(),
  expire: timestamp("expire"),
});

// Better-Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  plan: text("plan").notNull().default("free"),
  isAdmin: boolean("is_admin").notNull().default(false),
  bonusClaimed: boolean("bonus_claimed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Design System Tables
export const designSystems = pgTable("design_systems", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  personality: text("personality").array().notNull(),
  industry: text("industry").array().notNull(),
  componentCount: integer("component_count").default(0),
  primaryColor: text("primary_color"),
  borderRadius: text("border_radius"),
  font: text("font"),
  rawContent: text("raw_content").notNull(),
  embedding: vector("embedding"),
  iconLibraryId: text("icon_library_id"),
  iconVariant: text("icon_variant"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const designSystemComponents = pgTable("components", {
  id: serial("id").primaryKey(),
  designSystemId: text("design_system_id")
    .notNull()
    .references(() => designSystems.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  useCases: text("use_cases").array(),
  language: text("language"),
  destination: text("destination"),
  code: text("code").notNull(),
});

export const foundationalDocs = pgTable("foundational_docs", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  embedding: vector("embedding"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(),
  keyPrefix: text("key_prefix").notNull(),
  lastUsedAt: timestamp("last_used_at"),
  revokedAt: timestamp("revoked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectEvents = pgTable(
  "project_events",
  {
    id: serial("id").primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(),
    data: json("data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("project_events_project_id_id_idx").on(t.projectId, t.id)],
);

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source").default("homepage").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inviteTokens = pgTable("invite_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  token: text("token").notNull().unique(),
  email: text("email").notNull(),
  note: text("note"),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const iconLibraries = pgTable("icon_libraries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  prefix: text("prefix").notNull(),
  iconCount: integer("icon_count"),
  license: text("license"),
  category: text("category"),
  tags: text("tags").array().notNull(),
  description: text("description"),
  variants: text("variants").array(),
  defaultVariant: text("default_variant"),
  variantFormat: text("variant_format"),
  embedding: vector("embedding"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Relations ────────────────────────────────────────────────────────────────

export const projectsRelations = relations(projects, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  project: one(projects, {
    fields: [messages.projectId],
    references: [projects.id],
  }),
  fragment: one(fragments, {
    fields: [messages.id],
    references: [fragments.messageId],
  }),
}));

export const fragmentsRelations = relations(fragments, ({ one }) => ({
  message: one(messages, {
    fields: [fragments.messageId],
    references: [messages.id],
  }),
}));

export const designSystemsRelations = relations(designSystems, ({ many }) => ({
  components: many(designSystemComponents),
}));

export const designSystemComponentsRelations = relations(
  designSystemComponents,
  ({ one }) => ({
    designSystem: one(designSystems, {
      fields: [designSystemComponents.designSystemId],
      references: [designSystems.id],
    }),
  }),
);

// ─── Drizzle-Zod Schemas ──────────────────────────────────────────────────────

export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);

export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

export const insertFragmentSchema = createInsertSchema(fragments);
export const selectFragmentSchema = createSelectSchema(fragments);

export const insertDesignSystemSchema = createInsertSchema(designSystems);
export const selectDesignSystemSchema = createSelectSchema(designSystems);

export const insertDesignSystemComponentSchema = createInsertSchema(designSystemComponents);
export const selectDesignSystemComponentSchema = createSelectSchema(designSystemComponents);

export const insertFoundationalDocSchema = createInsertSchema(foundationalDocs);
export const selectFoundationalDocSchema = createSelectSchema(foundationalDocs);

export const insertIconLibrarySchema = createInsertSchema(iconLibraries);
export const selectIconLibrarySchema = createSelectSchema(iconLibraries);

export const insertApiKeySchema = createInsertSchema(apiKeys);
export const selectApiKeySchema = createSelectSchema(apiKeys);

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export const insertInviteTokenSchema = createInsertSchema(inviteTokens);
export const selectInviteTokenSchema = createSelectSchema(inviteTokens);

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type Fragment = typeof fragments.$inferSelect;
export type NewFragment = typeof fragments.$inferInsert;

export type Usage = typeof usage.$inferSelect;
export type NewUsage = typeof usage.$inferInsert;

export type DesignSystem = typeof designSystems.$inferSelect;
export type NewDesignSystem = typeof designSystems.$inferInsert;

export type DesignSystemComponent = typeof designSystemComponents.$inferSelect;
export type NewDesignSystemComponent = typeof designSystemComponents.$inferInsert;

export type FoundationalDoc = typeof foundationalDocs.$inferSelect;
export type NewFoundationalDoc = typeof foundationalDocs.$inferInsert;

export type IconLibrary = typeof iconLibraries.$inferSelect;
export type NewIconLibrary = typeof iconLibraries.$inferInsert;

export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;

export type ProjectEvent = typeof projectEvents.$inferSelect;
export type NewProjectEvent = typeof projectEvents.$inferInsert;

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
