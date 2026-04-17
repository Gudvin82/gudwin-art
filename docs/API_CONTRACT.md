# API Contract (Showcase)

This document describes public integration contracts used by the frontend.

## 1) Generation API

Frontend call intent:

- Endpoint: `POST {VITE_AI_API_URL}`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer {VITE_AI_API_KEY}` (if configured)
- Payload shape:

```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "mode": "pets",
  "stylePrompt": "renaissance family portrait..."
}
```

Expected response (example):

```json
{
  "ok": true,
  "imageBase64": "data:image/jpeg;base64,..."
}
```

## 2) Telegram Stars Invoice API

Frontend call intent:

- Endpoint: `POST /api/telegram-stars/create-invoice`
- Payload shape:

```json
{
  "recordId": "uuid",
  "amountStars": 100
}
```

Expected response:

```json
{
  "invoiceSlug": "optional-slug",
  "invoiceLink": "https://t.me/..."
}
```

## 3) Telegram Notification Function (Supabase example)

Path:

- `supabase/functions/send-telegram/index.ts`

Purpose:

- Demonstrates contract for safe notification sending.
- Requires runtime env vars in Supabase environment, not in repository files.

## Public Safety

- Contracts are shown for integration understanding.
- Production internals and private implementation details are intentionally omitted.
