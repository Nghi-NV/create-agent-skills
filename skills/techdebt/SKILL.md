---
name: techdebt
description: Scan and address technical debt in codebase. Find duplicated code, unused imports, TODO/FIXME comments, dead code, and suggest refactoring. Use at end of sessions or before releases. Triggers on "tech debt", "techdebt", "cleanup", "duplication", "dead code".
---

# Tech Debt Scanner

Systematically identify and address technical debt. Run at the end of coding sessions or before releases to keep codebase healthy.

## When to Use This Skill

- End of a coding session
- Before major releases
- After rapid prototyping
- When codebase feels "messy"
- User says "cleanup", "tech debt"

## How to Use

### Step 1: Scan for Common Issues

Run these checks in order:

#### 1.1 TODO/FIXME/HACK Comments
```bash
# Find all TODO/FIXME/HACK across codebase
grep -rn "TODO\|FIXME\|HACK\|XXX\|WORKAROUND" --include="*.{ts,tsx,js,jsx,rs,dart,swift,kt,py}" .

# Count them
grep -rc "TODO\|FIXME\|HACK" --include="*.{ts,tsx,js,jsx,rs,dart,swift,kt,py}" . | grep -v ":0$" | sort -t: -k2 -rn
```

#### 1.2 Code Duplication
Look for:
- Functions with similar names doing similar things
- Copy-pasted blocks (>10 lines identical)
- Similar error handling patterns that could be extracted

#### 1.3 Unused Code
```bash
# TypeScript/JavaScript — unused exports
# Rust — dead code warnings
cargo build 2>&1 | grep "warning.*dead_code\|warning.*unused"

# Dart — unused imports
dart analyze 2>&1 | grep "unused_import"
```

#### 1.4 Large Files
```bash
# Files over 300 lines (candidates for splitting)
find . -name "*.ts" -o -name "*.rs" -o -name "*.dart" | xargs wc -l | sort -rn | head -20
```

#### 1.5 Complex Functions
Look for functions with:
- More than 50 lines
- Deep nesting (>3 levels)
- Multiple return points (>5)
- Too many parameters (>5)

### Step 2: Prioritize

| Priority | Type | Action |
|----------|------|--------|
| 🔴 High | Security TODOs, known bugs | Fix now |
| 🟠 Medium | Code duplication, large files | Plan refactor |
| 🟡 Low | Style issues, minor TODOs | Track for later |
| 💡 Info | Unused imports, dead code | Quick cleanup |

### Step 3: Report

Generate a tech debt report:

```markdown
## Tech Debt Report — [Date]

### Summary
- 🔴 Critical: X items
- 🟠 Medium: X items
- 🟡 Low: X items
- Total TODOs: X | FIXMEs: X

### Critical Items
1. [File:Line] — Description — Suggested action

### Duplication Found
1. [FileA:Lines] ↔ [FileB:Lines] — Extract to shared util

### Large Files (>300 lines)
1. [File] — X lines — Suggested split

### Quick Wins (fix now)
1. Remove unused imports in [files]
2. Delete dead code in [files]
```

### Step 4: Quick Cleanup

Auto-fix safe items:
- Remove unused imports
- Delete commented-out code blocks
- Fix formatting issues
- Remove empty files

> [!WARNING]
> Only auto-fix items that are **safe and reversible**. Report everything else for manual review.

## Best Practices

1. **Run weekly** — Don't let debt accumulate
2. **Fix quick wins immediately** — Unused imports, formatting
3. **Track larger items** — Add to backlog, don't ignore
4. **Measure over time** — Are TODOs growing or shrinking?
5. **Pair with code review** — Flag debt during reviews
6. **Time-box cleanup** — 30 min max per session
