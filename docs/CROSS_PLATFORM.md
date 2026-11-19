# Hamwe: OS and browser support

**Hamwe is a browser-based React/Vite travel application.** Its deployed output is static HTML, CSS, JavaScript, and media. It can be opened in modern browsers on Windows, Linux, macOS, Android and iOS; it is not a native installer or app-store package.

## Build support

Run `npm ci`, `npm run dev`, and `npm run build` with Node.js 22 on a supported development OS. GitHub Actions `cross-platform-build.yml` compiles the frontend on Ubuntu, Windows and macOS using `tsc` and Vite.

The main `pages.yml` workflow remains the authoritative production build. It also scans published files for private personal data and uses `pdftotext` and `qpdf` on Linux. Developers on Windows or macOS may need separate PDF utilities for the entire production script; the cross-platform compilation workflow intentionally runs the frontend steps only.

## Browser checklist before claiming production support

- Chrome and Firefox desktop; Safari on macOS; Edge on Windows.
- Chrome on Android, Safari on iOS, responsive breakpoints 320–430px and tablet 768–1024px.
- Keyboard and touch navigation, reduced motion, zoom, color contrast, safe-area insets.
- Tour browsing, route navigation, booking data entry, date handling, checkout and contact links.
- Network failures, missing images, no JavaScript and slow mobile connection.

**Important:** A successful CI build is not physical-device certification and does not make Hamwe a native Android or iOS app.

## Kubernetes

No Kubernetes deployment is needed for GitHub Pages frontend hosting. Reassess only if a future production backend adds real infrastructure and operational scale requirements.
