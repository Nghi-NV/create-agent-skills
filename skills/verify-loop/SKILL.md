---
name: verify-loop
description: Automated verification loop that runs build, test, and lint until all pass. Use after implementing changes, before committing, or when ensuring code quality. Triggers on "verify", "check everything", "run all checks", "verification loop".
---

# Verify Loop — Automated Quality Gate

Run a continuous verification loop: Build → Test → Lint → Fix → Repeat until all checks pass. Improves output quality by 2-3x.

## When to Use This Skill

- After implementing any code changes
- Before committing or creating PRs
- When `build-check` alone isn't enough
- User says "verify everything", "make sure it works"
- End of any EXECUTION phase before VERIFICATION

## How It Works

```
┌─────────────────────────────────┐
│         VERIFY LOOP             │
├─────────────────────────────────┤
│                                 │
│  1. Build  ──→ Pass? ──→ Next  │
│                 │               │
│                Fail → Fix → ↻  │
│                                 │
│  2. Lint   ──→ Pass? ──→ Next  │
│                 │               │
│                Fail → Fix → ↻  │
│                                 │
│  3. Test   ──→ Pass? ──→ Next  │
│                 │               │
│                Fail → Fix → ↻  │
│                                 │
│  4. Type   ──→ Pass? ──→ Done  │
│                 │               │
│                Fail → Fix → ↻  │
│                                 │
└─────────────────────────────────┘
```

## How to Use

### Step 1: Detect Project Type

Use the same detection as `build-check` skill (check config files).

### Step 2: Run Verification Pipeline

#### Rust Projects
```bash
# 1. Build
cargo build 2>&1

# 2. Lint
cargo clippy -- -D warnings 2>&1

# 3. Test
cargo test 2>&1

# 4. Format check
cargo fmt --check 2>&1
```

#### Node.js / TypeScript Projects
```bash
# 1. Build
npm run build --if-present 2>&1

# 2. Lint
npm run lint --if-present 2>&1

# 3. Test
npm test --if-present 2>&1

# 4. Type check
npx tsc --noEmit --if-present 2>&1
```

#### Flutter / Dart Projects
```bash
# 1. Build
flutter build apk --debug 2>&1

# 2. Lint / Analyze
dart analyze 2>&1

# 3. Test
flutter test 2>&1

# 4. Format check
dart format --set-exit-if-changed . 2>&1
```

### Step 3: Fix & Retry

For each failed step:
1. Read the error output
2. Fix the issue
3. Re-run ONLY the failed step
4. If pass, continue to next step
5. If fail again after 3 attempts, report to user

### Step 4: Report Results

```
## Verification Results

| Check | Status | Details |
|-------|--------|---------|
| Build | ✅ Pass | Clean build |
| Lint  | ✅ Pass | 0 warnings |
| Test  | ✅ Pass | 42 tests passed |
| Types | ✅ Pass | No type errors |

All checks passed ✅ — Ready to commit.
```

## Configuration

Override default commands via project rules file (`.agent/rules.md`):

```markdown
## Verify Loop Commands
- build: `cargo build --features full`
- lint: `cargo clippy --all-targets`
- test: `cargo test -- --test-threads=1`
- format: `cargo fmt --check`
```

## Best Practices

1. **Always run full loop** — Don't skip steps to "save time"
2. **Fix forward** — Fix errors immediately, don't postpone
3. **Max 3 retries per step** — Avoid infinite loops
4. **Report warnings** — Don't hide non-blocking warnings
5. **Use project rules** — Custom commands per project
6. **Run before commit** — This is your quality gate
