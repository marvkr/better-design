// better-design[bot] — GitHub App webhook handler (Cloudflare Worker)
//
// Receives pull_request webhooks, reviews changed UI files for
// accessibility + visual design issues, posts inline PR review comments.
//
// Required env vars (wrangler secrets):
//   GITHUB_APP_ID          — your GitHub App's ID
//   GITHUB_APP_PRIVATE_KEY — PEM private key (base64-encoded)
//   GITHUB_WEBHOOK_SECRET  — webhook secret for signature verification
//   OPENAI_API_KEY         — for GPT-5.4-mini review calls

// ── Review rules (embedded) ──────────────────────────────────────────────────

const REVIEW_RULES = `
## Accessibility (WCAG 2.1)

### Critical Issues
- Images without alt text — WCAG 1.1.1 Non-text Content (Level A)
- Icon-only buttons missing aria-labels — WCAG 4.1.2 Name, Role, Value (Level A)
- Form inputs without labels — WCAG 1.3.1 Info and Relationships (Level A)
- Missing dialog/modal accessibility (role, aria-modal, focus trap, escape) — WCAG 4.1.2

### Serious Issues
- Focus outline removed without replacement — WCAG 2.4.7 Focus Visible (Level AA)
- Missing keyboard event handlers on interactive elements — WCAG 2.1.1 Keyboard (Level A)
- Touch targets under 44px — WCAG 2.5.5 Target Size (Level AAA)
- Color-only information — WCAG 1.4.1 Use of Color (Level A)

### Moderate Issues
- Skipped heading levels — WCAG 1.3.1
- Positive tabIndex values
- Incomplete ARIA attributes

## Visual Design

### Serious Issues
- Contrast ratio below 4.5:1 — WCAG 1.4.3 Contrast Minimum (Level AA)
- Inconsistent spacing values (mixing arbitrary px with design tokens)
- Missing hover/focus/active states on interactive elements

### Moderate Issues
- Mixed font families beyond 2
- Line height issues (body < 1.5, headings < 1.1)
- Z-index conflicts (arbitrary large values)
- Missing button states (hover, focus, active, disabled, loading)
- Incomplete form states (focus, error, disabled)
`;

const SYSTEM_PROMPT = `You are an expert code reviewer for accessibility (WCAG 2.1) and visual design quality.

For each issue found, return a JSON object with:
- file: the file path exactly as given
- line: 1-based line number
- endLine: (optional) end line
- severity: "critical" | "serious" | "moderate"
- ruleId: kebab-case identifier
- category: "accessibility" | "layout" | "typography" | "color" | "components"
- wcag: (optional) WCAG criterion
- snippet: offending code (1-3 lines verbatim)
- message: one-sentence problem description
- fix: concrete fix suggestion (show corrected code when possible)

Only report real issues. Return ONLY a JSON array. No markdown, no explanation.`;

const UI_EXTENSIONS = [".tsx", ".jsx", ".vue", ".svelte", ".html"];

// ── Crypto helpers ───────────────────────────────────────────────────────────

async function verifyWebhookSignature(secret, signature, body) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const digest =
    "sha256=" +
    [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return digest === signature;
}

// ── GitHub App auth (JWT → installation token) ───────────────────────────────

