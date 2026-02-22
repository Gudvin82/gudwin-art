import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  phone: string;
  telegram: string;
  message: string;
  consent: boolean;
  website?: string;
}

const telegramPattern = /^@?[a-zA-Z0-9_]{5,32}$/;
const phonePattern = /^[+0-9()\-\s]{7,25}$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405,
    });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = "-1003883483720";

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram credentials not configured");
    }

    const data: ContactFormData = await req.json();

    if ((data.website || "").trim().length > 0) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const name = (data.name || "").trim();
    const phone = (data.phone || "").trim();
    const telegram = (data.telegram || "").trim();
    const message = (data.message || "").trim();
    const consent = Boolean(data.consent);

    if (!name || !phone || !telegram || !message || !consent) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (name.length > 80 || message.length < 10 || message.length > 2000 || !telegramPattern.test(telegram) || !phonePattern.test(phone)) {
      return new Response(JSON.stringify({ error: "Validation failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const telegramMessage = `
🔔 *Заявка с сайта*

👤 *Имя:* ${escapeMarkdown(name)}
📞 *Телефон:* ${escapeMarkdown(phone)}
✈️ *Telegram:* ${escapeMarkdown(telegram)}
💬 *Запрос:*
${escapeMarkdown(message)}
✅ *Согласие на ПДн:* Да

---
📅 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}
    `.trim();

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    const result = await telegramResponse.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      throw new Error("Failed to send message to Telegram");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function escapeMarkdown(text: string): string {
  return text.replace(/[_*()[\]~`>#+=|{}.!-]/g, "\\$&");
}
