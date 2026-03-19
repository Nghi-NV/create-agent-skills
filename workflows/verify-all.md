---
description: Run full verification pipeline — build, lint, test, typecheck until all pass
---

# Verify All Workflow

End-to-end verification loop. Run this before committing, after implementing features, or when user says "verify everything".

// turbo-all

## Steps

### 1. Detect Project Type
```bash
ls -la Cargo.toml package.json pubspec.yaml build.gradle* 2>/dev/null
```

### 2. Run Build
```bash
# Auto-detect and run appropriate build command
```
If fails → fix the error → re-run build.

### 3. Run Lint
```bash
# Auto-detect and run appropriate lint command
```
If fails → fix the lint errors → re-run lint.

### 4. Run Tests
```bash
# Auto-detect and run appropriate test command
```
If fails → fix the failing test → re-run tests.

### 5. Run Type Check (if applicable)
```bash
# TypeScript: npx tsc --noEmit
# Rust: cargo clippy
# Dart: dart analyze
```
If fails → fix type errors → re-run.

### 6. Format Check
```bash
# Run format checker (don't auto-fix, just check)
```

### 7. Report Results
Report summary table:
| Check | Status | Details |
|-------|--------|---------|
| Build | ✅/❌ | ... |
| Lint  | ✅/❌ | ... |
| Test  | ✅/❌ | ... |
| Types | ✅/❌ | ... |

If all pass → "Ready to commit ✅"
If any fail → explain what needs manual attention.
