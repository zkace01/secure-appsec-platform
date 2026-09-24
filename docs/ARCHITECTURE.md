# Architecture

## 1. Architecture goals

This architecture is designed around two objectives:

1. Provide a realistic modern web application architecture.
2. Provide an environment for practicing Application Security and SSDLC.

The second objective has priority when choosing between unnecessary
application complexity and security learning opportunities.

The system should therefore be:

- small enough to understand completely
- realistic enough to expose meaningful attack surfaces
- easy to deploy automatically
- easy to test
- observable
- suitable for SAST and DAST
- suitable for CI/CD security automation

## 2. High-level architecture

                    ┌─────────────┐
                    │  Keycloak   │
                    │ OIDC/OAuth2 │
                    └──────┬──────┘
                           │
                           │
User
 │
 ▼
┌─────────┐
│  Nginx  │
└────┬────┘
     │
     ├──────────────► React Frontend
     │
     └──────────────► Express API
                            │
                            ▼
                        Database


Development lifecycle:

Developer
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Tests
    ├── SAST
    ├── SCA
    ├── Secrets Detection
    ├── Container Scan
    │
    ▼
Test Environment
    │
    ▼
DAST
    │
    ▼
Security Gate

## 3. Backend

The backend will use:

- Node.js
- TypeScript
- Express

The backend should follow a simple layered architecture.

HTTP
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
Repository
 │
 ▼
Database

The architecture must remain simple enough that security data flows can be
easily understood.

This is important for both threat modeling and static analysis.

## 4. Frontend

The frontend will use React with TypeScript.

Frontend complexity should be minimized.

The frontend exists primarily to:

- provide user interaction
- integrate with Keycloak
- consume the API
- provide realistic browser behavior
- provide an attack surface for DAST

## 5. Authentication

Keycloak acts as the Identity Provider.

Authentication flow:

User
 │
 ▼
React
 │
 ▼
Keycloak
 │
 ▼
Access Token
 │
 ▼
Express API

The API must independently validate authentication and authorization.

Trust decisions must never rely exclusively on the frontend.

## 6. Reverse proxy

Nginx provides the external entry point.

Responsibilities include:

- reverse proxy
- routing
- TLS termination
- security headers
- request restrictions where appropriate

Nginx configuration itself is considered part of the security surface and
must therefore be reviewed and tested.

## 7. Testing architecture

Testing follows a pyramid-like approach.

                 E2E / DAST
                    /\
                   /  \
             Integration
                /      \
               /        \
             Unit Tests

Unit and integration tests participate in TDD.

DAST complements these tests by validating the running system from an
attacker-oriented external perspective.

## 8. Security architecture

Security controls should exist at multiple layers.

Browser
  │
  │ Security headers
  ▼
Nginx
  │
  │ Routing / limits
  ▼
API
  │
  ├── Authentication
  ├── Authorization
  ├── Validation
  ├── Error handling
  └── Logging
  │
  ▼
Database

Security must not depend on a single layer.

## 9. SAST architecture

SAST executes before deployment.

Source Code
    │
    ▼
SAST Engine
    │
    ▼
Findings
    │
    ├── Triage
    ├── False Positive
    ├── Accepted Risk
    └── Remediation
             │
             ▼
      Regression Test

SAST is not considered successful simply because the scanner exits with code
zero.

The objective is to understand:

- what the scanner detects
- why it detects it
- what it misses
- how rules work
- how findings are prioritized
- how findings affect CI/CD

## 10. DAST architecture

DAST requires a running application.

GitHub Actions
      │
      ▼
Test Deployment
      │
      ▼
Health Check
      │
      ▼
DAST
      │
      ├── Browser surface
      └── API surface
      │
      ▼
Findings
      │
      ▼
Triage / Remediation
      │
      ▼
Security Regression

Authenticated DAST will be introduced after the authentication architecture
is stable.

## 11. Security philosophy

The repository should contain evidence of the security engineering process.

The goal is not:

"All scanners return zero vulnerabilities."

The goal is:

"We understand the application's attack surface, automatically identify
security issues, triage findings, remediate vulnerabilities, verify fixes and
prevent regressions."

That distinction is central to the project.

## 12. Version policy

The initial platform baseline is:

- Node.js 24 LTS
- TypeScript 5.9.x
- Express 5.x
- PostgreSQL 17.x
- Prisma ORM 7.x

Only supported, stable major versions are used as the project baseline.
Release candidates and end-of-life runtime versions are not used in the
application or CI environments.

Node.js versions must be LTS releases. Dependency versions are resolved and
reproduced through the committed lockfile. Docker image tags are pinned to a
major version during local development and must be reviewed before promotion
to CI or a deployed environment; immutable image digests will be introduced
when container delivery is added.

Dependency or runtime upgrades require review of release notes, automated
tests, and the security checks available at that phase of the project. Major
version upgrades must be documented as an architectural decision when they
introduce relevant compatibility, security, or operational changes.
