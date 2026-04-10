CREATE TABLE IF NOT EXISTS "mcp_waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mcp_waitlist_email_unique" UNIQUE("email")
);
