# better-design[bot] Setup

## 1. Register the GitHub App

Go to **https://github.com/settings/apps/new** and configure:

| Field | Value |
|---|---|
| App name | `better-design` |
| Homepage URL | `https://better-design.com` |
| Webhook URL | `https://better-design-bot.<your-account>.workers.dev` |
| Webhook secret | Generate one: `openssl rand -hex 32` |

### Permissions

| Permission | Access |
|---|---|
| Pull requests | Read & Write |
| Contents | Read-only |

### Subscribe to events

- [x] Pull request

Click **Create GitHub App**, then generate a private key (downloads a `.pem` file).

## 2. Deploy the Worker

```bash
cd packages/review/bot

# Set secrets
wrangler secret put GITHUB_APP_ID
wrangler secret put GITHUB_APP_PRIVATE_KEY    # paste the .pem contents
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put OPENAI_API_KEY

# Deploy
wrangler deploy
```

## 3. Install the App

Go to `https://github.com/apps/better-design` → Install → select repositories.

Every PR that touches `.tsx/.jsx/.vue/.svelte/.html` files will get an automated review from `better-design[bot]`.

## How it works

```
PR opened/updated
  → GitHub sends webhook to Cloudflare Worker
  → Worker fetches changed UI files via GitHub API
  → Sends files + WCAG/design rules to GPT-5.4-mini
  → Posts PR review with inline comments as better-design[bot]
  → REQUEST_CHANGES on critical, APPROVE when clean
```

## Environment variables

| Secret | Description |
|---|---|
| `GITHUB_APP_ID` | Numeric ID from the app settings page |
| `GITHUB_APP_PRIVATE_KEY` | PEM private key (full contents) |
| `GITHUB_WEBHOOK_SECRET` | The secret you set during app creation |
| `OPENAI_API_KEY` | Your OpenAI API key |
