# AGENTS.md

## Project purpose

This repository is a cybersecurity portfolio and learning project focused on
Application Security, Secure Software Development Lifecycle (SSDLC) and
DevSecOps practices.

The application itself is intentionally simple.

The primary goal is NOT to demonstrate complex CRUD development or advanced
frontend engineering. The primary goal is to design, implement, test and
document a secure software development lifecycle around a realistic web
application.

The project should progressively demonstrate:

- Secure software design
- Threat modeling
- Test-Driven Development (TDD)
- Secure coding
- SAST
- SCA
- DAST
- Container security
- Secrets detection
- CI/CD security gates
- Authentication and authorization
- Security logging and monitoring
- Vulnerability management
- Security remediation workflows

SAST and DAST are primary learning objectives and must be treated as
first-class components of the project.

## Technology stack

### Frontend
- React
- TypeScript

### Backend
- Node.js
- TypeScript
- Express

### Authentication
- Keycloak
- OAuth 2.0
- OpenID Connect

### Infrastructure
- Docker
- Docker Compose
- Nginx

### CI/CD
- GitHub Actions

The remaining technologies must be selected based on documented engineering
and security requirements rather than added unnecessarily.

## Development methodology

The project follows Test-Driven Development.

For application functionality:

1. Define the expected behavior.
2. Write a failing test.
3. Implement the minimum code required to pass the test.
4. Refactor while keeping the tests green.

Security requirements should also be tested whenever reasonably possible.

Examples:

- authorization tests
- authentication tests
- input validation tests
- injection tests
- rate-limiting tests
- security-header tests

Do not implement significant application behavior without tests unless there
is a documented reason.

## Engineering principles

- TypeScript strict mode must be enabled.
- Prefer simple, explicit and maintainable solutions.
- Avoid unnecessary abstractions.
- Separate HTTP, business and persistence concerns.
- Validate all external input.
- Never trust client-controlled data.
- Use centralized error handling.
- Never hardcode credentials or secrets.
- Follow least privilege.
- Minimize dependencies.
- Security controls should be explicit and testable.

## AppSec principles

Security is a primary requirement, not a final review step.

Consider at least:

- OWASP Top 10
- OWASP API Security Top 10
- authentication
- authorization
- input validation
- injection
- secure configuration
- secrets management
- dependency security
- security headers
- rate limiting
- logging
- error handling

Security tooling must be integrated incrementally into the development
workflow.

## SAST

Static analysis is a primary learning objective.

The project should eventually demonstrate:

- SAST configuration
- custom rules where useful
- CI integration
- false-positive analysis
- severity management
- security gates
- remediation
- regression testing

Do not treat SAST as simply running a scanner and accepting its output.

Findings should be understood, classified and documented.

## DAST

Dynamic application security testing is a primary learning objective.

The project should eventually demonstrate:

- automated application deployment for testing
- authenticated scanning
- API scanning
- passive and active scanning
- scan configuration
- false-positive analysis
- CI integration
- vulnerability remediation
- regression testing

DAST must be executed only against environments intended for security testing.

## Codex workflow

For significant tasks:

1. Read the relevant project documentation.
2. Inspect the existing implementation.
3. Explain the proposed approach.
4. Identify security implications.
5. Identify tests that should be created.
6. Implement using TDD.
7. Run tests.
8. Run the relevant security checks.
9. Summarize the changes.

Do not silently make significant architectural decisions.

## Learning objective

This repository is a learning project.

For significant security or architectural decisions:

- explain the reasoning
- explain alternatives
- explain trade-offs
- identify relevant security risks

The developer must be able to understand and defend the implementation during
a technical interview.

Do not optimize primarily for generating code quickly.
Optimize for engineering quality, security and learning.