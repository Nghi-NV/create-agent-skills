---
description: Full feature development workflow from spec to deployment
---

# New Feature Workflow

Structured feature development following the "Plan Mode → Execute → Verify" pattern.

## Steps

### 1. Clarify Requirements
Ask user to confirm:
- What exactly should this feature do?
- Who are the users/consumers?
- Are there any constraints (performance, compatibility, dependencies)?
- What's the acceptance criteria?

### 2. Research Existing Patterns
// turbo
Before designing, check the codebase:
```bash
# Find similar features/patterns
grep -rn "relevant_keyword" --include="*.{ts,tsx,rs,dart}" src/
```
- How does the codebase handle similar features?
- What patterns/libraries are already in use?
- Are there any architectural rules to follow?

### 3. Create Implementation Plan
Switch to PLANNING mode. Create `implementation_plan.md`:
- List all files to create/modify
- Define data models / interfaces
- Plan the implementation order (dependencies first)
- Identify potential breaking changes
- Define test strategy

**Request user review before proceeding.**

### 4. Implement Foundation
// turbo
Build in this order:
1. Data models / types / interfaces
2. Core business logic
3. Integration layer (API, DB, etc.)
4. UI components (if applicable)
5. Edge cases and error handling

### 5. Run Verification Loop
// turbo
Use `verify-loop` skill:
```bash
# Build → Lint → Test → Fix → Repeat
```

### 6. Create Walkthrough
Document what was built:
- Files created/modified
- How to test the feature
- Any follow-up items
- Screenshots if UI change

### 7. Commit
Use `git-commit` skill for proper commit message:
```bash
git add -A
git commit -m "✨ feat(scope): description"
```
