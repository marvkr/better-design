CREATE TABLE IF NOT EXISTS "icon_libraries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"prefix" text NOT NULL,
	"icon_count" integer,
	"license" text,
	"category" text,
	"tags" text[] NOT NULL,
	"description" text,
	"variants" text[],
	"default_variant" text,
	"variant_format" text,
	"embedding" vector(768),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "design_systems" ADD COLUMN "icon_library_id" text;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "design_systems" ADD COLUMN "icon_variant" text;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "projects" ADD COLUMN "icon_library_id" text;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "projects" ADD COLUMN "icon_variant" text;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
