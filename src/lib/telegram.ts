interface StarsInvoiceResponse {
  invoiceLink?: string;
  invoiceSlug?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        openInvoice?: (urlOrSlug: string, cb?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void) => void;
      };
    };
  }
}

export async function startTelegramStarsPayment(recordId: string, amountStars: number): Promise<boolean> {
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

  let data: StarsInvoiceResponse | null = null;

  try {
    const response = await fetch('/api/telegram-stars/create-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recordId, amountStars }),
    });

    if (response.ok) {
      data = (await response.json()) as StarsInvoiceResponse;
    }
  } catch {
    data = null;
  }

  const webApp = window.Telegram?.WebApp;

  if (webApp?.openInvoice && data?.invoiceSlug) {
    return await new Promise((resolve) => {
      webApp.openInvoice?.(data.invoiceSlug!, (status) => {
        resolve(status === 'paid');
      });
    });
  }

  if (data?.invoiceLink) {
    window.open(data.invoiceLink, '_blank', 'noopener,noreferrer');
    return false;
  }

  if (botUsername) {
    window.open(`https://t.me/${botUsername}?start=buy_${recordId}_${amountStars}`, '_blank', 'noopener,noreferrer');
    return false;
  }

  return false;
}
