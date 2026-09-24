# API Reference

## Status and scope

This is the Phase 1 API for local development. It has **no authentication or
authorization**. Do not expose it to untrusted networks or use it with
production data. Keycloak token validation and role-based authorization are
planned for Phase 2.

Base URL: `http://localhost:3000`

All request bodies are JSON. Unknown fields are rejected. Validation failures
return `400` without disclosing internal validation details.

## Health

### `GET /health`

Returns `200 OK` and `{ "status": "ok" }` when the API process is running.

## Assets

An asset has `id`, `name`, `type`, `hostname`, optional `description`,
`createdAt`, and `updatedAt`.

| Method | Path | Success | Description |
| --- | --- | --- | --- |
| GET | `/assets` | 200 | List assets. |
| POST | `/assets` | 201 | Create an asset. |
| GET | `/assets/{id}` | 200 | Get one asset. |
| PUT | `/assets/{id}` | 200 | Replace an asset. |
| DELETE | `/assets/{id}` | 204 | Delete an asset with no linked vulnerabilities. |

Asset write body:

```json
{ "name": "Public API", "type": "service", "hostname": "api.example.test", "description": "Optional text" }
```

`name`, `type`, and `hostname` are required. An attempt to delete an asset with
linked vulnerabilities returns `409 Conflict` to avoid implicit data loss.

## Vulnerabilities

A vulnerability has `id`, `title`, `description`, `severity`, `status`,
`assetId`, `createdAt`, and `updatedAt`. Valid severities are `CRITICAL`,
`HIGH`, `MEDIUM`, and `LOW`; statuses are `OPEN`, `IN_PROGRESS`, and `RESOLVED`.

| Method | Path | Success | Description |
| --- | --- | --- | --- |
| GET | `/vulnerabilities` | 200 | List vulnerabilities. |
| POST | `/vulnerabilities` | 201 | Create a vulnerability for an existing asset. |
| GET | `/vulnerabilities/{id}` | 200 | Get one vulnerability. |
| PUT | `/vulnerabilities/{id}` | 200 | Replace a vulnerability. |
| DELETE | `/vulnerabilities/{id}` | 204 | Delete a vulnerability. |

Vulnerability write body:

```json
{ "title": "Missing security headers", "description": "The API response lacks the expected headers.", "severity": "HIGH", "status": "OPEN", "assetId": "uuid" }
```

An unknown `assetId` returns `404 Not Found`.

## Error responses

| Status | Meaning |
| --- | --- |
| 400 | Invalid body or path parameter. |
| 404 | Requested resource or referenced asset does not exist. |
| 409 | The requested operation would violate a domain constraint. |
| 500 | Unexpected server error; implementation details are not returned. |
