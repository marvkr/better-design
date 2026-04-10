DO $$ BEGIN
  ALTER TABLE "fragments" ADD COLUMN "config" json;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
