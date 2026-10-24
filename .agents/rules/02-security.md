---
trigger: always_on
---

# 02 — Security & Authorization Rules

## Scope

This document defines security, authentication, authorization, validation, data exposure, and untrusted-input handling for the CMS.

Apply these rules together with the other CMS rule documents.

---

## Rule 01 — Frontend Is Not a Security Boundary

React and Inertia are responsible for UI/UX only.

Frontend validation, hidden fields, disabled buttons, frontend route guards, and permission-based rendering are NOT security mechanisms.

Laravel must independently validate, authorize, and enforce business rules for every sensitive operation.

---

## Rule 02 — Authentication

Use Laravel-supported authentication mechanisms.

Never:

- store plaintext passwords
- expose password hashes
- expose session tokens
- expose password-reset tokens
- expose API tokens
- expose secrets

Use appropriate password reset, email verification, session security, and authentication rate limiting when required.

---

## Rule 03 — Authorization

Authentication is not authorization.

For every protected operation, determine:

1. Is the user authenticated?
2. Does the user have the required permission?
3. Is the user authorized to access this specific resource?
4. Does ownership or business logic permit the operation?

Never rely on frontend checks for authorization.

---

## Rule 04 — Spatie Permission

Use Spatie Laravel Permission as the authorization foundation.

Preferred model:

```text
User
  → Role
      → Permissions
```

Prefer capability-based checks such as:

```php
$user->can('posts.update');
```

rather than scattering role-name checks throughout the application.

Roles should primarily group permissions.

---

## Rule 05 — Permission Naming

Use a stable and consistent naming convention:

```text
RESOURCE.ACTION
```

Examples:

```text
posts.view
posts.create
posts.update
posts.delete
posts.publish
posts.unpublish
posts.restore
posts.force-delete

media.view
media.upload
media.update
media.delete

users.view
users.create
users.update
users.delete

roles.view
roles.create
roles.update
roles.delete

settings.view
settings.update
```

Do not mix naming styles such as `edit_post`, `canEditPost`, and `post-edit`.

---

## Rule 06 — Policies

Use Laravel Policies for resource-level authorization.

Examples:

- PostPolicy
- CategoryPolicy
- MediaPolicy
- UserPolicy
- RolePolicy
- PermissionPolicy
- SettingPolicy

Use Spatie permission checks for capabilities and Policies for resource-specific rules.

Example:

```php
public function update(User $user, Post $post): bool
{
    return $user->can('posts.update');
}
```

Policies may additionally enforce ownership or other business constraints.

---

## Rule 07 — IDOR / BOLA Prevention

Never trust client-supplied resource IDs.

Knowing a URL such as:

```text
/posts/123/edit
```

does not imply that the current user may edit Post 123.

Always authorize the actual resource.

Use route model binding and Policies where appropriate.

---

## Rule 08 — Route Authorization

Protected CMS routes must use authentication middleware.

Use permission middleware for broad access control when useful.

Example:

```php
Route::middleware('permission:posts.view')
    ->get('/posts', ...);
```

However, middleware does not replace resource Policies.

Use middleware for broad authorization and Policies for resource-specific authorization.

---

## Rule 09 — Server-Side Validation

All external input must be validated server-side.

Prefer Form Request classes for non-trivial validation.

Validate:

- required fields
- data types
- lengths
- formats
- allowed values
- IDs
- relationships
- files
- business constraints

Frontend validation may improve UX but is never authoritative.

---

## Rule 10 — Never Trust Request Data

Never blindly persist:

```php
$request->all()
```

Prefer:

```php
$request->validated()
```

or explicitly selected fields.

Do not let request payloads directly control security-sensitive fields such as:

```text
author_id
user_id
role
permissions
is_admin
published_by
approved_by
created_by
```

unless the operation explicitly authorizes and validates those values.

---

## Rule 11 — Mass Assignment Protection

Protect Eloquent models against mass assignment.

Prefer explicit `$fillable` definitions where appropriate.

Example:

```php
protected $fillable = [
    'title',
    'slug',
    'content',
    'excerpt',
];
```

Do not use `$guarded = []` casually on security-sensitive models.

Never allow mass assignment to become a privilege-escalation path.

---

## Rule 12 — XSS / Rich Text Security

All CMS content is untrusted input, including content created by privileged users.

This applies to:

- WYSIWYG editors
- HTML fields
- Markdown rendered as HTML
- custom HTML blocks
- embedded content

Do not blindly render unsanitized HTML.

Avoid unsafe usage such as:

```tsx
dangerouslySetInnerHTML={{ __html: post.content }}
```

unless the content has been properly sanitized.

Use server-side HTML sanitization with an allowlist.

Protect against:

- `<script>`
- `javascript:` URLs
- event-handler attributes such as `onclick`
- unsafe SVG
- unsafe iframes/embeds

Do not attempt to secure HTML by replacing a few dangerous strings manually.

---

## Rule 13 — SQL Injection Protection

Prefer Eloquent, Query Builder, and parameter binding.

Never concatenate untrusted input into SQL.

Be especially careful with dynamic:

- sorting
- column names
- table names
- SQL expressions

Use explicit allowlists for dynamic query components.

---

## Rule 14 — File Upload Security

Treat every file upload as security-sensitive.

Validate, as appropriate:

- extension
- MIME type
- actual file type/content
- file size
- image dimensions
- destination

Never trust the original filename or browser-supplied MIME type.

Generate server-side filenames.

Never allow arbitrary file paths or executable uploads.

Use private storage for private files and authorize private downloads.

---

## Rule 15 — Path Traversal / Filesystem Safety

Never use a client-controlled path directly with the filesystem.

Reject or safely handle traversal attempts such as:

```text
../
../../
/etc/passwd
```

Do not expose arbitrary file access through query parameters or route parameters.

Use Laravel's filesystem abstraction and controlled storage paths.

---

## Rule 16 — CSRF and Session Security

Do not disable Laravel CSRF protection merely to solve frontend issues.

Browser-based state-changing requests must use Laravel's CSRF mechanisms correctly.

Use appropriate session security, including secure cookie settings and session regeneration/invalidation where needed.

Do not exclude endpoints from CSRF protection without a deliberate architectural reason.

---

## Rule 17 — Secrets, Errors, and HTTP Security

Never hard-code or expose:

- `APP_KEY`
- database passwords
- API keys
- OAuth secrets
- cloud credentials
- private keys
- `.env` contents

Never expose stack traces, SQL queries, filesystem paths, or sensitive configuration to users in production.

Use HTTPS in production and configure appropriate secure cookies and HTTP security headers according to the application's needs.

---

## Rule 18 — Rate Limiting, Privilege Escalation, and Security Review

Rate-limit sensitive or abuse-prone operations such as:

- login
- password reset
- public forms
- media uploads
- expensive searches
- exports
- bulk operations

For role/permission management, prevent users from granting themselves or others unauthorized privileges.

Never trust client-controlled `role`, `permissions`, or administrative flags.

Before considering a feature secure, explicitly review for:

- authentication failures
- authorization bypass
- IDOR/BOLA
- mass assignment
- XSS
- SQL injection
- CSRF
- path traversal
- unsafe uploads
- privilege escalation
- sensitive data exposure
