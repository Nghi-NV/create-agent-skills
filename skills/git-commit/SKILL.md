---
name: git-commit
description: Guide for writing effective Git commit messages following Conventional Commits specification. Use when committing code changes, writing commit messages, or ensuring consistent commit history.
---

# Git Commit Messages

This skill provides guidance for writing clear, consistent commit messages following the Conventional Commits specification.

## When to Use This Skill

- Writing commit messages for any code changes
- Ensuring commit history is clean and readable
- Following team/project commit conventions
- Generating changelogs automatically
- **Ensuring documentation is up-to-date with code changes**

## Pre-commit Checklist

Before committing, ask yourself:

1.  **Documentation**: Does this change affect the public API, installation, or usage?
    *   If **YES**, update `README.md` or relevant documentation files.
2.  **Examples**: Do any existing examples in the docs need updating?
3.  **Tests**: Have tests been updated or added to cover this change?
4.  **Changelog**: Does this change warrant a manual entry in `CHANGELOG.md`?

> [!TIP]
> If a commit requires a documentation update, consider including it in the same commit or a subsequent `docs` commit. Using a multi-line commit message to cross-reference the doc change is a best practice.

## Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Components

| Part | Required | Description |
|------|----------|-------------|
| type | ✅ Yes | Category of change |
| scope | ❌ No | Component/area affected |
| subject | ✅ Yes | Brief description (imperative mood) |
| body | ❌ No | Detailed explanation |
| footer | ❌ No | Breaking changes, issue refs |

## Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | ✨ New feature | `feat(auth): add OAuth login` |
| `fix` | 🐛 Bug fix | `fix(api): handle null response` |
| `docs` | 📚 Documentation only | `docs: update README` |
| `style` | 🎨 Formatting, no code change | `style: fix indentation` |
| `refactor` | 🔧 Code change, no new feature/fix | `refactor(utils): simplify logic` |
| `perf` | 🚀 Performance improvement | `perf(query): add index` |
| `test` | 🧪 Adding/updating tests | `test(auth): add login tests` |
| `build` | 📦 Build system, dependencies | `build: upgrade webpack` |
| `ci` | 👷 CI configuration | `ci: add GitHub Actions` |
| `chore` | ♻️ Other maintenance | `chore: update .gitignore` |

## Optional: Emoji Prefix Format

You can optionally prefix commit messages with emojis for better visual scanning:

```
<icon> <type>(<scope>): <subject>
```

### Format Examples

```bash
# With emoji prefix
🐛 fix(api): handle null response
✨ feat(auth): add OAuth login
📚 docs: update installation guide
🔧 refactor(utils): simplify validation logic
🚀 perf(query): optimize database queries

# Standard format (also valid)
fix(api): handle null response
feat(auth): add OAuth login
```

### Type to Emoji Mapping

| Type | Emoji | Unicode |
|------|-------|---------|
| `feat` | ✨ | `:sparkles:` |
| `fix` | 🐛 | `:bug:` |
| `docs` | 📚 | `:books:` |
| `style` | 🎨 | `:art:` |
| `refactor` | 🔧 | `:wrench:` |
| `perf` | 🚀 | `:rocket:` |
| `test` | 🧪 | `:test_tube:` |
| `build` | 📦 | `:package:` |
| `ci` | 👷 | `:construction_worker:` |
| `chore` | ♻️ | `:recycle:` |
| `revert` | ⏪ | `:rewind:` |
| `hotfix` | 🚑 | `:ambulance:` |
| `security` | 🔒 | `:lock:` |
| `wip` | 🚧 | `:construction:` |

> [!TIP]
> Using emojis is **optional** and depends on team preference. Both formats are valid. The emoji helps quickly identify commit types when scanning git log.

## Subject Line Rules

1. **Use imperative mood**: "add" not "added" or "adds"
2. **No capitalization**: start lowercase
3. **No period at the end**
4. **Max 50 characters** (hard limit: 72)
5. **Be specific**: what changed, not why

```diff
- feat: Updated the login page
+ feat(auth): add password reset form

- fix: bug fix
+ fix(cart): prevent duplicate items

- ✨ added new feature
+ feat(dashboard): add real-time notifications
```

## Body Guidelines

- Separate from subject with blank line
- Wrap at 72 characters
- Explain **what** and **why**, not how
- Use bullet points for multiple changes

```
feat(auth): add two-factor authentication

- Add TOTP-based 2FA using authenticator apps
- Store encrypted backup codes in database
- Add SMS fallback for 2FA recovery

This improves account security for enterprise users
who require MFA compliance.
```

## Footer Conventions

### Breaking Changes

```
feat(api): change response format

BREAKING CHANGE: API now returns data in envelope format.
Clients must update to extract data from `response.data`.
```

### Issue References

```
fix(login): handle expired tokens

Closes #123
Fixes #456
Refs #789
```

## Decision Tree

```
What type of change?
├── Adding new functionality → feat
├── Fixing a bug → fix
├── Updating documentation → docs
├── Formatting/linting only → style
├── Restructuring code → refactor
├── Improving performance → perf
├── Adding/fixing tests → test
├── Build/dependencies → build
├── CI/CD changes → ci
└── Everything else → chore
```

## Examples

### Feature

```bash
git commit -m "feat(checkout): add Apple Pay support"
```

### Bug Fix

```bash
git commit -m "fix(auth): prevent session timeout on active users"
```

### With Body

```bash
git commit -m "refactor(api): migrate to async/await

Replace callback-based API calls with async/await pattern.
This improves readability and error handling.

Refs #234"
```

### Breaking Change

```bash
git commit -m "feat(api)!: change authentication to JWT

BREAKING CHANGE: Session-based auth is no longer supported.
All clients must use Bearer tokens."
```

## Common Mistakes

| Mistake | Correct |
|---------|---------|
| `Fixed bug` | `fix(module): handle edge case` |
| `WIP` | `feat(feature): add initial implementation` |
| `Update file.js` | `refactor(utils): extract helper function` |
| `Changes` | Be specific about what changed |
| Past tense "added" | Imperative "add" |

## Tools

### Commitlint

Enforce commit conventions:
```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### Commitizen

Interactive commit helper:
```bash
npm install -D commitizen cz-conventional-changelog
npx cz
```

## Related Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
