---
name: safe-commands
description: Safety rules and command validation. Use when running potentially destructive commands like rm, git push --force, database operations, or any command that modifies/deletes files or data irreversibly.
---

# Safe Commands

Prevent accidental damage by validating dangerous commands before execution.

## When to Use This Skill

- Before running `rm -rf`, `git reset --hard`, `git push --force`
- Before any database DROP, TRUNCATE, or DELETE operations
- Before running commands that modify system-level configurations
- When cleaning build artifacts / node_modules
- Any time a command cannot be easily undone

## Blocked Commands (NEVER Auto-Run)

These commands MUST always require explicit user confirmation:

| Command Pattern | Risk | Alternative |
|---|---|---|
| `rm -rf /` or `rm -rf ~` | **Catastrophic** — system wipe | Specify exact path |
| `rm -rf .` in project root | **High** — deletes entire project | Specify subdirectory |
| `git push --force` on main/master | **High** — overwrites shared history | `git push --force-with-lease` |
| `git reset --hard` | **High** — loses uncommitted work | `git stash` first |
| `git clean -fdx` | **High** — removes all untracked files | `git clean -fdn` (dry run) first |
| `DROP DATABASE` / `DROP TABLE` | **Catastrophic** — data loss | Backup first |
| `chmod -R 777` | **High** — security risk | Use specific permissions |
| `sudo rm` anything | **High** — bypasses safety | Verify path carefully |
| `npm publish` | **Medium** — irreversible publish | Verify version + dry run first |
| `cargo publish` | **Medium** — irreversible publish | `cargo publish --dry-run` first |

## Pre-Command Checks

### Before Deleting Files

```bash
# ✅ ALWAYS do a dry run first
rm -rf target/       # OK — build artifacts
rm -rf node_modules/ # OK — can reinstall

# ⚠️ DANGEROUS — ask user first
rm -rf src/          # Deleting source code!
rm -rf .git/         # Removing git history!
```

### Before Git Operations

```bash
# ✅ ALWAYS check status before destructive git ops
git status           # Check working tree
git stash list       # Check stashed changes
git log --oneline -5 # Verify recent history

# ✅ Safe force push
git push --force-with-lease  # Prevents overwriting others' work

# ⚠️ Before reset
git stash            # Save uncommitted work FIRST
git reset --hard HEAD~1
```

### Before Database Operations

```bash
# ✅ Backup before destructive operations
pg_dump dbname > backup.sql
sqlite3 db.sqlite ".backup backup.sqlite"

# Then safe to proceed with destructive ops
```

## Decision Tree

```
Is this command destructive? (deletes files, modifies git history, drops data)
├── NO → Safe to auto-run (SafeToAutoRun: true)
├── YES
│   ├── Can it be undone? (git stash, trash instead of rm)
│   │   ├── YES → Run with precaution (stash/backup first)
│   │   └── NO → MUST get user confirmation
│   └── Is it targeting build artifacts? (target/, node_modules/, .build/)
│       ├── YES → Safe to auto-run
│       └── NO → Ask user first
```

## Best Practices

1. **Dry run first** — Most tools support `--dry-run` or `-n` flag
2. **Backup before destructive** — `git stash`, `pg_dump`, `cp -r`
3. **Use trash instead of rm** — `trash` command moves to trash instead of permanent delete
4. **Verify paths** — `echo` the path before running `rm`
5. **Small blast radius** — Delete specific files, not entire directories
6. **Force-with-lease over force** — `git push --force-with-lease` is always safer
