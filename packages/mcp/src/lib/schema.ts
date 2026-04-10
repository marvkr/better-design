// Subset of the full schema from packages/shared/src/schema.ts.
// These 4 tables must stay in sync with @better-design/shared if they change.
import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  customType,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const components = pgTable("components", {
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

export const designSystemsRelations = relations(designSystems, ({ many }) => ({
  components: many(components),
}));

export const componentsRelations = relations(components, ({ one }) => ({
  designSystem: one(designSystems, {
    fields: [components.designSystemId],
    references: [designSystems.id],
  }),
}));

export type DesignSystemRecord = typeof designSystems.$inferSelect;
export type NewDesignSystemRecord = typeof designSystems.$inferInsert;
export type ComponentRecord = typeof components.$inferSelect;
export type NewComponentRecord = typeof components.$inferInsert;
export type FoundationalDocRecord = typeof foundationalDocs.$inferSelect;
export type NewFoundationalDocRecord = typeof foundationalDocs.$inferInsert;
export type IconLibraryRecord = typeof iconLibraries.$inferSelect;
export type NewIconLibraryRecord = typeof iconLibraries.$inferInsert;
