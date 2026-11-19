# Architecture

How Hamwe Tourism is built. For reviewers. Not served on the live site.

## Shape

A single-page application. React 19 renders the house. Vite 7 emits static files. GitHub Pages hosts them. There is no application server and no database. That is a product decision: the catalog is source-controlled, tickets live on the guest device, and the desk clock is computed in the browser against Central Africa Time.

```
Guest browser
  └── React Router (17 pages)
        ├── Catalog (data.ts)
        ├── Desk clock (hours.ts, CAT UTC+2)
        ├── Money (format.ts, FRw first)
        ├── BookingContext (localStorage)
        └── Gisubizo (qa + knowledge + tools)
              └── English answers only
```

## Time

Rwanda does not observe daylight saving. The desk does not ask `Intl` for a named zone and then guess. It uses a fixed **UTC+2** offset and wall-clock arithmetic.

States:

- **Open** — 08:00–12:00 and 13:30–18:00
- **Lunch** — 12:00–13:30 (yellow)
- **Closed** — otherwise (red)

The home radar counts to the next open or close in CAT, including Saturday 08:00.

## Money

Every listed unit is a Rwandan franc figure first. USD is a locked companion line at FRw 1,450 = US$1 on this demo.

Clamps:

- Day tickets: 8,000–20,000
- Hosted / luxury units: up to 80,000
- Cart *totals* may exceed 80,000 when several travelers share a ticket. The unit is capped, not the party.

## Booking

`BookingContext` holds one cart and an array of issued tickets. Checkout validates a name, a Rwanda-shaped phone when MoMo is chosen, and a Luhn-like card check when a card is chosen. Nothing is sent to a processor. The issued pass carries a QR payload, an `.ics` for Calendar, and a Wallet-shaped file (unsigned — a real `.pkpass` needs Apple certificates).

## Gisubizo

A local English desk, not a hosted model call.

1. Normalise the question.
2. Score the QA bank (exact match, overlap, tags).
3. If the score misses, route to tools: knowledge cards, Hamwe catalog, live desk, phrasebook, day sketch.
4. Return follow-up questions from related tags.

The dock is a gold-framed panel. The full page is `/gisubizo`. The bank is not dumped as a wall of chips.

## Brand

The company name is **Hamwe Tourism**. Visit Rwanda is the national tourism brand. They are not the same organisation. The lockup is `public/brand/hamwe-logo-lockup.png`.

## Ship

`.github/workflows/pages.yml` on `main`:

1. `npm ci`
2. `npm run build` → `tsc` + Vite + SPA fallback
3. Upload `dist/`
4. Deploy GitHub Pages

Custom domains are not attached until DNS is owned.

## What this is not

- Not a backend booking engine
- Not a live payment integration
- Not the official Visit Rwanda website
- Not a membership club (those pages redirect to tours)
