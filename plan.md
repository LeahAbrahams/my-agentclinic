# Implementation Plan: Hello Hono

**Date**: 2026-11-12 | **Spec**: `specs/features/hello-hono.md`

## Summary

Implement the approved Hello Hono feature as a single local `GET /` endpoint
that returns the exact plain-text greeting. The endpoint must be independently
testable, and a Node adapter must expose it on localhost port 3000.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js 24.13.0
**Primary Dependencies**: Hono 4.13.18, `@hono/node-server` 2.1.8.
**Test Tooling**: Vitest 4.1.12; `tsx` 4.23.15 is used for development.
**Storage**: None for this feature.
**Testing**: Vitest 4.1.12 and Hono's in-memory request interface; local HTTP
smoke checks use PowerShell.
**Target Platform**: Local Node.js process on Windows, bound to localhost.
**Performance Goals**: No throughput target; the user must receive the greeting
from one local navigation after startup.
**Constraints**: `strict: true`, exact dependency versions and a committed
Lockfile; no HTML, database, external service, or silent fallback to another
port.

## Constitution Check

*GATE: Must pass. Re-check after design review.*

| Principle | Result | Plan alignment |
|---|---|---|
| I. מפרט לפני מימוש | PASS | Tasks and tests trace to `REQ-001`–`REQ-010`. |
| II. שימושיות בעברית וב-RTL | PASS | This feature is API-only; it introduces no user interface. |
| III. גבולות תוכן בריאותי ופרטיות | PASS | No health data or wellness content is handled. |
| IV. פעולה אמינה בסביבת NetFree | PASS | Endpoint has no external assets, API, or service dependency. |
| V. טיפוסים, התמדה ובדיקות | PASS | Strict TypeScript, pinned versions, automated route tests; no persistence is in scope. |

## Applied Guidelines

No Hono-specific project guideline was available at the configured skills
guidelines path. This is a new, single-route Node service; no migration
transformation guideline applies. The implementation follows the exact route
contract and local-only constraints in the approved feature spec.

## Implementation Steps

### Phase 1 — Setup and test-first contract

#### Step 1.1 — Prepare route contract tests

- **Requirements**: REQ-001, REQ-002, REQ-003, REQ-004, REQ-008
- **Design inputs**: `specs/features/hello-hono.md`, scenario 1 and acceptance scenarios 1–3
- **Description**: Write Vitest cases for the root response and unknown-path 404 before implementing the route. Add only the minimal Hono app shell required to import the app; do not add response behavior yet.

### Phase 2 — Endpoint and local server

#### Step 2.1 — Pin dependencies and test command

- **Requirements**: REQ-005, REQ-006, REQ-008
- **Design inputs**: Feature spec dependency versions and `package.json`
- **Description**: Add exact Hono and Node-adapter versions, the Vitest runner and `npm test` script, and update the npm Lockfile.

#### Step 2.2 — Implement the root route

- **Requirements**: REQ-001, REQ-002, REQ-003, REQ-004, REQ-009, REQ-010
- **Design inputs**: Feature spec route contract and scope exclusions
- **Description**: Implement only `GET /`, with status 200 and exact `text/plain` body `Hello Hono!`; leave undefined paths as 404.

#### Step 2.3 — Start the Node server locally

- **Requirements**: REQ-005, REQ-006, REQ-007, REQ-009
- **Design inputs**: Feature spec port, runtime, and error behavior
- **Description**: Wire the Hono app through `@hono/node-server`, bind to localhost:3000, report readiness, and surface startup errors without selecting another port silently.

### Phase 3 — Validation and documentation

#### Step 3.1 — Verify the complete contract

- **Requirements**: REQ-001 through REQ-010
- **Design inputs**: Feature spec Validation table, Scorecard, and this plan's Requirement Mapping
- **Description**: Run clean install, tests, typecheck, build, and the local HTTP/404/port-conflict checks. Review the diff, update README and TASKS with verified results, and report any gap instead of marking it complete.

## Project Structure

```text
.
├── package.json
├── package-lock.json
├── src/
│   ├── app.ts
│   ├── app.test.ts
│   └── index.ts
└── specs/features/hello-hono.md
```

