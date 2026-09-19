# Secure AppSec Platform

An intentionally small vulnerability management platform built to demonstrate
secure software development lifecycle (SSDLC) practices, application security
testing, and DevSecOps controls in a realistic web application.

The application will manage assets and the vulnerabilities associated with
them. Its primary purpose is learning and portfolio evidence rather than
feature breadth.

## Project status

The project is currently in **Phase 0 — Project definition**. The application
has not been implemented yet.

The project scope, architecture, and incremental delivery plan are documented
in the following files:

- [Requirements](docs/REQUIREMENTS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Contributor instructions](AGENTS.md)

## Planned stack

- Frontend: React and TypeScript
- Backend: Node.js, TypeScript, and Express
- Authentication: Keycloak with OAuth 2.0 and OpenID Connect
- Infrastructure: Docker, Docker Compose, and Nginx
- CI/CD: GitHub Actions

## Security focus

The project will progressively apply test-driven development and security
controls including authentication and authorization tests, input validation,
SAST, software composition analysis, secrets detection, container security,
and DAST against disposable test environments only.

Security findings will be triaged, remediated, and protected with regression
tests. A successful scan alone is not considered evidence of security.

## Getting started

There is no runnable application yet. Phase 1 will introduce the initial
services, local development instructions, and test workflow.

## Security reporting

Do not commit secrets, access tokens, credentials, or vulnerability details
that could expose a live environment. Until a dedicated reporting policy is
published, please report potential vulnerabilities privately to the repository
owner.

