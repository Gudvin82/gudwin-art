import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram credentials not configured");
    }

    const data: ContactFormData = await req.json();
    const { name, phone, email, message } = data;

    // Validate required fields
    if (!name || !phone || !email) {
      throw new Error("Missing required fields");
    }

    // Format the message
    const telegramMessage = `
🔔 *Новая заявка с сайта!*

👤 *Имя:* ${escapeMarkdown(name)}
📱 *Телефон:* ${escapeMarkdown(phone)}
📧 *Email:* ${escapeMarkdown(email)}
${message ? `\n💬 *Сообщение:*\n${escapeMarkdown(message)}` : ""}

---
📅 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}
    `.trim();

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      }
    );

    const result = await telegramResponse.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      throw new Error("Failed to send message to Telegram");
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Helper function to escape Markdown special characters
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&");
}
