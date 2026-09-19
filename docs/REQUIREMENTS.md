# Project Requirements

## 1. Purpose

The purpose of this project is to build a realistic but intentionally small
web application that can be used to design, implement and demonstrate a
Secure Software Development Lifecycle.

The application is primarily a practical environment for learning and
demonstrating Application Security.

The main learning objectives are:

1. SAST
2. DAST
3. Secure coding
4. TDD
5. CI/CD security integration
6. Authentication and authorization
7. Dependency and container security
8. Vulnerability remediation

Application complexity is secondary to these objectives.

## 2. Application

The application will be a small vulnerability management platform.

Users will be able to manage assets and vulnerabilities associated with those
assets.

The initial domain model should remain intentionally simple.

### Core entities

User

Asset

Vulnerability

### Asset

An asset represents a system managed by the platform.

Initial attributes may include:

- id
- name
- type
- hostname
- description
- createdAt
- updatedAt

### Vulnerability

A vulnerability represents a security issue associated with an asset.

Initial attributes may include:

- id
- title
- description
- severity
- status
- assetId
- createdAt
- updatedAt

The domain model may evolve when required by AppSec exercises.

## 3. Authentication

Authentication must be delegated to Keycloak.

The application must use standard protocols:

- OAuth 2.0
- OpenID Connect

The API must validate access tokens.

Credentials must never be stored by the application.

## 4. Authorization

The initial application should support at least:

- regular users
- administrators

Authorization must be enforced by the backend.

Frontend authorization must never be considered a security control.

Authorization behavior must have automated tests.

## 5. API

The backend must expose a REST API implemented with:

- Node.js
- TypeScript
- Express

Initial endpoints should remain minimal.

Examples:

GET /assets
POST /assets
GET /assets/:id
PUT /assets/:id
DELETE /assets/:id

GET /vulnerabilities
POST /vulnerabilities
GET /vulnerabilities/:id
PUT /vulnerabilities/:id
DELETE /vulnerabilities/:id

Additional endpoints should only be introduced when justified.

## 6. Frontend

The frontend will use React and TypeScript.

The frontend should remain intentionally simple.

Its purpose is to provide a realistic browser-based attack surface for:

- authentication
- authorization
- session/token handling
- API interaction
- security headers
- DAST

Frontend visual complexity is not a project objective.

## 7. Reverse proxy

Nginx will act as the application entry point.

It will route traffic to the appropriate services and will eventually be used
to demonstrate security configuration including:

- TLS
- security headers
- proxy configuration
- request limits

## 8. Test-Driven Development

Application behavior should be developed using TDD.

Expected workflow:

RED
Write a failing test describing the expected behavior.

GREEN
Implement the minimum code necessary to satisfy the test.

REFACTOR
Improve the implementation while preserving behavior.

Tests should include:

- unit tests
- API integration tests
- authorization tests
- validation tests
- security regression tests

## 9. Security requirements

Security requirements are first-class functional requirements.

The project must progressively address:

- broken access control
- injection
- authentication failures
- security misconfiguration
- insecure design
- vulnerable dependencies
- secrets exposure
- insufficient logging
- SSRF where applicable

Relevant requirements from the OWASP Top 10 and OWASP API Security Top 10
should be mapped to implemented controls.

## 10. SAST requirements

The repository must include automated static security analysis.

The implementation should demonstrate:

- scanner configuration
- CI execution
- severity thresholds
- finding triage
- false-positive management
- remediation
- security regression tests

At least one SAST solution should be deeply integrated rather than several
tools being superficially executed.

## 11. DAST requirements

The application must support automated dynamic security testing.

The implementation should eventually demonstrate:

- automated test environment
- application health verification
- unauthenticated scanning
- authenticated scanning
- API scanning
- passive scanning
- active scanning
- reporting
- vulnerability triage
- remediation verification

## 12. CI/CD requirements

GitHub Actions will provide the initial CI/CD platform.

The pipeline should progressively include:

Build
→ Unit Tests
→ Integration Tests
→ SAST
→ SCA
→ Secrets Detection
→ Container Build
→ Container Scan
→ Deploy Test Environment
→ DAST
→ Security Gate

Not every stage needs to be implemented during the first iteration.

The pipeline will evolve throughout the project.

## 13. Definition of Done

A feature is not considered complete only because it works.

Depending on the feature, completion should include:

- functional tests passing
- security tests passing
- linting passing
- relevant SAST checks passing
- documentation updated
- security implications reviewed

Security findings must not be ignored without documented justification.