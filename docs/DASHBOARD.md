# Hamwe Tourism · engineering dashboard

GitHub-only control room for this repository. Nothing here is mounted in the product.

Live product: **https://arnold-rg.github.io/hamwe/**

---

## Operating status

```mermaid
flowchart LR
  subgraph Green
    A[Catalog live]
    B[CAT desk clock]
    C[Gisubizo English]
    D[Pages deploy]
  end
  subgraph Amber
    E[Checkout is a demo]
    F[No live merchant]
  end
  subgraph Scope
    G[No membership sales]
    H[Old /circles → /tours]
  end
```

| System | State | Notes |
| --- | --- | --- |
| Storefront | **Shipped** | 17 pages, lockup reads Hamwe Tourism |
| Hosted tours | **Shipped** | 6 dated itineraries |
| Day tickets | **Shipped** | 16 extras, FRw 8k–20k / luxury 80k |
| Plan / included / care | **Shipped** | Visitor ops a tourism desk should already have |
| Request a trip | **Shipped** | Stored on-device as a demo desk |
| Gisubizo | **Shipped** | 120+ English Q&A + knowledge + tools |
| CAT office radar | **Shipped** | Open / lunch / closed, daily 08:00 |
| Digital pass | **Shipped** | QR, `.ics`, Wallet file |
| Merchant pay | **Demo** | MoMo / QR / card / PayPal UI, no debit |
| Custom domain | **Held** | No CNAME until DNS is owned |

---

## Product mix

```mermaid
pie showData
  title Catalog lines
  "Hosted tours" : 6
  "Day tickets" : 16
  "Destinations" : 6
  "Gisubizo answers" : 126
```

```mermaid
pie showData
  title Guest jobs on the site
  "Buy a dated seat" : 40
  "Understand the fare" : 20
  "Plan the country" : 20
  "Ask Gisubizo" : 15
  "Write the house" : 5
```

---

## Fare architecture

Nothing on the site lists a unit above FRw 80,000. Day tickets stay in the 8–20k band.

```mermaid
xychart-beta
  title "Published fare points (FRw)"
  x-axis ["Meals 8k", "Transport 9k", "Budget day 15k", "Comfort / taxi 20k", "Hosted floor 32k", "Luxury 80k"]
  y-axis "FRw" 0 --> 80000
  bar [8000, 9000, 15000, 20000, 32000, 80000]
```

| Band | FRw | Used for |
| --- | --- | --- |
| Floor | 8,000 | Cheapest day ticket |
| Day ceiling | 20,000 | Comfortable / taxi day |
| Hosted tours | 32,000–80,000 | Lodge + host packages |
| Luxury | 80,000 | Full Gathering, Virunga Dawn, luxury day |

---

## Delivery timeline

```mermaid
gantt
  title Shipped on main · public GitHub
  dateFormat  YYYY-MM-DD
  axisFormat  %d %b

  section Product
  Hosted catalog + checkout     :done, a1, 2026-09-01, 2026-09-10
  CAT desk + Kisimenti house    :done, a2, 2026-09-10, 2026-09-14
  Fare clamp 8k–80k             :done, a3, 2026-09-12, 2026-09-15
  Rwanda album                  :done, a4, 2026-09-15, 2026-09-18
  Gisubizo English desk         :done, a5, 2026-09-17, 2026-09-18
  Hamwe Tourism rebrand         :done, a6, 2026-09-18, 2026-09-19
  Trip pages + request          :done, a7, 2026-09-19, 2026-09-19

  section Platform
  GitHub Pages pipeline         :done, p1, 2026-09-01, 2026-09-08
  Public source                 :done, p2, 2026-09-08, 2026-09-12
```

---

## Quality gates

```mermaid
flowchart LR
  Push[push to main] --> Tsc[tsc --noEmit]
  Tsc --> Build[vite build]
  Build --> Spa[SPA fallback]
  Spa --> Art[upload dist/]
  Art --> Live[GitHub Pages]
```

- Typecheck is part of `npm run build`, not optional.
- The Pages workflow deploys **only** `dist/`. `docs/` and `.github/` stay on GitHub for reviewers.
- No live secrets. No merchant keys. Checkout is labelled as a demo in the footer.

---

## Where to look in the code

| Question | File |
| --- | --- |
| Is the desk open in Kigali right now? | `src/lib/hours.ts` |
| Why can a fare not exceed 80k? | `src/lib/format.ts` |
| How does Gisubizo pick an answer? | `src/gisubizo/engine.ts` |
| What tours exist? | `src/data.ts` |
| How does a ticket become an `.ics`? | `src/lib/ticket.ts` |
| What ships to production? | `.github/workflows/pages.yml` |

Deep design notes: [ARCHITECTURE.md](ARCHITECTURE.md).