function base64UrlEncode(data) {
  return btoa(String.fromCharCode(...new Uint8Array(data)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Wraps a PKCS#1 RSAPrivateKey DER in the PKCS#8 PrivateKeyInfo envelope
// so it can be imported via crypto.subtle.importKey("pkcs8", ...)
function wrapPkcs1InPkcs8(pkcs1Bytes) {
  const rsaOid = new Uint8Array([
    0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86,
    0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00,
  ]);
  function encodeLength(len) {
    if (len < 0x80) return new Uint8Array([len]);
    if (len < 0x100) return new Uint8Array([0x81, len]);
    return new Uint8Array([0x82, (len >> 8) & 0xff, len & 0xff]);
  }
  const version = new Uint8Array([0x02, 0x01, 0x00]);
  const octetTag = new Uint8Array([0x04]);
  const octetLen = encodeLength(pkcs1Bytes.length);
  const innerLen = version.length + rsaOid.length + octetTag.length + octetLen.length + pkcs1Bytes.length;
  const seqTag = new Uint8Array([0x30]);
  const seqLen = encodeLength(innerLen);
  const result = new Uint8Array(seqTag.length + seqLen.length + innerLen);
  let offset = 0;
  result.set(seqTag, offset); offset += seqTag.length;
  result.set(seqLen, offset); offset += seqLen.length;
  result.set(version, offset); offset += version.length;
  result.set(rsaOid, offset); offset += rsaOid.length;
  result.set(octetTag, offset); offset += octetTag.length;
  result.set(octetLen, offset); offset += octetLen.length;
  result.set(pkcs1Bytes, offset);
  return result;
}

async function createJWT(appId, privateKeyPem) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iat: now - 60, exp: now + 600, iss: appId };

  const encoder = new TextEncoder();
  const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  // GitHub App keys are PKCS#1 (BEGIN RSA PRIVATE KEY). Accept either format.
  const pemBody = privateKeyPem
    .replace(/-----BEGIN (RSA )?PRIVATE KEY-----/, "")
    .replace(/-----END (RSA )?PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const derBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  // If PKCS#1, wrap in PKCS#8 ASN.1 envelope for WebCrypto compatibility
  const isPkcs1 = privateKeyPem.includes("BEGIN RSA PRIVATE KEY");
  const keyData = isPkcs1 ? wrapPkcs1InPkcs8(derBytes) : derBytes;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(signingInput),
  );

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

async function getInstallationToken(appId, privateKey, installationId) {
  const jwt = await createJWT(appId, privateKey);
  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "better-design-bot",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  if (!res.ok) throw new Error(`Failed to get installation token: ${res.status}`);
  const data = await res.json();
  return data.token;
}

// ── GitHub API helpers ───────────────────────────────────────────────────────

async function githubAPI(token, url, method = "GET", body = null) {
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "better-design-bot",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function getPRFiles(token, owner, repo, prNumber) {
  const files = await githubAPI(
    token,
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=100`,
  );
  return files
    .filter((f) => UI_EXTENSIONS.some((ext) => f.filename.endsWith(ext)))
    .filter((f) => f.status !== "removed");
}

function parseDiffLines(patch) {
  if (!patch) return new Set();
  const lines = new Set();
  let lineNum = 0;
  for (const line of patch.split("\n")) {
    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (hunkMatch) {
      lineNum = parseInt(hunkMatch[1], 10);
      continue;
    }
    if (line.startsWith("-")) continue;
    if (line.startsWith("+")) {
      lines.add(lineNum);
      lineNum++;
    } else {
      lineNum++;
    }
  }
  return lines;
}

async function getFileContent(token, owner, repo, path, ref) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const data = await githubAPI(
    token,
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${ref}`,
  );
  return atob(data.content.replace(/\s/g, ""));
}

// ── OpenAI review ────────────────────────────────────────────────────────────

async function analyzeFiles(files, openaiKey) {
  const fileBlocks = files
    .map((f) => `--- ${f.path} ---\n${f.content}`)
    .join("\n\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      temperature: 0.1,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `## Review Rules\n\n${REVIEW_RULES}\n\n## Files to Review\n\n${fileBlocks}`,
        },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : parsed.findings ?? [];
    return arr.filter(
      (f) =>
        f.file && f.line && f.severity && f.message && f.fix && f.snippet,
    );
  } catch {
    return [];
  }
}

// ── Build PR review ──────────────────────────────────────────────────────────

function calculateScore(findings) {
  const points = { critical: 20, serious: 10, moderate: 5 };
  return Math.max(
    0,
    100 - findings.reduce((s, f) => s + (points[f.severity] || 0), 0),
  );
}

function buildReviewBody(findings, score, filesReviewed) {
  if (findings.length === 0) {
    return `### ✅ Better Design Review\n\nNo accessibility or design issues found across ${filesReviewed} file(s). Score: **${score}/100**`;
  }

  const counts = { critical: 0, serious: 0, moderate: 0 };
  for (const f of findings) counts[f.severity]++;

  const parts = [];
  if (counts.critical) parts.push(`🔴 ${counts.critical} critical`);
  if (counts.serious) parts.push(`🟡 ${counts.serious} serious`);
  if (counts.moderate) parts.push(`🔵 ${counts.moderate} moderate`);

  const lines = [
    "### Better Design Review\n",
    `**Score:** ${score}/100 — ${parts.join(", ")}\n`,
    `Reviewed ${filesReviewed} UI file(s).\n`,
  ];

  const grouped = {};
  for (const f of findings) {
    if (!grouped[f.file]) grouped[f.file] = [];
    grouped[f.file].push(f);
  }

  for (const [file, ff] of Object.entries(grouped)) {
    lines.push(`\n#### \`${file}\`\n`);
    for (const f of ff) {
      const icon = f.severity === "critical" ? "🔴" : f.severity === "serious" ? "🟡" : "🔵";
      const wcag = f.wcag ? ` — ${f.wcag}` : "";
      lines.push(`${icon} **Line ${f.line}** [${f.severity}] ${f.message}${wcag}`);
      lines.push(`\`\`\`\n${f.snippet}\n\`\`\``);
      lines.push(`→ ${f.fix}\n`);
    }
  }

  return lines.join("\n");
}

function buildInlineComments(findings) {
  return findings
    .map((f) => {
      const icon = f.severity === "critical" ? "🔴" : f.severity === "serious" ? "🟡" : "🔵";
      const wcag = f.wcag ? `\n\n**${f.wcag}**` : "";
      return {
        path: f.file,
        line: f.line,
        body: `${icon} **[${f.severity}]** ${f.message}\n\n\`\`\`suggestion\n${f.fix}\n\`\`\`${wcag}`,
      };
    })
    .slice(0, 50);
}

// ── Main webhook handler ─────────────────────────────────────────────────────

async function handlePullRequest(event, env) {
  const action = event.action;
  if (action !== "opened" && action !== "synchronize") return;

  const pr = event.pull_request;
  const repo = event.repository;
  const installationId = event.installation.id;
  const owner = repo.owner.login;
  const repoName = repo.name;
  const prNumber = pr.number;
  const headSha = pr.head.sha;

  const token = await getInstallationToken(
    env.GITHUB_APP_ID,
    env.GITHUB_APP_PRIVATE_KEY,
    installationId,
  );

  const changedFiles = await getPRFiles(token, owner, repoName, prNumber);
  if (changedFiles.length === 0) return;

  const commentableLines = new Map();
  const files = [];
  for (const f of changedFiles.slice(0, 20)) {
    try {
      const content = await getFileContent(
        token,
        owner,
        repoName,
        f.filename,
        headSha,
      );
      files.push({ path: f.filename, content });
      commentableLines.set(f.filename, parseDiffLines(f.patch));
    } catch {
      // skip unreadable files
    }
  }

  if (files.length === 0) return;

  const findings = await analyzeFiles(files, env.OPENAI_API_KEY);
  const score = calculateScore(findings);

  const commentable = findings.filter((f) => {
    const lines = commentableLines.get(f.file);
    return lines && lines.has(f.line);
  });

  const hasCritical = findings.some((f) => f.severity === "critical");
  const reviewEvent =
    findings.length === 0
      ? "APPROVE"
      : hasCritical
        ? "REQUEST_CHANGES"
        : "COMMENT";

  await githubAPI(
    token,
    `https://api.github.com/repos/${owner}/${repoName}/pulls/${prNumber}/reviews`,
    "POST",
    {
      commit_id: headSha,
      body: buildReviewBody(findings, score, files.length),
      event: reviewEvent,
      comments: buildInlineComments(commentable),
    },
  );
}

// ── Cloudflare Worker entrypoint ─────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          name: "better-design-bot",
          description: "Accessibility & design reviewer for pull requests",
          version: "1.0.0",
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const signature = request.headers.get("x-hub-signature-256");
    const eventType = request.headers.get("x-github-event");
    const body = await request.text();

    if (!signature || !eventType) {
      return new Response("Missing headers", { status: 400 });
    }

    const valid = await verifyWebhookSignature(
      env.GITHUB_WEBHOOK_SECRET,
      signature,
      body,
    );
    if (!valid) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (eventType === "ping") {
      return new Response("pong", { status: 200 });
    }

    if (eventType === "pull_request") {
      const event = JSON.parse(body);
      ctx.waitUntil(handlePullRequest(event, env));
      return new Response("ok", { status: 200 });
    }

    return new Response("Ignored event", { status: 200 });
  },
};
