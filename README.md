# Hamwe — Discover Rwanda

**Travel experiences and tour planning** · [GitHub repository](https://github.com/Arnold-RG/hamwe) · [Website](https://arnold-rg.github.io/hamwe/)

## Project overview

Rwanda travel discovery and tour-booking-oriented browser application featuring destinations, tour information, booking flows and responsive visual presentation. Built with React/Vite/TypeScript.

**Technology:** React 19, TypeScript, Vite, React Router, GitHub Pages.

> **Verification note:** This documentation reflects observed repository structure. It does not imply that paid features, security tests, certifications, deployment configurations or third-party integrations have been approved.

## Architecture map

| Location | What belongs here |
| --- | --- |
| `src/` | Pages, UI, booking context and routing |
| `public/` | Web media |
| `assets/` | Brand and additional assets |
| `scripts/` | Build and publication verification |
| `docs/` | Compatibility and user guides |
| `package.json` | Frontend scripts |
| `.github/` | Release workflow and cross-OS build checks |

## Development and setup

Install Git and the relevant runtime. Inspect the environment template and repository deployment docs before exposing any network services.

```sh
npm ci
npm run test
npm run build
npm run dev
```

**Important:** Frontend compile does not certify booking services or payments. Verify environment config and production API connections first.

## Product functionality and user experience

- Destinations and tours should have clear verified itineraries, dates, prices and visitor actions.
- Booking pages must distinguish simulations from real confirmed reservations.
- Provide accessible navigation, helpful mobile UX and language-appropriate content.

Prioritize accessibility, keyboard and touch navigation, meaningful empty/error/loading states and truthful product claims. Never copy third-party images or logos without authorization.

## Security and data protection

- No fabricated availability, booking confirmation or paid transactions.
- Protect any collected customer details, session state and payment transitions in a secured backend.
- Only use rights-cleared destination photography, accurate prices and verified operators.

Use secrets management, least privilege, deployment environment isolation, dependency audits and a private vulnerability disclosure path. Release claims must be tied to actual evidence.

## Engineering and CI/CD standards

| Gate | Expected evidence |
| --- | --- |
| Code quality | Lint/type checks, peer review and maintained documentation |
| Automated testing | Relevant unit/integration/security regression tests |
| Dependency and supply chain | Locked builds, dependency reviews, secret scanning and SBOM when helpful |
| Security | Threat model, input validation, authz tests and secure configuration |
| User experience | Responsive layouts, accessibility, functioning navigation and real-world test flows |
| Release | Staging verification, owner approval, traceable deploy and rollback |
| Operations | Metrics/logging and alerting for services; link/uptime checks for static sites |

These are **release criteria**, not claims that every control is currently enabled. Kubernetes should only be used when the actual runtime complexity justifies it.

## Contributing and support

Create a small, reviewable change, include reproduction steps and tests, and document environmental impacts. Do not publish unapproved customer details or change live services without release authorization. Report security vulnerabilities privately via `SECURITY.md` where available.
