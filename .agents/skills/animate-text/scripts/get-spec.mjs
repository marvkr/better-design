#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const id = process.argv[2]?.trim();

if (!id) {
  process.stderr.write('Usage: node scripts/get-spec.mjs <id>\n');
  process.exit(1);
}

try {
  const spec = JSON.parse(
    readFileSync(new URL(`../assets/specs/${id}.json`, import.meta.url), 'utf8'),
  );
  process.stdout.write(`${JSON.stringify(spec, null, 2)}\n`);
} catch (_error) {
  process.stderr.write(`Unknown spec id: ${id}\n`);
  process.exit(1);
}
