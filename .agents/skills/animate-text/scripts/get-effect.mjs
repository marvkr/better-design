#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const id = process.argv[2]?.trim();

if (!id) {
  process.stderr.write('Usage: node scripts/get-effect.mjs <id>\n');
  process.exit(1);
}

try {
  const effect = JSON.parse(
    readFileSync(new URL(`../assets/effects/${id}.json`, import.meta.url), 'utf8'),
  );
  process.stdout.write(`${JSON.stringify(effect, null, 2)}\n`);
} catch (_error) {
  process.stderr.write(`Unknown effect id: ${id}\n`);
  process.exit(1);
}
