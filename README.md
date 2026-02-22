# GudWin Art (frontend scaffold)

Текущий статус: собран рабочий SPA-каркас продукта уровня Fable по UX-структуре с русификацией и темами.

## Что реализовано

- Dark-only theme (премиальная тёмная схема).
- RU/EN переключение, RU по умолчанию.
- Роуты:
  - `/`
  - `/create`
  - `/pricing`
  - `/about`
  - `/legal/:slug`
  - `/account/generations`
  - `/account/settings`
- Генератор flow:
  - загрузка файла
  - кадрирование (zoom/x/y)
  - выбор стиля (pets/humans)
  - экран прогресса с динамическими статусами
  - экран результата с paywall-моделью (100 Telegram Stars -> скачивание)
- Личный кабинет: таблица генераций и статус оплаты.
- Авторизация: Telegram-first (UI и точки интеграции).
- Юридические страницы РФ (шаблоны) + версия/дата вступления.
- Cookie banner.

## Технологии

- Vite + React + TypeScript + Tailwind

## Команды

```bash
npm install
npm run dev
npm run build
```

## Telegram интеграция

- Добавьте `.env`:
  - `VITE_TELEGRAM_BOT_USERNAME=your_bot_username`
  - `VITE_AI_API_URL=your_ai_endpoint`
  - `VITE_AI_API_KEY=your_ai_key`
- Авторизация: Telegram Login Widget подключен на главной и в `/account/settings`.
- Stars оплата:
  - фронт вызывает `POST /api/telegram-stars/create-invoice` с `{ recordId, amountStars: 100 }`
  - ожидает ответ: `{ invoiceSlug?: string, invoiceLink?: string }`
  - если endpoint не подключен, используется fallback-ссылка на бота `https://t.me/<bot>?start=buy_<recordId>`

## Если занят порт 4173

```bash
lsof -ti :4173 | xargs kill -9
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

## Примеры изображений

- Положите референсы в `/public/examples/`:
  - `pet-1.svg`, `pet-2.svg`, `pet-3.svg`
  - `human-1.svg`, `human-2.svg`, `human-3.svg`

## Что нужно сделать для production (следующий этап)

1. Перенос на Next.js App Router (если строго следовать целевому стеку).
2. Backend и БД (Postgres + Prisma/Drizzle): users, auth_identities, styles, generations, orders, legal_documents.
3. Реальные OAuth-провайдеры:
   - Google OAuth
   - Telegram Login (верификация подписи на сервере)
4. AI adapters:
   - server-side `generateImage/getStatus/getResult`
   - очередь и ретраи
5. Payment adapters:
   - Stripe и ЮKassa/CloudPayments
   - webhook-обработка статусов `created/pending/paid/failed/refunded`
6. Хранилище файлов S3/R2.
7. Rate limiting, аудит и логи.

## Важно

Сейчас платежи и генерация реализованы как фронтовой прототип (mock flow) для демонстрации полного UX.
