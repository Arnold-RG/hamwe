# Contributing

This is a public product repository. Treat a pull request like a review of a live tourism house.

## Run it

```bash
npm install
npm run dev
```

`http://localhost:5173/hamwe/`

```bash
npm run build
```

Must stay green. `tsc` is part of the build.

## Rules that already exist in the product

- Do not invent occupancy, fake guest names, or “seats left” theatre.
- Do not list a unit fare above FRw 80,000 or below FRw 8,000.
- Do not connect a custom domain until DNS is owned.
- Do not put live merchant secrets in the repo.
- Gisubizo answers stay English and factual.
- The company name is Hamwe Tourism — not Visit Rwanda.

## What belongs where

| Change | Place |
| --- | --- |
| Product UI | `src/` |
| Catalog / fares | `src/data.ts`, `src/lib/format.ts` |
| Desk hours | `src/lib/hours.ts` |
| Gisubizo | `src/gisubizo/` |
| Reviewer docs, charts, templates | `docs/`, `.github/`, this file |

GitHub Pages deploys **only** `dist/`. Markdown you add for reviewers does not become a page on the site.

## Pull requests

Use the template. Say why the guest should feel the change. Include a route list you actually opened.
