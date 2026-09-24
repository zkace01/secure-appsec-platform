# AppSec Portfolio Roadmap

## Phase 0 — Project definition

- [X] Create repository
- [X] Create AGENTS.md
- [X] Create REQUIREMENTS.md
- [X] Create ARCHITECTURE.md
- [X] Create ROADMAP.md
- [X] Define Definition of Done

## Phase 1 — Minimal application

Objective:

Create the minimum realistic application required for the AppSec work.

- [ ] Initialize Node.js + TypeScript + Express
- [ ] Initialize React + TypeScript
- [ ] Configure strict TypeScript
- [ ] Configure linting
- [ ] Configure testing framework
- [ ] Implement TDD workflow
- [ ] Implement minimal assets API
- [ ] Implement minimal vulnerabilities API
- [ ] Add database
- [ ] Dockerize services
- [ ] Add Nginx

Avoid unnecessary application functionality.

## Phase 2 — Authentication and authorization

- [ ] Deploy Keycloak
- [ ] Configure OIDC
- [ ] Integrate React authentication
- [ ] Validate JWTs in API
- [ ] Implement roles
- [ ] Implement authorization tests
- [ ] Document authentication architecture
- [ ] Threat-model authentication flow

## Phase 3 — SAST

Primary learning phase.

- [ ] Evaluate SAST tools
- [ ] Select primary SAST solution
- [ ] Configure local scanning
- [ ] Understand default rules
- [ ] Integrate with GitHub Actions
- [ ] Analyze findings
- [ ] Reproduce vulnerabilities
- [ ] Triage false positives
- [ ] Create custom rules
- [ ] Define severity policy
- [ ] Implement CI security gate
- [ ] Remediate findings
- [ ] Add regression tests
- [ ] Document findings and decisions

## Phase 4 — Software Composition Analysis

- [ ] Dependency scanning
- [ ] Vulnerability severity policy
- [ ] Dependency update workflow
- [ ] SBOM generation
- [ ] CI integration

## Phase 5 — Secrets security

- [ ] Secrets detection
- [ ] Pre-commit detection
- [ ] CI detection
- [ ] Secrets management strategy

## Phase 6 — DAST

Primary learning phase.

- [ ] Evaluate DAST tooling
- [ ] Deploy disposable test environment
- [ ] Implement health checks
- [ ] Configure baseline scan
- [ ] Configure API scan
- [ ] Configure authenticated scan
- [ ] Configure active scan
- [ ] Integrate with CI
- [ ] Analyze findings
- [ ] Reproduce vulnerabilities manually
- [ ] Triage false positives
- [ ] Remediate findings
- [ ] Verify remediation
- [ ] Add security regression tests
- [ ] Define DAST security gate

## Phase 7 — Container security

- [ ] Scan Docker images
- [ ] Harden Dockerfiles
- [ ] Minimize images
- [ ] Run containers as non-root
- [ ] Review container permissions
- [ ] Integrate scanning with CI

## Phase 8 — Threat modeling

- [ ] Create data-flow diagram
- [ ] Identify trust boundaries
- [ ] Apply STRIDE
- [ ] Map threats to controls
- [ ] Map threats to tests
- [ ] Document residual risks

## Phase 9 — SSDLC

Combine previous work into a complete security lifecycle.

Developer
   ↓
TDD
   ↓
Pull Request
   ↓
Tests
   ↓
SAST
   ↓
SCA
   ↓
Secrets
   ↓
Build
   ↓
Container Scan
   ↓
Test Deployment
   ↓
DAST
   ↓
Security Gate
   ↓
Merge

## Phase 10 — Portfolio presentation

- [ ] Architecture diagram
- [ ] Threat model
- [ ] Security pipeline diagram
- [ ] Example SAST finding
- [ ] Example DAST finding
- [ ] Remediation examples
- [ ] Security decisions
- [ ] CI/CD screenshots
- [ ] Final README