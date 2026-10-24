---
trigger: always_on
---

# 04 — React, Inertia & Quality Rules

## Scope

This document defines React, TypeScript, Inertia.js, frontend data exposure, testing, logging, deployment, and implementation/review quality rules.

Apply these rules together with the other CMS rule documents.

---

## Rule 01 — React + Inertia Responsibilities

React and Inertia are responsible for presentation and user interaction.

Use them for:

- UI
- UX
- form state
- loading state
- displaying backend validation errors
- client-side validation for UX
- permission-aware UI visibility

Keep authoritative business rules and security decisions in Laravel.

---

## Rule 02 — TypeScript

Use TypeScript consistently.

Avoid:

```tsx
const data: any
```

unless it is genuinely necessary and documented.

Prefer explicit types and interfaces.

Example:

```tsx
interface Post {
    id: string;
    title: string;
    slug: string;
    status: PostStatus;
}
```

---

## Rule 03 — Inertia Props

Never expose complete Eloquent models blindly to the frontend.

Return only the fields the page actually needs.

Do not expose:

- password hashes
- API/session tokens
- secrets
- internal credentials
- unnecessary sensitive fields
- unnecessary relationships

Use explicit prop structures, Resources, or transformers when appropriate.

---

## Rule 04 — Shared Inertia Props

Be conservative with global shared props.

Do not globally expose all users, roles, permissions, settings, or internal application data merely for convenience.

Only share information that the frontend genuinely needs.

Frontend permission data is metadata for UI behavior only.

---

## Rule 05 — Inertia Forms

Use Inertia's form mechanisms appropriately.

Frontend responsibilities include:

- form state
- UX validation
- loading state
- rendering server validation errors
- confirmation UX

Laravel remains the authoritative source for validation, authorization, and business rules.

Do not build a second frontend-only business validation system that can disagree with the backend.

---

## Rule 06 — Permission-Aware UI

It is acceptable to show or hide UI based on permissions.

Example:

```tsx
{permissions.includes('posts.publish') && (
    <PublishButton />
)}
```

This is a UX optimization, not a security mechanism.

The Laravel endpoint must still enforce authorization.

---

## Rule 07 — No Authoritative Business Logic in React

Do not make React the source of truth for business state transitions.

For example, React may display whether a post appears publishable, but Laravel must determine whether publishing is actually allowed.

Never rely on client-side status checks to authorize sensitive operations.

---

## Rule 08 — Reusable Components

Extract reusable React components when reuse or readability improves.

Possible examples:

```text
DataTable.tsx
ConfirmDialog.tsx
FormField.tsx
StatusBadge.tsx
PermissionGate.tsx
```

Do not extract every small JSX fragment into its own component merely to increase component count.

---

## Rule 09 — Frontend State

Keep frontend state intentional and minimal.

Do not duplicate server state unnecessarily.

Prefer Inertia's server-driven model for normal CMS page state instead of introducing a global state library without a clear need.

Introduce additional state-management tooling only when the application actually requires it.

---

## Rule 10 — API Rules

When an API is genuinely required:

- validate requests
- authorize requests
- use appropriate authentication
- paginate large collections
- define stable response structures
- avoid exposing internal model fields
- rate-limit sensitive endpoints
- return consistent errors

Do not create an API layer for ordinary Inertia interactions simply because an API sounds more modern.

---

## Rule 11 — Automated Testing Strategy

Every important business rule must be covered by automated tests.

Prioritize Feature Tests for:

- authentication
- authorization
- CRUD
- validation
- publishing
- role/permission management
- media upload
- bulk actions
- soft deletes / restore

Use Unit Tests for isolated business logic with meaningful complexity.

Do not create meaningless tests solely to increase coverage percentage.

---

## Rule 12 — Security Tests

Security-sensitive resources should explicitly test:

```text
Unauthenticated user → denied
Authenticated without permission → 403
Authenticated with permission → allowed
Wrong ownership → denied
Manipulated resource ID → denied / not found
Mass assignment attempt → protected
Invalid payload → validation error
Invalid file → rejected
Oversized file → rejected
XSS payload → sanitized / rejected
Unauthorized bulk action → rejected
Privilege escalation attempt → rejected
```

Do not assume that happy-path tests demonstrate security.

---

## Rule 13 — E2E / Browser Testing

Use browser automation for critical CMS workflows.

Example:

```text
Login
→ Create Post
→ Edit Post
→ Submit for Review
→ Publish
→ Verify Public Page
```

Also test important negative workflows, for example:

```text
Login as Editor
→ Attempt User Management
→ Verify Access Denied
```

E2E tests complement backend Feature Tests and never replace them.

---

## Rule 14 — PostgreSQL in Tests

Production uses PostgreSQL.

When PostgreSQL-specific behavior matters, tests should run against PostgreSQL or otherwise explicitly cover those semantics.

Pay attention to:

- UUID/ULID
- JSON/JSONB
- constraints
- indexes
- transactions
- date/time behavior
- PostgreSQL-specific query behavior

Do not rely exclusively on another database engine when doing so could hide production-specific failures.

---

## Rule 15 — Logging and Audit Quality

Use structured, useful logs for important system and security events.

Audit sensitive CMS actions where appropriate, including:

- login failures
- role/permission changes
- user administration
- content changes
- publishing
- media changes
- settings changes
- sensitive exports

Never log:

- passwords
- session tokens
- API tokens
- secrets
- private keys

---

## Rule 16 — Production Deployment

Production configuration must include, as applicable:

```text
APP_DEBUG=false
HTTPS enabled
secure environment configuration
database backups
queue workers
scheduler
monitoring/logging
correct storage permissions
web server pointing to /public
```

Never expose the Laravel project root directly through the web server.

---

## Rule 17 — Code Quality

Prefer:

- type declarations
- return types
- dependency injection
- enums
- focused methods
- readable names
- cohesive classes

Use strict typing where consistent with the project standards:

```php
declare(strict_types=1);
```

Avoid:

- giant controllers
- god classes
- deeply nested conditionals
- duplicated business rules
- magic strings where enums/constants are appropriate
- unnecessary `any`

---

## Rule 18 — Implementation Process

Before implementing a feature, evaluate:

- authentication
- authorization
- validation
- database changes
- security risks
- performance risks
- audit requirements
- cache invalidation
- queue requirements
- testing requirements

Then implement the smallest necessary change using the existing architecture.

Do not modify unrelated code.

Briefly state important assumptions.

Include relevant tests.

---

## Rule 19 — Code Review Process

When reviewing code, inspect in this order:

1. Security vulnerabilities
2. Authorization vulnerabilities
3. Data integrity problems
4. Validation problems
5. Business logic problems
6. Database/query problems
7. Performance problems
8. Maintainability problems
9. Code style

Fix root causes rather than symptoms.

Before considering a feature complete, verify that the implementation is:

```text
SECURE
CORRECT
MAINTAINABLE
TESTABLE
PERFORMANT
```
