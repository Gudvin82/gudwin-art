# GudWin BookS (ГудВин Букс)

MVP-проект сайта для генерации сказок и комиксов с оплатой через Telegram Stars.

## Что в репозитории

- React + TypeScript + Vite frontend.
- Telegram Login Widget (UI-интеграция).
- Flow генерации с paywall через Stars.
- Тарифы и юридические страницы.
- Базовые security-ограничения на клиенте.

## Быстрый старт

```bash
npm install
npm run dev
npm run build
```

## ENV

```bash
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
VITE_AI_API_URL=/api/ai/generate
```

`VITE_AI_API_KEY` не используется: ключи должны храниться только на backend.

## Документация

- ТЗ: `docs/TZ_GudWin_BookS.md`
- Безопасность: `SECURITY.md`

## Важно

Текущий проект - frontend MVP. Для продакшена обязательны backend-валидация Telegram, защищенный биллинг и контроль доступа (см. `SECURITY.md`).
