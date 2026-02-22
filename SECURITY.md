# Security Baseline - GudWin BookS

## What is already protected in this repo

- Paywall bypass fixed: download link is available only for paid generations.
- URL safety checks added before opening invoice links or downloads.
- File upload validation added (MIME and max 10 MB).
- Telegram local session now has TTL (24h) and minimal field validation.
- Frontend AI key usage removed; API keys must live on backend only.

## Critical production controls (required before launch)

1. Verify Telegram auth signature server-side (`hash` check with bot token) and issue server session token (HttpOnly cookie).
2. Move all generation/payment endpoints to backend with authz checks per user/session.
3. Enforce RBAC and ownership checks for every project, media, invoice, export.
4. Introduce rate limiting by user/IP/device on auth, generation and payment routes.
5. Add signed URLs with short TTL for downloads (no direct permanent file URLs).
6. Add anti-abuse moderation for prompts and generated content.
7. Store PII encrypted at rest; rotate secrets; do not log raw personal data.
8. Add webhook signature verification for Telegram Stars callbacks.
9. Add audit trail for login, payment, generation, export, account deletion.
10. Run SAST + dependency audit in CI and block on critical findings.

## Threat model focus

- Account spoofing via client-side only auth.
- Payment state spoofing via client flag manipulation.
- Prompt/content abuse and policy violations.
- Insecure direct object references for exports/media.
- XSS via unsafe URL handling or rendered generated content.
- API key leakage in frontend bundles.

## Compliance reminders (RF, 2026)

- Russian language is primary in consumer UI and legal docs.
- Personal data processing under 152-FZ with explicit consent.
- Public legal pages: offer, privacy, personal data policy, refund, company details.
