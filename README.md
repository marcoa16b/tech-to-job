# TechToJob — Web

Official landing page for [TechToJob](https://discord.gg/h9FFgKdkRd), the community where Spanish-speaking developers and tech companies get to know each other before any job opening exists.

> The content brief (what each section needs to communicate, tone, and writing rules) lives in [`brief-techtojob.md`](./brief-techtojob.md). That document **is not part of the project code**: it's the brief handed in by the tournament organizers. Treat it as context, not as a technical spec.

---

## Stack

- **[Next.js 16](https://nextjs.org)** — App Router, Server Components, `proxy.ts` (the successor of `middleware.ts`).
- **[React 19](https://react.dev)** — RSC, Actions.
- **[next-intl 4](https://next-intl.dev)** — i18n with routing through a dynamic `[locale]` segment.
- **[Tailwind CSS 4](https://tailwindcss.com)** — utility-first, no `tailwind.config.js` (config via `@theme` in CSS).
- **[Motion](https://motion.dev)** — successor of Framer Motion. The animation library of choice for this project.
- **TypeScript** — strict mode.

---

## Getting started

Requirements: **Node 20+** and **pnpm**.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The i18n proxy redirects you to `/es` (default locale).

### Scripts

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | Dev server                                            |
| `pnpm build`        | Production build                                      |
| `pnpm start`        | Production server (post-build)                        |
| `pnpm lint`         | ESLint with the Next 16 config (core-web-vitals + TS) |
| `pnpm typecheck`    | TypeScript in strict mode (`tsc --noEmit`)            |
| `pnpm format`       | Format with Prettier                                  |
| `pnpm format:check` | Verify formatting without touching files              |

---

## Deploy

Next.js deploys frictionlessly on **[Vercel](https://vercel.com)** (the creators of Next). Steps:

1. Import the repo from [vercel.com/new](https://vercel.com/new).
2. Vercel auto-detects Next. No extra config needed.
3. Set the `NEXT_PUBLIC_SITE_URL` env var with the final domain (e.g. `https://techtojob.com`). It's used by `sitemap.ts` and `robots.ts`.

Other platforms (Cloudflare Pages, Netlify, self-hosted Node) work too — Next's standard build goes anywhere. Vercel is just the happy path.

---

## Folder structure

```
src/
├── app/
│   ├── (admin)/                 # Route group reserved for a future admin panel
│   ├── (marketing)/             # Route group for the public landing
│   │   └── [locale]/            # Dynamic language segment (es | en)
│   │       ├── layout.tsx       # <html>, <body>, font, NextIntlClientProvider
│   │       ├── page.tsx         # Home (/)
│   │       └── not-found.tsx    # Localized 404
│   ├── layout.tsx               # Root layout (passthrough + globals.css)
│   ├── globals.css              # Tailwind 4 + theme tokens
│   ├── robots.ts                # /robots.txt
│   └── sitemap.ts               # /sitemap.xml
├── i18n/
│   ├── routing.ts               # Enabled locales + defaultLocale
│   ├── navigation.ts            # Localized Link/redirect/useRouter
│   ├── request.ts               # Per-request messages loader (used by the next-intl plugin)
│   └── messages/
│       ├── es.json
│       └── en.json
└── proxy.ts                     # i18n middleware (in Next 16 it's called proxy, not middleware)
```

The `(admin)` and `(marketing)` folders are **route groups**: the leading parentheses mean they don't affect the URL. They exist to separate domains (admin vs public) without prefixing the route.

---

## i18n

- **Locales:** `es` (default) and `en`.
- **Routing:** through a dynamic `[locale]` segment. All public URLs live under `/es/...` or `/en/...`.
- **Messages:** in `src/i18n/messages/<locale>.json`. When you add a new key, add it in both languages.
- **Helpers:** use `Link`, `redirect`, `useRouter` from `@/i18n/navigation` (not from `next/link` or `next/navigation` directly) so they keep the locale prefix.
- **Server:** `getTranslations` / `getMessages` from `next-intl/server` inside server-side layouts and pages.
- **Client:** `useTranslations` from `next-intl` inside Client Components.

To add a new locale:

1. Add it to `locales` in `src/i18n/routing.ts` and to the `LocaleType` union.
2. Create `src/i18n/messages/<new>.json` with the same structure as the others.

---

## Motion vs GSAP

This project uses **Motion** ([motion.dev](https://motion.dev)). GSAP was evaluated first, but for the scope and type of interactions in this landing Motion is a better fit: lighter bundle, modern API, native React integration, and less overhead than GSAP would justify for a single-page landing. Motion is the official successor of Framer Motion and the recommended path for new React projects.

---

## Conventions

- **Path alias:** `@/*` points to `src/*`. Always import as `@/components/...`, `@/i18n/...`, etc.
- **Server Components by default:** mark with `"use client"` only when you need state, effects, or browser APIs.
- **Animations:** only in Client Components, inside Motion hooks. Never animate on the server.
- **Styles:** Tailwind 4 with tokens in `globals.css`. Avoid CSS modules or styled-components.
- **Typing:** no `any`. If TypeScript forces you to type something, it's worth typing.
- **Formatting:** Prettier decides. Run `pnpm format` before committing.