## Testing Strategy

- **appType**: API-only
- **Critical user journeys**:
  1. Start the server and receive the greeting from `GET /`.
  2. Request an undefined path and receive `404`.
  3. Attempt startup while port 3000 is occupied and observe a visible failure without a silent port change.
- **primaryValidationStack**: Vitest, Hono's in-memory request interface, TypeScript typecheck/build, and local HTTP probes.
- **Test infrastructure**: `src/app.test.ts` is the Vitest route-contract suite. The single-route API needs no shared fixtures; tests use Hono's in-memory request interface. No external service or database is used.
- **Test execution rule**: Run `npm test` for every implementation batch; all contract tests must pass before the feature is considered complete.
- **fallbackMatrix**:
  - `infra-tier`: Not applicable; this feature has no database or external infrastructure.
  - `browser-tier`: Not applicable; this feature has no HTML or user interface.
- **Environment requirements**: Node.js `24.13.0`; localhost port `3000`; no Docker or external service.
- **knownGaps**: No visual, browser-layout, or persistence validation because those capabilities are explicitly out of scope.
- **Test data strategy**: No persistent test data; each route test creates an in-memory request.
- **Acceptance criteria**: All `SC-001`–`SC-004` pass; scorecard is at least 9/10; no failure in `SC-001`–`SC-003`.
- **Validation review expectations**: Confirm exact response/status/content type, unknown route 404, local binding/error behavior, exact package versions, test results, and no scope creep.

## Requirement Mapping

| REQ ID | Description | Plan Items | Tasks | Implementation Evidence |
|--------|-------------|------------|-------|------------------------|
| REQ-001 | Handle `GET /` | 1.1, 2.2, 3.1 | T001, T003, T005 | `src/app.ts`, `src/app.test.ts` |
| REQ-002 | Return HTTP 200 on success | 1.1, 2.2, 3.1 | T001, T003, T005 | `src/app.ts`, `src/app.test.ts` |
| REQ-003 | Exact plain-text greeting | 1.1, 2.2, 3.1 | T001, T003, T005 | `src/app.ts`, `src/app.test.ts` |
| REQ-004 | Unknown paths return 404 | 1.1, 2.2, 3.1 | T001, T003, T005 | `src/app.test.ts` |
| REQ-005 | Use exact Hono and Node-adapter versions | 2.1, 2.3, 3.1 | T002, T004, T005 | `package.json`, `package-lock.json` |
| REQ-006 | Node version range and strict TypeScript | 2.1, 2.3, 3.1 | T002, T004, T005 | `package.json`, `tsconfig.json`, build output |
| REQ-007 | Bind localhost port 3000 and surface conflicts | 2.3, 3.1 | T004, T005 | `src/index.ts`, local startup probe |
| REQ-008 | In-memory tests and local HTTP smoke check | 1.1, 2.1, 3.1 | T001, T002, T005 | `src/app.test.ts`, recorded validation results |
| REQ-009 | No external services or database | 2.2, 2.3, 3.1 | T003, T004, T005 | `src/app.ts`, `src/index.ts`, dependency review |
| REQ-010 | Keep HTML and other product behavior out of scope | 2.2, 3.1 | T003, T005 | `src/app.ts`, reviewed diff |

## Tasks

### Phase 1: Setup and test-first contract

- [x] T001 [US1] [Plan:1.1] Write root-response and unknown-path tests in `src/app.test.ts` before implementing route behavior; create a minimal Hono app shell in `src/app.ts`.

### Phase 2: Endpoint and local server

- [x] T002 [Plan:2.1] Pin `hono@4.13.18` and `@hono/node-server@2.1.8`, add the `npm test` script in `package.json`, and update `package-lock.json`.
- [x] T003 [US1] [Plan:2.2] Implement only the `GET /` greeting in `src/app.ts`, preserving the unknown-path 404 behavior.
- [x] T004 [US1] [Plan:2.3] Wire `src/index.ts` to the Node adapter on localhost:3000 and surface server startup errors explicitly.

### Phase 3: Validation and documentation

- [x] T005 [Plan:3.1] Run `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, and local endpoint/404/port-conflict probes; update `README.md` and `TASKS.md` with verified results.
