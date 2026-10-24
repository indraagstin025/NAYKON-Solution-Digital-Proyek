---
trigger: always_on
---

# 03 — Database, Performance & CMS Rules

## Scope

This document defines PostgreSQL, Eloquent, database integrity, CMS content workflows, media, performance, concurrency, caching, queues, and related business rules.

Apply these rules together with the other CMS rule documents.

---

## Rule 01 — PostgreSQL as the Source of Data Integrity

PostgreSQL is the production database and must be treated as a relational database, not simply a key-value store.

Use relational modeling appropriately and leverage database guarantees where they improve correctness.

---

## Rule 02 — Database Constraints

Important business invariants must be enforced at the database level whenever possible.

Use:

- foreign keys
- unique constraints
- `NOT NULL`
- check constraints where appropriate
- indexes

Application validation does not replace database constraints.

---

## Rule 03 — Foreign Keys and Relationships

Use explicit foreign keys for required relationships.

Example:

```php
$table->foreignId('author_id')
    ->constrained('users');
```

Define Eloquent relationships that reflect the database model.

Do not rely only on application code to preserve referential integrity.

---

## Rule 04 — Unique Constraints and Slugs

Slugs and other values that must be unique should be protected by both:

1. application-level validation
2. a database-level unique constraint

Example:

```php
$table->unique('slug');
```

Do not rely only on a validation rule such as `unique:...` because concurrent requests can still race.

---

## Rule 05 — Indexing

Create indexes based on actual query patterns.

Common CMS candidates include:

```text
slug
status
published_at
created_at
updated_at
foreign keys
```

Use composite indexes where query patterns justify them.

Do not blindly index every column.

---

## Rule 06 — Transactions

Use `DB::transaction()` when multiple database operations must succeed or fail together.

Example:

```php
DB::transaction(function () use ($post, $data) {
    $post->update($data);
    $post->categories()->sync($data['category_ids']);
    // audit or other database operations
});
```

Do not use transactions blindly.

Avoid holding database transactions open during slow external work.

---

## Rule 07 — Concurrency and Race Conditions

Consider race conditions for operations involving:

- unique slug generation
- publishing
- ordering
- counters
- bulk updates
- role/permission changes

Application checks alone may be insufficient.

Use appropriate database constraints, transactions, and locks where necessary.

---

## Rule 08 — Eloquent Query Performance

Always consider:

- N+1 queries
- unbounded queries
- unnecessary relationships
- unnecessary columns
- missing indexes
- expensive filtering
- inefficient sorting

Use Eloquent and Query Builder effectively rather than compensating for poor query patterns with caching or frontend workarounds.

---

## Rule 09 — N+1 Prevention

Avoid N+1 queries.

Bad:

```php
$posts = Post::paginate(20);

foreach ($posts as $post) {
    echo $post->author->name;
}
```

Better:

```php
$posts = Post::with('author')
    ->paginate(20);
```

Only eager-load relationships that are actually required.

---

## Rule 10 — Pagination and Bounded Queries

CMS list endpoints must be paginated when datasets can grow.

Prefer:

```php
Post::latest()->paginate(20);
```

Use cursor pagination when it genuinely fits the query pattern.

Do not use `Model::all()` for potentially large datasets.

---

## Rule 11 — UUID / ULID

Use UUID/ULID only when there is a real architectural reason.

Do not adopt UUID/ULID merely because numeric IDs are considered "insecure."

Identifier opacity does not replace authorization.

Resources using UUID/ULID still require normal authorization and IDOR protections.

---

## Rule 12 — Soft Deletes

Use `SoftDeletes` only when the business requires recoverability or a specific audit/recovery workflow.

If soft deletes are used, explicitly define behavior and permissions for:

- delete
- restore
- force delete

Ensure deleted content does not accidentally appear on public pages.

---

## Rule 13 — CMS Status and Publishing Workflow

Use typed enums for finite CMS states.

Example:

```php
enum PostStatus: string
{
    case DRAFT = 'draft';
    case REVIEW = 'review';
    case SCHEDULED = 'scheduled';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';
}
```

Do not scatter arbitrary state strings across the application.

Publishing is a business operation, not merely a database update.

---

## Rule 14 — Publishing, Revisions, and Auditability

Publishing may require:

- permission check
- Policy authorization
- validation
- slug validation
- publication-date handling
- cache invalidation
- audit logging
- search indexing
- event dispatching

Do not bypass publishing rules by directly updating `status`.

For important content, consider revision history that records who changed what, when it changed, and which revision is currently published.

---

## Rule 15 — Media Library

Separate media metadata from the physical file.

Typical metadata may include:

```text
id
disk
path
original_name
mime_type
size
width
height
alt_text
uploaded_by
created_at
updated_at
```

Use Laravel Filesystem for physical files.

Do not store large binary files in PostgreSQL unless there is a specific architectural reason.

---

## Rule 16 — Bulk Operations and Data Exports

Bulk operations must validate and authorize every affected record.

Before bulk operations:

1. Validate IDs.
2. Limit batch size.
3. Verify authorization.
4. Apply business rules to every target.
5. Use a transaction where appropriate.
6. Audit sensitive operations.

Large exports/imports should use streaming or queued processing where appropriate.

Private exports must be protected by authorization and controlled downloads.

---

## Rule 17 — Caching and Invalidation

Introduce caching only where it provides a measurable benefit.

Potential cache targets include:

- navigation
- categories
- public settings
- frequently accessed public content
- expensive queries

Every cache must have a clear invalidation strategy.

When content changes, explicitly consider which caches become stale.

---

## Rule 18 — Queues and Background Processing

Move expensive or non-immediate work to queues when appropriate, including:

- image processing
- emails
- notifications
- search indexing
- large exports
- imports
- sitemap generation
- heavy content processing

Do not block normal HTTP requests with expensive work unless there is a clear reason.

---

## Rule 19 — SEO and Public Content

For public CMS content, consider explicit fields such as:

```text
title
slug
excerpt
content
meta_title
meta_description
canonical_url
og_title
og_description
og_image
status
published_at
```

Validate SEO fields with sensible constraints.

When changing a published slug, consider redirects, SEO impact, existing links, and cache invalidation.

Do not allow unsafe redirects or arbitrary untrusted canonical URLs.
