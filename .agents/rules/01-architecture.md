---
trigger: always_on
---

# 01 — Architecture & Laravel Rules

## Scope

This document defines the architecture and Laravel coding rules for a production-grade CMS built with Laravel 13, PHP 8.3+, React, TypeScript, Inertia.js, PostgreSQL, and Spatie Laravel Permission.

Apply these rules together with the other CMS rule documents.

---

## Rule 01 — Core Principles

Always prioritize:

1. Security
2. Authorization
3. Data integrity
4. Correctness
5. Maintainability
6. Performance
7. Developer experience

Never sacrifice security, authorization, or data integrity for convenience.

---

## Rule 02 — Laravel First

Prefer official Laravel features and established Laravel conventions before introducing custom implementations.

Prefer:

- Form Requests
- Policies / Gates
- Middleware
- Eloquent
- Database transactions
- Jobs / Queues
- Events / Listeners
- Notifications
- Cache
- Rate Limiting
- Filesystem
- Laravel authentication

Do not recreate functionality that Laravel already provides.

Never invent Laravel APIs or assume an API exists without verification.

---

## Rule 03 — Application Architecture

Use this default application flow:

```text
Request
→ Middleware
→ Form Request
→ Authorization / Policy
→ Controller
→ Action / Service when necessary
→ Eloquent
→ PostgreSQL
```

Use Inertia for normal browser-based CMS interactions.

Do not create REST APIs for ordinary CRUD unless there is a real architectural requirement.

---

## Rule 04 — Thin Controllers

Controllers should primarily:

1. Receive the request.
2. Delegate validation through Form Requests.
3. Trigger authorization.
4. Call application/business logic.
5. Return an Inertia response or redirect.

Do not place large business workflows inside controllers.

---

## Rule 05 — Actions and Services

Use Action/Service classes for meaningful business operations, for example:

- CreatePostAction
- UpdatePostAction
- PublishPostAction
- UnpublishPostAction
- UploadMediaAction
- DeleteMediaAction
- AssignRoleAction
- SyncRolePermissionsAction

Do not create a service for trivial CRUD merely to add abstraction.

---

## Rule 06 — Avoid Over-Engineering

Do not automatically introduce:

- Repository Pattern
- Interfaces
- DTO layers
- Managers
- Abstract classes
- CQRS
- DDD layers
- Complex event systems

Use these patterns only when the feature's complexity or architectural requirements genuinely justify them.

Prefer the simplest design that remains secure, testable, and maintainable.

---

## Rule 07 — Repository Pattern

Do not introduce repositories automatically.

Eloquent and the Query Builder are sufficient for normal CRUD and query operations.

Introduce a repository only when there is a concrete architectural requirement, not because a pattern is considered fashionable or "cleaner."

---

## Rule 08 — Models

Models should primarily contain:

- relationships
- casts
- scopes
- small model-specific behavior
- domain rules that naturally belong to the model

Avoid turning models into large "god classes."

Move complex workflows into Actions/Services.

---

## Rule 09 — Eloquent Conventions

Prefer Eloquent for ordinary domain operations.

Define relationships explicitly and use them consistently.

Avoid unnecessary raw SQL.

Avoid loading entire datasets when pagination or constrained queries are appropriate.

Use eager loading deliberately to avoid N+1 queries.

---

## Rule 10 — Dependency Injection

Prefer dependency injection for dependencies that belong to application logic.

Avoid unnecessary service-locator patterns and static access when dependency injection makes the dependency clearer and more testable.

Keep dependencies explicit in constructors or method parameters where appropriate.

---

## Rule 11 — Naming Conventions

Follow Laravel naming conventions consistently.

Examples:

```text
Post
PostPolicy
PostStatus
StorePostRequest
UpdatePostRequest
PublishPostAction
PostController
PostResource
```

Use descriptive, domain-oriented names.

Avoid ambiguous names such as `DataManager`, `Helper`, or `Processor` when a specific domain name is available.

---

## Rule 12 — Project Structure

Organize code around Laravel conventions and domain clarity.

A possible structure is:

```text
app/
    Actions/
        Posts/
        Media/
        Users/
        Roles/
    Http/
        Controllers/
            Admin/
        Requests/
            Admin/
    Models/
    Policies/

resources/
    js/
        Pages/
            Admin/
                Posts/
                Users/
                Roles/
                Media/
        Components/
```

Do not create additional layers or directories unless they improve discoverability and maintainability.

---

## Rule 13 — Admin Domain Boundary

Keep administrative functionality clearly separated from public website behavior.

Typical routes may be grouped under:

```text
/admin/posts
/admin/users
/admin/roles
/admin/permissions
/admin/media
/admin/settings
```

Administrative controllers, requests, and pages should remain clearly identifiable.

---

## Rule 14 — Routes

Keep routes predictable and RESTful where appropriate.

Use route model binding when it improves correctness and readability.

Apply authentication middleware to protected CMS areas.

Use permission middleware for broad access control and Policies for resource-level authorization.

Do not place security logic only in route definitions.

---

## Rule 15 — Resources / Transformers

Do not serialize entire Eloquent models blindly when returning data to the frontend.

Use explicit arrays, API Resources, or dedicated transformers when the response shape is non-trivial.

Return only the fields required by the consumer.

Avoid coupling frontend contracts directly to the complete database schema.

---

## Rule 16 — Events and Listeners

Use events/listeners when they provide useful decoupling.

Good example:

```text
PostPublished
    → ClearPostCache
    → IndexSearch
    → NotifySubscribers
```

Do not create events for every trivial CRUD operation.

Prefer explicit code when the workflow is simple and easier to understand.

---

## Rule 17 — Dependencies

Before adding a Composer or NPM package:

1. Check whether Laravel already provides the feature.
2. Check whether React/Inertia already provides the feature.
3. Check whether Spatie already provides the feature.
4. Verify maintenance status.
5. Verify Laravel/PHP compatibility.
6. Review security history.
7. Confirm there is a real requirement.

Never invent package names, package methods, or package configuration.

---

## Rule 18 — Existing Architecture First

Before changing code, inspect and preserve the existing architecture.

Reuse existing:

- models
- migrations
- routes
- Policies
- permissions
- Form Requests
- Actions
- React components
- shared utilities
- conventions

When modifying existing code:

- avoid unrelated refactoring
- avoid breaking existing behavior
- make the smallest necessary change
- reuse established patterns when appropriate
- do not introduce new architecture without a concrete reason

