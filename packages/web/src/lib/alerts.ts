/**
 * Telegram alert system for abuse detection.
 * Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your environment to enable.
 *
 * Get a bot token: message @BotFather on Telegram → /newbot
 * Get your chat ID: message @userinfobot on Telegram
 */

function getConfig() {
  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  }
}

function isConfigured(): boolean {
  const { botToken, chatId } = getConfig()
  return !!(botToken && chatId)
}

function escape(text: string): string {
  // Escape MarkdownV2 reserved characters
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, "\\$&")
}

async function sendMessage(text: string): Promise<void> {
  if (!isConfigured()) return

  try {
    const { botToken, chatId } = getConfig()
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      console.error("[alerts] Telegram API error:", res.status, await res.text().catch(() => ""))
    }
  } catch (err) {
    console.error("[alerts] Failed to send Telegram message:", err)
  }
}

export type AlertSeverity = "warning" | "critical"

const DANGER_EMOJI = "🚨"
const GOOD_EMOJI = "🟢"

interface AlertOptions {
  severity?: AlertSeverity
  ip?: string
  userId?: string
  endpoint?: string
  detail?: string
}

export async function sendAlert(
  title: string,
  options: AlertOptions = {},
): Promise<void> {
  const { ip, userId, endpoint, detail } = options
  const emoji = DANGER_EMOJI
  const env = process.env.NODE_ENV === "production" ? "prod" : "dev"
  const now = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " UTC"

  const lines: string[] = [
    `${emoji} *${escape(title)}*`,
    ``,
    `🕐 ${escape(now)}`,
    `🌍 Env: \`${escape(env)}\``,
  ]

  if (endpoint) lines.push(`📍 Endpoint: \`${escape(endpoint)}\``)
  if (ip) lines.push(`🖥 IP: \`${escape(ip)}\``)
  if (userId) lines.push(`👤 User: \`${escape(userId)}\``)
  if (detail) lines.push(`📝 ${escape(detail)}`)

  await sendMessage(lines.join("\n"))
}

// ─── Typed alert helpers ───────────────────────────────────────────────────

export async function alertRateLimit(ip: string, endpoint: string): Promise<void> {
  await sendAlert("Rate limit hit", {
    severity: "warning",
    ip,
    endpoint,
    detail: "IP exceeded request limit",
  })
}

export async function alertAnonAbuse(ip: string, endpoint: string): Promise<void> {
  await sendAlert("Anonymous abuse detected", {
    severity: "critical",
    ip,
    endpoint,
    detail: "Anonymous user exceeded AI generation limit",
  })
}

export async function alertCreditExhaustion(
  userId: string,
  remainingCredits: number,
): Promise<void> {
  await sendAlert("User exhausted credits", {
    severity: "warning",
    userId,
    detail: `Remaining credits: ${remainingCredits}`,
  })
}

export async function alertProjectCreated(
  query: string,
  options: { email?: string; ip?: string; anonymous?: boolean },
): Promise<void> {
  const type = options.anonymous ? "Anonymous" : "Authenticated"
  const who = options.anonymous ? options.ip ?? "unknown" : options.email ?? "unknown"

  const lines = [
    `${GOOD_EMOJI} *New project created*`,
    ``,
    `👤 ${escape(who)} \\(${escape(type)}\\)`,
    `💬 ${escape(query.slice(0, 200))}`,
  ]

  await sendMessage(lines.join("\n"))
}

export async function alertBonusClaimed(email: string): Promise<void> {
  await sendMessage(`${GOOD_EMOJI} *Bonus claimed*\n\n${escape(email)}`)
}

// ─── Growth alerts ───────────────────────────────────────────────────────

export async function alertNewSignup(
  email: string,
  name?: string,
  provider?: string,
): Promise<void> {
  const parts = [
    `Email: ${email}`,
    name && `Name: ${name}`,
    provider && `Provider: ${provider}`,
  ].filter(Boolean)

  await sendMessage(
    `${GOOD_EMOJI} *New signup\\!*\n\n${parts.map((p) => escape(p!)).join("\n")}`,
  )
}

export async function alertWaitlistSignup(email: string): Promise<void> {
  await sendMessage(`${GOOD_EMOJI} *Waitlist signup*\n\n${escape(email)}`)
}

export async function alertMCPToolUsage(
  tool: string,
  params?: Record<string, unknown>,
): Promise<void> {
  const paramSummary = params
    ? Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}: ${String(v).slice(0, 80)}`)
        .join("\n")
    : ""

  const lines = [
    `${GOOD_EMOJI} *MCP tool called*`,
    ``,
    `Tool: \`${escape(tool)}\``,
    paramSummary ? `\n${escape(paramSummary)}` : "",
  ].filter(Boolean)

  await sendMessage(lines.join("\n"))
}
