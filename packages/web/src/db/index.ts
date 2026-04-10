import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// In Cloudflare Workers, secrets are only available at request time, not at
// module evaluation. We use a Proxy so the drizzle client is created lazily
// on first use (inside a request handler) rather than at startup.
let _db: NeonHttpDatabase<typeof schema> | undefined;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    _db = drizzle(process.env.DATABASE_URL!, { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop: string | symbol) {
    return Reflect.get(getDb(), prop);
  },
});

// Export schema for convenience
export * from "./schema";
