# Architecture Overview

## High-Level Flow

1. User uploads source image.
2. User configures crop (zoom/x/y).
3. User selects era and style preset.
4. Frontend calls generation endpoint contract.
5. Result is shown with payment gate.
6. After payment confirmation, HD download is unlocked.

## Frontend Modules

- `src/pages/HomePage.tsx`
  - Showcase positioning and interactive era selection.
- `src/pages/CreatePage.tsx`
  - Main funnel: upload -> crop -> style -> generate -> pay -> result.
- `src/data/site-content.ts`
  - Era/style presets, translation texts, legal content metadata.
- `src/lib/ai.ts`
  - Generation request contract wrapper.
- `src/lib/telegram.ts`
  - Telegram integration contract (login/payment redirection).

## Integration Boundaries

- Generation engine is treated as external provider API.
- Payment is treated as Telegram Stars backend endpoint.
- Public repo keeps contract shape and mock-friendly flow only.

## Data Safety Notes

- No production database or private datasets are included.
- No secret-bearing environment values are tracked.
- Sensitive business internals are intentionally excluded.
