import { Template, waitForPort } from "e2b";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dockerfile = fs.readFileSync(
  path.join(__dirname, "Dockerfile"),
  "utf-8"
);

export const template = Template()
  .fromDockerfile(dockerfile)
  .setStartCmd("npm run dev", waitForPort(3000));
