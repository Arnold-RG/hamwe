# Security Policy

## Supported versions

Security updates apply to the latest commit on the default branch of this repository.

## Reporting a vulnerability

Email **rurangwaarnold32@gmail.com** with:

- Repository name and affected URL/path
- Description and impact
- Steps to reproduce (proof of concept if available)

Please do **not** open a public issue for unpatched vulnerabilities.

We aim to acknowledge reports within 7 days and publish a fix or mitigation when confirmed.

## Practice

- No secrets in source; use `.env.example` only
- Prefer `textContent` over `innerHTML` for untrusted data
- External links use `rel="noopener noreferrer"`
- Dependabot / Actions least privilege where applicable
