import "server-only";

const TIMEOUT_MS = 8_000;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function telegramFetch(
  botToken: string,
  method: string,
  body: Record<string, unknown>
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendTelegramMessage(
  botToken: string,
  chatId: string | number,
  text: string,
  parseMode?: "HTML" | "MarkdownV2"
): Promise<void> {
  await telegramFetch(botToken, "sendMessage", {
    chat_id: chatId,
    text,
    ...(parseMode ? { parse_mode: parseMode } : {}),
    disable_web_page_preview: true,
  });
}

export async function sendTelegramPhoto(
  botToken: string,
  chatId: string | number,
  photoUrl: string,
  caption: string,
  parseMode?: "HTML" | "MarkdownV2"
): Promise<void> {
  await telegramFetch(botToken, "sendPhoto", {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    ...(parseMode ? { parse_mode: parseMode } : {}),
  });
}

export { escapeHtml };
