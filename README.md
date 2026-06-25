# Current — Deep Sea Daily Finance Tracker

A mobile-first, installable PWA for tracking daily income and expenses, built with Next.js (App Router), Tailwind CSS, and Lucide icons.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a custom "deep sea" color system (see `tailwind.config.ts`)
- **lucide-react** for icons
- React `useState`/`useMemo` for state — no backend required to try it out

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. On a phone (or with dev tools in mobile emulation), use the bottom nav to switch between **Home**, **Insights**, and **Budget**, and tap the central **+** button to log a transaction.

## Project structure

```
app/
  layout.tsx        Root layout, metadata, PWA manifest link, theme color
  page.tsx           Renders <FinanceApp />
  globals.css        Tailwind layers + signature animations (glow, bubbles, sheet-in)
components/
  FinanceApp.tsx     Client component holding all app state (the "container")
  Dashboard.tsx       Balance card, income/expense/savings mini-cards, recent transactions
  Analytics.tsx       Category donut chart (SVG) + 7-day spending bars
  Budget.tsx          Per-category budget progress bars with inline editing
  QuickAddModal.tsx   Full-screen add-transaction sheet
  BottomNav.tsx        Fixed nav bar with the central floating action button
  TransactionRow.tsx  Single transaction list item
  CategoryIcon.tsx    Reusable category icon badge
lib/
  types.ts            Shared TypeScript types
  data.ts              Category metadata, default (zeroed) budgets
  format.ts            Currency/date formatting + greeting helpers
public/
  manifest.json        PWA manifest (add icon-192.png / icon-512.png to public/icons)
```

## Design tokens (Deep Sea palette)

| Token      | Hex       | Usage                                  |
|------------|-----------|-----------------------------------------|
| `abyss`    | `#050B14` | App background                          |
| `surface`  | `#111C36` | Cards / containers (used at ~70% opacity)|
| `edge`     | `#3A506B` | Hairline borders (used at ~20% opacity) |
| `accent`   | `#48CAE4` | Primary highlights, active nav, glow    |
| `accent2`  | `#00B4D8` | Buttons / floating action button        |
| `income`   | `#52B788` | Positive amounts, income trends         |
| `expense`  | `#FF5A5F` | Negative amounts, expense trends        |
| `ink`      | `#94A3B8` | Secondary / muted text                  |

These are defined once in `tailwind.config.ts` and used as normal Tailwind classes (`bg-abyss`, `text-accent`, `border-edge/20`, etc.) throughout the app. Category icons (Food, Transport, etc.) intentionally use the standard Tailwind palette for variety, layered on top of the core deep-sea chrome.

## Currency

All amounts are formatted in Tanzanian Shillings via `lib/format.ts` — e.g. `Tsh 12,000` — as whole numbers (TZS amounts are essentially never quoted with decimal places in everyday use). To switch currencies, edit the single `fmt()` function in `lib/format.ts`.

## Data & persistence

Transactions and budgets are saved to `localStorage` (`components/FinanceApp.tsx`) on every change, and reloaded on startup — so your data survives reloads, app restarts, and offline use. Everything starts at zero: no demo transactions, and no budget limits are pre-set (each category shows "Set a limit" until you tap it and enter one). This is fully local to the device; to sync across multiple devices, the natural next step is swapping the `localStorage` calls for a small API route (`app/api/...`) backed by a database.

## Offline support (installable PWA)

This project is a working offline-capable PWA out of the box, via [`@ducanh2912/next-pwa`](https://www.npmjs.com/package/@ducanh2912/next-pwa):

- `next.config.mjs` wraps the Next config with the plugin, which generates a service worker (`public/sw.js`) at build time.
- The service worker is **disabled in `next dev`** (so dev reloads aren't fought by caching) and active in production builds (`npm run build && npm run start`, or after deploying).
- Once you've loaded the app once with a connection, the app shell and assets are cached — reopening it with no signal will still load and work, and any transactions you add while offline are saved to `localStorage` and sync onto the screen immediately (there's no server, so there's nothing to "sync" later — it's just always-local data).
- `public/manifest.json` plus the `icons`/`appleWebApp` metadata in `app/layout.tsx` make it installable ("Add to Home Screen" on iOS, the install prompt on Android/Chrome). Real `icon-192.png`/`icon-512.png` are already included in `public/icons/`.

**To actually use it on your phone:** a PWA's service worker requires the app be served over HTTPS (or `localhost` for local testing) — you can't just unzip this folder onto your phone's storage. Deploy it (e.g. to [Vercel](https://vercel.com) with `vercel deploy`, or any host that runs Next.js) and visit that URL on your phone once while online, then install it from the browser's menu/share sheet. After that, every feature — adding transactions, browsing insights, editing budgets — works fully offline.
